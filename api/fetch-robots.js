export default async function handler(req, res) {
  const targetUrl = req.query.target;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL' });
  }

  try {
    const robotsUrl = new URL('/robots.txt', targetUrl).toString();
    const response = await fetch(robotsUrl);

    if (!response.ok) {
      return res.status(404).json({ error: 'robots.txt not found' });
    }

    const text = await response.text();
    res.status(200).json({ robotsText: text });
  } catch (err) {
    console.error('Error fetching robots.txt:', err);
    res.status(500).json({ error: 'Failed to fetch robots.txt' });
  }
}
