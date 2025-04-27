const fs = require("fs");
const axios = require("axios");

const GEMINI_API_KEY = "AIzaSyD1jnbuC7bLP1KKtefmHxE5Rc24IX91Oy8"; 
const NEWS_API_KEY = "9da8361e3c22428b84874ae9c4b3c589";     

async function fetchHeadlines() {
  const res = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      category: "politics",
      language: "en",
      pageSize: 10,
      apiKey: NEWS_API_KEY,
    },
  });

  return res.data.articles.map((a) => a.title);
}

async function generateQuizFromHeadlines(headlines) {
  const prompt = `
  Create 20 civic education quiz questions inspired by the following political news headlines.
  Each question should have:
  - a question string
  - an array of 4 options
  - the index (0–3) of the correct answer
  
  Headlines:
  ${headlines.map((t, i) => `${i + 1}. ${t}`).join("\n")}

  Respond in this exact JSON format:
  [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": 2
    },
    ...
  ]
  `;

  const geminiRes = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      params: {
        key: GEMINI_API_KEY,
      },
    }
  );

  let rawText = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) throw new Error("Gemini returned no text.");

  if (rawText.startsWith("```")) {
    rawText = rawText.replace(/```(json)?/g, "").trim();
  }

  const questions = JSON.parse(rawText);
  return questions;
}

async function run() {
  try {
    console.log("📰 Fetching political headlines...");
    const headlines = await fetchHeadlines();
    console.log("✔ Got headlines:\n", headlines);

    console.log("🤖 Sending to Gemini...");
    const quizQuestions = await generateQuizFromHeadlines(headlines);
    console.log("✔ Got questions, saving to quizzes.json...");

    fs.writeFileSync("quizzes.json", JSON.stringify(quizQuestions, null, 2));
    console.log("✅ Done! Quizzes saved to quizzes.json");
  } catch (err) {
    console.error("❌ Failed:", err.message);
  }
}

run();
