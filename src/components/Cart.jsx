import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import DesktopBanner from "../assets/cart-banner-desktop.jpg";
import MobileBanner from "../assets/cart-banner-mobile.jpg";
import { useContext } from "react";
import { CartContext } from "./App";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <Navbar />
      <HeroBanner title="Cart" images={{ desktop: DesktopBanner, mobile: MobileBanner }} />
      <ProductList title="Items" products={cartItems} page="cart" display="list" />
    </>
  );
};

export default Cart;
