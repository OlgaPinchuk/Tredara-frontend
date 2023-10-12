import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "../pages";
import UnloggedRoutes from "./UnloggedRoutes";
import CustomerRoutes from "./CustomerRoutes";
import App from "../App";

async function checkAuthenticationStatus() {
  const token = localStorage.getItem("user");
  return !!token;
}

const isAuthenticated = await checkAuthenticationStatus();

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
