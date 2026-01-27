import useFetchProducts from "../fetch";
import theme from "../theme";
import GlobalStyle from "./GlobalStyles";
import { useState } from "react";
import { Outlet } from "react-router";
import { CartProvider } from "../providers/CartProvider";
import { ThemeProvider } from "styled-components";
import { ProductsProvider } from "../providers/ProductsProvider";

const App = () => {
  const { products, error, loading } = useFetchProducts();
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
      <ProductsProvider value={{ products, error, loading }}>
        <CartProvider value={{ cartItems, addToCart, removeFromCart }}>
          <ThemeProvider theme={theme}>
            <Outlet />
          </ThemeProvider>
        </CartProvider>
      </ProductsProvider>
    </>
  );
};

export default App;
