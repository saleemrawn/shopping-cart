import styled from "styled-components";
import ProductCard from "./ProductCard";
import Title from "./Title";

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: ${(props) => (props.display === "grid" ? "repeat(auto-fill, minmax(320px, 1fr))" : "1fr")};
  grid-template-rows: ${(props) => (props.display === "grid" ? "repeat(2, 1fr)" : "1fr")};
  gap: ${(props) => props.theme.spacing.space40} ${(props) => props.theme.spacing.space24};
  margin: 0 ${(props) => props.theme.spacing.space24};
`;

const StyledTitle = styled(Title)`
  margin: ${(props) => props.theme.spacing.space40} 0;
  text-align: center;
`;

const ProductsMessage = styled.div`
  font-weight: ${(props) => props.theme.weights.bold};
  text-align: center;
`;

const ProductList = ({ title, products, page, display }) => {
  return (
    <>
      {title && <StyledTitle level={2}>{title}</StyledTitle>}
      {products.length > 0 && (
        <StyledProductList aria-labelledby="product-list-heading" display={display}>
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
                  display={display}
                />
              </li>
            );
          })}
        </StyledProductList>
      )}
      {products.length === 0 && page === "cart" && <ProductsMessage>Your cart is empty</ProductsMessage>}
      {products.length === 0 && page !== "cart" && <ProductsMessage>No products available</ProductsMessage>}
    </>
  );
};

export default ProductList;
