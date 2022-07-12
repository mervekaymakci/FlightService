import styled from "styled-components";

/**
 * styled Nav bar that can be customized
 */
export const Nav = styled.nav`
  background-color: ${({ backgroundColor }) => backgroundColor ?? "#ff7f50"};
  color: ${({ color }) => color ?? "white"};
  font-size: 25px;
  padding: 1em 1.5em;
  display: flex;
  justify-content: space-between;
`;
