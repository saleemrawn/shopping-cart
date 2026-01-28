import { useContext, useEffect, useState } from "react";
import { CartContext } from "./App";
import { ShoppingCart, Plus, Minus, CircleCheckBig } from "lucide-react";
import styled from "styled-components";

const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: none;
  gap: ${(props) => props.theme.spacing.space24};
  box-shadow:
    rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) => (props.display === "grid" ? "column" : "row")};
    align-items: ${(props) => (props.display === "grid" ? "none" : "center")};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  background-color: ${(props) => props.theme.colours.grey200};
  padding: ${(props) => props.theme.spacing.space24};
  max-width: none;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: ${(props) => (props.display === "list" ? "13.75rem" : "none")};
  }
`;

const ProductMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: unset;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  padding: ${(props) => props.theme.spacing.space24};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) => (props.display === "grid" ? "column" : "row")};
    align-items: ${(props) => (props.display === "grid" ? "unset" : "center")};
    padding: ${(props) => (props.display === "grid" ? props.theme.spacing.space24 : `0 ${props.theme.spacing.space24} 0 0`)};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.space8};
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fonts.weights.regular};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  min-height: 2.5rem;
`;

const ProductPrice = styled.div`
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  font-size: ${(props) => props.theme.headings.desktop.h6};
`;

const ProductCardControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) => (props.display === "grid" ? "column" : "row")};
  }
`;

const ProductQuantity = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.space8};
  background-color: ${(props) => props.theme.colours.lavender};
  padding: ${(props) => props.theme.spacing.space6} ${(props) => props.theme.spacing.space12};
  font-family: inherit;
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  font-size: inherit;
  border: none;
  border-radius: 6.25rem;

  &:hover {
    background-color: ${(props) => props.theme.colours.sapphire};
    color: ${(props) => props.theme.colours.grey50};
  }
`;

const AddedToCartButton = styled(Button)`
  background-color: ${(props) => props.theme.colours.sapphire};
  color: white;

  &:disabled:hover {
    background-color: ${(props) => props.theme.colours.sapphire};
  }
`;

const Textbox = styled.input`
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  border-radius: 6.25rem;
  border: 0.0625rem solid ${(props) => props.theme.colours.grey400};
`;

const ProductCard = ({ id, imgUrl, name, description, price, quantity = 0, page = null, display }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [addedToCart, setAddedToCart] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const inCart = cartItems.some((item) => item.id === id);
    if (inCart) {
      setAddedToCart(true);
    }
  }, []);

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

  if (typeof id !== "number" || !imgUrl || !name || !description || typeof price !== "number") return null;

  return (
    <>
      <ProductCardWrapper display={display}>
        <ProductImage src={imgUrl} alt={description} display={display} />
        <ProductMainWrapper display={display}>
          <ProductInfo>
            <ProductName>{name}</ProductName>
            <ProductPrice>£{price}</ProductPrice>
          </ProductInfo>
          <ProductCardControls display={display}>
            <ProductQuantity>
              <Button
                type="button"
                aria-label={`decrease quantity for ${name}`}
                onClick={handleDecreaseQuantity}
                disabled={page !== "cart" && addedToCart}>
                <Minus />
              </Button>
              <label id={`${id}-quantity`} hidden>
                Quantity for {name}
              </label>
              <Textbox
                type="number"
                value={selectedQuantity}
                aria-labelledby={`${id}-quantity`}
                onChange={handleQuantityChange}
                disabled={page !== "cart" && addedToCart}
              />
              <Button
                type="button"
                aria-label={`increase quantity for ${name}`}
                onClick={handleIncreaseQuantity}
                disabled={page !== "cart" && addedToCart}>
                <Plus />
              </Button>
            </ProductQuantity>

            {page !== "cart" && !addedToCart && (
              <Button
                type="button"
                aria-label={`add ${name} to cart`}
                onClick={() => {
                  addToCart({ id: id, image: imgUrl, title: name, description: description, price: price, quantity: selectedQuantity });
                  setAddedToCart(true);
                }}>
                <ShoppingCart size={20} /> Add to Cart
              </Button>
            )}

            {page !== "cart" && addedToCart && (
              <AddedToCartButton disabled>
                <CircleCheckBig size={20} />
                Added to Cart
              </AddedToCartButton>
            )}

            {page === "cart" && (
              <Button type="button" aria-label={`remove ${name} from cart`} onClick={() => removeFromCart(id)}>
                Remove
              </Button>
            )}
          </ProductCardControls>
        </ProductMainWrapper>
      </ProductCardWrapper>
    </>
  );
};

export default ProductCard;
