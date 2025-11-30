import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";
import Profile from "./Profile";
import EditProfile from "./EditProfile"; // 1. Import EditProfile

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
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/edit-profile", // 2. Add Route
      element: <EditProfile />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
