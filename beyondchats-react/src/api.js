import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export async function fetchArticles(page = 1) {
  const res = await api.get('/articles', { params: { page } });
  return res.data.data ?? res.data;
}

export async function fetchArticle(id) {
  const res = await api.get(`/articles/${id}`);
  return res.data.data ?? res.data;
}
