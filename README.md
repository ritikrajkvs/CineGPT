# CineGPT: A Movie Recommendation Web Application

## About the Project

This project is a React-based web application inspired by Netflix, featuring a user authentication system, movie browsing capabilities, and a unique GPT-powered search functionality for movie recommendations. It's built with modern web technologies, including React, Redux Toolkit for state management, and Tailwind CSS for styling. The application integrates with both the TMDB (The Movie Database) API for movie data and the GEMINI API for its AI search feature.

## Features

  - **User Authentication:**

      - Secure sign-in and sign-up forms with form validation.
      - Redirects users to the appropriate page (`/browse` for logged-in users, `/` for logged-out).
      - Implements user sign-out functionality.

  - **Movie Browsing:**

      - Displays a main movie container with a background trailer and movie title/description.
      - Shows categorized movie lists (Now Playing, Popular, and Trending).
      - Each movie list contains clickable movie cards.

  - **GPT Search:**

      - A dedicated search page with an input bar.
      - Uses the GEMINI API to generate movie suggestions based on user queries.
      - Integrates TMDB to fetch movie posters for the suggested titles.

  - **Additional Features:**

      - Multi-language support.
      - Responsive design using Tailwind CSS.
      - State management with Redux Toolkit.

## Technologies Used

The project is built using a combination of libraries and frameworks to ensure a robust and scalable application.

  - **Frontend:**

      - **React:** For building the user interface.
      - **React Router DOM:** For client-side routing.
      - **Redux Toolkit:** For efficient state management across the application.
      - **Tailwind CSS:** For utility-first styling.
      - **Heroicons:** For UI icons.
      - **React-dom:** For rendering React components.

  - **Backend/APIs:**

      - **Firebase:** For user authentication.
      - **GEMINI API:** For GPT-powered movie search.
      - **TMDB API:** For fetching movie data and images.

## Getting Started

To run this project locally, you need to set up your environment variables with the necessary API keys.

### Prerequisites

  - Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    ```
2.  Navigate to the project directory:
    ```bash
    cd cine-gpt
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following keys:

```
REACT_APP_TMDB_KEY="your_tmdb_api_key"
REACT_APP_OPENAI_KEY="your_openai_api_key"
```

### Running the Application

To start the development server:

live link:https://cine-gpt-six.vercel.app/

```bash
npm start
```

The application will be available at `http://localhost:3000`.
