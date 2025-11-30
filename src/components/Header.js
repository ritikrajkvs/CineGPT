import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import CINEGPT_LOGO from "../assets/logo.png";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import {
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  HeartIcon,
  ClockIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    if (location.pathname !== "/browse") {
      navigate("/browse");
    }
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  // Dynamic Background: Gradient at top, solid black when scrolled
  const headerClass =
    isScrolled || location.pathname !== "/browse"
      ? "bg-[#141414] shadow-md bg-opacity-95"
      : "bg-gradient-to-b from-black via-black/60 to-transparent";

  return (
    <div
      className={`fixed top-0 w-full px-6 md:px-10 py-3 z-50 flex justify-between items-center transition-all duration-500 ease-in-out ${headerClass}`}
    >
      {/* --- LOGO SECTION --- */}
      <div className="flex items-center">
        <img
          className="w-24 md:w-36 cursor-pointer hover:opacity-90 transition-opacity drop-shadow-lg"
          src={CINEGPT_LOGO}
          alt="CineGPT Logo"
          onClick={() => navigate("/browse")}
        />
      </div>

      {/* --- NAV & USER ACTIONS --- */}
      {user && (
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Language Selector (Only on GPT Page) */}
          {showGptSearch && (
            <div className="relative">
              <select
                className="appearance-none bg-black/60 border border-gray-500 text-white text-xs md:text-sm py-1 px-3 rounded hover:border-white transition-colors focus:outline-none cursor-pointer"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier} className="bg-black text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* DESKTOP NAVIGATION (Text Links) */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => navigate("/watchlater")}
              className="group flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
            >
              <ClockIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Watch Later</span>
            </button>

            <button
              onClick={() => navigate("/favorites")}
              className="group flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
            >
              <HeartIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>My List</span>
            </button>
          </div>

          {/* MOBILE NAVIGATION (Icons Only) */}
          <div className="flex md:hidden items-center gap-3">
             <button onClick={() => navigate("/watchlater")} className="text-gray-300 hover:text-white">
                <ClockIcon className="h-6 w-6" />
             </button>
             <button onClick={() => navigate("/favorites")} className="text-gray-300 hover:text-white">
                <HeartIcon className="h-6 w-6" />
             </button>
          </div>

          {/* PRIMARY ACTION: GPT SEARCH (Red Button) */}
          <button
            className="flex items-center gap-2 py-2 px-4 bg-[#E50914] text-white rounded font-bold hover:bg-[#b00710] transition-all duration-300 shadow-lg transform hover:scale-105"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <>
                <HomeIcon className="h-5 w-5" />
                <span className="hidden md:block text-sm">Home</span>
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span className="hidden md:block text-sm">GPT Search</span>
              </>
            )}
          </button>

          {/* USER PROFILE & LOGOUT */}
          <div className="flex items-center gap-3 border-l border-gray-700 pl-4 ml-1">
            <button
              onClick={() => navigate("/profile")}
              className="group relative"
              title="View Profile"
            >
               {user?.photoURL ? (
                  <img
                    className="h-9 w-9 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity border border-transparent hover:border-white box-border"
                    alt="user icon"
                    src={user?.photoURL}
                  />
                ) : (
                  <UserCircleIcon className="h-9 w-9 text-white cursor-pointer hover:text-gray-300 transition-colors" />
              )}
            </button>
            
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-[#E50914] transition-colors"
              title="Sign Out"
            >
              <ArrowRightOnRectangleIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
