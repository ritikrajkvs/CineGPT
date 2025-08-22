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

  return (
    <div className="px-6 md:px-12 py-4 group relative">
      <h1 className="text-xl md:text-2xl mb-2 text-white">{title}</h1>

      <div className="relative">
        {/* --- ARROW CLASSES UPDATED --- */}
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
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>

        {/* --- ARROW CLASSES UPDATED --- */}
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