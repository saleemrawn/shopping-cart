import HeroBanner from "./HeroBanner";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/shop-banner-desktop.jpg";
import MobileBanner from "../assets/shop-banner-mobile.jpg";
import { useProducts } from "./ProductProvider";
import Loader from "./Loader";

const Shop = () => {
  const { products, error, loading } = useProducts();

  return (
    <>
      <Loader isLoading={loading} />
      {!loading && (
        <>
          <Navbar />
          {error && <div>A network error was encountered.</div>}
          {products && (
            <main>
              <HeroBanner title="Shop" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
              <ProductList title="Trending" products={products} display="grid" />
            </main>
          )}
        </>
      )}
    </>
  );
};

export default Shop;
