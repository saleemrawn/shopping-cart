import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import Cart from "../src/components/Cart";

describe("Cart component", () => {
  let mockCart;

  beforeEach(() => {
    mockCart = {
      cartItems: [{ id: 0, imgUrl: "product.jpg", name: "Product", description: "Lorem ipsum", price: 4.99 }],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };
  });

  it("navbar rendered", () => {
    render(renderWithProviders(<Cart />, { cart: mockCart }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", () => {
    render(renderWithProviders(<Cart />, { cart: mockCart }));
    expect(screen.getByRole("heading", { name: /cart/i, level: 1 })).toBeInTheDocument();
  });
});
