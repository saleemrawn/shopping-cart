import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  background-color: ${(props) => props.theme.colours.white};

  &.fade-out-exit {
    opacity: 1;
  }
  &.fade-out-exit-active {
    opacity: 0;
    transition: opacity 800ms;
  }
`;

const StyledLoader = styled.div`
  width: ${(props) => props.theme.spacing.space96};
  aspect-ratio: 1;
  display: grid;
  border: ${(props) => props.theme.spacing.space4} solid transparent;
  border-radius: 50%;
  border-right-color: ${(props) => props.theme.colours.sapphire};
  animation: l15 1s infinite linear;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    margin: ${(props) => props.theme.spacing.space2};
    border: inherit;
    border-radius: 50%;
    animation: l15 2s infinite;
  }

  &::after {
    margin: ${(props) => props.theme.spacing.space8};
    animation-duration: 3s;
  }

  @keyframes l15 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const Loader = ({ isLoading }) => {
  const ref = useRef(null);

  return (
    <CSSTransition in={isLoading} nodeRef={ref} classNames="fade-out" timeout={800} unmountOnExit>
      <LoaderWrapper ref={ref}>
        <StyledLoader />
      </LoaderWrapper>
    </CSSTransition>
  );
};

export default Loader;
