import { createContext, useContext } from "react";

const CartContext = createContext(null);

export function CartProvider({ value, children }) {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
