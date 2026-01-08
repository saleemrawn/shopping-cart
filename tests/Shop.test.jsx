import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import Shop from "../src/components/Shop";

describe("Shop component", () => {
  it("navbar rendered", async () => {
    render(renderWithProviders(<Shop />));
    expect(await screen.findByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", async () => {
    render(renderWithProviders(<Shop />));
    expect(await screen.findByRole("heading", { name: /shop/i, level: 1 })).toBeInTheDocument();
  });

  it("displays loading message when products are loading", async () => {
    vi.resetModules();

    vi.doMock("../src/fetch", () => ({
      default: vi.fn(() => ({
        products: [],
        loading: true,
        error: null,
      })),
    }));

    const { default: Shop } = await import("../src/components/Shop");

    render(renderWithProviders(<Shop />));

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("displays network error message when issue fetching products", async () => {
    vi.resetModules();

    vi.doMock("../src/fetch", () => ({
      default: vi.fn(() => ({
        products: [],
        loading: false,
        error: true,
      })),
    }));

    const { default: Shop } = await import("../src/components/Shop");

    render(renderWithProviders(<Shop />));

    expect(screen.getByText(/a network error was encountered./i)).toBeInTheDocument();
  });

  it("renders correct list of products", async () => {
    render(renderWithProviders(<Shop />));

    const list = await screen.findByRole("list", { name: /trending/i });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(20);
  });
});
