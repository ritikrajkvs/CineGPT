import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/moviesSlice";
import { PlayIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

const VideoTitle = ({ title, overview }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const handlePlayClick = () => {
    dispatch(addMovieTrailer(trailerVideo));
  };

  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black via-black/40 to-transparent">
      <h1 className="text-2xl md:text-6xl font-bold w-1/2 drop-shadow-2xl text-white">
        {title}
      </h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/3 text-gray-200 drop-shadow-md">
        {overview}
      </p>
      <div className="my-4 md:m-0 flex items-center space-x-4">
        <button
          onClick={handlePlayClick}
          className="flex items-center bg-white text-black py-2 md:py-3 px-8 text-xl font-bold rounded hover:bg-opacity-80 transition duration-200"
        >
          <PlayIcon className="h-7 w-7 mr-2" /> Play
        </button>
        <button className="hidden md:flex items-center bg-gray-500/70 text-white py-2 md:py-3 px-8 text-xl font-bold rounded hover:bg-gray-500/50 transition duration-200">
          <InformationCircleIcon className="h-7 w-7 mr-2" /> More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
