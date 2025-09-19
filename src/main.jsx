import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/racing-sans-one";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import MainLayout from "./components/layouts/Main";
import ProductDetailPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    element: <MainLayout />, // Layout dengan Navbar + Footer
    errorElement: <p>Error</p>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products/:category", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
