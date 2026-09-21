import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============================
// MIDDLEWARE
// ============================

app.use(cors());

app.use(
  express.json({
    limit: "10mb"
  })
);

// ============================
// FILE UPLOAD
// ============================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

// ============================
// GEMINI
// ============================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// ============================
// HOME
// ============================

app.get("/", (req, res) => {
  res.json({
    message: "SENSEI AI backend is running",
    status: "online"
  });
});

// ============================
// GEMINI HELPER
// ============================

async function askGemini(prompt, retries = 3) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini error:", error.message);

    const status = error?.status || error?.code;

    if (
      retries > 0 &&
      (status === 429 ||
        status === 500 ||
        status === 503)
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      return askGemini(prompt, retries - 1);
    }

    throw error;
  }
}

// ============================
// JSON PARSER
// ============================

function parseAIJson(text) {
  try {
    return JSON.parse(text);
  } catch {}

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {}

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start !== -1 && end !== -1) {
    try {
      return JSON.parse(
        cleaned.slice(start, end + 1)
      );
    } catch {}
  }

  return null;
}

// ============================
// FALLBACK ANSWERS
// ============================

const fallbackAnswers = {
  "open loop":
    "An open-loop control system does not use feedback. The controller produces an output without comparing it with the actual output.",

  "closed loop":
    "A closed-loop control system uses feedback. The actual output is measured and compared with the desired input to produce an error signal.",

  "transfer function":
    "A transfer function is the ratio of the Laplace transform of the output to the Laplace transform of the input, assuming zero initial conditions.",

  stability:
    "A continuous-time system is stable when all closed-loop poles lie in the left half of the s-plane. Poles on the right half indicate instability.",

  "negative feedback":
    "Negative feedback subtracts the measured output from the reference input. It generally improves accuracy, reduces sensitivity to parameter variations, and can improve bandwidth."
};

function getFallback(question) {
  const q = question.toLowerCase();

  for (const [key, answer] of Object.entries(
    fallbackAnswers
  )) {
    if (q.includes(key)) {
      return answer;
    }
  }

  return null;
}

// ======================================================
// ASK SENSEI
// ======================================================

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({
      error: "Question is required."
    });
  }

  try {
    const prompt = `
You are SENSEI, an AI tutor for engineering and computer science students.

Answer the student's question clearly and accurately.

Rules:
- Explain concepts simply.
- Show formulas when useful.
- Use examples when useful.
- For numerical problems, show calculations step-by-step.
- Do not invent information.
- Keep the answer organized.
- Use markdown where useful.

Student question:

${question}
`;

    const answer = await askGemini(prompt);

    res.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error("Ask error:", error);

    const fallback = getFallback(question);

    if (fallback) {
      return res.json({
        success: true,
        answer: fallback,
        fallback: true
      });
    }

    res.status(500).json({
      error: "SENSEI could not generate an answer."
    });
  }
});

// ======================================================
// EXAM MATERIAL UPLOAD
// ======================================================

app.post(
  "/api/exam/material",
  upload.single("material"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded."
        });
      }

      const file = req.file;

      const filename = file.originalname;

      const mimetype = file.mimetype;

      let materialText = "";

      // ============================
      // PDF
      // ============================

      if (
        mimetype === "application/pdf" ||
        filename.toLowerCase().endsWith(".pdf")
      ) {
        const parser = new PDFParse({
          data: file.buffer
        });

        const parsed = await parser.getText();

        materialText = parsed.text || "";

        await parser.destroy();
      }

      // ============================
      // DOCX
      // ============================

      else if (
        mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        filename.toLowerCase().endsWith(".docx")
      ) {
        const result =
          await mammoth.extractRawText({
            buffer: file.buffer
          });

        materialText = result.value || "";
      }

      // ============================
      // TXT
      // ============================

      else if (
        mimetype.startsWith("text/") ||
        filename.toLowerCase().endsWith(".txt")
      ) {
        materialText =
          file.buffer.toString("utf-8");
      }

      // ============================
      // IMAGE
      // ============================

      else if (mimetype.startsWith("image/")) {
        materialText =
          "Image uploaded successfully. OCR processing can be added to extract text from this image.";
      }

      // ============================
      // UNSUPPORTED
      // ============================

      else {
        return res.status(400).json({
          error:
            "Unsupported file type. Use PDF, DOCX, TXT, or image."
        });
      }

      materialText = materialText.trim();

      res.json({
        success: true,
        filename,
        mimetype,
        size: file.size,
        characters: materialText.length,
        materialText
      });
    } catch (error) {
      console.error(
        "Material upload error:",
        error
      );

      res.status(500).json({
        error:
          "Could not process the uploaded material."
      });
    }
  }
);

// ======================================================
// GENERIC AI JSON GENERATOR
// ======================================================

async function generateJSON(prompt) {
  const response = await askGemini(`
Return ONLY valid JSON.

${prompt}
`);

  const parsed = parseAIJson(response);

  if (!parsed) {
    throw new Error(
      "AI returned invalid JSON."
    );
  }

  return parsed;
}

