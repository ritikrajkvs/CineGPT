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
import { MagnifyingGlassIcon, ArrowRightOnRectangleIcon, UserCircleIcon, HeartIcon, ClockIcon, HomeIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
  }, [dispatch, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGptSearchClick = () => {
    // Navigate to /browse first, then toggle search
    if (location.pathname !== "/browse") {
        navigate("/browse");
    }
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  
  // Custom GPT Search button text based on current view
  const getGptButtonText = () => {
    if (showGptSearch) return "Home";
    if (location.pathname !== "/browse") return "Go To Home";
    return "GPT Search";
  }
  
  // Determine header background based on scroll and current path
  const headerClass = isScrolled || location.pathname !== "/browse" ? 'bg-black bg-opacity-95' : 'bg-gradient-to-b from-black';

  return (
    <div className={`fixed w-full px-4 md:px-8 py-4 z-50 flex flex-col md:flex-row justify-between items-center transition-all duration-300 ${headerClass}`}>
      <div className="flex items-center space-x-8">
        <img 
          className="w-32 md:w-44 cursor-pointer hover:opacity-80 transition" 
          src={CINEGPT_LOGO} 
          alt="logo" 
          onClick={() => navigate("/browse")}
        />
      </div>
      
      {user && (
        <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
          
          {/* Language Selector (only in GPT Search view) */}
          {location.pathname === "/browse" && showGptSearch && (
            <select
              className="py-1 px-2 bg-gray-900/80 text-white text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* Favorites Button */}
          <button
            className="flex items-center space-x-1 py-1 px-3 bg-red-700 text-white rounded font-medium hover:bg-red-800 transition-all duration-300 shadow-lg text-sm md:text-base"
            onClick={() => navigate("/favorites")}
            title="My Favorites List"
          >
            <HeartIcon className="h-5 w-5" />
            <span className="hidden lg:inline">My List</span>
          </button>

          {/* Watch Later Button */}
          <button
            className="flex items-center space-x-1 py-1 px-3 bg-blue-700 text-white rounded font-medium hover:bg-blue-800 transition-all duration-300 shadow-lg text-sm md:text-base"
            onClick={() => navigate("/watchlater")}
            title="Watch Later List"
          >
            <ClockIcon className="h-5 w-5" />
            <span className="hidden lg:inline">Watch Later</span>
          </button>
          
          {/* GPT Search/Home Button */}
          <button
            className="flex items-center space-x-2 py-2 px-4 bg-purple-700 text-white rounded font-medium hover:bg-purple-800 transition-all duration-300 shadow-lg text-sm md:text-base"
            onClick={handleGptSearchClick}
            title={showGptSearch ? "Go to Home" : "GPT Search"}
          >
            {showGptSearch ? <HomeIcon className="h-5 w-5" /> : <MagnifyingGlassIcon className="h-5 w-5" />}
            <span className="hidden md:inline">{getGptButtonText()}</span>
          </button>

          <div className="flex items-center group relative cursor-pointer">
             <UserCircleIcon className="h-8 w-8 md:h-10 md:w-10 text-white" />
             <button
              onClick={handleSignOut}
              className="ml-4 text-gray-300 hover:text-white transition"
              title="Sign Out"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
