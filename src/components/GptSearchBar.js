// src/components/GptSearchBar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { genAI } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants"; // Import API options for TMDB
import { addGptMovieResult } from "../utils/gptSlice"; // Import the action

const GptSearchBar = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config?.lang); // Optional: if you have language config

  // Helper function to search TMDB for a specific movie
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setError("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        apiVersion: "v1"
      });

      const prompt = `Act as a Movie Recommendation system and suggest some movies for the query : ${userInput}. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      const request = {
        contents: [
          { role: "user", parts: [{ text: prompt }] }
        ]
      };

      const result = await model.generateContent(request);
      const text = result?.response?.text?.() || "";
      
      // 1. Get list of movie names from Gemini
      const gptMovies = text.split(",").map((movie) => movie.trim());

      // 2. For each movie name, search TMDB API to get details (posters, etc.)
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      
      // 3. Wait for all TMDB API calls to finish
      const tmdbResults = await Promise.all(promiseArray);

      console.log("GPT Results:", gptMovies);
      console.log("TMDB Results:", tmdbResults);

      // 4. Push both names and full movie data to Redux Store
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );

    } catch (err) {
      console.error("Gemini/TMDB API Error:", err);
      setError("Failed to fetch suggestions. Check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form 
        className="w-full md:w-1/2 bg-black grid grid-cols-12" 
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you like to watch today?" // Or use language constants here
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button 
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          type="submit" 
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default GptSearchBar;
