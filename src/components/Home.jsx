import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/home-banner-desktop.jpg";
import MobileBanner from "../assets/home-banner-mobile.jpg";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useProducts } from "./ProductProvider";

const Home = () => {
  const { products, error, loading } = useProducts();

  return (
    <>
      <Loader isLoading={loading} />
      {!loading && (
        <>
          <Navbar />
          {products && (
            <main>
              <HeroBanner title="One Store, Infinite Options" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
              <ProductList title="Featured Products" products={products.slice(0, 5)} display="grid" />
              {error && <ErrorMessage>A network error was encountered</ErrorMessage>}
            </main>
          )}
        </>
      )}
    </>
  );
};

export default Home;
