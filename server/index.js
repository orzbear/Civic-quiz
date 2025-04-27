require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generateQuizBatch = require("./generateQuizBatch");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/todays-quiz", async (req, res) => {
  const quizPath = path.join(__dirname, "quizzes.json");
  const today = new Date().toISOString().slice(0, 10);

  try {
    if (fs.existsSync(quizPath)) {
      const data = JSON.parse(fs.readFileSync(quizPath, "utf8"));
      if (data.date === today) {
        console.log("📦 Returning cached quiz for today");
        return res.json(data.questions);
      }
    }

    console.log("🔁 Generating fresh quiz...");
    const questions = await generateQuizBatch(); // this already has the API key
    res.json(questions);
  } catch (err) {
    console.error("❌ Error generating quiz:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
