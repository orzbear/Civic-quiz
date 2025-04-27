import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to CivicLearn</h1>
      <Link to="/lessons" className="bg-blue-500 text-white px-4 py-2 rounded">
        Start Learning
      </Link>
    </div>
  );
}

export default Home;
