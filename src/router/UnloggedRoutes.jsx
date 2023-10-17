import {
  ProductsPage,
  ProductDetailsPage,
  SignInPage,
  SignUpPage,
} from "../pages";
import { HistoryPage } from "../pages/HistoryPage";

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
  // {
  //   path: "/history",
  //   element: <HistoryPage />,
  // },
];

export default UnloggedRoutes;
