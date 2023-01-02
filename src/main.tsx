import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectList from "./pages/projects/ProjectList";
import ProjectDetails from "./pages/projects/ProjectPages";
import PageEditor from "./pages/projects/PageEditor";
import { IconContext } from "react-icons";
import ProjectCreator from "./pages/projects/ProjectCreator";
import { getProjectPages, getProjects } from "./loaders/project";
import { z } from "zod";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <ProjectList />,
    loader: getProjects,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectDetails />,
    loader: ({ params }) => {
      const projectSchema = z.string().length(20);
      let projectId = projectSchema.parse(params.projectId);
      return getProjectPages(projectId);
    },
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
