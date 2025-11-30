import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

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

  if(!movies || movies.length === 0) return null;

  return (
    <div className="px-6 md:px-12 py-4 group relative">
      <h1 className="text-lg md:text-2xl font-bold mb-3 text-white">{title}</h1>

      <div className="relative">
        <ChevronLeftIcon
          // FIX: Increased z-index from z-40 to z-[100] to ensure it stays above hovered cards
          className="absolute top-0 bottom-0 left-2 z-[100] m-auto h-9 w-9 cursor-pointer
                     opacity-0 transition hover:scale-125 group-hover:opacity-100
                     bg-black bg-opacity-50 text-white rounded-full p-2"
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex overflow-x-scroll no-scrollbar space-x-2 md:space-x-4 scroll-smooth"
        >
          {movies.map((movie) => (
            <div key={movie.id}>
              {/* Pass the full movie object here */}
              <MovieCard movie={movie} /> 
            </div>
          ))}
        </div>

        <ChevronRightIcon
          // FIX: Increased z-index from z-40 to z-[100] to ensure it stays above hovered cards
          className="absolute top-0 bottom-0 right-2 z-[100] m-auto h-9 w-9 cursor-pointer
                     opacity-0 transition hover:scale-125 group-hover:opacity-100
                     bg-black bg-opacity-50 text-white rounded-full p-2"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default MovieList;
