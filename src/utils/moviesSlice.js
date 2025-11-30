import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trendingMovies: null,
    trailerVideo: null,
    movieTrailer: null,
    favorites: [], // New State
    watchLater: [], // New State
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    // New Actions
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.favorites.findIndex((m) => m.id === movie.id);
      if (index >= 0) {
        state.favorites.splice(index, 1); // Remove if exists
      } else {
        state.favorites.push(movie); // Add if doesn't exist
      }
    },
    toggleWatchLater: (state, action) => {
      const movie = action.payload;
      const index = state.watchLater.findIndex((m) => m.id === movie.id);
      if (index >= 0) {
        state.watchLater.splice(index, 1);
      } else {
        state.watchLater.push(movie);
      }
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTrendingMovies,
  addMovieTrailer,
  toggleFavorite,
  toggleWatchLater,
} = moviesSlice.actions;

export default moviesSlice.reducer;
