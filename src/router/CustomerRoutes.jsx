import { ProductDetailsPage, ProductsPage } from "../pages";

const CustomerRoutes = [
  {
    index: true,
    element: <ProductsPage />,
  },
  {
    path: ":productId",
    element: <ProductDetailsPage />,
  },
];

export default CustomerRoutes;
