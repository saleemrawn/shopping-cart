import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/home-banner-desktop.jpg";
import MobileBanner from "../assets/home-banner-mobile.jpg";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";
import { useProducts } from "./ProductProvider";

const ProductsWrapper = styled.div`
  position: relative;
`;

const Home = () => {
  const { products, error, loading } = useProducts();

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner title="One Store, Infinite Options" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
        <ProductsWrapper>
          <Loader isLoading={loading} />
          {!loading && (
            <>
              {error && <ErrorMessage>A network error was encountered</ErrorMessage>}
              {products && !error && (
                <>
                  <ProductList title="Featured Products" products={products.slice(0, 5)} display="grid" />
                </>
              )}
            </>
          )}
        </ProductsWrapper>
      </main>
    </>
  );
};

export default Home;
