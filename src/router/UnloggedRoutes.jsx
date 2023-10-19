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
    index: true,
    element: <ProductsPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailsPage />,
  },
];

export default UnloggedRoutes;
