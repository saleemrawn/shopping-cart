import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroBanner from "../src/components/HeroBanner";
import TestImage from "../src/assets/banner.jpg";

describe("HeroBanner", () => {
  it("renders correct image passed to component", () => {
    const mockImage = { url: TestImage, description: "end of year sales" };

    render(<HeroBanner image={mockImage.url} description={mockImage.description} />);

    expect(screen.getByRole("img", { name: /end of year sales/i })).toBeInTheDocument();
  });

  it("renders no img element if no image is provided", () => {
    const mockImage = { url: "", description: "" };

    render(<HeroBanner image={mockImage.url} description={mockImage.description} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
