const axios = require('axios');
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.LARAVEL_API_BASE,
  headers: { 'Accept': 'application/json' }
});

async function getLatestArticle() {
  const res = await api.get('/articles/latest');
  return res.data.data ?? res.data;
}

async function updateArticle(id, payload) {
  const res = await api.put(`/articles/${id}`, payload);
  return res.data.data ?? res.data;
}

module.exports = { getLatestArticle, updateArticle };
