import genAI from "../utils/gemini";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const searchTerm = searchText.current.value;

    if (!searchTerm.trim()) {
      console.warn("Empty search term");
      return;
    }

    const gptQuery = `
      Act as a Movie Recommendation system and suggest 5 movies for the query: "${searchTerm}".
      Only give me names of 5 movies, comma separated.
      Example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya
    `;

    try {
      // Use latest Gemini model (1.5-flash for speed, or 1.5-pro for more accuracy)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content
      const result = await model.generateContent(gptQuery);
      const text = await result.response.text();

      if (!text) {
        console.error("No response text from Gemini API.");
        return;
      }

      console.log("Gemini API Response:", text);

      const gptMovies = text
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Results:", tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error with Gemini API call:", error);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
