import logging
import os
import re
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field

try:
    from openai import OpenAI
except Exception:
    OpenAI = None


load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

BASE_DIR = Path(__file__).resolve().parent
AGENDA_PATH = Path(os.getenv("AGENDA_PATH", BASE_DIR / "agenda.txt"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

DEFAULT_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", DEFAULT_ORIGINS).split(",")
    if origin.strip()
]


class AgendaSession(BaseModel):
    session_id: str
    time: str
    title: str
    speaker: str
    focus_keywords: list[str]
    description: str


class MatchRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    professional_focus: str = Field(
        ...,
        alias="professionalFocus",
        min_length=3,
        max_length=1000,
    )


class MatchResponse(BaseModel):
    success: bool
    attendee: dict[str, str]
    matched_session: AgendaSession
    match_score: float
    matched_terms: list[str]
    email_draft: str
    llm_used: bool
    mcp_log: dict[str, str]


app = FastAPI(
    title="Cogent Event AI Personalizer API",
    description="FastAPI backend for agenda matching, safe LLM email drafting, and MCP simulation logging.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS if FRONTEND_ORIGINS != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _extract_field(block: str, field_name: str) -> str:
    pattern = rf"^{re.escape(field_name)}:\s*(.+)$"
    match = re.search(pattern, block, flags=re.MULTILINE)
    return match.group(1).strip() if match else ""


def parse_agenda_file(path: Path) -> list[AgendaSession]:
    if not path.exists():
        raise FileNotFoundError(f"Agenda file not found at: {path}")

    raw_text = path.read_text(encoding="utf-8")

    session_pattern = re.compile(
        r"\[(SESSION_\d+)\]\s*(.*?)(?=\n\s*\[SESSION_\d+\]|\Z)",
        flags=re.DOTALL,
    )

    sessions: list[AgendaSession] = []

    for session_id, block in session_pattern.findall(raw_text):
        keyword_text = _extract_field(block, "Focus Keywords")
        keywords = [
            item.strip().strip(".")
            for item in keyword_text.split(",")
            if item.strip()
        ]

        session = AgendaSession(
            session_id=session_id,
            time=_extract_field(block, "Time"),
            title=_extract_field(block, "Title"),
            speaker=_extract_field(block, "Speaker"),
            focus_keywords=keywords,
            description=_extract_field(block, "Description"),
        )

        if session.title and session.time:
            sessions.append(session)

    if not sessions:
        raise ValueError("No valid sessions found in agenda.txt")

    return sessions


@lru_cache(maxsize=1)
def get_agenda_sessions() -> list[AgendaSession]:
    return parse_agenda_file(AGENDA_PATH)


STOPWORDS = {
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "how",
    "i", "in", "into", "is", "it", "my", "of", "on", "or", "our", "the",
    "their", "to", "we", "with", "want", "need", "looking", "about", "help",
    "challenge", "challenges", "career", "professional", "focus",
}


def tokenize(text: str) -> list[str]:
    words = re.findall(r"[a-zA-Z0-9]+", text.lower())
    return [word for word in words if len(word) > 2 and word not in STOPWORDS]


def score_session(user_focus: str, session: AgendaSession) -> tuple[float, list[str]]:
    query = user_focus.lower()
    query_tokens = set(tokenize(user_focus))

    session_text = " ".join(
        [
            session.title,
            session.speaker,
            " ".join(session.focus_keywords),
            session.description,
        ]
    ).lower()

    session_tokens = set(tokenize(session_text))
    matched_terms = sorted(query_tokens.intersection(session_tokens))

    token_score = len(matched_terms)

    keyword_phrase_score = 0
    for keyword in session.focus_keywords:
        clean_keyword = keyword.lower()
        keyword_tokens = set(tokenize(clean_keyword))

        if clean_keyword and clean_keyword in query:
            keyword_phrase_score += 5
            matched_terms.append(keyword)
        elif keyword_tokens and query_tokens.intersection(keyword_tokens):
            keyword_phrase_score += 2

    title_tokens = set(tokenize(session.title))
    title_score = 3 * len(query_tokens.intersection(title_tokens))

    description_tokens = set(tokenize(session.description))
    description_score = 1.5 * len(query_tokens.intersection(description_tokens))

    admin_penalty = 0
    if session.title.lower() in {
        "registrations",
        "coffee break",
        "q&a and closing remarks",
        "lunch & networking",
    }:
        admin_penalty = 1.5

    total_score = (
        token_score
        + keyword_phrase_score
        + title_score
        + description_score
        - admin_penalty
    )

    unique_terms = sorted(set(term.strip() for term in matched_terms if term.strip()))
    return max(total_score, 0), unique_terms


def find_best_session(
    user_focus: str,
    sessions: list[AgendaSession],
) -> tuple[AgendaSession, float, list[str]]:
    scored_sessions = [
        (session, *score_session(user_focus, session))
        for session in sessions
    ]

    scored_sessions.sort(key=lambda item: item[1], reverse=True)
    best_session, best_score, matched_terms = scored_sessions[0]

    if best_score == 0:
        keynote = next(
            (session for session in sessions if session.session_id == "SESSION_3"),
            sessions[0],
        )
        return keynote, 0, []

    return best_session, round(best_score, 2), matched_terms


def build_agenda_context(session: AgendaSession) -> str:
    return f"""
MATCHED AGENDA SESSION ONLY:
Session ID: {session.session_id}
Time: {session.time}
Title: {session.title}
Speaker: {session.speaker}
Focus Keywords: {", ".join(session.focus_keywords)}
Description: {session.description}
""".strip()


def build_safe_fallback_email(
    name: str,
    professional_focus: str,
    session: AgendaSession,
) -> str:
    return f"""Hi {name},

Thank you for your interest in Troubled Waters: Sailing with AI in Supply Chain.

Based on your focus around "{professional_focus}", the session I would personally highlight for you is "{session.title}" scheduled for {session.time}. This session will be led by {session.speaker} and is especially relevant because it covers {", ".join(session.focus_keywords)}.

The agenda describes this session as: {session.description}

We would be pleased to welcome you to the event and help you connect your current priorities with the most relevant supply chain, logistics, automation, and AI discussions from the programme.

Best regards,
Cogent Solutions Event Team"""


def build_llm_messages(
    name: str,
    professional_focus: str,
    session: AgendaSession,
) -> list[dict[str, str]]:
    agenda_context = build_agenda_context(session)

    system_prompt = """
You are a professional B2B event invitation email writer.

CRITICAL RULES:
1. Use ONLY the matched agenda session context provided by the backend.
2. Do NOT invent event dates, venues, links, prices, extra speakers, extra sessions, companies, statistics, or topics.
3. Do NOT change the session time, title, speaker, keywords, or description.
4. If a detail is not present in the agenda context, omit it.
5. Write a polished invitation email body only. Do not include a subject line.
6. Keep the tone professional, warm, concise, and suitable for corporate delegates.
""".strip()

    user_prompt = f"""
Visitor name: {name}
Visitor professional focus / career challenge: {professional_focus}

{agenda_context}

Task:
Write a personalized B2B invitation email body for this visitor.
Highlight why this exact matched session is relevant to their professional focus.
Mention the matched session title, time, and speaker exactly as provided.
""".strip()

    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]


def email_contains_required_session_facts(
    email_body: str,
    session: AgendaSession,
) -> bool:
    normalized_email = email_body.lower()
    return (
        session.title.lower() in normalized_email
        and session.time.lower() in normalized_email
    )


def generate_invitation_email(
    name: str,
    professional_focus: str,
    session: AgendaSession,
) -> tuple[str, bool]:
    if not OPENAI_API_KEY or OpenAI is None:
        logging.warning(
            "OPENAI_API_KEY is missing or OpenAI SDK is unavailable. Using safe fallback email."
        )
        return build_safe_fallback_email(name, professional_focus, session), False

    try:
        client = OpenAI(api_key=OPENAI_API_KEY)

        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=build_llm_messages(name, professional_focus, session),
            temperature=0.2,
            max_tokens=500,
        )

        email_body = response.choices[0].message.content.strip()

        if not email_contains_required_session_facts(email_body, session):
            logging.warning("LLM draft failed safety check. Using fallback email.")
            return build_safe_fallback_email(name, professional_focus, session), False

        return email_body, True

    except Exception as exc:
        logging.exception("LLM generation failed. Using fallback email. Error: %s", exc)
        return build_safe_fallback_email(name, professional_focus, session), False


