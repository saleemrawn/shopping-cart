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
      <Navbar />
      <main>
        <HeroBanner title="Shop" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
        <Loader isLoading={loading} />
        {!loading && (
          <>
            {products && (
              <>
                <ProductList title="Trending" products={products} display="grid" />
                {error && <ErrorMessage>A network error was encountered</ErrorMessage>}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Shop;
