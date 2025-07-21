// /api/analyze-robots.js

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const robotsUrl = new URL('/robots.txt', url).toString();
    const response = await fetch(robotsUrl);

    if (!response.ok) {
      return res.status(200).json({
        status: 'not_found',
        summary: 'No robots.txt found.',
        rawContent: '',
      });
    }

    const robotsText = await response.text();
    return res.status(200).json({
      status: 'fetched',
      summary: 'robots.txt successfully retrieved',
      rawContent: robotsText,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch robots.txt',
    });
  }
}
