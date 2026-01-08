import { useState } from "react";
import { Outlet } from "react-router";
import { CartProvider } from "../CartProvider";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <CartProvider value={{ cartItems, addToCart, removeFromCart }}>
      <Outlet />
    </CartProvider>
  );
};

export default App;
