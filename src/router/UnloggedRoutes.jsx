import {
  ProductsPage,
  ProductDetailsPage,
  SignInPage,
  SignUpPage,
} from "../pages";

const UnloggedRoutes = [
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailsPage />,
  },
];

export default UnloggedRoutes;
