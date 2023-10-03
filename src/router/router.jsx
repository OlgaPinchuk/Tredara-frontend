import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "../pages";
import UnloggedRoutes from "./UnloggedRoutes";
import CustomerRoutes from "./CustomerRoutes";
import App from "../App";

/* TODO: Check whether the user is authenticated */
const isAuthenticated = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: isAuthenticated ? CustomerRoutes : UnloggedRoutes,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
