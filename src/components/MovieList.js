import React, { useRef, useState } from "react"; // Import useState
import MovieCard from "./MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import useMovieTrailerById from "../hooks/useMovieTrailerById"; // Import the new hook

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);
  // State to hold the ID of the clicked movie
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Call the hook to fetch the trailer when selectedMovieId changes
  useMovieTrailerById(selectedMovieId);

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 md:px-12 py-4 group relative">
      <h1 className="text-xl md:text-2xl mb-2 text-white">{title}</h1>

      <div className="relative">
        <ChevronLeftIcon
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-12 w-12 cursor-pointer
                     opacity-0 transition hover:scale-125 group-hover:opacity-100
                     bg-black bg-opacity-50 rounded-full p-2"
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-2 md:space-x-4"
        >
          {/* --- CLICK HANDLER ADDED BACK --- */}
          {movies?.map((movie) => (
            // Add a wrapper div with the onClick handler
            <div key={movie.id} onClick={() => setSelectedMovieId(movie.id)}>
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>

        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-12 w-12 cursor-pointer
                     opacity-0 transition hover:scale-125 group-hover:opacity-100
                     bg-black bg-opacity-50 rounded-full p-2"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default MovieList;