// ======================================================
// PRACTICE QUESTION GENERATION
// ======================================================

app.post(
  "/api/practice/generate",
  async (req, res) => {
    const {
      subject,
      topic,
      difficulty,
      previousPerformance
    } = req.body;

    try {
      const data = await generateJSON(`
Create ONE multiple-choice practice question.

Subject:
${subject || "Engineering"}

Topic:
${topic || "General"}

Difficulty:
${difficulty || "Intermediate"}

Previous performance:
${JSON.stringify(
  previousPerformance || {}
)}

Return exactly:

{
  "question": "string",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "topic": "string",
  "difficulty": "string",
  "explanation": "string",
  "examTip": "string"
}

correctAnswer must be 0, 1, 2, or 3.
`);

      res.json({
        success: true,
        question: data
      });
    } catch (error) {
      console.error(
        "Practice generation error:",
        error
      );

      res.status(500).json({
        error:
          "Could not generate practice question."
      });
    }
  }
);

// ======================================================
// PRACTICE ANALYSIS
// ======================================================

app.post(
  "/api/practice/analyze",
  async (req, res) => {
    const { subject, results } = req.body;

    try {
      const data = await generateJSON(`
Analyze this student's practice performance.

Subject:

${subject}

Results:

${JSON.stringify(results || [])}

Return:

{
  "score": 0,
  "accuracy": 0,
  "strengths": [],
  "weakTopics": [],
  "mediumTopics": [],
  "recommendations": [],
  "nextDifficulty": "Beginner",
  "studyPlan": [],
  "message": "string"
}

Use numerical score and accuracy from the supplied results.
`);

      res.json({
        success: true,
        analysis: data
      });
    } catch (error) {
      console.error(
        "Practice analysis error:",
        error
      );

      res.status(500).json({
        error:
          "Could not analyze practice."
      });
    }
  }
);

// ======================================================
// EXAM ROADMAP
// ======================================================

app.post(
  "/api/exam/roadmap",
  async (req, res) => {
    const {
      subject,
      deadline,
      material,
      currentLevel
    } = req.body;

    try {
      const data = await generateJSON(`
Create a personalized exam preparation roadmap.

Subject:
${subject}

Exam deadline:
${deadline}

Current level:
${currentLevel}

Study material:
${material || "No material uploaded yet."}

Return:

{
  "priorityTopics": [],
  "revisionStrategy": [],
  "dailyRoadmap": [],
  "examStrategy": [],
  "importantTopics": []
}

Make the roadmap practical and based on the supplied material when available.
`);

      res.json({
        success: true,
        roadmap: data
      });
    } catch (error) {
      console.error(
        "Roadmap error:",
        error
      );

      res.status(500).json({
        error:
          "Could not create exam roadmap."
      });
    }
  }
);

// ======================================================
// EXAM GENERATION
// ======================================================

app.post(
  "/api/exam/generate",
  async (req, res) => {
    const {
      subject,
      material,
      difficulty,
      questionCount
    } = req.body;

    const count = Math.min(
      Math.max(
        Number(questionCount) || 10,
        1
      ),
      30
    );

    try {
      const data = await generateJSON(`
Create ${count} multiple-choice exam questions.

Subject:
${subject}

Difficulty:
${difficulty || "Intermediate"}

Study material:
${material || "Use standard academic knowledge."}

Return exactly:

{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "topic": "string",
      "explanation": "string"
    }
  ]
}

Rules:

- Generate exactly ${count} questions.
- correctAnswer must be 0, 1, 2, or 3.
- Questions should cover different topics where possible.
- Avoid duplicate questions.
`);

      res.json({
        success: true,
        exam: data
      });
    } catch (error) {
      console.error(
        "Exam generation error:",
        error
      );

      res.status(500).json({
        error:
          "Could not generate exam."
      });
    }
  }
);

// ======================================================
// EXAM ANALYSIS
// ======================================================

app.post(
  "/api/exam/analyze",
  async (req, res) => {
    const { subject, results } = req.body;

    try {
      const data = await generateJSON(`
Analyze the student's exam performance.

Subject:

${subject}

Exam results:

${JSON.stringify(results || [])}

Return:

{
  "score": 0,
  "percentage": 0,
  "grade": "string",
  "strengths": [],
  "weakTopics": [],
  "criticalTopics": [],
  "timeManagement": "string",
  "recommendations": [],
  "nextSteps": [],
  "roadmapChanges": [],
  "message": "string"
}

Base the analysis only on the supplied results.
`);

      res.json({
        success: true,
        analysis: data
      });
    } catch (error) {
      console.error(
        "Exam analysis error:",
        error
      );

      res.status(500).json({
        error:
          "Could not analyze exam."
      });
    }
  }
);

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(
  (err, req, res, next) => {
    console.error(
      "Server error:",
      err
    );

    res.status(500).json({
      error:
        "Internal server error."
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(`
╔══════════════════════════════════════╗
║          SENSEI AI SERVER            ║
╠══════════════════════════════════════╣
║  Status : ONLINE                     ║
║  Port   : ${PORT}                    ║
╚══════════════════════════════════════╝
`);
  }
);