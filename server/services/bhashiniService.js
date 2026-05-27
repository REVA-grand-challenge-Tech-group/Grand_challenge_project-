// server/services/bhashiniService.js
const { GoogleGenAI } = require("@google/generative-ai");

// Initialize Gemini with the key from your process environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Translates English application text into any regional Indian language using Gemini.
 * @param {string} text - The input English text string.
 * @param {string} targetLanguage - The language to translate to (e.g., 'Kannada', 'Hindi').
 */
const translateText = async (text, targetLanguage) => {
  try {
    // If the user selected English, bypass the AI call entirely to save performance
    if (!targetLanguage || targetLanguage.toLowerCase() === 'en' || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    // Using the gemini-2.5-flash model for ultra-low latency translations
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are the specialized translation engine for KrishiSetu, an Indian agricultural platform.
      Translate the following English text or UI label directly into this language: "${targetLanguage}".
      
      Strict Rules:
      1. Return ONLY the translated string. Do not include any explanations, introduction, markdown, or punctuation marks.
      2. Keep it natural, clear, and easily understandable for farmers and rural field labourers.
      3. Use common regional farming terms where applicable (e.g., use "Mandi" for market, "Kisan" for farmer, "Mazdoor" for worker).

      Text to translate: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error(`❌ Gemini Translation Error: ${error.message}`);
    // Fallback safety: return original text if the API hits a limit or fails
    return text;
  }
};

module.exports = {
  translateText
};