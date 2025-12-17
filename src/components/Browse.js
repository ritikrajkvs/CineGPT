import { useSelector } from "react-redux";
import { lazy, Suspense } from "react"; // 1. Import lazy and Suspense
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import MovieTrailerModal from "./MovieTrailerModal";

// 2. Lazy load the GptSearch component
// This replaces the static import: import GptSearch from "./GptSearch";
const GptSearch = lazy(() => import("./GptSearch"));

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        /* 3. Wrap the lazy component in Suspense with a fallback UI */
        <Suspense fallback={<div className="pt-[40%] md:pt-[20%] text-center text-white text-2xl font-bold animate-pulse">Loading AI Search...</div>}>
          <GptSearch />
        </Suspense>
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      <MovieTrailerModal />
    </div>
  );
};
export default Browse;
