import styled from "styled-components";

const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: ${(props) => props.theme.headings.mobile.h5};
  font-weight: ${(props) => props.theme.weights.bold};
  margin-top: ${(props) => props.theme.spacing.space40};
`;

const ErrorMessage = ({ children }) => {
  return <Message>{children}</Message>;
};

export default ErrorMessage;
