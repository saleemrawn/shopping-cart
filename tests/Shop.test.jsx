import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Shop from "../src/components/Shop";

describe("Shop component", () => {
  it("navbar rendered", () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /shop/i, level: 1 })).toBeInTheDocument();
  });
});
