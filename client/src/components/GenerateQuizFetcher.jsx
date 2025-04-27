import { useEffect, useState } from "react";

function GenerateQuizFetcher({ onQuizReady }) {
const [error, setError] = useState("");
const NEWS_API_KEY = "9da8361e3c22428b84874ae9c4b3c589";

useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch("http://localhost:3001/cached-quizzes");
        const data = await res.json();
  
        if (!Array.isArray(data)) throw new Error("Quiz file invalid");
  
        const random = data[Math.floor(Math.random() * data.length)];
        onQuizReady(random);
      } catch (err) {
        console.error("❌ Failed to load quiz:", err);
        onQuizReady(null);
      }
    };
  
    fetchQuiz();
  }, []);
  

  return null; // no visual rendering, only logic
}

export default GenerateQuizFetcher;
