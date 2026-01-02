import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ProductList from "../src/components/ProductList";

describe("ProductList", () => {
  it("renders correct title heading", () => {
    const mockProducts = [
      { id: 0, imgUrl: "product.jpg", name: "Product 1", description: "Lorem Ipsum" },
      { id: 1, imgUrl: "product.jpg", name: "Product 2", description: "Lorem Ipsum" },
    ];

    render(<ProductList title="Cart" products={mockProducts} />);
    expect(screen.getByRole("heading", { name: "Cart", level: 2 })).toBeInTheDocument();
  });

  it("renders products with correct structure", () => {
    const mockProducts = [
      { id: 0, imgUrl: "product.jpg", name: "Product 1", description: "Lorem Ipsum" },
      { id: 1, imgUrl: "product.jpg", name: "Product 2", description: "Lorem Ipsum" },
    ];

    render(<ProductList title="Featured Products" products={mockProducts} />);

    const list = screen.getByRole("list", { name: "Featured Products" });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(2);
  });

  it("renders empty state when no products", () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText(/no products/i)).toBeInTheDocument();
  });

  it("display correct product details", () => {
    const mockProduct = [
      { id: 0, imgUrl: "product.jpg", name: "Test Product", description: "Lorem Ipsum", price: 4.99 },
    ];

    render(<ProductList products={mockProduct} />);

    expect(screen.getByRole("heading", { name: /test product/i, level: 2 })).toBeInTheDocument();
  });
});
