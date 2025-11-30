import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";
import Profile from "./Profile"; // 1. Import Profile

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
      path: "/favorites",
      element: <Favorites />,
    },
    {
      path: "/watchlater",
      element: <WatchLater />,
    },
    {
      path: "/profile", // 2. Add Profile Route
      element: <Profile />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
