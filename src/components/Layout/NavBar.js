import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.nav`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
background: #1d0b32;
width: 100%;
padding: 0 0 30px;

a,
button {
  border: 2px solid #f9899e;
  border-radius: 15px;
  background: #1d0b32;
  color: #f9899e;
  font-size: 1.8rem;
  font-family: "Muli";
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  margin: 5px 10px;

  &:hover {
    transform: scale(1.1, 1.1);
    background-color: #4947e5;
  }
}

a {
  padding: 12px 20px;
  }
}
`;

const NavBar = props => {
  return (
    <StyledNavBar>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/stylists">Stylists</NavLink>
      <NavLink to={`/profile/${localStorage.getItem("userID")}`}>
        Profile
      </NavLink>
      <button onClick={props.handleLogOut}>Log Out</button>
    </StyledNavBar>
  );
};

export default NavBar;
