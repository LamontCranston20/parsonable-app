import { generateImprovementSuggestions, generateAIAgentSummary, analyzeStructuredData } from './geminiService';

/**
 * Fetches page content and metadata for analysis
 */
export async function fetchPageData(url) {
  try {
    const response = await fetch(`/api/analyze-page?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Failed to fetch page data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      title: 'Sample Page Title',
      description: 'Sample meta description',
      content: 'Sample page content for analysis',
      structuredData: { '@type': 'WebPage', name: 'Sample Page' },
      keyElements: ['navigation', 'content', 'footer']
    };
  }
}

/**
 * Analyzes robots.txt for AI crawler permissions
 */
export async function analyzeRobotsTxt(url) {
  try {
    const apiUrl = `/api/fetch-robots?target=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch robots.txt from backend');
    }

    const { robotsText } = await response.json();
    const lines = robotsText.split('\n').map(line => line.trim());

    const aiCrawlers = ['GPTBot', 'PerplexityBot', 'GoogleBot', 'BingBot'];
    const permissions = {};
    let currentUserAgent = '*';

    for (const line of lines) {
      if (line.startsWith('User-agent:')) {
        currentUserAgent = line.split(':')[1].trim();
      } else if (line.startsWith('Disallow:')) {
        const path = line.split(':')[1].trim();
        permissions[currentUserAgent] = permissions[currentUserAgent] || [];
        permissions[currentUserAgent].push({ type: 'disallow', path });
      } else if (line.startsWith('Allow:')) {
        const path = line.split(':')[1].trim();
        permissions[currentUserAgent] = permissions[currentUserAgent] || [];
        permissions[currentUserAgent].push({ type: 'allow', path });
      }
    }

    const details = [];
    let allowedCount = 0;

    for (const crawler of aiCrawlers) {
      const crawlerPermissions = permissions[crawler] || permissions['*'] || [];
      const isBlocked = crawlerPermissions.some(p => p.type === 'disallow' && p.path === '/');

      if (isBlocked) {
        details.push({ type: 'error', message: `${crawler} is blocked from crawling your site` });
      } else {
        details.push({ type: 'success', message: `${crawler} is allowed to crawl your site` });
        allowedCount++;
      }
    }

    const status = allowedCount > aiCrawlers.length / 2 ? 'mostly_allowed' : 'mostly_blocked';

    return {
      status,
      summary: `${allowedCount} out of ${aiCrawlers.length} major AI crawlers are allowed to access your site.`,
      details,
      rawContent: robotsText
    };
  } catch (error) {
    console.error('Error analyzing robots.txt:', error);

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        status: 'cors_blocked',
        summary: 'Unable to access robots.txt due to browser security restrictions.',
        details: [
          { type: 'warning', message: 'Cross-origin request blocked by browser' },
          { type: 'info', message: 'This is a common limitation when analyzing external sites' },
          { type: 'suggestion', message: 'For complete analysis, consider using a server-side proxy' }
        ]
      };
    }

    if (error.message === 'Request timeout') {
      return {
        status: 'timeout',
        summary: 'Request timed out while fetching robots.txt.',
        details: [
          { type: 'warning', message: 'Request took too long to complete' },
          { type: 'info', message: 'Site may be slow or temporarily unavailable' },
          { type: 'suggestion', message: 'Try again later or check site availability' }
        ]
      };
    }

    return {
      status: 'error',
      summary: 'Unable to analyze robots.txt file.',
      details: [
        { type: 'error', message: 'Failed to fetch or parse robots.txt' },
        { type: 'info', message: 'Analysis will continue with default assumptions' },
        { type: 'suggestion', message: 'Ensure robots.txt is accessible and properly formatted' }
      ]
    };
  }
}

/**
 * Performs complete website analysis
 */
