import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import Shop from "../src/components/Shop";

describe("Shop component", () => {
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

  it("navbar rendered", () => {
    render(renderWithProviders(<Shop />, { products: mockProducts }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", () => {
    render(renderWithProviders(<Shop />, { products: mockProducts }));
    expect(screen.getByRole("heading", { name: /shop/i, level: 1 })).toBeInTheDocument();
  });

  it("displays loader when products are loading", async () => {
    render(
      renderWithProviders(<Shop />, {
        products: {
          products: [],
          loading: true,
          error: null,
        },
      }),
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("displays network error message when issue fetching products", async () => {
    render(
      renderWithProviders(<Shop />, {
        products: {
          products: [],
          loading: false,
          error: true,
        },
      }),
    );

    expect(screen.getByText(/a network error was encountered/i)).toBeInTheDocument();
  });

  it("renders correct list of products", () => {
    render(renderWithProviders(<Shop />, { products: mockProducts }));

    const list = screen.getByRole("list", { name: "Trending" });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(5);
  });
});
