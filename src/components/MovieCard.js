import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:z-20 origin-center">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="rounded-md object-cover shadow-lg drop-shadow-md"
      />
    </div>
  );
};
export default MovieCard;
