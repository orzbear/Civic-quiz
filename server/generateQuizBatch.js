require("dotenv").config();

const fs = require("fs");
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const NEWS_API_KEY = process.env.NEWS_API_KEY;     

async function generateQuizBatch() {
  const res = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      category: "politics",
      language: "en",
      pageSize: 10,
      apiKey: NEWS_API_KEY,
    },
  });

  const headlines = res.data.articles.map((a) => a.title);
  const prompt = `Create 10 civic education quiz questions inspired by the following political news headlines.
  Each question should have:
  - a question string
  - an array of 4 options
  - the index (0–3) of the correct answer
  
  Headlines:
  ${headlines.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Respond ONLY with a JSON array, like this (no commentary, no markdown):

[
  {
    "question": "What is ...?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 2
  },
  ...
]
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent`,
    { contents: [{ parts: [{ text: prompt }] }] },
    { params: { key: GEMINI_API_KEY } }
  );

  let raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (raw.startsWith("```")) raw = raw.replace(/```(json)?/g, "").trim();

  const questions = JSON.parse(raw);

  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync("quizzes.json", JSON.stringify({ date: today, questions }, null, 2));
  return questions;
}

module.exports = generateQuizBatch;
