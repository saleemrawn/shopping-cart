import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import ProductList from "../src/components/ProductList";

describe("ProductList", () => {
  let mockProducts;

  beforeEach(() => {
    mockProducts = [
      { id: 0, image: "product_1.jpg", title: "Product 1", description: "product 1", price: 9.99 },
      { id: 1, image: "product_2.jpg", title: "Product 2", description: "product 2", price: 9.99 },
      { id: 2, image: "product_3.jpg", title: "Product 4", description: "product 3", price: 9.99 },
      { id: 3, image: "product_4.jpg", title: "Product 4", description: "product 4", price: 9.99 },
      { id: 4, image: "product_5.jpg", title: "Product 5", description: "product 5", price: 9.99 },
    ];
  });

  it("renders correct title heading", () => {
    render(renderWithProviders(<ProductList title="Cart" products={mockProducts} />));
    expect(screen.getByRole("heading", { name: "Cart", level: 2 })).toBeInTheDocument();
  });

  it("renders products with correct structure", () => {
    render(renderWithProviders(<ProductList title="Featured Products" products={mockProducts} />));

    const list = screen.getByRole("list", { name: "Featured Products" });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(5);
  });

  it("renders empty state when no products", () => {
    render(renderWithProviders(<ProductList products={[]} />));
    expect(screen.getByText(/no products available/i)).toBeInTheDocument();
  });

  it("display correct product details", () => {
    const mockProduct = [{ id: 0, image: "product.jpg", title: "Test Product", description: "Lorem Ipsum", price: 4.99 }];
    render(renderWithProviders(<ProductList products={mockProduct} />));
    expect(screen.getByRole("heading", { name: /test product/i, level: 3 })).toBeInTheDocument();
  });
});
