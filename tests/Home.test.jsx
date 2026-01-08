import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import Home from "../src/components/Home";

describe("Home component", () => {
  it("navbar rendered", async () => {
    render(renderWithProviders(<Home />));
    expect(await screen.findByRole("navigation")).toBeInTheDocument();
  });

  it("hero banner rendered", async () => {
    render(renderWithProviders(<Home />));
    expect(await screen.findByTestId("hero-banner")).toBeInTheDocument();
  });

  it("featured products rendered", async () => {
    render(renderWithProviders(<Home />));

    const list = await screen.findByRole("list", { name: "Featured Products" });
    const products = within(list).getAllByRole("listitem");

    expect(await screen.findByRole("heading", { name: "Featured Products", level: 2 })).toBeInTheDocument();
    expect(products).toHaveLength(20);
  });
});
