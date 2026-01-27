import theme from "../src/theme";
import { MemoryRouter } from "react-router";
import { CartProvider } from "../src/CartProvider";
import { ThemeProvider } from "styled-components";
import { ProductsProvider } from "../src/components/ProductProvider";

export const renderWithProviders = (ui, { cart = { cartItems: [], addToCart: vi.fn(), removeFromCart: vi.fn() }, products = {} } = {}) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ProductsProvider value={products}>
          <CartProvider value={cart}>{ui}</CartProvider>
        </ProductsProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};
