import styled from "styled-components";
import ProductCard from "./ProductCard";

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-rows: repeat(2, 1fr);
  gap: ${(props) => props.theme.spacing.space40} ${(props) => props.theme.spacing.space16};
  margin: 0 ${(props) => props.theme.spacing.space24};
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.weights.black};
  margin: ${(props) => props.theme.spacing.space40} 0;
  text-align: center;
`;

const ProductList = ({ title, products, page }) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      {products.length > 0 ? (
        <StyledProductList aria-labelledby="product-list-heading">
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
        </StyledProductList>
      ) : (
        <div>No products</div>
      )}
    </>
  );
};

export default ProductList;
