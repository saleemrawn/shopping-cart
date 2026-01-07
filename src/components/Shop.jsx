import useFetchProducts from "../fetch";
import Navbar from "./Navbar";
import ProductList from "./ProductList";

const Shop = () => {
  const { products, error, loading } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered.</p>;

  return (
    <>
      <Navbar />
      <h1 id="shop-heading">Shop</h1>
      <ProductList title="Trending" products={products} />
    </>
  );
};

export default Shop;
