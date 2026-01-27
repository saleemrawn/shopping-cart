import userEvent from "@testing-library/user-event";
import Navbar from "../src/components/Navbar";
import routes from "../src/routes";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { renderWithProviders } from "./test-utils";
import { act } from "react";

describe("Navbar component", () => {
  let mockCart;

  beforeEach(() => {
    mockCart = {
      cartItems: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };
  });

  it("logo rendered in navbar", () => {
    render(renderWithProviders(<Navbar />, { cart: mockCart }));
    expect(screen.getByText(/multiproducts/i)).toBeInTheDocument();
  });

  it("home link rendered in navbar", () => {
    render(renderWithProviders(<Navbar />, { cart: mockCart }));
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("shop link rendered in navbar", () => {
    render(renderWithProviders(<Navbar />, { cart: mockCart }));
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
  });

  it("cart link & cart quantity rendered in navbar", () => {
    mockCart = {
      cartItems: [
        { id: 0, image: "product.jpg", title: "Product", description: "Lorem ipsum", price: 4.99 },
        { id: 1, image: "product.jpg", title: "Product", description: "Lorem ipsum", price: 4.99 },
        { id: 2, image: "product.jpg", title: "Product", description: "Lorem ipsum", price: 4.99 },
      ],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };

    render(renderWithProviders(<Navbar />, { cart: mockCart }));
    expect(screen.getByRole("link", { name: "Cart 3" })).toBeInTheDocument();
  });

  it("cart quantity displays 3 items in navbar", () => {
    render(renderWithProviders(<Navbar />, { cart: mockCart }));
    expect(screen.getByRole("link", { name: "Cart 0" })).toBeInTheDocument();
  });

  it("navigate to shop page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "One Store, Infinite Options", level: 1 })).toBeInTheDocument();

    const link = await screen.findByRole("link", { name: "Shop" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: "Shop", level: 1 })).toBeInTheDocument();
  });

  it("navigate to cart page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "One Store, Infinite Options", level: 1 })).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Cart 0" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: "Cart", level: 1 })).toBeInTheDocument();
  });

  it("navigate back to home page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Cart", level: 1 })).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Home" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: "One Store, Infinite Options", level: 1 })).toBeInTheDocument();
  });

  it("displays error page for bad route", () => {
    const badRoute = "/some/bad-route";
    const router = createMemoryRouter(routes, {
      initialEntries: [badRoute],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading").textContent).toMatch(/oops!/i);
    expect(screen.getByText("Sorry, an unexpected error has occurred.")).toBeInTheDocument();
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });

  it("hamburger button renders in mobile navbar", async () => {
    render(renderWithProviders(<Navbar />, { cart: mockCart }));

    await act(async () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByRole("button", { name: "navigation menu" })).toBeInTheDocument();
  });

  it("close button renders in mobile navbar", async () => {
    const user = userEvent.setup();

    render(renderWithProviders(<Navbar />, { cart: mockCart }));

    await act(async () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event("resize"));
    });

    const link = screen.getByRole("button", { name: "navigation menu" });
    await user.click(link);

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});