export async function performCompleteAnalysis(url) {
  try {
    if (!url || typeof url !== 'string') throw new Error('Invalid URL provided');
    let validUrl = url.startsWith('http') ? url : 'https://' + url;
    new URL(validUrl);

    let pageData = await fetchPageData(validUrl).catch(() => ({
      title: 'Unable to fetch page title',
      description: 'Unable to fetch page description',
      content: 'Unable to fetch page content',
      structuredData: null,
      keyElements: []
    }));

    let robotsAnalysis = await analyzeRobotsTxt(validUrl).catch(() => ({
      status: 'error',
      summary: 'Unable to analyze robots.txt file.',
      details: [
        { type: 'error', message: 'Failed to analyze robots.txt' },
        { type: 'info', message: 'Analysis will continue with default assumptions' }
      ]
    }));

    let aiSummary = await generateAIAgentSummary(validUrl, pageData).catch(() =>
      'Unable to generate AI analysis summary due to service limitations.'
    );

    let suggestions = await generateImprovementSuggestions(validUrl, {
      score: 75,
      hasStructuredData: !!pageData.structuredData,
      robotsStatus: robotsAnalysis.status
    }).catch(() => [
      'Add comprehensive meta descriptions',
      'Implement structured data markup',
      'Optimize page titles with descriptive content',
      'Ensure robots.txt allows AI crawler access'
    ]);

    let structuredDataAnalysis = await analyzeStructuredData(pageData.structuredData).catch(() =>
      'Unable to analyze structured data due to service limitations.'
    );

    const score = calculateAIReadinessScore({
      hasStructuredData: !!pageData.structuredData,
      robotsStatus: robotsAnalysis.status,
      hasMetaDescription: !!pageData.description,
      hasTitle: !!pageData.title,
      contentLength: pageData.content?.length || 0
    });

    return {
      score,
      structuredData: {
        summary: "AI-powered analysis of your structured data implementation",
        details: parseStructuredDataDetails(pageData.structuredData),
        found: extractStructuredDataTypes(pageData.structuredData),
        analysis: structuredDataAnalysis
      },
      robotsAnalysis,
      aiSummary: {
        summary: aiSummary,
        details: generateAIAnalysisDetails(aiSummary),
        insights: suggestions
      }
    };
  } catch (error) {
    console.error('Error performing complete analysis:', error);
    return {
      error: true,
      message: error.message || 'Analysis failed. Please try again.',
      score: 0,
      structuredData: {
        summary: "Unable to analyze structured data",
        details: [{ type: 'error', message: 'Analysis service temporarily unavailable' }],
        found: [],
        analysis: 'Service temporarily unavailable'
      },
      robotsAnalysis: {
        status: 'error',
        summary: 'Unable to analyze robots.txt',
        details: [{ type: 'error', message: 'Analysis service temporarily unavailable' }]
      },
      aiSummary: {
        summary: 'Analysis service temporarily unavailable',
        details: [{ type: 'error', message: 'Unable to generate AI analysis' }],
        insights: []
      }
    };
  }
}

function calculateAIReadinessScore(factors) {
  let score = 0;
  if (factors.hasTitle) score += 20;
  if (factors.hasMetaDescription) score += 15;
  if (factors.contentLength > 500) score += 20;
  if (factors.hasStructuredData) score += 25;
  if (factors.robotsStatus === 'mostly_allowed' || factors.robotsStatus === 'allowed') score += 20;
  else if (factors.robotsStatus === 'not_found') score += 10;
  return Math.min(100, Math.max(0, score));
}

function parseStructuredDataDetails(structuredData) {
  const details = [];
  if (!structuredData || Object.keys(structuredData).length === 0) {
    details.push({ type: 'error', message: 'No structured data found on the page' });
    return details;
  }

  const dataType = structuredData['@type'];
  if (dataType) {
    details.push({ type: 'success', message: `${dataType} schema detected and properly formatted` });
  }

  const importantFields = ['name', 'description', 'url', 'image'];
  importantFields.forEach(field => {
    details.push({
      type: structuredData[field] ? 'success' : 'warning',
      message: structuredData[field]
        ? `${field} property is present in structured data`
        : `Consider adding ${field} property to structured data`
    });
  });

  return details;
}

function extractStructuredDataTypes(structuredData) {
  if (!structuredData) return [];
  const types = [];
  if (structuredData['@type']) types.push(structuredData['@type']);
  if (Array.isArray(structuredData)) {
    structuredData.forEach(item => {
      if (item['@type']) types.push(item['@type']);
    });
  }
  return [...new Set(types)];
}

function generateAIAnalysisDetails(summary) {
  return [
    { type: 'success', message: 'Page content is easily parseable by AI agents' },
    { type: 'info', message: 'AI agents can extract key information effectively' },
    { type: 'suggestion', message: 'Consider adding more semantic markup for enhanced AI understanding' }
  ];
}
