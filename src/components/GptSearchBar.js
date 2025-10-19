// src/components/GptSearchBar.js
import React, { useState } from "react";
import { genAI } from "../utils/gemini";

const GptSearchBar = ({ setMovieResults }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setError("");
    setLoading(true);

    try {
      // Create the model instance (explicitly use v1)
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        apiVersion: "v1"
      });

      // Create a structured content request (required for new API)
      const prompt = `Suggest movies related to: ${userInput}`;
      const request = {
        contents: [
          { role: "user", parts: [{ text: prompt }] }
        ]
      };

      // Send to Gemini API
      const result = await model.generateContent(request);

      // Safely get the text response
      const text = result?.response?.text?.() || "No response received.";
      console.log("Gemini response:", text);

      // Simple parser (optional — adapt to your movie list logic)
      const movies = text.split(/\n|,/).map((m) => m.trim()).filter(Boolean);
      setMovieResults(movies);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("Failed to fetch suggestions. Check your API key or model name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gpt-search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movie ideas..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default GptSearchBar;
