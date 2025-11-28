// src/components/GptSearchBar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genAI } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  
  // Fetch Movie Details from TMDB
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
      });

      // Prompt to get 5 comma-separated movie names
      const prompt = `Act as a Movie Recommendation system and suggest some movies for the query : ${userInput}. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // 1. Get list of movie names from Gemini
      const gptMovies = text.split(",").map((movie) => movie.trim());

      console.log("Gemini Suggested:", gptMovies);

      // 2. Search TMDB for each movie to get the posters
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // 3. Push results to Redux Store
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );

    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong. Please check your API keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form 
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg" 
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder="What would you like to watch today?" 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button 
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800"
          type="submit" 
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="text-red-500 font-bold p-2">{error}</p>}
    </div>
  );
};

export default GptSearchBar;
