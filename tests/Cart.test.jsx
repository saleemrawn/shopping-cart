import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { wrapWithProviders } from "./test-utils";
import Cart from "../src/components/Cart";

describe("Cart component", () => {
  let mockCart;

  beforeEach(() => {
    mockCart = {
      cartItems: [
        { id: 0, image: "product.jpg", title: "Product", description: "Lorem ipsum", price: 4.99 },
        { id: 1, image: "product.jpg", title: "Product", description: "Lorem ipsum", price: 4.99 },
        { id: 2, image: "product.jpg", title: "Product", description: "Lorem ipsum", price: 4.99 },
      ],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };
  });

  it("navbar rendered", () => {
    render(wrapWithProviders(<Cart />, { cart: mockCart }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", () => {
    render(wrapWithProviders(<Cart />, { cart: mockCart }));
    expect(screen.getByRole("heading", { name: /cart/i, level: 1 })).toBeInTheDocument();
  });

  it("renders correct list of products added to cart", () => {
    render(wrapWithProviders(<Cart />, { cart: mockCart }));

    const list = screen.getByRole("list", { name: "Items" });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(3);
  });

  it("displays message when no products added to cart", () => {
    const mockCart = {
      cartItems: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };
    render(wrapWithProviders(<Cart />, { cart: mockCart }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
