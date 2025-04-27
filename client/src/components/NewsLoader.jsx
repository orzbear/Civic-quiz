import { useEffect, useState } from "react";

function NewsLoader() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "9da8361e3c22428b84874ae9c4b3c589"; 

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=civic%20education&language=en&pageSize=5&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("News fetch failed:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading civic news...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Civic News Feed</h2>
      <ul className="space-y-4">
        {articles.map((a, i) => (
          <li key={i} className="border p-3 rounded shadow">
            <a href={a.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {a.title}
            </a>
            <p className="text-sm text-gray-700">{a.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsLoader;
