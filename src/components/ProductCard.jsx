import { useState } from "react";

const ProductCard = ({ id, imgUrl, name, description, price, page = null }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
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
          <button type="button" aria-label={`decrease quantity for ${name}`}>
            &#8722;
          </button>
          <label id={`${id}-quantity`} hidden>
            Quantity for {name}
          </label>
          <input type="number" value={quantity} aria-labelledby={`${id}-quantity`} onChange={handleQuantityChange} />
          <button type="button" aria-label={`increase quantity for ${name}`}>
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
