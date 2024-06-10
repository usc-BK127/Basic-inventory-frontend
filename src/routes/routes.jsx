import { createBrowserRouter } from "react-router-dom";

import AllProducts from "../pages/AllProducts/AllProducts";
import ProductReport from "../pages/ProductReport/ProductReport";
import Category from "../pages/Category/Category";
import MainLayout from "../Layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "/product-report",
        element: <ProductReport />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
]);

export default router;
