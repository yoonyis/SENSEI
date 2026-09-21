# 🧠 SENSEI

### AI-Powered Personal Learning Companion

SENSEI is an intelligent learning platform designed to help students understand concepts, practice effectively, prepare for exams, and track their learning progress — all in one place.

Instead of simply providing answers, SENSEI aims to create a personalized learning experience around each student's goals, study material, performance, and weak areas.

---

## 🚀 What SENSEI Does

SENSEI combines AI-powered assistance with structured learning workflows.

### 💬 Ask SENSEI

Ask questions in natural language and receive AI-generated explanations.

- Concept explanations
- Step-by-step answers
- Follow-up learning
- Quick study suggestions
- Persistent chat history

### 📚 Study Material

Bring your own study material into SENSEI.

Supported formats include:

- PDF
- DOC
- DOCX
- TXT
- Images

Uploaded material can be used as the basis for exam preparation and learning workflows.

### 🎯 Practice Mode

Practice questions are generated dynamically based on:

- Subject
- Topic
- Difficulty
- Previous performance

After practice sessions, SENSEI analyzes performance and identifies areas that need more attention.

### 📝 Exam Mode

SENSEI can turn study material into an AI-generated exam experience.

It provides:

- Multiple-choice questions
- Topic-based questions
- Performance analysis
- Strength identification
- Weak-topic detection
- Personalized recommendations
- Exam preparation roadmap

### 📊 Learning Dashboard

The dashboard brings the student's learning activity together in one place.

It tracks:

- Overall progress
- Study time
- Practice accuracy
- Study streak
- Subject progress
- Recent activity

---

# 🧩 Core Idea

Traditional learning platforms often separate studying, practice, exam preparation, and performance tracking.

SENSEI connects these pieces into one learning loop:

```text
        STUDY
          ↓
     Ask SENSEI
          ↓
    Practice Questions
          ↓
    Performance Analysis
          ↓
      Weak Topics
          ↓
   Personalized Roadmap
          ↓
        EXAM
          ↓
       Repeat
```

The goal is to make learning **adaptive rather than static**.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────┐
│             SENSEI UI                │
│          React + Vite                │
└──────────────────┬───────────────────┘
                   │
                   │ HTTP / REST API
                   ▼
┌──────────────────────────────────────┐
│          SENSEI Backend              │
│       Node.js + Express              │
├──────────────────────────────────────┤
│ Ask AI                               │
│ Study Material Processing            │
│ Practice Generation                  │
│ Practice Analysis                    │
│ Exam Generation                      │
│ Exam Analysis                        │
│ Study Roadmaps                       │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          Google Gemini AI            │
│       AI Generation + Analysis       │
└──────────────────────────────────────┘
```

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS
- LocalStorage

### Backend

- Node.js
- Express.js
- Multer
- Mammoth
- pdf-parse
- dotenv
- CORS

### AI

- Google Gemini API

### Development

- Git
- GitHub
- VS Code

---

# 📁 Project Structure

```text
SENSEI/
│
├── src/
│   ├── pages/
│   │   ├── welcome/
│   │   ├── login/
│   │   ├── home/
│   │   ├── ask/
│   │   ├── scan/
│   │   ├── practive/
│   │   └── exammode/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   └── server.js
│
├── public/
│
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚡ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/yoonyis/SENSEI.git
cd SENSEI
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your real API key to GitHub.

## 4. Start the backend

```bash
npm run server
```

The backend runs on:

```text
http://localhost:3001
```

## 5. Start the frontend

Open another terminal:

```bash
npm run dev
```

The frontend will be available through the Vite development server.

---

# 🔐 Security

API keys and environment variables are intentionally excluded from version
