import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticle } from '../api';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(id).then(setArticle);
  }, [id]);

  if (!article) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <Link to="/" className="back">&larr; Back</Link>
      <h1>{article.title}</h1>

      <div className="columns">
        <section>
          <h2>Original</h2>
          <div
            className="article"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>

        <section>
          <h2>Updated</h2>
          {article.updated_content ? (
            <div
              className="article"
              dangerouslySetInnerHTML={{ __html: article.updated_content }}
            />
          ) : (
            <p>No updated version yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
