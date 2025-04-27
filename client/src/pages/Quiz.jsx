import { useState } from "react";

function Quiz() {
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const getTodaysQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/todays-quiz");
      const data = await res.json();
      setQuizList(data);
      setCurrentIndex(0);
      setScore(0);
      setSelected(null);
      setFinished(false);
    } catch (err) {
      console.error("❌ Failed to fetch quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  const current = quizList[currentIndex];
  const isCorrect = selected === current?.answer;

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.answer) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= quizList.length) {
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Civic Quiz</h1>

      {quizList.length === 0 && !loading && (
        <button
          onClick={getTodaysQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🗳️ Get Today's Quiz
        </button>
      )}

      {loading && <p className="text-gray-500">Loading quiz questions...</p>}

      {finished && (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold">🎉 Quiz Complete!</h2>
          <p className="mt-2">Your score: {score} / {quizList.length}</p>
        </div>
      )}

      {current && !finished && (
        <>
          <p className="text-lg mb-4">Question {currentIndex + 1}: {current.question}</p>
          <ul className="space-y-2">
            {current.options.map((opt, i) => (
              <li
                key={i}
                onClick={() => handleSelect(i)}
                className={`p-2 rounded border cursor-pointer transition ${
                  selected === null
                    ? "bg-gray-100"
                    : i === current.answer
                    ? "bg-green-300"
                    : selected === i
                    ? "bg-red-300"
                    : "bg-gray-100"
                }`}
              >
                {i + 1}. {opt}
              </li>
            ))}
          </ul>

          {selected !== null && (
            <button
              onClick={handleNext}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
