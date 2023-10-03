import { ProductsPage, SignInPage, SignUpPage } from "../pages";

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
];

export default UnloggedRoutes;
