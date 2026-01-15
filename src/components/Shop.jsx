import useFetchProducts from "../fetch";
import HeroBanner from "./HeroBanner";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/shop-banner-desktop.jpg";
import MobileBanner from "../assets/shop-banner-mobile.jpg";

const Shop = () => {
  const { products, error, loading } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered.</p>;

  return (
    <>
      <Navbar />
      <HeroBanner images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
      <ProductList title="Trending" products={products} display="grid" />
    </>
  );
};

export default Shop;
