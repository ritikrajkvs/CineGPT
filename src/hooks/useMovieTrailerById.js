import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailerById = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch if we have a movieId
    if (!movieId) return;

    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      // Fix: Check if results exist. If not, exit the function.
      if (!json.results) return;

      const filterData = json.results.filter((video) => video.type === "Trailer");

      // Fix: Handle cases where there are no trailers or no videos at all.
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addMovieTrailer(trailer));
    };

    getMovieVideos();
  }, [movieId, dispatch]); // Rerun effect if movieId or dispatch changes
};

export default useMovieTrailerById;