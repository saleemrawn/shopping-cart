const ProductCard = ({ id, imgUrl, name, description, price, page = null }) => {
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
          <input type="text" value="0" aria-labelledby={`${id}-quantity`} />
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
