import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CINEGPT_LOGO from "../assets/logo.png";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

// SVG Icon Components
const GptSearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.25a.75.75 0 01.75.75v3.024a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 18a.75.75 0 01.75.75v3.024a.75.75 0 01-1.5 0V18.75a.75.75 0 01.75-.75zM6.025 6.025a.75.75 0 011.06 0l2.145 2.145a.75.75 0 01-1.06 1.06L6.025 7.085a.75.75 0 010-1.06zM14.77 14.77a.75.75 0 011.06 0l2.145 2.145a.75.75 0 01-1.06 1.06l-2.145-2.145a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h3.024a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM18 12a.75.75 0 01.75-.75h3.024a.75.75 0 010 1.5H18.75a.75.75 0 01-.75-.75zM7.085 17.975a.75.75 0 010-1.06l2.145-2.145a.75.75 0 011.06 1.06L8.145 17.975a.75.75 0 01-1.06 0zM17.975 7.085a.75.75 0 010-1.06l-2.145-2.145a.75.75 0 01-1.06 1.06l2.145 2.145a.75.75 0 011.06 0z" />
    </svg>
);

const UserProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);

const SignOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      <img className="w-44 mx-auto md:mx-0" src={CINEGPT_LOGO} alt="logo" />
      {user && (
        <div className="flex items-center space-x-4 p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
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
            className="flex items-center space-x-2 py-2 px-4 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors duration-300"
            onClick={handleGptSearchClick}
          >
            <GptSearchIcon />
            <span>{showGptSearch ? "Homepage" : "GPT Search"}</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-white cursor-pointer">
                <UserProfileIcon />
            </div>
            <button
              onClick={handleSignOut}
              className="bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-300"
              title="Sign Out"
            >
              <SignOutIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;