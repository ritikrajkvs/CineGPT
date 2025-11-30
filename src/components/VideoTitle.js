import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/moviesSlice";

// Play Icon SVG Component
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.539 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

// Info Icon SVG Component
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);


const VideoTitle = ({ title, overview }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const handlePlayClick = () => {
    dispatch(addMovieTrailer(trailerVideo));
  };

  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0 flex items-center space-x-4">
        <button
          onClick={handlePlayClick}
          className="flex items-center justify-center bg-white text-black py-2 md:py-3 px-6 md:px-8 text-lg font-bold rounded-lg shadow-lg hover:bg-neutral-200 transform hover:scale-105 transition-all duration-300"
        >
          <PlayIcon />
          <span className="ml-2">Play</span>
        </button>
        <button className="hidden md:inline-flex items-center justify-center bg-gray-500 bg-opacity-50 text-white py-2 md:py-3 px-6 md:px-8 text-lg font-bold rounded-lg shadow-lg hover:bg-opacity-40 transform hover:scale-105 transition-all duration-300">
          <InfoIcon />
          <span className="ml-2">More Info</span>
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
