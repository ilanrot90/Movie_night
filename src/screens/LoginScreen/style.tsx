import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  ${({ theme }) => theme.utils.centerFlex};
  background-color: ${({ theme }) => theme.background };
`;
