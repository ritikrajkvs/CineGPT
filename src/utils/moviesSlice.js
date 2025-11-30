import { createSlice } from "@reduxjs/toolkit";

// 1. Helper function to load data from Local Storage safely
const loadFromStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Could not load from local storage", err);
    return [];
  }
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trendingMovies: null,
    trailerVideo: null,
    movieTrailer: null,
    // 2. Initialize state from Local Storage instead of empty arrays
    favorites: loadFromStorage("favorites"), 
    watchLater: loadFromStorage("watchLater"), 
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
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.favorites.findIndex((m) => m.id === movie.id);
      if (index >= 0) {
        state.favorites.splice(index, 1); // Remove
      } else {
        state.favorites.push(movie); // Add
      }
      // 3. Save to Local Storage whenever the list changes
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    toggleWatchLater: (state, action) => {
      const movie = action.payload;
      const index = state.watchLater.findIndex((m) => m.id === movie.id);
      if (index >= 0) {
        state.watchLater.splice(index, 1); // Remove
      } else {
        state.watchLater.push(movie); // Add
      }
      // 3. Save to Local Storage whenever the list changes
      localStorage.setItem("watchLater", JSON.stringify(state.watchLater));
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
