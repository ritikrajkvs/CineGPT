// src/components/MovieTrailerModal.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/moviesSlice";

const MovieTrailerModal = () => {
  const dispatch = useDispatch();
  const movieTrailer = useSelector((store) => store.movies.movieTrailer);

  const handleClose = () => {
    dispatch(addMovieTrailer(null));
  };

  if (!movieTrailer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-6xl p-4"> {/* Change max-w-4xl to max-w-6xl */}
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-4 text-white text-3xl"
        >
          &times;
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&mute=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerModal;