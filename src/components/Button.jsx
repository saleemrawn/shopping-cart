import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.space8};
  background-color: ${(props) => props.theme.colours.lavender};
  color: ${(props) => props.theme.colours.sapphire};
  padding: ${(props) => props.theme.spacing.space6} ${(props) => props.theme.spacing.space12};
  font-family: inherit;
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  font-size: inherit;
  border: none;
  border-radius: 6.25rem;

  &:hover {
    background-color: ${(props) => props.theme.colours.sapphire};
    color: ${(props) => props.theme.colours.white};
  }
`;

export default Button;
