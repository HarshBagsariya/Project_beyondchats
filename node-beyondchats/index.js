const { getLatestArticle, updateArticle } = require('./src/api');
const { searchBlogs } = require('./src/googleSearch');
const { scrapeArticle } = require('./src/scraper');
const { rewriteArticle } = require('./src/llm');

(async () => {
  try {
    // 1. Fetch latest article from Laravel
    const latest = await getLatestArticle();
    console.log('Latest article:', latest.title);

    // 2. Google search by article title
    const results = await searchBlogs(latest.title);
    if (results.length < 2) {
      throw new Error('Less than 2 reference articles found');
    }

    console.log('Reference URLs:', results.map(r => r.link));

    // 3. Scrape content from first two results
    const [ref1, ref2] = await Promise.all([
      scrapeArticle(results[0].link),
      scrapeArticle(results[1].link),
    ]);

    // 4. Call LLM to rewrite original article
    const updatedContent = await rewriteArticle({
      original: latest.content,
      ref1,
      ref2,
      title: latest.title,
      refUrls: results.map(r => r.link),
    });

    // 5. Publish updated article back via Laravel API
    const saved = await updateArticle(latest.id, {
      updated_content: updatedContent,
    });

    console.log('Article updated. ID:', saved.id);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
