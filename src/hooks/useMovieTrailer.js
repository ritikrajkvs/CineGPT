import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    // Fix: Check if results exist. If not, exit the function.
    if (!json.results) return;

    const filterData = json.results.filter((video) => video.type === "Trailer");
    
    // Fix: Handle cases where there are no trailers or no videos at all.
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
  
  useEffect(() => {
    if(!trailerVideo) getMovieVideos();
  }, []);
};

export default useMovieTrailer;