import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import useFetchProducts from "../fetch";

const Home = () => {
  const { products, error, loading } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered.</p>;

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <HeroBanner />
      <ProductList title="Featured Products" products={products} />
    </>
  );
};

export default Home;
