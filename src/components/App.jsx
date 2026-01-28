import useFetchProducts from "../fetch";
import theme from "../theme";
import GlobalStyle from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import { createContext, useState } from "react";
import { Outlet } from "react-router";

export const ProductsContext = createContext({ products: [], error: false, loading: false });
export const CartContext = createContext({ cartItems: [], addToCart: () => {}, removeFromCart: () => {} });

export const App = () => {
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
      <ProductsContext value={{ products, error, loading }}>
        <CartContext value={{ cartItems, addToCart, removeFromCart }}>
          <ThemeProvider theme={theme}>
            <Outlet />
          </ThemeProvider>
        </CartContext>
      </ProductsContext>
    </>
  );
};
