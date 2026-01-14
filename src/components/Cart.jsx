import { useCart } from "../CartProvider";
import Navbar from "./Navbar";
import ProductList from "./ProductList";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <>
      <Navbar />
      <h1 id="cart-heading">Cart</h1>
      <ProductList title="Items" products={cartItems} page="cart" display="list" />
    </>
  );
};

export default Cart;
