import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initializes the Gemini client with the API key from environment variables.
 * @returns {GoogleGenerativeAI|null} Configured Gemini client instance or null if not available.
 */
let genAI = null;

try {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey && apiKey.trim() !== '') {
    genAI = new GoogleGenerativeAI(apiKey);
  } else {
    console.warn('Gemini API key not found. Analysis will use fallback data.');
  }
} catch (error) {
  console.error('Error initializing Gemini client:', error);
  genAI = null;
}

export default genAI;