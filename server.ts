import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Optional Gemini AI Scholar consultation route
  app.post("/api/guna-ai-consult", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "Gemini API key is not configured in server environment. Configure GEMINI_API_KEY in the Secrets panel."
        });
      }

      const { scores, dominantGuna, secondaryGuna, userQuestion } = req.body;

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are a deeply compassionate, objective, and scholarly expert in Indian Philosophy, specializing in the Bhagavad Gita (especially Chapter 14: Gunatraya Vibhaga Yoga), Samkhya Philosophy, Yoga Sutras, and Ayurveda.

The user has completed a 36-question self-reflection assessment measuring their current psychological balance across the Three Gunas.

User's Assessment Results:
- Sattva (Harmonious, Pure, Wise, Calm): ${scores?.sattvaPct ?? 0}%
- Rajas (Passionate, Restless, Ambitious, Agitated): ${scores?.rajasPct ?? 0}%
- Tamas (Lethargic, Heavy, Resistant, Avoidant): ${scores?.tamasPct ?? 0}%
- Dominant Guna: ${dominantGuna ?? "Unknown"}
- Secondary Guna: ${secondaryGuna ?? "Unknown"}

User's Query / Area of Guidance:
"${userQuestion ? userQuestion : "Please provide a personalized commentary on my Guna breakdown and 3 specific Yogic habits to enhance Sattva."}"

Instructions for your response:
1. Maintain an objective, calm, encouraging, and highly scholarly yet accessible tone.
2. Avoid flattering the user or assuming they are inherently Sattvic. Ground your analysis strictly in their reported numbers.
3. Cite or explain 1 relevant verse/concept from Bhagavad Gita Chapter 14 (e.g., how Sattva binds through attachment to knowledge, how Rajas binds through attachment to action/desire, or how Tamas deludes through heedlessness/inertia).
4. Provide 3 actionable, pragmatic daily habits rooted in Ayurveda/Yoga to balance their specific dominant or elevated Gunas.
5. Format your output cleanly in Markdown with bold headers and clear bullet points.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return res.json({ response: response.text });
    } catch (err: any) {
      console.error("Error in /api/guna-ai-consult:", err);
      return res.status(500).json({ error: err?.message || "Failed to generate AI consultation." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Three Gunas Assessment App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
