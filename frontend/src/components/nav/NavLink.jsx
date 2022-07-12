import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
  color: inherit; /* Use the color that the parent element is using */
  text-decoration: none;
  transition: color 0.25s;

  &:hover {
    color: ${({ transitionColor }) => transitionColor ?? "lightgray"};
  }
`;
