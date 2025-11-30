import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { toggleFavorite, toggleWatchLater } from "../utils/moviesSlice";
import { HeartIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, PlusCircleIcon as PlusSolid } from "@heroicons/react/24/solid";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.movies.favorites);
  const watchLater = useSelector((store) => store.movies.watchLater);

  if (!movie || !movie.poster_path) return null;

  const isFav = favorites.some((m) => m.id === movie.id);
  const isWatchLater = watchLater.some((m) => m.id === movie.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  const handleWatchLater = (e) => {
    e.stopPropagation();
    dispatch(toggleWatchLater(movie));
  };

  return (
    <div className="w-36 md:w-48 pr-4 relative group cursor-pointer">
      <div className="transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:z-50 relative rounded-md overflow-hidden shadow-lg">
        <img
          alt="Movie Card"
          src={IMG_CDN_URL + movie.poster_path}
          className="object-cover w-full h-full"
        />
        
        {/* Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 space-y-4">
            
            <button 
                onClick={handleFavorite}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-100 hover:text-red-600 text-white transition-all transform hover:scale-110"
                title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
                {isFav ? <HeartSolid className="h-6 w-6 text-red-600" /> : <HeartIcon className="h-6 w-6" />}
            </button>

            <button 
                onClick={handleWatchLater}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-100 hover:text-blue-600 text-white transition-all transform hover:scale-110"
                title={isWatchLater ? "Remove from Watch Later" : "Watch Later"}
            >
                 {isWatchLater ? <PlusSolid className="h-6 w-6 text-blue-600" /> : <PlusCircleIcon className="h-6 w-6" />}
            </button>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
