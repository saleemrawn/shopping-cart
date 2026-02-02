import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ShoppingCart, Plus, Minus, CircleCheckBig } from "lucide-react";
import { CartContext, ProductsContext } from "./App";
import { formatPrice } from "../utils";
import styled from "styled-components";
import Loader from "./Loader";
import Navbar from "./Navbar";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.space160};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 60rem;
  }
`;

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${(props) => props.theme.spacing.space40};
    padding: 0 ${(props) => props.theme.spacing.space24};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 9 / 16;
  object-fit: contain;
  background-color: ${(props) => props.theme.colours.grey200};
  padding: ${(props) => props.theme.spacing.space24};
  max-width: none;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.space8};
  padding: 0 ${(props) => props.theme.spacing.space16};
`;

const ProductName = styled.h1`
  font-weight: ${(props) => props.theme.fonts.weights.regular};
  font-size: ${(props) => props.theme.headings.desktop.h3};
`;

const ProductDescription = styled.p``;

const ProductPrice = styled.div`
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  font-size: ${(props) => props.theme.headings.desktop.h3};
`;

const ProductControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductQuantity = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddedToCartButton = styled(Button)`
  background-color: ${(props) => props.theme.colours.sapphire};
  color: white;

  &:disabled:hover {
    background-color: ${(props) => props.theme.colours.sapphire};
  }
`;

const QuantityInput = styled.input`
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  border-radius: 6.25rem;
  border: 0.0625rem solid ${(props) => props.theme.colours.grey400};
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  background-color: ${(props) => props.theme.colours.grey900};
  color: ${(props) => props.theme.colours.white};
  padding: ${(props) => props.theme.spacing.space8} 0;
`;

const CartLink = styled(Link)`
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  text-align: center;
`;

const ProductDetails = () => {
  const { products } = useContext(ProductsContext);
  const { cartItems, addToCart } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    const product = products?.find((product) => product.id === Number(productId));
    if (product) {
      setCurrentProduct(product);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [products, productId]);

  useEffect(() => {
    const inCart = cartItems.some((item) => item.id === currentProduct?.id);
    if (inCart) {
      setAddedToCart(true);
    }
  }, [cartItems, currentProduct]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (numericValue < 0) {
      setSelectedQuantity(0);
      return;
    }

    if (numericValue > 100) {
      setSelectedQuantity(100);
      return;
    }

    setSelectedQuantity(value === "" ? "" : numericValue);
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity <= 0) return;
    setSelectedQuantity(selectedQuantity - 1);
  };

  const handleIncreaseQuantity = () => {
    if (selectedQuantity >= 100) return;
    setSelectedQuantity(selectedQuantity + 1);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!currentProduct) {
    return <ErrorMessage>Product not found</ErrorMessage>;
  }

  return (
    <>
      <Navbar />
      <Banner>Free standard delivery on orders over £30</Banner>
      <Main>
        <DetailsWrapper>
          <ProductImage src={currentProduct.image} alt={currentProduct.title} />

          <ProductInfo>
            <ProductName>{currentProduct.title}</ProductName>
            <ProductPrice>£{formatPrice(currentProduct.price)}</ProductPrice>
            <ProductDescription>{currentProduct.description}</ProductDescription>
            <ProductControls>
              <ProductQuantity>
                <Button
                  type="button"
                  aria-label={`decrease quantity for ${currentProduct.title}`}
                  onClick={handleDecreaseQuantity}
                  disabled={addedToCart}>
                  <Minus />
                </Button>
                <label id={`${currentProduct.id}-quantity`} hidden>
                  Quantity for {currentProduct.title}
                </label>
                <QuantityInput
                  type="number"
                  value={selectedQuantity}
                  aria-labelledby={`${currentProduct.id}-quantity`}
                  onChange={handleQuantityChange}
                  disabled={addedToCart}
                />
                <Button
                  type="button"
                  aria-label={`increase quantity for ${currentProduct.title}`}
                  onClick={handleIncreaseQuantity}
                  disabled={addedToCart}>
                  <Plus />
                </Button>
              </ProductQuantity>

              {!addedToCart ? (
                <Button
                  type="button"
                  aria-label={`add ${currentProduct.title} to cart`}
                  onClick={() => {
                    addToCart({
                      id: currentProduct.id,
                      image: currentProduct.image,
                      title: currentProduct.title,
                      description: currentProduct.description,
                      price: currentProduct.price,
                      quantity: selectedQuantity,
                    });
                    setAddedToCart(true);
                  }}>
                  <ShoppingCart size={20} /> Add to Cart
                </Button>
              ) : (
                <AddedToCartButton aria-label={`added ${currentProduct.title} to cart`} disabled>
                  <CircleCheckBig size={20} />
                  Added to Cart
                </AddedToCartButton>
              )}

              <CartLink to="/cart" viewTransition>
                Go to cart
              </CartLink>
            </ProductControls>
          </ProductInfo>
        </DetailsWrapper>
      </Main>
    </>
  );
};

export default ProductDetails;
