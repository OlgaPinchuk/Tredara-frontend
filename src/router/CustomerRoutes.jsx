import { ProductDetailsPage, ProductsPage } from "../pages";

const CustomerRoutes = [
  {
    index: true,
    element: <ProductsPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailsPage />,
  },
];

export default CustomerRoutes;
