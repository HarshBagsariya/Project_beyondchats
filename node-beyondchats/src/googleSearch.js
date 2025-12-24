const axios = require('axios');
require('dotenv').config();

async function searchBlogs(query) {
  const url = 'https://www.googleapis.com/customsearch/v1';
  const params = {
    key: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_CX,
    q: query,
  };

  const { data } = await axios.get(url, { params });

  const firstTwo = (data.items || [])
    .filter(item =>
      item.link &&
      (item.mime === undefined || item.mime === 'text/html')
    )
    .slice(0, 2)
    .map(item => ({ title: item.title, link: item.link }));

  return firstTwo;
}

module.exports = { searchBlogs };
