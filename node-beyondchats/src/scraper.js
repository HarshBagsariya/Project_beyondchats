const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeArticle(url) {
  const { data: html } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const $ = cheerio.load(html);

  // Generic heuristic: join all <p> within article-like selectors
  const selectors = [
    'article',
    '.post-content',
    '.entry-content',
    '.article-content',
    '.blog-post'
  ];

  let text = '';

  for (const sel of selectors) {
    const node = $(sel);
    if (node.length) {
      text = node.find('p').map((i, el) => $(el).text()).get().join('\n\n');
      if (text.trim().length > 300) break;
    }
  }

  if (!text) {
    text = $('p').slice(0, 10).map((i, el) => $(el).text()).get().join('\n\n');
  }

  return text.trim();
}

module.exports = { scrapeArticle };
