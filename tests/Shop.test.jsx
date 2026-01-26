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

  it("renders correct list of products", async () => {
    render(renderWithProviders(<Shop />));

    const list = await screen.findByRole("list", { name: /trending/i });
    const products = within(list).getAllByRole("listitem");

    expect(products).toHaveLength(20);
  });
});
