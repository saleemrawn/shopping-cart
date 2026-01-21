import styled from "styled-components";
import { Link } from "react-router";
import { Menu, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../CartProvider";

const StyledNavbar = styled.nav`
  position: relative;
  height: ${(props) => props.theme.spacing.space80};
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  background-color: ${(props) => props.theme.colours.white};
  color: ${(props) => props.theme.colours.lightblack};
  padding-left: ${(props) => props.theme.spacing.space24};
`;

const LogoWrapper = styled.div`
  height: inherit;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 2rem;
  text-transform: lowercase;
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: ${(props) => props.theme.weights.black};
`;

const NavLinksList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    height: inherit;
    flex-direction: row;
  }
`;

const NavLinksListItem = styled.li`
  height: inherit;

  &:first-child {
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    &:first-child {
      width: auto;
    }
  }
`;

const NavLinks = styled.div`
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.colours.sapphire};
  width: 100vw;
  z-index: 2;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    height: inherit;
    flex-direction: row;
    justify-self: end;
    background-color: ${(props) => props.theme.colours.white};
    position: relative;
    width: auto;
  }
`;

const StyledLogoLink = styled(Link)`
  height: inherit;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: ${(props) => props.theme.weights.bold};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colours.chambray};
  }
`;

const StyledNavLink = styled(Link)`
  height: inherit;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.space16};
  text-decoration: none;
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: ${(props) => props.theme.weights.black};
  font-size: ${(props) => props.theme.headings.mobile.hero};
  padding: 0 ${(props) => props.theme.spacing.space40};
  color: ${(props) => props.theme.colours.white};

  &:hover {
    background-color: ${(props) => props.theme.colours.sapphire};
    color: ${(props) => props.theme.colours.white};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    gap: ${(props) => props.theme.spacing.space4};
    font-size: 1rem;
    color: ${(props) => props.theme.colours.grey900};
  }
`;

const HamburgerWrapper = styled.div`
  height: inherit;
  display: flex;
  justify-content: flex-end;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0 ${(props) => props.theme.spacing.space24};

  &:hover {
    background-color: lightgrey;
  }
`;

const CloseNavButton = styled.button`
  height: inherit;
  width: inherit;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.space8};
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-weight: ${(props) => props.theme.weights.black};
  font-size: ${(props) => props.theme.headings.mobile.hero};
  color: ${(props) => props.theme.colours.white};
  padding-left: ${(props) => props.theme.spacing.space40};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const CartQuantity = styled.div`
  height: ${(props) => props.theme.spacing.space32};
  width: ${(props) => props.theme.spacing.space32};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: ${(props) => props.theme.weights.bold};
  background-color: ${(props) => props.theme.colours.white};
  color: ${(props) => props.theme.colours.sapphire};
  border-radius: 6.25rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    height: 1.25rem;
    width: 1.25rem;
    font-size: 0.875rem;
    background-color: ${(props) => props.theme.colours.sapphire};
    color: ${(props) => props.theme.colours.white};
  }
`;

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(window.innerWidth >= 992);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const { cartItems } = useCart();

  useEffect(() => {
    window.addEventListener("resize", handleBrowserResize);

    return () => {
      window.removeEventListener("resize", handleBrowserResize);
    };
  }, []);

  const handleBrowserResize = () => {
    setBrowserWidth(window.innerWidth);
    if (window.innerWidth < 992) setNavOpen(false);
    if (window.innerWidth >= 992) setNavOpen(true);
  };

  const handleNavToggle = () => {
    if (navOpen) {
      setNavOpen(false);
      return;
    }

    setNavOpen(true);
  };

  return (
    <StyledNavbar>
      <LogoWrapper>
        <StyledLogoLink to="/">
          <Logo>Multiproducts</Logo>
        </StyledLogoLink>
      </LogoWrapper>

      {window.innerWidth < 992 ? (
        <HamburgerWrapper>
          <HamburgerButton onClick={handleNavToggle}>
            <Menu strokeWidth={3} />
          </HamburgerButton>
        </HamburgerWrapper>
      ) : null}

      {navOpen ? (
        <NavLinks>
          <NavLinksList>
            {window.innerWidth < 992 ? (
              <NavLinksListItem>
                <CloseNavButton onClick={handleNavToggle}>
                  <CircleX strokeWidth={3} />
                  Close
                </CloseNavButton>
              </NavLinksListItem>
            ) : null}

            <NavLinksListItem>
              <StyledNavLink
                to="/"
                onClick={() => {
                  window.innerWidth < 992 && setNavOpen(false);
                }}>
                Home
              </StyledNavLink>
            </NavLinksListItem>

            <NavLinksListItem>
              <StyledNavLink
                to="/shop"
                onClick={() => {
                  window.innerWidth < 992 && setNavOpen(false);
                }}>
                Shop
              </StyledNavLink>
            </NavLinksListItem>

            <NavLinksListItem>
              <StyledNavLink
                to="/cart"
                onClick={() => {
                  window.innerWidth < 992 && setNavOpen(false);
                }}>
                Cart
                <CartQuantity>{cartItems.length}</CartQuantity>
              </StyledNavLink>
            </NavLinksListItem>
          </NavLinksList>
        </NavLinks>
      ) : null}
    </StyledNavbar>
  );
};

export default Navbar;
