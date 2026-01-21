import HeroBanner from "./HeroBanner";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/shop-banner-desktop.jpg";
import MobileBanner from "../assets/shop-banner-mobile.jpg";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useProducts } from "./ProductProvider";

const Shop = () => {
  const { products, error, loading } = useProducts();

  return (
    <>
      <Loader isLoading={loading} />
      {!loading && (
        <>
          <Navbar />
          {products && (
            <main>
              <HeroBanner title="Shop" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
              <ProductList title="Trending" products={products} display="grid" />
              {error && <ErrorMessage>A network error was encountered</ErrorMessage>}
            </main>
          )}
        </>
      )}
    </>
  );
};

export default Shop;
