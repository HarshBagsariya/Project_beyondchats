import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/articles/:id" element={<ArticlePage />} />
    </Routes>
  </BrowserRouter>
);
