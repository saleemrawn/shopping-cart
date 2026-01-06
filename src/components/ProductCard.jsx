import { useState } from "react";

const ProductCard = ({ id, imgUrl, name, description, price, page = null }) => {
  const [quantity, setQuantity] = useState(0);

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
      <div className="product-card">
        <div className="product-card-info">
          <img src={imgUrl} alt={description} />
          <h2 className="product-name">{name}</h2>
          <div className="product-price">{price}</div>
        </div>

        <div className="product-card-controls">
          <button type="button" aria-label={`decrease quantity for ${name}`} onClick={handleDecreaseQuantity}>
            &#8722;
          </button>
          <label id={`${id}-quantity`} hidden>
            Quantity for {name}
          </label>
          <input type="number" value={quantity} aria-labelledby={`${id}-quantity`} onChange={handleQuantityChange} />
          <button type="button" aria-label={`increase quantity for ${name}`} onClick={handleIncreaseQuantity}>
            &#43;
          </button>
          {page === "cart" ? (
            <button type="button" aria-label={`remove ${name} from cart`}>
              Remove
            </button>
          ) : (
            <button type="button" aria-label={`add ${name} to cart`}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
