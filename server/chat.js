import express from "express";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load resume from file
const resume = fs.readFileSync("./resume.txt", "utf8");

// Initialize Gemini Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const prompt = `
You are an AI chatbot trained on Sathesh's resume. Answer professionally.
Resume Info:
${resume}

User Question: ${question}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing request" });
  }
});

app.listen(5000, () => console.log("Gemini Chat Server running at http://localhost:5000"));
