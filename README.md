<div align="center">

# 🎙️ PrepareView
### *Next-Generation AI-Powered Mock Interview & Career Readiness Platform*

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/LLM-OpenRouter_GPT--4o--mini-FF6B6B)](https://openrouter.ai/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2340?logo=razorpay&logoColor=white)](https://razorpay.com/)

<p align="center">
  <b>PrepareView</b> simulates realistic, high-pressure job interviews with real-time conversational voice synthesis, synchronized avatar animation, adaptive LLM question generation, automated resume parsing, and granular performance analytics with downloadable PDF reports.
</p>

</div>

---

## 📌 Table of Contents
1. [Overview & Value Proposition](#-overview--value-proposition)
2. [Key Features](#-key-features)
3. [System Architecture & Data Flow](#-system-architecture--data-flow)
4. [Tech Stack](#-tech-stack)
5. [Project Structure](#-project-structure)
6. [Core Workflows & Algorithms](#-core-workflows--algorithms)
7. [API Endpoints](#-api-endpoints)
8. [Environment Configuration](#-environment-configuration)
9. [Getting Started Locally](#-getting-started-locally)
10. [Engineering Highlights & Best Practices](#-engineering-highlights--best-practices)
11. [Future Roadmap](#-future-roadmap)

---

## 🌟 Overview & Value Proposition

Traditional interview preparation relies on static flashcards or expensive career coaches. **PrepareView** bridges this gap by delivering an end-to-end interactive simulation that mimics an actual panel interview:

- **Adaptive Questioning**: Synthesizes custom questions based on candidate role, seniority, and uploaded resume text.
- **Natural Voice Interaction**: Real-time browser-based Speech-to-Text (STT) and low-latency Text-to-Speech (TTS) with human-like prosody.
- **Synchronized Video Avatars**: Real-time lip-sync/talking simulation that pauses and plays in lockstep with speech synthesis.
- **Multi-Pillar Scoring**: Grades answers on **Confidence**, **Communication**, and **Technical Correctness**.
- **Credit & Payment Ecosystem**: Pay-as-you-go architecture powered by Razorpay with HMAC-SHA256 verified transactions.

---

## ✨ Key Features

### 1. 📄 Smart Resume Parsing & Role Alignment
- Upload PDF resumes directly; extracted via `pdfjs-dist` on the server and converted into clean plaintext.
- GPT-4o-mini parses unstructured text into normalized entities: role, years of experience, key projects, and core technical skills.
- Zero leftover disk footprint: uploaded temporary PDF files are deleted immediately after parsing.

### 2. 🤖 Interactive Video Avatar & Voice Engine
- **Text-to-Speech (TTS)**: Web Speech Synthesis with dynamic gender voice detection (`Zira`, `Samantha`, `David`, `Mark`) and conversational cadence adjustment (rate: 0.92, pitch: 1.05).
- **Synchronized Video**: AI avatar video plays while the AI is speaking and pauses immediately when listening.
- **Acoustic Feedback Protection**: Automatically mutes the candidate's microphone while the avatar is speaking to prevent audio feedback loops.
- **Speech-to-Text (STT)**: Continuous speech recognition transcribes answers live into the candidate's answer portal.

### 3. ⏱️ Adaptive Interview Simulation
- **Difficulty Ladder**: 5-question progression (Questions 1–2: Easy / 60s, Questions 3–4: Medium / 90s, Question 5: Hard / 120s).
- **Strict Timer & Auto-Submit**: Visual circular progress timer triggers automatic submission upon timeout.
- **Modes**: Specialized tracks for **Technical** (algorithmic/domain deep-dives) and **HR** (behavioral, situational, and culture-fit).

### 4. 📊 Multi-Metric Analytics & Instant Feedback
- Individual answer evaluations provide immediate 10–15 word actionable spoken tips before moving to the next question.
- Comprehensive end-of-interview report featuring:
  - Overall Performance Score (0–10)
  - Skill breakdown gauges for Confidence, Communication, and Correctness
  - Recharts Area Chart displaying score progression across questions
  - Question-by-question review with individual feedback notes

### 5. 📑 Client-Side PDF Report Generation
- Candidates can export full performance reports as branded PDFs using `jspdf` and `jspdf-autotable`.
- Reports include candidate metadata, final scores, tailored career advice, and structured review tables.

### 6. 💳 Credits & Monetization (Razorpay)
- New users receive 100 free credits upon Google OAuth sign-in.
- Interview creation costs 50 credits.
- Tiered credit top-ups (Starter: ₹100 for 150 credits; Pro: ₹500 for 650 credits) with end-to-end Razorpay order generation and webhook signature verification.

---

## 🏗️ System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (React 19 + Vite)                      │
│                                                                        │
│  [ Step 1: Setup ] ───> [ Step 2: Voice Interview ] ───> [ Step 3: Report ]
│   - Role & Exp            - Web Speech TTS / STT          - Recharts Area Chart
│   - PDF Resume Upload     - Video Avatar Sync             - Circular Progress
│   - Credit Balance        - Dynamic Timers (60-120s)      - PDF Export (jsPDF)
└──────────────────┬───────────────────────▲─────────────────────────────┘
                   │                       │
      HTTPS / JSON │                       │ Server-Sent Responses
      (withCredentials)                    │
                   ▼                       │
┌──────────────────────────────────────────┴─────────────────────────────┐
│                           SERVER (Express 5.x)                         │
│                                                                        │
│  Controllers & Routes:                                                 │
│   ├── auth.controller.js      --> Firebase OAuth + JWT (Cookie)       │
│   ├── user.controller.js      --> User Profile & Credit Fetching       │
│   ├── interview.controller.js --> PDF Extraction, AI Prompts & Scoring │
│   └── payment.controller.js   --> Razorpay Orders & HMAC Verification  │
│                                                                        │
│  Middlewares:                                                          │
│   ├── isAuth.js               --> JWT verification via req.cookies     │
│   └── multer.js               --> Secure temporary PDF uploads (5MB)   │
└──────────────┬──────────────────────────────────┬──────────────────────┘
               │                                  │
               ▼                                  ▼
┌──────────────────────────────┐  ┌──────────────────────────────────────┐
│       DATABASE (MongoDB)     │  │          EXTERNAL SERVICES           │
│                              │  │                                      │
│  - User (Credits, Auth)      │  │  - OpenRouter API (gpt-4o-mini)      │
│  - Interview (Q&As, Scores)  │  │  - Razorpay Orders & Verification    │
│  - Payment (Orders, Txns)    │  │  - Firebase Authentication           │
└──────────────────────────────┘  └──────────────────────────────────────┘
```

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19, Vite 7
- **Styling**: Tailwind CSS v4, Lucide/FontAwesome React Icons
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing**: React Router DOM v7
- **Animation**: Motion (`motion/react`)
- **Data Visualization**: Recharts, React Circular Progressbar
- **PDF Export**: jsPDF, jsPDF-AutoTable
- **Browser APIs**: Web Speech API (`SpeechRecognition`, `SpeechSynthesis`)

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5.x
- **Database & ODM**: MongoDB Atlas, Mongoose 9.x
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), Cookie-Parser
- **File Handling & PDF Extraction**: Multer, `pdfjs-dist` (v5.4 legacy engine)
- **HTTP Client**: Axios

### Third-Party Services
- **LLM Provider**: OpenRouter API (`openai/gpt-4o-mini`)
- **Payment Gateway**: Razorpay (Orders API & HMAC-SHA256 signature verification)
- **Authentication**: Firebase Authentication (Google Auth Popup)

---

## 📂 Project Structure

```text
PrepareView/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Video avatars (male-ai.mp4, female-ai.mp4), illustrations
│   │   ├── components/
│   │   │   ├── AuthModel.jsx     # Modal wrapper for Google sign-in
│   │   │   ├── Footer.jsx        # Branded application footer
│   │   │   ├── Navbar.jsx        # Navigation, credit counter, user profile dropdown
│   │   │   ├── Step1SetUp.jsx    # Role selection, experience, mode & resume upload
│   │   │   ├── Step2Interview.jsx# Real-time voice simulation, avatar sync, timers, STT/TTS
│   │   │   ├── Step3Report.jsx   # Analytics dashboard, charts, skill bars, PDF export
│   │   │   └── Timer.jsx         # Circular animated timer widget
│   │   ├── pages/
│   │   │   ├── Auth.jsx          # Dedicated login page
│   │   │   ├── Home.jsx          # Landing page with interactive feature showcases
│   │   │   ├── InterviewHistory.jsx # Past interview records and status tracking
│   │   │   ├── InterviewPage.jsx # Multi-step workflow container (Step 1 -> 2 -> 3)
│   │   │   ├── InterviewReport.jsx  # Permanent report permalink view (/report/:id)
│   │   │   └── Pricing.jsx       # Pricing plans & Razorpay checkout trigger
│   │   ├── redux/
│   │   │   ├── store.js          # Centralized Redux store
│   │   │   └── userSlice.js      # User state and credit management
│   │   ├── utils/
│   │   │   └── firebase.js       # Firebase initialization & Google Auth Provider
│   │   ├── App.jsx               # Route definitions & user session bootstrap
│   │   ├── main.jsx              # React DOM mounting & Redux Provider setup
│   │   └── index.css             # Tailwind v4 configuration
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── connectDb.js          # MongoDB connection handler
│   │   └── token.js              # JWT creation helper
│   ├── controllers/
│   │   ├── auth.controller.js    # Google auth callback & logout
│   │   ├── interview.controller.js # Resume parsing, LLM prompt orchestration, evaluation
│   │   ├── payment.controller.js # Razorpay order creation & HMAC verification
│   │   └── user.controller.js    # Current user retrieval
│   ├── middlewares/
│   │   ├── isAuth.js             # Cookie-based JWT guard
│   │   └── multer.js             # Disk storage handler for temporary PDFs
│   ├── models/
│   │   ├── interview.model.js    # Questions, scores, feedback, status schema
│   │   ├── payment.model.js      # Plan, credits, Razorpay IDs schema
│   │   └── user.model.js         # User info and credit balance schema
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── interview.route.js
│   │   ├── payment.route.js
│   │   └── user.route.js
│   ├── services/
│   │   ├── openRouter.service.js # Centralized LLM client with error handling
│   │   └── razorpay.service.js   # Razorpay client instance
│   ├── index.js                  # Express application entry point & CORS configuration
│   └── package.json
└── README.md
```

---

## ⚙️ Core Workflows & Algorithms

### 1. Resume Parsing Pipeline
```
[User PDF Upload] 
       │
       ▼ Multer (limits: 5MB, diskStorage -> public/)
[File on Disk] 
       │
       ▼ Read fileBuffer -> Uint8Array
[pdfjs-dist Document Loader] 
       │
       ▼ Loop pages -> getPage() -> getTextContent() -> map string items
[Clean Normalized Text] 
       │
       ▼ Prompt OpenRouter (gpt-4o-mini) -> Strict JSON extraction
[Structured Metadata: role, experience, projects, skills]
       │
       ▼ fs.unlinkSync(filepath) (Zero persistent disk footprint)
[Return to Client Form]
```

### 2. Live Voice Interview Loop
1. **TTS Prompt**: Avatar speaks greeting or question via `SpeechSynthesisUtterance`.
2. **Animation Sync**: Video plays (`video.play()`) on `utterance.onstart` and pauses on `utterance.onend`.
3. **Mute Guard**: During AI speech, speech recognition is stopped to prevent the user's microphone from catching the avatar's audio.
4. **Candidate Response**: STT captures answers in real-time (`webkitSpeechRecognition`). Candidate can also type/edit manually.
5. **Evaluation**: Submitting triggers LLM evaluation against 3 metrics (Confidence, Communication, Correctness) + a short human-like critique spoken aloud to the candidate.
6. **Progression**: Advances through 5 questions before triggering final aggregation and persistence.

### 3. Payment Verification & Credit Top-Up
1. Frontend selects plan (`free`, `basic`, `pro`).
2. Server creates Razorpay order (`amount * 100` paise) and saves a `Payment` record with status `"created"`.
3. Client opens Razorpay modal with `order_id`.
4. On success, client sends `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`.
5. Server hashes `order_id + "|" + payment_id` with `RAZORPAY_KEY_SECRET` using SHA-256 HMAC.
6. Upon signature match, payment status becomes `"paid"` and user credits are atomically incremented via Mongoose `$inc`.

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/auth/google` | Public | Authenticates Firebase user, issues JWT in cookie |
| `GET` | `/api/auth/logout` | Public | Clears JWT cookie |

### User (`/api/user`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `GET` | `/api/user/current-user` | `isAuth` | Returns active user profile & credit balance |

### Interview Management (`/api/interview`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/interview/resume` | `isAuth` | Uploads PDF resume, extracts structured JSON |
| `POST` | `/api/interview/generate-questions` | `isAuth` | Deducts 50 credits, creates interview, returns 5 questions |
| `POST` | `/api/interview/submit-answer` | `isAuth` | Evaluates question answer, returns feedback & scores |
| `POST` | `/api/interview/finish` | `isAuth` | Aggregates overall scores, marks interview completed |
| `GET` | `/api/interview/get-interview` | `isAuth` | Retrieves logged-in user's interview history |
| `GET` | `/api/interview/report/:id` | `isAuth` | Retrieves full analytics report for a specific interview |

### Payments (`/api/payment`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/payment/order` | `isAuth` | Initiates Razorpay checkout order |
| `POST` | `/api/payment/verify` | `isAuth` | Verifies cryptographic signature and adds credits |

---

## 🔐 Environment Configuration

### Client (`client/.env`)
```env
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Server (`server/.env`)
```env
PORT=8000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/InterviewDB
JWT_SECRET=your_super_secret_jwt_key
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)
- OpenRouter API key
- Razorpay account in Test Mode
- Firebase project with Google Authentication enabled

### 1. Clone the Repository
```bash
git clone https://github.com/Aditirim/AI-Interview-Platform.git
cd AI-Interview-Platform
```

### 2. Backend Setup
```bash
cd server
npm install
# Ensure .env is populated with server credentials
npm run dev
```
*The server will start on port `8000` (or your configured `PORT`).*

### 3. Frontend Setup
```bash
cd ../client
npm install
# Ensure .env is populated with client credentials
npm run dev
```
*The client dev server will start at `http://localhost:5173`.*

---

## 🏆 Engineering Highlights & Best Practices

1. **Ephemeral File Processing**: Multer writes resumes to disk only for parsing; `fs.unlinkSync` ensures files are cleaned up immediately even in case of exceptions.
2. **Audio Feedback Cancellation**: Solves the classic acoustic loop problem in browser-based voice assistants by pausing `SpeechRecognition` during `SpeechSynthesis` playback.
3. **Atomic Operations**: Credit balance increments and deductions use atomic `$inc` queries to prevent race conditions during concurrent requests.
4. **Cryptographic Integrity**: Razorpay payment confirmations are verified using timing-safe HMAC-SHA256 computations on the server before modifying user credit state.
5. **Zero-Latency Visual Feedback**: Optimistic UI transitions and micro-animations ensure an interactive, native app experience.

---

## 🔮 Future Roadmap

- [ ] **WebRTC Video Analysis**: Real-time eye contact, posture, and facial expression sentiment evaluation.
- [ ] **Streaming Responses (SSE / WebSockets)**: Token-by-token audio streaming for near-zero latency conversational banter.
- [ ] **Custom Question Sets & Coding IDE**: Monaco editor integration for real-time coding interviews with syntax execution.
- [ ] **Multi-Lingual Support**: Practice interviews in Spanish, Hindi, German, and Mandarin.

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
