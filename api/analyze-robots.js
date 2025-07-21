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
        summary: 'No robots.txt file found. AI crawlers will use default permissions.',
        details: [
          { type: 'warning', message: 'No robots.txt file detected' },
          { type: 'info', message: 'AI crawlers will assume default permissions' },
          { type: 'suggestion', message: 'Consider adding robots.txt for explicit crawler control' }
        ],
        rawContent: ''
      });
    }

    const robotsText = await response.text();
    const lines = robotsText.split('\n').map(line => line.trim());

    const aiCrawlers = ['GPTBot', 'PerplexityBot', 'GoogleBot', 'BingBot'];
    const permissions = {};
    let currentUserAgent = '*';

    for (const line of lines) {
      if (line.toLowerCase().startsWith('user-agent:')) {
        currentUserAgent = line.split(':')[1].trim();
      } else if (line.toLowerCase().startsWith('disallow:')) {
        const path = line.split(':')[1]?.trim() || '';
        if (!permissions[currentUserAgent]) permissions[currentUserAgent] = [];
        permissions[currentUserAgent].push({ type: 'disallow', path });
      } else if (line.toLowerCase().startsWith('allow:')) {
        const path = line.split(':')[1]?.trim() || '';
        if (!permissions[currentUserAgent]) permissions[currentUserAgent] = [];
        permissions[currentUserAgent].push({ type: 'allow', path });
      }
    }

    const details = [];
    let allowedCount = 0;

    for (const crawler of aiCrawlers) {
      const crawlerPermissions = permissions[crawler] || permissions['*'] || [];
      const isBlocked = crawlerPermissions.some(p => p.type === 'disallow' && p.path === '/');

      if (isBlocked) {
        details.push({
          type: 'error',
          message: `${crawler} is blocked from crawling your site`
        });
      } else {
        details.push({
          type: 'success',
          message: `${crawler} is allowed to crawl your site`
        });
        allowedCount++;
      }
    }

    const status = allowedCount > aiCrawlers.length / 2 ? 'mostly_allowed' : 'mostly_blocked';

    return res.status(200).json({
      status,
      summary: `${allowedCount} out of ${aiCrawlers.length} major AI crawlers are allowed to access your site.`,
      details,
      rawContent: robotsText
    });
  } catch (error) {
    console.error('Error in analyze-robots API:', error);
    return res.status(500).json({
      status: 'error',
      summary: 'Unable to analyze robots.txt file.',
      details: [
        { type: 'error', message: 'Failed to fetch or parse robots.txt' },
        { type: 'info', message: 'Analysis will continue with default assumptions' },
        { type: 'suggestion', message: 'Ensure robots.txt is accessible and properly formatted' }
      ],
      rawContent: ''
    });
  }
}
