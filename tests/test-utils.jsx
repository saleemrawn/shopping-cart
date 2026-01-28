import theme from "../src/theme";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { CartContext } from "../src/components/App";
import { ProductsContext } from "../src/components/App";

export const wrapWithProviders = (
  ui,
  { cart = { cartItems: [], addToCart: vi.fn(), removeFromCart: vi.fn() }, products = { products: [], error: false, loading: false } } = {},
) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ProductsContext value={products}>
          <CartContext value={cart}>{ui}</CartContext>
        </ProductsContext>
      </ThemeProvider>
    </MemoryRouter>
  );
};
