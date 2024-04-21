import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login } from "./components/index.js";

import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

// DOUBT: in the following why authentication is
//        passed as false and true in different cases?
// ANS: cause for loading some pages we need authentication
//      and fo loading other pages we doesnt need
//      fo example for loading the components like
//      login , signup we doesnt need the authentication
//      so we make them false
//      whereas in the case of allPost , addPost
//      etc we does need the authentication so
//      it is given as true
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        // DOUBT: why :slug is used instead of slug
        // ANS: cause :slug indicates that the value can
        //      can be dynamic rather that just slug
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);
~ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
