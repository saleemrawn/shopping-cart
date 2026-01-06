import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Shop from "../src/components/Shop";

describe("Shop component", () => {
  it("navbar rendered", async () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    expect(await screen.findByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct page heading", async () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

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

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

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

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.getByText(/a network error was encountered./i)).toBeInTheDocument();
  });

  it("renders correct list of products", async () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    const list = await screen.findByRole("list", { name: /trending/i });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(20);
  });
});
