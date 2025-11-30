import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CINEGPT_LOGO from "../assets/logo.png";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { MagnifyingGlassIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isScrolled, setIsScrolled] = useState(false);

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
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className={`fixed w-full px-8 py-4 z-50 flex flex-col md:flex-row justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-90' : 'bg-gradient-to-b from-black'}`}>
      <img className="w-36 md:w-44 mx-auto md:mx-0 cursor-pointer hover:opacity-80 transition" src={CINEGPT_LOGO} alt="logo" />
      
      {user && (
        <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
          {showGptSearch && (
            <select
              className="py-2 px-3 bg-gray-900/80 text-white text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          
          <button
            className="flex items-center space-x-2 py-2 px-4 bg-purple-700 text-white rounded font-medium hover:bg-purple-800 transition-all duration-300 shadow-lg"
            onClick={handleGptSearchClick}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span className="hidden md:inline">{showGptSearch ? "Home" : "GPT Search"}</span>
          </button>

          <div className="flex items-center group relative cursor-pointer">
             <UserCircleIcon className="h-10 w-10 text-white" />
             <button
              onClick={handleSignOut}
              className="ml-4 text-gray-300 hover:text-white transition"
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
