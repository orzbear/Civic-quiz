import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Lessons from "./pages/Lessons.jsx";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";
import NewsLoader from "./components/NewsLoader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;


