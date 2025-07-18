import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const structuredData = $('script[type="application/ld+json"]').html();

    res.status(200).json({
      title,
      description,
      content: $('body').text().slice(0, 1000),
      structuredData: structuredData ? JSON.parse(structuredData) : null,
      keyElements: ['navigation', 'content', 'footer']
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or parse URL' });
  }
}
