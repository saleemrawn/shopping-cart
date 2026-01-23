import HeroBanner from "../src/components/HeroBanner";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";

describe("HeroBanner", () => {
  it("renders correct banner heading", () => {
    render(renderWithProviders(<HeroBanner title="End Of Year Sales" images={{}} />));
    expect(screen.getByRole("heading", { name: "End Of Year Sales", level: 1 })).toBeInTheDocument();
  });

  it("does not render banner if no title is provided", () => {
    render(renderWithProviders(<HeroBanner images={{}} />));
    expect(screen.queryByRole("heading", { name: "End Of Year Sales", level: 1 })).not.toBeInTheDocument();
  });

  it("renders mobile image source for mobile viewports", () => {
    render(renderWithProviders(<HeroBanner title="End of Year" images={{ desktop: "../banner-desktop.jpg", mobile: "../banner-mobile.jpg" }} />));

    const picture = screen.getByRole("presentation").parentElement;
    const mobileSource = picture.querySelector('source[media="(max-width: 600px)"]');

    expect(mobileSource).toBeInTheDocument();
    expect(mobileSource).toHaveAttribute("srcSet", "../banner-mobile.jpg");
  });

  it("renders desktop image as fallback", () => {
    render(renderWithProviders(<HeroBanner title="End of Year" images={{ desktop: "../banner-desktop.jpg", mobile: "../banner-mobile.jpg" }} />));

    const image = screen.getByRole("presentation");
    expect(image).toHaveAttribute("src", "../banner-desktop.jpg");
  });

  it("provides both mobile and desktop image sources", () => {
    render(renderWithProviders(<HeroBanner title="End of Year" images={{ desktop: "../banner-desktop.jpg", mobile: "../banner-mobile.jpg" }} />));

    const image = screen.getByRole("presentation");
    const picture = image.parentElement;
    const source = picture.querySelector("source");

    expect(source).toHaveAttribute("media", "(max-width: 600px)");
    expect(source).toHaveAttribute("srcSet", "../banner-mobile.jpg");
    expect(image).toHaveAttribute("src", "../banner-desktop.jpg");
  });
});
