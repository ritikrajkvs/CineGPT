import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { IMG_CDN_URL, API_OPTIONS } from "../utils/constants";
import { toggleFavorite, toggleWatchLater, addMovieTrailer } from "../utils/moviesSlice";
import { HeartIcon, PlusCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, PlusCircleIcon as PlusSolid } from "@heroicons/react/24/solid";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const favorites = useSelector((store) => store.movies.favorites);
  const watchLater = useSelector((store) => store.movies.watchLater);

  if (!movie || !movie.poster_path) return null;

  const isFav = favorites.some((m) => m.id === movie.id);
  const isWatchLater = watchLater.some((m) => m.id === movie.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
    navigate("/favorites"); 
  };

  const handleWatchLater = (e) => {
    e.stopPropagation();
    dispatch(toggleWatchLater(movie));
    navigate("/watchlater");
  };

  const handlePlayClick = async (e) => {
    e.stopPropagation();
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movie.id + "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      if (json.results) {
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addMovieTrailer(trailer));
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    // FIX: Changed 'group' to 'group/card' to isolate it from the parent list
    <div className="w-36 md:w-48 mr-4 relative group/card cursor-pointer flex-shrink-0"> 
      <div 
        // FIX: Updated all 'group-hover' to 'group-hover/card'
        className="transition-transform duration-300 ease-in-out group-hover/card:scale-105 group-hover/card:z-50 relative rounded-md overflow-hidden shadow-lg w-full aspect-[3/4]" 
        onClick={handlePlayClick}
      >
        <img
          alt="Movie Card"
          src={IMG_CDN_URL + movie.poster_path}
          className="object-cover w-full h-full"
        />
        
        {/* Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/card:bg-opacity-60 transition-all duration-300 flex flex-col justify-center items-center space-y-2 invisible group-hover/card:visible opacity-0 group-hover/card:opacity-100">
            
            {/* Play Button */}
            <button 
                onClick={handlePlayClick}
                className="p-3 rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 mb-2"
                title="Play Trailer"
            >
                <PlayCircleIcon className="h-8 w-8 md:h-10 md:w-10" />
            </button>

            <div className="flex space-x-4">
              <button 
                  onClick={handleFavorite}
                  className="p-2 rounded-full bg-gray-600 bg-opacity-50 hover:bg-white hover:text-red-600 text-white transition-all transform hover:scale-110"
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
              >
                  {isFav ? <HeartSolid className="h-6 w-6 text-red-600" /> : <HeartIcon className="h-6 w-6" />}
              </button>

              <button 
                  onClick={handleWatchLater}
                  className="p-2 rounded-full bg-gray-600 bg-opacity-50 hover:bg-white hover:text-blue-600 text-white transition-all transform hover:scale-110"
                  title={isWatchLater ? "Remove from Watch Later" : "Watch Later"}
              >
                  {isWatchLater ? <PlusSolid className="h-6 w-6 text-blue-600" /> : <PlusCircleIcon className="h-6 w-6" />}
              </button>
            </div>
        </div>
      </div>
      {/* Title */}
      <p className="text-sm mt-2 font-semibold truncate text-white pt-1">{movie.title}</p>
    </div>
  );
};
export default MovieCard;
