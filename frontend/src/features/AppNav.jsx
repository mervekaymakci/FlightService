import { Nav, NavItem, NavLink, NavSection } from "../components/nav";
import logo from "../../src/images/logo.png";

export const AppNav = () => {
  return (
    <Nav>
      <NavSection jc="flex-start">
        <NavItem>
          <NavLink to="/">
            <img src={logo} alt="logo" width="80px" />
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink to="/">SkillStorm Flight Management</NavLink>{" "}
        </NavItem>
      </NavSection>
      <NavSection jc="flex-end">
        <NavItem>
          <NavLink to="/"> Home </NavLink>
        </NavItem>
        <NavItem> | </NavItem>

        <NavItem>
          <NavLink to="/AddFlight"> Create Flight </NavLink>
        </NavItem>

        <NavItem> | </NavItem>

        <NavItem>
          <NavLink to="/UpdateFlight"> Update Flight </NavLink>
        </NavItem>

        <NavItem> | </NavItem>

        <NavItem>
          <NavLink to="/DeleteFlight"> Delete Flight </NavLink>
        </NavItem>
      </NavSection>
    </Nav>
  );
};
