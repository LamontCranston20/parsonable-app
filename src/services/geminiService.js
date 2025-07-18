import genAI from './geminiClient';

/**
 * Generates fallback analysis when Gemini API is not available
 * @param {string} url - The URL being analyzed
 * @param {Object} pageData - Page data
 * @returns {string} Fallback analysis summary
 */
function generateFallbackAnalysis(url, pageData = {}) {
  const domain = new URL(url).hostname;
  const hasTitle = !!pageData.title;
  const hasDescription = !!pageData.description;
  const hasStructuredData = !!pageData.structuredData;
  
  return `This webpage from ${domain} appears to be ${hasTitle ? 'well-structured with a clear title' : 'missing a proper title'} and ${hasDescription ? 'includes a meta description' : 'lacks a meta description'}. ${hasStructuredData ? 'The page implements structured data which helps AI agents understand the content better.' : 'The page would benefit from structured data implementation to improve AI agent understanding.'} The content appears to be ${pageData.content && pageData.content.length > 500 ? 'comprehensive' : 'moderate'} in scope. AI agents would be able to extract key information from this page, though optimization opportunities exist to improve discoverability and understanding.`;
}

/**
 * Generates fallback improvement suggestions
 * @param {string} url - The URL being analyzed
 * @param {Object} analysisData - Analysis data
 * @returns {Array} Array of improvement suggestions
 */
function generateFallbackSuggestions(url, analysisData = {}) {
  const suggestions = [
    'Add comprehensive meta descriptions to improve AI agent summaries',
    'Implement structured data markup using schema.org vocabulary',
    'Optimize page titles with descriptive, keyword-rich content',
    'Ensure robots.txt allows AI crawler access to important content',
    'Add FAQ schema to improve question-answering capabilities',
    'Include breadcrumb navigation with structured data',
    'Optimize heading structure (H1, H2, H3) for better content hierarchy'
  ];
  
  // Filter suggestions based on current analysis
  const filteredSuggestions = [];
  
  if (!analysisData.hasStructuredData) {
    filteredSuggestions.push(suggestions[1], suggestions[4], suggestions[5]);
  }
  
  if (analysisData.robotsStatus === 'mostly_blocked') {
    filteredSuggestions.push(suggestions[3]);
  }
  
  // Always include these general suggestions
  filteredSuggestions.push(suggestions[0], suggestions[2], suggestions[6]);
  
  return [...new Set(filteredSuggestions)].slice(0, 7);
}

/**
 * Generates fallback structured data analysis
 * @param {Object} structuredData - Structured data
 * @returns {string} Analysis summary
 */
function generateFallbackStructuredDataAnalysis(structuredData = {}) {
  if (!structuredData || Object.keys(structuredData).length === 0) {
    return 'No structured data detected on this page. Implementing basic schema.org markup would significantly improve AI agent understanding. Consider adding WebPage, Organization, or Article schema depending on your content type. Priority recommendations include adding JSON-LD structured data for better parsing by AI agents.';
  }
  
  const dataType = structuredData['@type'] || 'Unknown';
  return `Current structured data implementation includes ${dataType} schema, which provides a good foundation for AI understanding. The existing markup helps AI agents identify key page elements and context. Consider expanding the schema with additional properties like description, image, and relevant business information. Adding FAQ or HowTo schema could further enhance AI agent comprehension and improve question-answering capabilities.`;
}

/**
 * Generates a comprehensive analysis of a webpage for AI agent optimization
 * @param {string} url - The URL to analyze
 * @param {Object} pageData - Page data including title, description, structured data, etc.
 * @returns {Promise<string>} The generated AI analysis summary
 */
