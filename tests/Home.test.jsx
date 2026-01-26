import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import Home from "../src/components/Home";

describe("Home component", () => {
  let mockProducts;

  beforeEach(() => {
    mockProducts = {
      products: [
        { id: 0, image: "product_1.jpg", title: "Product 1", description: "product 1", price: 9.99 },
        { id: 1, image: "product_2.jpg", title: "Product 2", description: "product 2", price: 9.99 },
        { id: 2, image: "product_3.jpg", title: "Product 4", description: "product 3", price: 9.99 },
        { id: 3, image: "product_4.jpg", title: "Product 4", description: "product 4", price: 9.99 },
        { id: 4, image: "product_5.jpg", title: "Product 5", description: "product 5", price: 9.99 },
      ],
      loading: false,
      error: null,
    };
  });

  it("navbar rendered", async () => {
    render(renderWithProviders(<Home />, { products: mockProducts }));
    expect(await screen.findByRole("navigation")).toBeInTheDocument();
  });

  it("hero banner rendered", async () => {
    render(renderWithProviders(<Home />, { products: mockProducts }));
    expect(await screen.findByTestId("hero-banner")).toBeInTheDocument();
  });

  it("featured products rendered", async () => {
    render(renderWithProviders(<Home />, { products: mockProducts }));

    const list = await screen.findByRole("list", { name: "Featured Products" });
    const products = within(list).getAllByRole("listitem");

    expect(await screen.findByRole("heading", { name: "Featured Products", level: 2 })).toBeInTheDocument();
    expect(products).toHaveLength(5);
  });
});
