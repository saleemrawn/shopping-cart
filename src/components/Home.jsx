import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/home-banner-desktop.jpg";
import MobileBanner from "../assets/home-banner-mobile.jpg";
import { useProducts } from "./ProductProvider";
import Loader from "./Loader";

const Home = () => {
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
              <HeroBanner title="One Store, Infinite Options" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
              <ProductList title="Featured Products" products={products} display="grid" />
            </main>
          )}
        </>
      )}
    </>
  );
};

export default Home;
