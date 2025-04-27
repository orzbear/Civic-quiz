const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve the static quiz file
app.get("/cached-quizzes", (req, res) => {
  const quizFile = path.join(__dirname, "quizzes.json");
  if (fs.existsSync(quizFile)) {
    const data = fs.readFileSync(quizFile, "utf-8");
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: "No cached quizzes found" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
