import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Cart from "../src/components/Cart";

describe("Cart component", () => {
  it("navbar rendered", () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /cart/i, level: 1 })).toBeInTheDocument();
  });
});
