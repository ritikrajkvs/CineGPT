import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen w-screen object-cover"
          src={BG_URL}
          alt="background"
        />
      </div>
      {/* The wrapping div was removed from here to fix the layout issue */}
      <GptSearchBar />
      <GptMovieSuggestions />
    </>
  );
};
export default GPTSearch;
