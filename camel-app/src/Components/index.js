//Navbar found by Husam
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

// Navigation bar info found at https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

//Setting up our navbar
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/restaurants">Halal Nearby</NavLink>
          <NavLink to="/prayerinfo">Salah Times</NavLink>
          <NavLink to="/mosques">Masjid Info</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Profile</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
