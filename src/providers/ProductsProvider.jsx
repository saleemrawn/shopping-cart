import { createContext, useContext } from "react";

const ProductsContext = createContext(null);

export const ProductsProvider = ({ value, children }) => {
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error("useProducts must be used within ProductsProvider");
  }

  return ctx;
};
