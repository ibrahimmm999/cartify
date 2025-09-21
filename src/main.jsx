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
import { Provider } from "react-redux";
import store from "./redux/store";
import CartPage from "./pages/Cart";
import AuthLayout from "./components/layouts/Auth";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";

const router = createBrowserRouter([
  {
    element: <MainLayout />, // Layout dengan Navbar + Footer
    errorElement: <p>Error</p>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products/:category", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <p>Error</p>,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
