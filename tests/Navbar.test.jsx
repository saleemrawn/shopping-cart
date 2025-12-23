import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, createMemoryRouter, RouterProvider } from "react-router";
import Navbar from "../src/components/Navbar";
import userEvent from "@testing-library/user-event";
import routes from "../src/routes";

describe("Navbar component", () => {
  it("logo rendered in navbar", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    expect(screen.getByRole("img", { name: "logo" })).toBeInTheDocument();
  });

  it("home link rendered in navbar", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("shop link rendered in navbar", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
  });

  it("cart link rendered in navbar", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });

  it("navigate to shop page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/home/i);

    const link = screen.getByRole("link", { name: "Shop" });
    await user.click(link);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/shop/i);
  });

  it("navigate to cart page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/home/i);

    const link = screen.getByRole("link", { name: "Cart" });
    await user.click(link);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/cart/i);
  });

  it("navigate back to home page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/cart/i);

    const link = screen.getByRole("link", { name: "Home" });
    await user.click(link);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/home/i);
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
});
