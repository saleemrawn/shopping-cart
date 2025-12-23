import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../src/components/Home";
import { BrowserRouter } from "react-router";

describe("Home component", () => {
  it("navbar rendered", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("hero banner rendered", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("img", { name: "hero banner" })).toBeInTheDocument();
  });

  it("featured products rendered", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const list = screen.getByRole("list", { name: "Featured Products" });
    const products = within(list).getAllByRole("listitem");

    expect(screen.getByRole("heading", { name: "Featured Products", level: 2 })).toBeInTheDocument();
    expect(products).toHaveLength(10);
  });
});
