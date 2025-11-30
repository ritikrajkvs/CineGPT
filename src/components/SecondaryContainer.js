import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-[#141414]">
        <div className="mt-0 md:-mt-52 relative z-20 pb-10">
          
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          
          {/* New Favorites Section */}
          {movies.favorites && movies.favorites.length > 0 && (
             <MovieList title={"My Favorites"} movies={movies.favorites} />
          )}

          {/* New Watch Later Section */}
          {movies.watchLater && movies.watchLater.length > 0 && (
             <MovieList title={"Watch Later"} movies={movies.watchLater} />
          )}
          
          <MovieList title={"Trending"} movies={movies.trendingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
