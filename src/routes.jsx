import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const routes = [
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/shop", element: <Shop /> },
  { path: "/cart", element: <Cart /> },
];

export default routes;
