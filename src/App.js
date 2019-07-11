import React, { Component } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
// Components
import Header from "./components/Layout/Header";
import NavBar from "./components/Layout/NavBar";
import Home from "./components/Home";
import Stylists from "./components/Dashboard/Stylists.js";
import StylistProfile from "./components/Dashboard/Profiles/StylistProfile";
import MyProfile from "./components/Dashboard/MyProfile";
import StylistEditForm from "./components/Forms/StylistEditForm";
import Upload from "./components/Dashboard/Pictures/Upload";
// font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faTimes,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faKey, faTimes, faHeart);

const StyledApp = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  .welcome {
    text-align: center;
    font-size: 2.8rem;
    margin: 20px 0 50px;
  }

  .message {
    text-align: center;
  }
`;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isStylist: false,
      username: ""
    };
  }

  componentDidMount() {
    this.setState({ username: localStorage.getItem("hairCareUsername") });
  }
  render() {
    return (
      <StyledApp>
        <Header />
        <NavBar handleLogOut={this.props.handleLogOut} />
        <h1 className="welcome">Welcome, {this.state.username}!</h1>
        <Route path="/home" render={props => <Home {...props} />} />
        <Route
          exact
          path="/stylists"
          render={props => <Stylists {...props} />}
        />

        <Route
          path="/stylists/:id"
          render={props => <StylistProfile {...props} />}
        />

        <Route
          exact
          path="/profile/:id"
          render={props => <MyProfile {...props} />}
        />

        <Route
          path="/profile/:id/edit"
          render={props => <StylistEditForm {...props} />}
        />

        <Route
          path="/profile/:id/upload"
          render={props => <Upload {...props} />}
        />
      </StyledApp>
    );
  }
}
