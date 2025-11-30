import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { HeartIcon, ClockIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const favorites = useSelector((store) => store.movies.favorites);
  const watchLater = useSelector((store) => store.movies.watchLater);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black relative">
        {/* Background Image with heavy overlay */}
        <div className="fixed inset-0 -z-10">
          <img
            className="h-full w-full object-cover opacity-30"
            src={BG_URL}
            alt="background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="pt-32 px-6 flex justify-center">
          <div className="w-full max-w-2xl bg-black/80 border border-gray-800 p-8 md:p-12 rounded-lg shadow-2xl backdrop-blur-sm">
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
              Account Profile
            </h1>

            {/* User Info Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
              <div className="relative group">
                 {/* Avatar */}
                <img
                    src={user.photoURL}
                    alt="user-avatar"
                    className="w-32 h-32 rounded-lg border-4 border-[#141414] shadow-lg object-cover"
                />
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{user.displayName || "CineGPT User"}</h2>
                <p className="text-gray-400 mb-4">{user.email}</p>
                <div className="inline-block bg-gray-800 text-xs px-2 py-1 rounded text-gray-300 border border-gray-600">
                  Premium Member
                </div>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {/* My List Stat */}
              <div 
                onClick={() => navigate("/favorites")}
                className="bg-[#1a1a1a] p-6 rounded border border-gray-700 cursor-pointer hover:border-white transition-all group flex items-center justify-between"
              >
                <div>
                    <p className="text-gray-400 text-sm mb-1">My List</p>
                    <p className="text-3xl font-bold text-white group-hover:text-red-600 transition-colors">
                        {favorites.length}
                    </p>
                </div>
                <HeartIcon className="h-10 w-10 text-gray-600 group-hover:text-red-600 transition-colors" />
              </div>

              {/* Watch Later Stat */}
              <div 
                onClick={() => navigate("/watchlater")}
                className="bg-[#1a1a1a] p-6 rounded border border-gray-700 cursor-pointer hover:border-white transition-all group flex items-center justify-between"
              >
                <div>
                    <p className="text-gray-400 text-sm mb-1">Watch Later</p>
                    <p className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
                        {watchLater.length}
                    </p>
                </div>
                <ClockIcon className="h-10 w-10 text-gray-600 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              {/* Updated: Navigate to /edit-profile */}
              <button 
                className="w-full py-3 bg-transparent border border-gray-500 text-gray-300 hover:text-white hover:border-white font-medium rounded transition-all"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full py-3 bg-[#E50914] text-white font-bold rounded hover:bg-[#c11119] transition-colors shadow-lg mt-2"
              >
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
