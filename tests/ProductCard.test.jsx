import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "../src/components/ProductCard";

const mockProducts = [
  { id: 0, imgUrl: "airfryer.jpg", name: "Airfryer", description: "airfryer", price: 4.99 },
  { id: 1, imgUrl: "saucepans.jpg", name: "Saucepans", description: "saucepans", price: 9.99 },
];

describe("ProductCard", () => {
  it("renders correct product names", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("heading", { name: /airfryer/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /saucepans/i, level: 2 })).toBeInTheDocument();
  });

  it("renders correct product prices", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("heading", { name: /airfryer/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /saucepans/i, level: 2 })).toBeInTheDocument();
  });

  it("renders quantity input textbox", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("textbox", { name: /quantity for airfryer/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /quantity for saucepans/i })).toBeInTheDocument();
  });

  it("renders correct product images", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("img", { name: /airfryer/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /saucepans/i })).toBeInTheDocument();
  });

  it("renders increase/decrease quantity buttons", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("button", { name: /increase quantity for airfryer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decrease quantity for airfryer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /increase quantity for saucepans/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decrease quantity for saucepans/i })).toBeInTheDocument();
  });

  it("renders quantity input textbox", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("textbox", { name: /quantity for airfryer/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /quantity for saucepans/i })).toBeInTheDocument();
  });

  it("renders add to cart button", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
        />
      </>
    );

    expect(screen.getByRole("button", { name: /add airfryer to cart/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add saucepans to cart/i })).toBeInTheDocument();
  });

  it("renders remove button if page is cart", () => {
    render(
      <>
        <ProductCard
          id={mockProducts[0].id}
          imgUrl={mockProducts[0].imgUrl}
          name={mockProducts[0].name}
          description={mockProducts[0].description}
          price={mockProducts[0].price}
          page="cart"
        />
        <ProductCard
          id={mockProducts[1].id}
          imgUrl={mockProducts[1].imgUrl}
          name={mockProducts[1].name}
          description={mockProducts[1].description}
          price={mockProducts[1].price}
          page="cart"
        />
      </>
    );

    expect(screen.getByRole("button", { name: /remove airfryer from cart/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove saucepans from cart/i })).toBeInTheDocument();
  });

  it("does not render product card if props is missing", () => {
    render(
      <>
        <ProductCard id={0} imgUrl={null} name={null} description={null} price={null} />
      </>
    );

    expect(screen.queryByRole("heading", { name: /airfryer/i, level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /airfryer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /add airfryer to cart/i })).not.toBeInTheDocument();
  });
});