def send_draft_via_mcp(email_address: str, email_body: str) -> dict[str, str]:
    timestamp_utc = (
        datetime.now(timezone.utc)
        .isoformat(timespec="seconds")
        .replace("+00:00", "Z")
    )

    log_message = f"""
================ MCP SIMULATION: EMAIL DRAFT CREATED ================
Recipient Email: {email_address}
UTC Timestamp: {timestamp_utc}

Email Body:
{email_body}
=====================================================================
""".strip()

    print(log_message, flush=True)
    logging.info(
        "MCP simulation completed for recipient=%s at %s",
        email_address,
        timestamp_utc,
    )

    return {
        "status": "draft_logged_to_server_console",
        "recipient": email_address,
        "timestamp_utc": timestamp_utc,
    }


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "Cogent Event AI Personalizer API is running.",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health_check() -> dict[str, Any]:
    try:
        sessions = get_agenda_sessions()
        return {
            "status": "ok",
            "agenda_loaded": True,
            "agenda_path": str(AGENDA_PATH),
            "session_count": len(sessions),
            "llm_configured": bool(OPENAI_API_KEY),
            "allowed_origins": FRONTEND_ORIGINS,
        }
    except Exception as exc:
        return {
            "status": "error",
            "agenda_loaded": False,
            "error": str(exc),
            "llm_configured": bool(OPENAI_API_KEY),
            "allowed_origins": FRONTEND_ORIGINS,
        }


@app.get("/agenda", response_model=list[AgendaSession])
def get_agenda() -> list[AgendaSession]:
    try:
        return get_agenda_sessions()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/match", response_model=MatchResponse)
def match_visitor_to_session(payload: MatchRequest) -> MatchResponse:
    try:
        sessions = get_agenda_sessions()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not load agenda.txt: {exc}",
        ) from exc

    matched_session, match_score, matched_terms = find_best_session(
        payload.professional_focus,
        sessions,
    )

    email_body, llm_used = generate_invitation_email(
        name=payload.name,
        professional_focus=payload.professional_focus,
        session=matched_session,
    )

    mcp_log = send_draft_via_mcp(
        email_address=str(payload.email),
        email_body=email_body,
    )

    return MatchResponse(
        success=True,
        attendee={
            "name": payload.name,
            "email": str(payload.email),
            "professional_focus": payload.professional_focus,
        },
        matched_session=matched_session,
        match_score=match_score,
        matched_terms=matched_terms,
        email_draft=email_body,
        llm_used=llm_used,
        mcp_log=mcp_log,
    )