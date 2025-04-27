import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const state = location.state || { score: 0, total: 0 };
  const { score, total } = state;

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">Quiz Result</h2>
      <p className="text-lg mb-4">You scored {score} out of {total}</p>

      <Link
        to="/"
        className="inline-block mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Result;
