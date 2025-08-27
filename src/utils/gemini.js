import { GoogleGenerativeAI } from "@google/generative-ai";

// Get the API key from environment variables
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key not set! Check your .env file");
}

// Initialize the GoogleGenerativeAI client with your API key
const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;
