import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import Favorites from "./Favorites"; // New import
import WatchLater from "./WatchLater"; // New import

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/favorites", // New Route
      element: <Favorites />,
    },
    {
      path: "/watchlater", // New Route
      element: <WatchLater />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
