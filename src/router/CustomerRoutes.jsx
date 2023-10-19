import { ProductDetailsPage, ProductsPage } from "../pages";
import { HistoryPage } from "../pages/HistoryPage";

const CustomerRoutes = [
  {
    index: true,
    element: <ProductsPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailsPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
];

export default CustomerRoutes;
