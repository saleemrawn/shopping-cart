import { beforeEach, describe, expect, it, vi } from "vitest";
import { useParams } from "react-router";
import { render, screen } from "@testing-library/react";
import { wrapWithProviders } from "./test-utils";
import ProductDetails from "../src/components/ProductDetails";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("ProductDetails", () => {
  let mockCart;
  let mockProducts;

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ productId: "0" });

    mockCart = {
      cartItems: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };

    mockProducts = {
      products: [
        { id: 0, image: "product_one.jpg", title: "Product One", description: "Product Once perfect for outdoor running conditions.", price: 9.99 },
      ],
      loading: false,
      error: null,
    };
  });

  it("renders correctly", () => {
    const container = render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(container).toMatchSnapshot();
  });

  it("navbar rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("banner for free delivery rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByText(/free standard delivery on orders over £30/i)).toBeInTheDocument();
  });

  it("product image rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("img", { name: "Product One" })).toBeInTheDocument();
  });

  it("product name rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("heading", { name: "Product One", level: 1 })).toBeInTheDocument();
  });

  it("product price rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByText("£9.99")).toBeInTheDocument();
  });

  it("product description rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByText("Product Once perfect for outdoor running conditions.")).toBeInTheDocument();
  });

  it("minus qty button rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("button", { name: /decrease quantity for product one/i })).toBeInTheDocument();
  });

  it("plus qty button rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("button", { name: /increase quantity for product one/i })).toBeInTheDocument();
  });

  it("qty input rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("spinbutton", { name: /quantity for product one/i })).toBeInTheDocument();
  });

  it("add to cart button rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("button", { name: /add product one to cart/i })).toBeInTheDocument();
  });

  it("go to cart link rendered", () => {
    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));
    expect(screen.getByRole("link", { name: /go to cart/i })).toBeInTheDocument();
  });

  it("product added to cart renders added to cart button", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const button = screen.getByRole("button", { name: /add product one to cart/i });
    await user.click(button);

    expect(screen.getByRole("button", { name: /added product one to cart/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /added product one to cart/i })).toBeDisabled();
    expect(screen.queryByRole("button", { name: /add product one to cart/i })).not.toBeInTheDocument();
  });

  it("type 10 into qty input field", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const input = screen.getByRole("spinbutton", { name: /quantity for product one/i });
    await user.type(input, "10");

    expect(input).toHaveValue(10);
  });

  it("typing 200 displays 100 in qty input field", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const input = screen.getByRole("spinbutton", { name: /quantity for product one/i });
    await user.type(input, "200");

    expect(input).toHaveValue(100);
  });

  it("letters not allowed in qty input field", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const input = screen.getByRole("spinbutton", { name: /quantity for product one/i });
    await user.clear(input);
    await user.type(input, "abc");

    expect(input).toHaveValue(null);
  });

  it("characters not allowed in qty input field", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const input = screen.getByRole("spinbutton", { name: /quantity for product one/i });
    await user.clear(input);
    await user.type(input, "@#");

    expect(input).toHaveValue(null);
  });

  it("clicking plus qty button displays 1 from 0 in qty input", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const button = screen.getByRole("button", { name: /increase quantity for product one/i });
    const input = screen.getByRole("spinbutton", { name: /quantity for product one/i });

    await user.click(button);

    expect(input).toHaveValue(1);
  });

  it("clicking minus qty button displays 4 from 5 in qty input", async () => {
    const user = userEvent.setup();

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    const button = screen.getByRole("button", { name: /decrease quantity for product one/i });
    const input = screen.getByRole("spinbutton", { name: /quantity for product one/i });

    await user.type(input, "5");
    await user.click(button);

    expect(input).toHaveValue(4);
  });

  it("displays product not found message", async () => {
    const mockProducts = {
      products: [],
      loading: false,
      error: null,
    };

    render(wrapWithProviders(<ProductDetails />, { cart: mockCart, products: mockProducts }));

    expect(screen.getByText(/product not found/i)).toBeInTheDocument();
  });
});
