import { createBrowserRouter } from "react-router-dom";

import {
  ProductDetailsPage,
  ProductsPage,
  SignInPage,
  SignUpPage,
  ErrorPage,
} from "../pages";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: ":productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
