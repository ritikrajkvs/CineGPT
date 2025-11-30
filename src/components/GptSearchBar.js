import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { client } from "../utils/gemini";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TMDB Search API
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error("TMDB Error:", err);
      return null;
    }
  };

  const handleGptSearchClick = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        searchText +
        ". Only return 5 movie names, comma-separated.";

      // ✅ UPDATED FOR GEMINI 2.5 FLASH & @google/genai SDK
      // The new SDK syntax is client.models.generateContent
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: gptQuery,
      });

      // In the new SDK, text is directly accessible on the response object
      const gptText = response.text || "";

      if (!gptText) {
        throw new Error("No results from Gemini.");
      }

      const gptMovies = gptText
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      console.log("Gemini Results:", gptMovies);

      // Fetch posters from TMDB
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (err) {
      console.error("Gemini Error:", err);
      setError("Failed to fetch results. Check your API key or usage.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] md:pt-[35%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={handleGptSearchClick}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you like to watch today?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-2 bg-black p-2">{error}</p>}
    </div>
  );
};

export default GptSearchBar;
