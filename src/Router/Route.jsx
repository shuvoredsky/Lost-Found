import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayOut/RootLayOut.jsx";
import Home from "../Pages/Home.jsx";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp.jsx";

import ErrorPage from "../pages/ErrorPage.jsx";
import AddItem from "../Pages/AddItem.jsx";
import PrivetRoute from "../Components/PrivateRoute.jsx";
import CardDetails from "../Pages/CardDetails.jsx";
import axios from "axios";
import ManageMyItem from "../Pages/ManageMyItem.jsx";
import UpdateItem from "../Pages/UpdateItem.jsx";
import RecoverdItems from "../Pages/RecoverdItems.jsx";
import AllLostFoundItems from "../Pages/AllLostFoundItems.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },

      {
        path: "/sign-in",
        Component: SignIn,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
      {
        path: "/items/:id",
        element: (
          <PrivetRoute>
            <CardDetails></CardDetails>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          axios.get(
            `https://where-is-it-server-eight.vercel.app/items/${params.id}`
          ),
      },
      {
        path: "/allItems",
        element: <AllLostFoundItems></AllLostFoundItems>,
      },
      {
        path: "/add-lost-found",
        element: (
          <PrivetRoute>
            <AddItem></AddItem>
          </PrivetRoute>
        ),
      },
      {
        path: "/myItems/:email",
        loader: async ({ params }) => {
          const token = localStorage.getItem("access-token");

          return axios.get(
            `https://where-is-it-server-eight.vercel.app/my-items/${params.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        element: (
          <PrivetRoute>
            <ManageMyItem></ManageMyItem>
          </PrivetRoute>
        ),
      },
      {
        path: "/update-item/:id",
        loader: ({ params }) =>
          axios(
            `https://where-is-it-server-eight.vercel.app/items/${params.id}`
          ),
        element: (
          <PrivetRoute>
            <UpdateItem></UpdateItem>
          </PrivetRoute>
        ),
      },
      {
        path: "/all-Recovered",

        element: (
          <PrivetRoute>
            <RecoverdItems></RecoverdItems>
          </PrivetRoute>
        ),
      },
    ],
  },
]);
