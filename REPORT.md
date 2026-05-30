# Cogent Event AI Personalizer — Full-Stack Intern Assessment

## 1. Live Gateways

**Live Frontend Website:**  
https://cogent-event-ai-personalizer.vercel.app

**Live Backend API Endpoint:**  
https://cogent-event-ai-personalizer-api.onrender.com

**Backend API Documentation:**  
https://cogent-event-ai-personalizer-api.onrender.com/docs

**Public GitHub Repository:**  
https://github.com/Lithasa/cogent-event-ai-personalizer.git

---

## 2. Project Overview

This project is a full-stack AI-powered event personalization system for **“Troubled Waters: Sailing with AI in Supply Chain”**, an Accelalpha and Oracle executive summit. The application redesigns the reference event website into a modern, responsive, single page experience and connects it with a Python backend that matches each visitor’s professional interest to the most relevant agenda session.

The system allows a visitor to enter their name, email address, preferred session area, and professional focus or career challenge. Once submitted, the backend reads the local `agenda.txt` schedule, selects the best matching session, generates a professional B2B invitation using an LLM, and triggers an MCP-style simulation log for the generated draft.

---

## 3. Tech Stack

### Frontend
- Next.js
- React
- JavaScript
- CSS Modules and global CSS
- Framer Motion
- Lucide React
- React Icons
- Vercel deployment

### Backend
- Python
- FastAPI
- Uvicorn
- OpenAI API
- python-dotenv
- Render deployment

---

## 4. Key Features Implemented

### Creative Frontend Redesign
The frontend was rebuilt as a modern, responsive one page event website. It includes a glass style sticky navigation bar, animated Hero section, About section, filterable agenda, auto scrolling gallery, speaker showcase, registration form, footer, and mobile responsive layouts.

### Intelligent Registration Form
The registration form collects visitor name, email address, preferred session area, and professional focus or career challenge. The frontend sends this information to the backend `/match` endpoint using the configured `NEXT_PUBLIC_API_URL`.

### Agenda-Based Matching
The backend uses the local `agenda.txt` file as the source of truth for all event sessions. It compares the visitor’s selected session area and focus text against the agenda session titles, descriptions, speakers, and focus keywords, then returns the most relevant matched session.

### LLM Invitation Generation
After identifying the best session match, the backend generates a personalized B2B invitation email. The invitation highlights only the matched agenda session and uses the visitor’s submitted focus text to make the message more relevant.

### MCP Simulation
After the email draft is generated, the backend automatically calls the MCP simulation function:

```python
send_draft_via_mcp(email_address, email_body)
```

This function prints the recipient email address, generated email body, and a clean UTC timestamp to the backend server logs.

---

## 5. Local Setup Guide

### 5.1 Clone the Repository

```bash
git clone https://github.com/Lithasa/cogent-event-ai-personalizer.git
cd cogent-event-ai-personalizer
```

### 5.2 Backend Setup

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment.

For Windows PowerShell:

```bash
.\.venv\Scripts\Activate.ps1
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Run the backend locally:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

API documentation will be available at:

```text
http://localhost:8000/docs
```

### 5.3 Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` folder:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the frontend locally:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

### 5.4 Production Environment Variables

For Vercel, set:

```bash
NEXT_PUBLIC_API_URL=https://cogent-event-ai-personalizer-api.onrender.com
```

For Render, set:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 6. Prompt Strategy

The LLM prompt was structured with strict agenda grounding rules. The backend first identifies a matched session from `agenda.txt`, then passes only that verified session information to the LLM. The prompt instructs the model to create a professional B2B invitation while strictly avoiding invented topics, fake speakers, incorrect timings, or agenda details that do not exist in `agenda.txt`. This ensures the generated email remains accurate, event-specific, and traceable to the official conference schedule.

---

## 7. Content Creation Check — LinkedIn Promotional Post

Corporate conference planners need more than registration forms , they need intelligent event experiences that guide each delegate to the most relevant sessions. This AI powered event personalization system matches visitor interests with the right agenda session and instantly generates a professional B2B invitation draft based on the official event schedule. Built for modern executive events, it shows how automation, personalization, and live web experiences can improve attendee engagement before the event even begins.

---

## 8. Deployment Summary

### Frontend Deployment

```text
https://cogent-event-ai-personalizer.vercel.app
```

### Backend Deployment

```text
https://cogent-event-ai-personalizer-api.onrender.com
```

### API Documentation

```text
https://cogent-event-ai-personalizer-api.onrender.com/docs
```

---

## 9. Testing Summary

The following checks were completed:

- Frontend production build completed successfully.
- Vercel deployment tested successfully.
- Registration form submitted successfully from the live frontend.
- Backend returned a matched agenda session.
- Personalized invitation draft displayed on the frontend.
- Register Another flow worked correctly.
- Mobile responsiveness was tested through browser device tools.

---

## 10. Notes on Security

The backend uses environment variables to manage API keys securely. The `.env` and `.env.local` files should not be committed to GitHub. Example environment files are used only to show the required variable names.

---

## 11. Final Submission Links

**Live Website:**  
https://cogent-event-ai-personalizer.vercel.app

**Backend API:**  
https://cogent-event-ai-personalizer-api.onrender.com

**Backend Docs:**  
https://cogent-event-ai-personalizer-api.onrender.com/docs

**GitHub Repository:**  
https://github.com/Lithasa/cogent-event-ai-personalizer.git
