import { Link } from "react-router-dom";

function Lessons() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Choose a Lesson</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/quiz" className="text-blue-500 underline">
            Voting Systems
          </Link>
        </li>
        <li>
          <Link to="/quiz" className="text-blue-500 underline">
            Separation of Powers
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Lessons;

  
