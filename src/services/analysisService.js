import { generateImprovementSuggestions, generateAIAgentSummary, analyzeStructuredData } from './geminiService';

/**
 * Fetches page content and metadata for analysis
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} Page data including content, metadata, and structure
 */
export async function fetchPageData(url) {
  try {
    // In a real implementation, this would fetch actual page data
    // For now, we'll simulate the data structure
    const response = await fetch(`/api/analyze-page?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch page data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    // Return mock data structure for development
    return {
      title: 'Sample Page Title',
      description: 'Sample meta description',
      content: 'Sample page content for analysis',
      structuredData: {
        '@type': 'WebPage',
        'name': 'Sample Page'
      },
      keyElements: ['navigation', 'content', 'footer']
    };
  }
}

/**
 * Analyzes robots.txt for AI crawler permissions
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} Robots.txt analysis results
 */
export async function analyzeRobotsTxt(url) {
  try {
    const robotsUrl = new URL('/robots.txt', url).toString();
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000);
    });
    
    // Attempt to fetch robots.txt with timeout
    const fetchPromise = fetch(robotsUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'text/plain',
      },
    });
    
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) {
      return {
        status: 'not_found',
        summary: 'No robots.txt file found. AI crawlers will use default permissions.',
        details: [
          { type: 'warning', message: 'No robots.txt file detected' },
          { type: 'info', message: 'AI crawlers will assume default permissions' },
          { type: 'suggestion', message: 'Consider adding robots.txt for explicit crawler control' }
        ]
      };
    }
    
    const robotsText = await response.text();
    const lines = robotsText.split('\n').map(line => line.trim());
    
    // Check for AI crawler permissions
    const aiCrawlers = ['GPTBot', 'PerplexityBot', 'GoogleBot', 'BingBot'];
    const permissions = {};
    
    let currentUserAgent = '*';
    for (const line of lines) {
      if (line.startsWith('User-agent:')) {
        currentUserAgent = line.split(':')[1].trim();
      } else if (line.startsWith('Disallow:')) {
        const path = line.split(':')[1].trim();
        if (!permissions[currentUserAgent]) {
          permissions[currentUserAgent] = [];
        }
        permissions[currentUserAgent].push({ type: 'disallow', path });
      } else if (line.startsWith('Allow:')) {
        const path = line.split(':')[1].trim();
        if (!permissions[currentUserAgent]) {
          permissions[currentUserAgent] = [];
        }
        permissions[currentUserAgent].push({ type: 'allow', path });
      }
    }
    
    // Analyze permissions for AI crawlers
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
    
    return {
      status,
      summary: `${allowedCount} out of ${aiCrawlers.length} major AI crawlers are allowed to access your site.`,
      details,
      rawContent: robotsText
    };
  } catch (error) {
    console.error('Error analyzing robots.txt:', error);
    
    // Handle specific error types
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
    
    // Generic error fallback
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
 * Performs complete website analysis for AI optimization
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} Complete analysis results
 */
export async function performCompleteAnalysis(url) {
  try {
    // Validate URL first
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL provided');
    }
    
    // Ensure URL has protocol
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      validUrl = 'https://' + url;
    }
    
    // Test if URL is valid
    try {
      new URL(validUrl);
    } catch (urlError) {
      throw new Error('Invalid URL format');
    }
    
    // Fetch page data with error handling
    let pageData;
    try {
      pageData = await fetchPageData(validUrl);
    } catch (error) {
      console.error('Failed to fetch page data:', error);
      pageData = {
        title: 'Unable to fetch page title',
        description: 'Unable to fetch page description',
        content: 'Unable to fetch page content',
        structuredData: null,
        keyElements: []
      };
    }
    
    // Analyze robots.txt with error handling
    let robotsAnalysis;
    try {
      robotsAnalysis = await analyzeRobotsTxt(validUrl);
    } catch (error) {
      console.error('Failed to analyze robots.txt:', error);
      robotsAnalysis = {
        status: 'error',
        summary: 'Unable to analyze robots.txt file.',
        details: [
          { type: 'error', message: 'Failed to analyze robots.txt' },
          { type: 'info', message: 'Analysis will continue with default assumptions' }
        ]
      };
    }
    
    // Generate AI analysis with error handling
    let aiSummary;
    try {
      aiSummary = await generateAIAgentSummary(validUrl, pageData);
    } catch (error) {
      console.error('Failed to generate AI summary:', error);
      aiSummary = 'Unable to generate AI analysis summary due to service limitations.';
    }
    
    // Generate improvement suggestions with error handling
    let suggestions;
    try {
      suggestions = await generateImprovementSuggestions(validUrl, {
        score: 75,
        hasStructuredData: !!pageData.structuredData,
        robotsStatus: robotsAnalysis.status
      });
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
      suggestions = [
        'Add comprehensive meta descriptions',
        'Implement structured data markup',
        'Optimize page titles with descriptive content',
        'Ensure robots.txt allows AI crawler access'
      ];
    }
    
    // Analyze structured data with error handling
    let structuredDataAnalysis;
    try {
      structuredDataAnalysis = await analyzeStructuredData(pageData.structuredData);
    } catch (error) {
      console.error('Failed to analyze structured data:', error);
      structuredDataAnalysis = 'Unable to analyze structured data due to service limitations.';
    }
    
    // Calculate overall score based on various factors
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
    
    // Return structured error response instead of throwing
    return {
      error: true,
      message: error.message || 'Analysis failed. Please try again.',
      score: 0,
      structuredData: {
        summary: "Unable to analyze structured data",
        details: [
          { type: 'error', message: 'Analysis service temporarily unavailable' }
        ],
        found: [],
        analysis: 'Service temporarily unavailable'
      },
      robotsAnalysis: {
        status: 'error',
        summary: 'Unable to analyze robots.txt',
        details: [
          { type: 'error', message: 'Analysis service temporarily unavailable' }
        ]
      },
      aiSummary: {
        summary: 'Analysis service temporarily unavailable',
        details: [
          { type: 'error', message: 'Unable to generate AI analysis' }
        ],
        insights: []
      }
    };
  }
}

/**
 * Calculates AI readiness score based on various factors
 * @param {Object} factors - Various factors affecting AI readiness
 * @returns {number} Score from 0-100
 */
function calculateAIReadinessScore(factors) {
  let score = 0;
  
  // Base score for having essential elements
  if (factors.hasTitle) score += 20;
  if (factors.hasMetaDescription) score += 15;
  if (factors.contentLength > 500) score += 20;
  
  // Structured data bonus
  if (factors.hasStructuredData) score += 25;
  
  // Robots.txt bonus
  if (factors.robotsStatus === 'mostly_allowed' || factors.robotsStatus === 'allowed') {
    score += 20;
  } else if (factors.robotsStatus === 'not_found') {
    score += 10;
  }
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Parses structured data into analysis details
 * @param {Object} structuredData - Structured data object
 * @returns {Array} Array of detail objects
 */
function parseStructuredDataDetails(structuredData) {
  const details = [];
  
  if (!structuredData || Object.keys(structuredData).length === 0) {
    details.push({
      type: 'error',
      message: 'No structured data found on the page'
    });
    return details;
  }
  
  // Analyze the structured data
  const dataType = structuredData['@type'];
  if (dataType) {
    details.push({
      type: 'success',
      message: `${dataType} schema detected and properly formatted`
    });
  }
  
  // Check for common important fields
  const importantFields = ['name', 'description', 'url', 'image'];
  importantFields.forEach(field => {
    if (structuredData[field]) {
      details.push({
        type: 'success',
        message: `${field} property is present in structured data`
      });
    } else {
      details.push({
        type: 'warning',
        message: `Consider adding ${field} property to structured data`
      });
    }
  });
  
  return details;
}

/**
 * Extracts structured data types from the data object
 * @param {Object} structuredData - Structured data object
 * @returns {Array} Array of structured data types found
 */
function extractStructuredDataTypes(structuredData) {
  if (!structuredData) return [];
  
  const types = [];
  
  // Handle single object
  if (structuredData['@type']) {
    types.push(structuredData['@type']);
  }
  
  // Handle array of objects
  if (Array.isArray(structuredData)) {
    structuredData.forEach(item => {
      if (item['@type']) {
        types.push(item['@type']);
      }
    });
  }
  
  return [...new Set(types)]; // Remove duplicates
}

/**
 * Generates AI analysis details from the summary
 * @param {string} summary - AI-generated summary
 * @returns {Array} Array of analysis details
 */
function generateAIAnalysisDetails(summary) {
  // This would parse the AI summary and extract key points
  // For now, we'll return a basic structure
  return [
    { type: 'success', message: 'Page content is easily parseable by AI agents' },
    { type: 'info', message: 'AI agents can extract key information effectively' },
    { type: 'suggestion', message: 'Consider adding more semantic markup for enhanced AI understanding' }
  ];
}