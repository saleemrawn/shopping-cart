import { Link } from "react-router";
import styled from "styled-components";

const StyledNavbar = styled.nav`
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
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: ${(props) => props.theme.weights.black};
  font-size: 2rem;
  text-transform: lowercase;
`;

const NavLinksList = styled.ul`
  height: inherit;
  display: flex;
`;

const NavLinksListItem = styled.li`
  height: inherit;
`;

const NavLinks = styled.div`
  height: inherit;
  display: flex;
  justify-self: end;
`;

const StyledLogoLink = styled(Link)`
  height: inherit;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: ${(props) => props.theme.weights.bold};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colours.green};
  }
`;

const StyledNavLink = styled(Link)`
  height: inherit;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: ${(props) => props.theme.weights.bold};
  padding: 0 ${(props) => props.theme.spacing.space40};
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colours.green};
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <LogoWrapper>
        <StyledLogoLink to="/">
          <Logo>Multiproducts</Logo>
        </StyledLogoLink>
      </LogoWrapper>
      <NavLinks>
        <NavLinksList>
          <NavLinksListItem>
            <StyledNavLink to="/">Home</StyledNavLink>
          </NavLinksListItem>
          <NavLinksListItem>
            <StyledNavLink to="/shop">Shop</StyledNavLink>
          </NavLinksListItem>
          <NavLinksListItem>
            <StyledNavLink to="/cart">Cart</StyledNavLink>
          </NavLinksListItem>
        </NavLinksList>
      </NavLinks>
    </StyledNavbar>
  );
};

export default Navbar;
