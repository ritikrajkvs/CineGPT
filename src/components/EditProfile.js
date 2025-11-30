import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { BG_URL, PROFILE_AVATARS, USER_AVATAR } from "../utils/constants";
import { CheckIcon } from "@heroicons/react/24/solid";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState(user?.displayName || "");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.photoURL || USER_AVATAR);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fallback function for broken images
  const handleImageError = (e) => {
    e.target.src = USER_AVATAR; // Switch to default if link breaks
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Update Firebase Auth Profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: selectedAvatar,
      });

      // 2. Update Redux Store
      const { uid, email, displayName, photoURL } = auth.currentUser;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      );

      // 3. Navigate back
      navigate("/profile");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black relative">
        <div className="fixed inset-0 -z-10">
          <img
            className="h-full w-full object-cover opacity-20"
            src={BG_URL}
            alt="background"
          />
        </div>

        <div className="pt-28 pb-10 flex justify-center px-4">
          <div className="w-full max-w-2xl bg-black/90 border border-gray-800 p-8 rounded-lg shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-2">Edit Profile</h1>
            <div className="border-b border-gray-700 mb-8"></div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Side: Current Avatar Preview */}
              <div className="flex flex-col items-center">
                <div className="relative">
                   <img
                    src={selectedAvatar}
                    alt="Current Avatar"
                    onError={handleImageError}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-md object-cover border-2 border-gray-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 p-1 rounded-full border border-gray-500">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-3 uppercase tracking-widest">Current Photo</p>
              </div>

              {/* Right Side: Inputs */}
              <div className="flex-1">
                <label className="block text-gray-400 text-sm mb-2">Profile Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#333] text-white px-4 py-3 rounded border border-transparent focus:border-white focus:outline-none transition-colors mb-6"
                  placeholder="Enter your name"
                />

                <label className="block text-gray-400 text-sm mb-3">Choose Avatar</label>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mb-8">
                  {PROFILE_AVATARS.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index}`}
                      onError={handleImageError} // Added error handler here too
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded cursor-pointer object-cover transition-all hover:scale-110 ${
                        selectedAvatar === avatar
                          ? "border-2 border-white opacity-100 scale-110"
                          : "border-2 border-transparent opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}

            <div className="border-t border-gray-700 mt-4 pt-6 flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-red-600 hover:text-white transition-colors text-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="bg-transparent border border-gray-500 text-gray-400 font-bold py-2 px-6 rounded hover:border-white hover:text-white transition-colors text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
