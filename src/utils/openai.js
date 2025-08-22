import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,  // yaha se lega
  dangerouslyAllowBrowser: true  // frontend me use karne ke liye zaroori
});

export default openai;
