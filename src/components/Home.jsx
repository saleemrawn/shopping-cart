import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import useFetchProducts from "../fetch";
import DesktopBanner from "../assets/home-banner-desktop.jpg";
import MobileBanner from "../assets/home-banner-mobile.jpg";

const Home = () => {
  const { products, error, loading } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered.</p>;

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner title="One Store, Infinite Options" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
        <ProductList title="Featured Products" products={products} display="grid" />
      </main>
    </>
  );
};

export default Home;
