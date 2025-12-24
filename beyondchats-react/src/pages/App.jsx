import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api';
import { Link } from 'react-router-dom';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>BeyondChats Articles</h1>
        <p>Original and AI-updated versions.</p>
      </header>

      <div className="grid">
        {articles.map(article => (
          <article key={article.id} className="card">
            <h2>{article.title}</h2>
            <p className="meta">
              Source: <a href={article.source_url} target="_blank" rel="noreferrer">View</a>
            </p>
            <Link to={`/articles/${article.id}`} className="btn">
              View article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
