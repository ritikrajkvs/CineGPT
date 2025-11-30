// src/utils/gemini.js
import { GoogleGenAI } from "@google/genai";

// Load API key from environment variables
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Gemini API key missing. Add REACT_APP_GEMINI_API_KEY in your .env file.");
}

// Create a reusable Gemini client instance
// The new SDK uses 'GoogleGenAI' class, not 'Client'
export const client = new GoogleGenAI({
  apiKey: apiKey,
});
