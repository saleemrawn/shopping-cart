import theme from "../src/theme";
import { MemoryRouter } from "react-router";
import { CartProvider } from "../src/CartProvider";
import { ThemeProvider } from "styled-components";

export const renderWithProviders = (ui, { cart = {} } = {}) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CartProvider value={cart}>{ui}</CartProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};
