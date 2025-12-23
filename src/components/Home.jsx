import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import FeaturedProducts from "./FeaturedProducts";
import TestProducts from "../products";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <HeroBanner />
      <FeaturedProducts products={TestProducts} />
    </>
  );
};

export default Home;
