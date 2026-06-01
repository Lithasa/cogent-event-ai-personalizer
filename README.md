# Cogent Event AI Personalizer

An AI-powered full-stack event personalization system built for **"Troubled Waters: Sailing with AI in Supply Chain"** — an Accelalpha | Oracle executive summit.

The application redesigns the reference event website into a modern, responsive single page experience and connects it to a Python backend that matches each visitor's professional interest to the most relevant agenda session, then generates a personalized B2B invitation using an LLM.

---

## Live Deployments

| Service | URL |
|---|---|
| Frontend | https://cogent-event-ai-personalizer.vercel.app |
| Backend API | https://cogent-event-ai-personalizer-api.onrender.com |
| API Docs (Swagger) | https://cogent-event-ai-personalizer-api.onrender.com/docs |

> **Note on the live backend:** The project uses the OpenAI API on a free-tier quota. If the personalized invitation email body does not appear in the Render logs or API response, it is likely because the free-tier token limit has been reached. The session matching and MCP simulation log (recipient, timestamp) will still execute correctly ,only the LLM generated email draft will be absent.Because of that issue , i have uploaded a Screenshot of a working Render Log.

---

## How It Works

```
Visitor fills registration form
        ↓
Frontend POSTs to /match endpoint
        ↓
Backend reads agenda.txt and scores sessions
against the visitor's selected area + focus text
        ↓
Best matching session is identified
        ↓
LLM generates a personalized B2B invitation
grounded strictly in agenda.txt data
        ↓
MCP simulation logs recipient, email body,
and UTC timestamp to server logs
        ↓
Frontend displays matched session
+ invitation draft to the visitor
```

---

## Tech Stack

### Frontend
- Next.js + React (JavaScript)
- CSS Modules and global CSS
- Framer Motion — page and section animations
- Lucide React + React Icons
- Deployed on **Vercel**

### Backend
- Python + FastAPI + Uvicorn
- OpenAI API — invitation generation
- python-dotenv — environment variable management
- Deployed on **Render**

---

## Key Features

### Creative Frontend Redesign
Rebuilt as a modern one page event website featuring a glass style sticky navigation bar, animated Hero section, About section, filterable agenda, auto scrolling gallery, speaker showcase, registration form, and full mobile responsive layout.

### Intelligent Session Matching
The backend reads `agenda.txt` as the single source of truth. It compares the visitor's selected session area and professional focus text against each session's title, description, speaker, and focus keywords to return the best match.

### LLM Invitation Generation
After matching, the backend passes only the verified session data to the LLM and instructs it to generate a professional B2B invitation. The prompt strictly prevents the model from inventing speakers, timings, or topics not present in `agenda.txt`.

### MCP Simulation Log
Once the invitation draft is ready, the backend calls:

```python
send_draft_via_mcp(email_address, email_body)
```

This prints the recipient address, full email body, and a clean UTC timestamp to the server logs simulating an MCP style dispatch event.

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Lithasa/cogent-event-ai-personalizer.git
cd cogent-event-ai-personalizer
```

### 2. Backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Start the server:

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`  
Swagger docs at `http://localhost:8000/docs`

### 3. Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## Environment Variables Reference

| Location | Variable | Value |
|---|---|---|
| `backend/.env` | `OPENAI_API_KEY` | Your OpenAI API key |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | `http://localhost:8000` (local) or the Render URL (production) |

> Do not commit `.env` or `.env.local` to version control.

---

## Prompt Strategy

The LLM prompt is strictly grounded in `agenda.txt`. The backend identifies the matched session first, then passes only that verified session's data to the model. The prompt explicitly instructs the model not to invent topics, speakers, timings, or any details absent from the official schedule. This ensures every generated invitation is accurate and traceable to the real conference agenda.

---

## Project Structure

```
cogent-event-ai-personalizer/
├── backend/
│   ├── main.py
│   ├── agenda.txt
│   ├── requirements.txt
│   └── .env               ← not committed
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── public/
│   └── .env.local         ← not committed
└── README.md
```

---

## Testing Checklist

- [x] Frontend production build completes successfully
- [x] Vercel deployment live and accessible
- [x] Registration form submits from live frontend
- [x] Backend returns a matched agenda session
- [x] Personalized invitation draft renders on frontend
- [x] "Register Another" flow resets correctly
- [x] Mobile responsiveness verified via browser dev tools
- [x] MCP simulation log prints to Render server logs

---

## Security Notes

API keys are managed exclusively through environment variables. The `.env` and `.env.local` files are excluded from version control. Only example variable names are referenced in this README — no actual keys are committed anywhere in the repository.