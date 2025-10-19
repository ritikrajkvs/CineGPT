// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load your API key from environment variables (REACT_APP_GEMINI_API_KEY)
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Gemini API key missing. Add REACT_APP_GEMINI_API_KEY in your .env file.");
}

// Initialize the Gemini SDK
export const genAI = new GoogleGenerativeAI(apiKey);
