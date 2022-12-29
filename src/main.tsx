import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectList from "./pages/projects/ProjectList";
import ProjectDetails from "./pages/projects/ProjectDetails";
import PageEditor from "./pages/projects/PageEditor";
import { IconContext } from "react-icons";
import ProjectCreator from "./pages/projects/ProjectCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <ProjectList />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectDetails />,
  },
  {
    path: "/projects/new",
    element: <ProjectCreator />,
  },
  {
    path: "/projects/:projectId/:pageId",
    element: <PageEditor />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IconContext.Provider
      value={{
        size: undefined,
      }}
    >
      <RouterProvider router={router} />
    </IconContext.Provider>
  </React.StrictMode>
);
