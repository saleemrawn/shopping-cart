import { useState } from "react";
import { useCart } from "../CartProvider";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import styled from "styled-components";

const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.display === "grid" ? "column" : "row")};
  align-items: ${(props) => (props.display === "grid" ? "none" : "center")};
  gap: ${(props) => props.theme.spacing.space24};
  box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  background-color: ${(props) => props.theme.colours.grey200};
  padding: ${(props) => props.theme.spacing.space24};
  max-width: ${(props) => (props.display === "list" ? "13.75rem" : null)};
`;

const ProductMainWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.display === "grid" ? "column" : "row")};
  align-items: ${(props) => (props.display === "grid" ? "unset" : "center")};
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  padding: ${(props) => (props.display === "grid" ? props.theme.spacing.space24 : `0 ${props.theme.spacing.space24} 0 0`)};
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.space8};
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: ${(props) => props.theme.weights.regular};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  min-height: 2.5rem;
`;

const ProductPrice = styled.div`
  font-weight: ${(props) => props.theme.weights.bold};
  font-size: 1.25rem;
`;

const ProductCardControls = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.display === "grid" ? "column" : "row")};
  gap: 1.5rem;
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
  font-weight: ${(props) => props.theme.weights.bold};
  font-size: inherit;
  border: none;
  border-radius: 6.25rem;

  &:hover {
    background-color: ${(props) => props.theme.colours.sapphire};
    color: ${(props) => props.theme.colours.grey50};
  }
`;

const Textbox = styled.input`
  font-size: inherit;
  text-align: center;
  border-radius: 6.25rem;
  border: 0.0625rem solid ${(props) => props.theme.colours.grey400};
`;

const ProductCard = ({ id, imgUrl, name, description, price, page = null, display }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (numericValue < 0) {
      setQuantity(0);
      return;
    }

    if (numericValue > 100) {
      setQuantity(100);
      return;
    }

    setQuantity(value === "" ? "" : numericValue);
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 100) return;
    setQuantity(quantity + 1);
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
              <Button type="button" aria-label={`decrease quantity for ${name}`} onClick={handleDecreaseQuantity}>
                <Minus />
              </Button>
              <label id={`${id}-quantity`} hidden>
                Quantity for {name}
              </label>
              <Textbox type="number" value={quantity} aria-labelledby={`${id}-quantity`} onChange={handleQuantityChange} />
              <Button type="button" aria-label={`increase quantity for ${name}`} onClick={handleIncreaseQuantity}>
                <Plus />
              </Button>
            </ProductQuantity>
            {page === "cart" ? (
              <Button type="button" aria-label={`remove ${name} from cart`} onClick={() => removeFromCart(id)}>
                Remove
              </Button>
            ) : (
              <Button
                type="button"
                aria-label={`add ${name} to cart`}
                onClick={() => addToCart({ id: id, image: imgUrl, title: name, description: description, price: price })}>
                <ShoppingCart size={20} /> Add to Cart
              </Button>
            )}
          </ProductCardControls>
        </ProductMainWrapper>
      </ProductCardWrapper>
    </>
  );
};

export default ProductCard;
