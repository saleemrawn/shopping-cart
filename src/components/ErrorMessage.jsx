import styled from "styled-components";

const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: ${(props) => props.theme.weights.bold};
  margin-top: ${(props) => props.theme.spacing.space8};
`;

const ErrorMessage = ({ children }) => {
  return <Message>{children}</Message>;
};

export default ErrorMessage;
