import HeroBanner from "./HeroBanner";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/shop-banner-desktop.jpg";
import MobileBanner from "../assets/shop-banner-mobile.jpg";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";
import { useProducts } from "../providers/ProductsProvider";

const ProductsWrapper = styled.div`
  position: relative;
`;

const Shop = () => {
  const { products, error, loading } = useProducts();

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner title="Shop" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
        <ProductsWrapper>
          <Loader isLoading={loading} />
          {!loading && (
            <>
              {error && <ErrorMessage>A network error was encountered</ErrorMessage>}
              {products && !error && (
                <>
                  <ProductList title="Trending" products={products} display="grid" />
                </>
              )}
            </>
          )}
        </ProductsWrapper>
      </main>
    </>
  );
};

export default Shop;
