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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={handleClose}
          className="absolute -top-2 right-0 md:-right-10 text-white text-4xl hover:text-red-500 transition-colors z-10"
          title="Close"
        >
          &times;
        </button>
        <div className="w-full aspect-video bg-black">
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
