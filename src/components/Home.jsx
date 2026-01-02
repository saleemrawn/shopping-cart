import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import TestProducts from "../products";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <HeroBanner />
      <ProductList title="Featured Products" products={TestProducts} />
    </>
  );
};

export default Home;
