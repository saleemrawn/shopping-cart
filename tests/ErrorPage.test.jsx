import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useRouteError } from "react-router";
import ErrorPage from "../src/components/ErrorPage";

vi.mock("react-router", () => ({
  useRouteError: vi.fn(),
}));

describe("ErrorPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the generic error UI", () => {
    useRouteError.mockReturnValue({
      message: "Something went wrong!",
    });

    render(<ErrorPage />);

    expect(screen.getByText(/oops!/i)).toBeInTheDocument();
    expect(screen.getByText(/sorry, an unexpected error has occurred./i)).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    useRouteError.mockReturnValue({ message: "Route failed to load" });

    render(<ErrorPage />);

    expect(screen.getByText(/route failed to load/i)).toBeInTheDocument();
  });

  it("prefers statusText over message when both exist", () => {
    useRouteError.mockReturnValue({
      statusText: "Not Found",
      message: "This should not be shown",
    });

    render(<ErrorPage />);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    expect(screen.queryByText(/this should not be shown/i)).not.toBeInTheDocument();
  });

  it("handles missing error gracefully", () => {
    useRouteError.mockReturnValue({});

    render(<ErrorPage />);

    const italic = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === "i";
    });

    expect(italic).toBeInTheDocument();
    expect(screen.getByText(/unknown error/i)).toBeInTheDocument();
  });
});
