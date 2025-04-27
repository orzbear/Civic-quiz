import { useEffect, useState } from "react";

function Quiz() {
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchCached = async () => {
      try {
        const res = await fetch("http://localhost:3001/cached-quizzes");
        const data = await res.json();
        setQuizList(data);
      } catch (err) {
        console.error("❌ Failed to load cached quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCached();
  }, []);

  if (loading) return <p className="p-4">🧠 Loading questions...</p>;
  if (finished)
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Complete!</h2>
        <p className="text-lg">Your score: {score} / {quizList.length}</p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setSelected(null);
            setFinished(false);
          }}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        >
          🔁 Restart Quiz
        </button>
      </div>
    );

  const current = quizList[currentIndex];
  const isCorrect = selected === current.answer;

  const handleSelect = (i) => {
    if (selected !== null) return; // prevent re-answer
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
      <h2 className="text-xl font-bold mb-4">Question {currentIndex + 1} of {quizList.length}</h2>
      <p className="text-lg mb-4">{current.question}</p>
      <ul className="space-y-2">
        {current.options.map((opt, i) => (
          <li
            key={i}
            onClick={() => handleSelect(i)}
            className={`p-2 rounded border cursor-pointer
              ${
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
    </div>
  );
}

export default Quiz;


  