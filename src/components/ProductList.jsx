import ProductCard from "./ProductCard";

const ProductList = ({ title, products, page }) => {
  return (
    <>
      {title && <h2 id="product-list-heading">{title}</h2>}
      {products.length > 0 ? (
        <ul aria-labelledby="product-list-heading">
          {products.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard
                  id={product.id}
                  imgUrl={product.image}
                  name={product.title}
                  description={product.description}
                  price={product.price}
                  page={page}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No products</div>
      )}
    </>
  );
};

export default ProductList;
