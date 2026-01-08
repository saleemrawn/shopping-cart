import { MemoryRouter } from "react-router";
import { CartProvider } from "../src/CartProvider";

export const renderWithProviders = (ui, { cart = {} } = {}) => {
  return (
    <MemoryRouter>
      <CartProvider value={cart}>{ui}</CartProvider>
    </MemoryRouter>
  );
};
