import styled from "styled-components";

const StyledTitle = styled.h1`
  font-weight: ${(props) => props.theme.fonts.weights.black};
  font-size: ${(props) => props.theme.headings[props.as]};
`;

const Title = ({ className, level = 1, children, ...props }) => {
  return (
    <StyledTitle as={`h${level}`} className={className} {...props}>
      {children}
    </StyledTitle>
  );
};

export default Title;
