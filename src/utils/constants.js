// src/utils/constants.js
import BG_IMAGE from '../assets/login-background.png';

// Use a known reliable default for the initial avatar
export const USER_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_URL = BG_IMAGE;

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

// FIXED: Collection of Stable Netflix-style Avatars (Behance/Wikimedia)
export const PROFILE_AVATARS = [
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png", // Red
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png", // Yellow
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png", // Blue
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png", // Green
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9eb3833850498.56ba69ac2f980.png", // Purple
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png", // Dark Blue
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png", // Red Angry
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png"  // Gray
];
