import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { client } from "../utils/gemini";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: gptQuery,
      });

      const gptText = response.text || "";

      if (!gptText) {
        throw new Error("No results from Gemini.");
      }

      const gptMovies = gptText
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      console.log("Gemini Results:", gptMovies);

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
    <div className="pt-[10%] md:pt-[10%] flex justify-center flex-col items-center">
      <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg text-center">
        Let AI find your next watch
      </h1>
      <form
        className="w-full md:w-1/2 bg-black bg-opacity-80 grid grid-cols-12 rounded-full overflow-hidden shadow-2xl border border-gray-600"
        onSubmit={handleGptSearchClick}
      >
        <input
          type="text"
          className="p-4 m-0 col-span-9 bg-transparent text-white focus:outline-none placeholder-gray-400 text-lg px-6"
          placeholder="What would you like to watch today?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="col-span-3 py-3 px-4 bg-[#E50914] text-white font-bold hover:bg-[#c11119] transition-colors duration-200 flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
             <span className="animate-pulse">Thinking...</span>
          ) : (
            <>
              <span className="hidden md:inline">Search</span>
              <MagnifyingGlassIcon className="h-6 w-6 md:ml-2" />
            </>
          )}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4 bg-black/80 p-2 rounded">{error}</p>}
    </div>
  );
};

export default GptSearchBar;
