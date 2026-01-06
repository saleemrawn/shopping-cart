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

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: /home/i, level: 1 }));

    const link = screen.getByRole("link", { name: "Shop" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: /shop/i, level: 1 }));
  });

  it("navigate to cart page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: /home/i, level: 1 }));

    const link = screen.getByRole("link", { name: "Cart" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: /cart/i, level: 1 }));
  });

  it("navigate back to home page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: /cart/i, level: 1 }));

    const link = screen.getByRole("link", { name: "Home" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: /home/i, level: 1 }));
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