export async function generatePageAnalysis(url, pageData = {}) {
  try {
    if (!genAI) {
      return generateFallbackAnalysis(url, pageData);
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Analyze the following webpage for AI agent optimization and provide a comprehensive summary:
      
      URL: ${url}
      Page Title: ${pageData.title || 'Not provided'}
      Meta Description: ${pageData.description || 'Not provided'}
      Structured Data Found: ${pageData.structuredData ? JSON.stringify(pageData.structuredData) : 'None detected'}
      Content Preview: ${pageData.content || 'Not provided'}
      
      Please provide a detailed analysis covering:
      1. How well this page would be understood by AI agents like ChatGPT, Perplexity, and Gemini
      2. Content structure and readability for AI
      3. Key information that AI agents would extract
      4. Missing elements that would improve AI understanding
      5. Overall AI-readiness assessment
      
      Keep the response informative but concise, focusing on actionable insights.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating page analysis:', error);
    return generateFallbackAnalysis(url, pageData);
  }
}

/**
 * Generates suggestions for improving AI agent visibility
 * @param {string} url - The URL being analyzed
 * @param {Object} analysisData - Current analysis data
 * @returns {Promise<Array>} Array of improvement suggestions
 */
export async function generateImprovementSuggestions(url, analysisData = {}) {
  try {
    if (!genAI) {
      return generateFallbackSuggestions(url, analysisData);
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Based on the following website analysis, provide specific, actionable suggestions to improve AI agent visibility:
      
      URL: ${url}
      Current Score: ${analysisData.score || 'Not provided'}
      Structured Data: ${analysisData.hasStructuredData ? 'Present' : 'Missing'}
      Robots.txt Status: ${analysisData.robotsStatus || 'Unknown'}
      
      Please provide 5-7 specific, actionable recommendations that would help this website:
      1. Be better understood by AI agents
      2. Improve structured data implementation
      3. Enhance content for AI parsing
      4. Optimize for AI crawler access
      5. Increase overall AI readiness score
      
      Format each suggestion as a clear, actionable item without numbering.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split suggestions into array and clean up
    const suggestions = text
      .split('\n')
      .filter(line => line.trim() && !line.match(/^\d+\./) && line.length > 20)
      .map(suggestion => suggestion.trim().replace(/^[-•*]\s*/, ''));
    
    return suggestions.slice(0, 7); // Limit to 7 suggestions
  } catch (error) {
    console.error('Error generating improvement suggestions:', error);
    return generateFallbackSuggestions(url, analysisData);
  }
}

/**
 * Generates a summary of how AI agents would interpret and describe the page
 * @param {string} url - The URL being analyzed
 * @param {Object} pageContent - Page content data
 * @returns {Promise<string>} AI agent interpretation summary
 */
export async function generateAIAgentSummary(url, pageContent = {}) {
  try {
    if (!genAI) {
      return generateFallbackAnalysis(url, pageContent);
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Act as an AI agent (like ChatGPT, Perplexity, or Gemini) and describe how you would interpret and summarize this webpage:
      
      URL: ${url}
      Page Title: ${pageContent.title || 'Not provided'}
      Meta Description: ${pageContent.description || 'Not provided'}
      Main Content: ${pageContent.content || 'Not provided'}
      Key Elements: ${pageContent.keyElements || 'Not provided'}
      
      Provide a natural, conversational summary that shows exactly how an AI agent would describe this page to a user who asked about it. Focus on:
      1. What the page is about
      2. Key information available
      3. Main purpose or value proposition
      4. Important details or features
      
      Write as if you're directly answering a user's question about this website.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI agent summary:', error);
    return generateFallbackAnalysis(url, pageContent);
  }
}

/**
 * Analyzes structured data and provides insights
 * @param {Object} structuredData - Structured data found on the page
 * @returns {Promise<Object>} Analysis of structured data
 */
export async function analyzeStructuredData(structuredData = {}) {
  try {
    if (!genAI) {
      return generateFallbackStructuredDataAnalysis(structuredData);
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Analyze the following structured data and provide insights for AI optimization:
      
      Structured Data Found: ${JSON.stringify(structuredData, null, 2)}
      
      Please provide:
      1. Assessment of current structured data quality
      2. Missing structured data types that would improve AI understanding
      3. Specific recommendations for implementation
      4. Priority level for each recommendation
      
      Focus on schema.org types that are most valuable for AI agents.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing structured data:', error);
    return generateFallbackStructuredDataAnalysis(structuredData);
  }
}