import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import MovieCard from './MovieCard'; // Changed to standard import for faster loading
import MovieTrailerModal from './MovieTrailerModal'; // Added Modal to play video

const WatchLater = () => {
  const watchLater = useSelector((store) => store.movies.watchLater);
  
  return (
    <>
      <Header />
      <div className="pt-20 md:pt-28 min-h-screen bg-[#141414]">
        <div className="fixed -z-10 top-0 left-0 w-full h-full">
          <img
            className="h-full w-full object-cover opacity-20"
            src={BG_URL}
            alt="background"
          />
        </div>
        <div className="px-6 md:px-12 py-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">My Watch Later List</h1>
          {watchLater.length === 0 ? (
            <p className="text-xl text-gray-400">
              No movies added to your Watch Later list yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {watchLater.map((movie) => (
                    <div key={movie.id} className="w-full">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
          )}
        </div>
        {/* The Modal was missing here! */}
        <MovieTrailerModal />
      </div>
    </>
  );
};

export default WatchLater;
