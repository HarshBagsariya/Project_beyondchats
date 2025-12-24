const OpenAI = require('openai');
require('dotenv').config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function rewriteArticle({ original, ref1, ref2, title, refUrls }) {
  const prompt = `
You are rewriting a blog post.

Original title: "${title}"

Original article:
"""${original}"""

Reference article 1:
"""${ref1}"""

Reference article 2:
"""${ref2}"""

Task:
- Rewrite the original article to be higher quality and better structured.
- Use headings, short paragraphs, and bullet points where useful.
- Do not copy exact sentences from the references.
- Maintain the same topic and intent.
- At the end, add a section "References" listing:
${refUrls.join('\n')}.
`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  return content.trim();
}

module.exports = { rewriteArticle };
