import { useCart } from "../providers/CartProvider";
import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/cart-banner-desktop.jpg";
import MobileBanner from "../assets/cart-banner-mobile.jpg";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <>
      <Navbar />
      <HeroBanner title="Cart" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
      <ProductList title="Items" products={cartItems} page="cart" display="list" />
    </>
  );
};

export default Cart;
