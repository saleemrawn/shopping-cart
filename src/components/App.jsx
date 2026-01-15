import { useState } from "react";
import { Outlet } from "react-router";
import { CartProvider } from "../CartProvider";
import { ThemeProvider } from "styled-components";
import theme from "../theme";
import GlobalStyle from "./GlobalStyles";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <CartProvider value={{ cartItems, addToCart, removeFromCart }}>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </CartProvider>
    </>
  );
};

export default App;
