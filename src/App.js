import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Route } from "react-router-dom";

// Components
import { Header } from "./components/index.js";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUpForm from "./components/Forms/SignUpForm";
import LogInForm from "./components/Forms/LogInForm.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import MyDashboard from "./components/Dashboard/MyDashboard";
import ProfileCard from "./components/Dashboard/ProfileCard";
import StylistProfile from "./components/Dashboard/StylistProfile";
// Action creators
import { getStylists } from "./store/actions/index.js";

const StyledApp = styled.div`
  background-color: #c7dbf4;
  min-height: 100vh;

  .message {
    text-align: center;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isStylist: false
    };
  }
  componentDidMount() {
    // console.log("cdm home", this.props);
    this.props.getStylists();
  }
  render() {
<<<<<<< HEAD
    const { stylists } = this.props; //deconstructing

=======
>>>>>>> c30c21066a56409d1748c000c1cf4e824baa439c
    return (
      <StyledApp>
        <Header />
        <NavBar />
<<<<<<< HEAD
        <Route exact path="/" component={LogInForm} />
        <Route
          path="/home"
          render={props => <Home {...props} stylists={stylists} />}
        />
        <Route
          path="/dashboard"
          render={props => <Dashboard {...props} stylists={stylists} />}
        />
        <Route path="/signup" component={SignUpForm} />
        <Route
          path="/stylists/:id"
          render={props => <StylistProfile {...props} stylists={stylists} />}
        />
=======
        <Route exact path="/home" render={props => <Home {...props} />} />
        <Route path="/logIn" render={props => <LogInForm {...props} />} />
        <Route
          path="/:userType/dashboard"
          render={props => <Dashboard {...props} />}
        />
        <Route path="/signUp" render={props => <SignUpForm {...props} />} />
>>>>>>> c30c21066a56409d1748c000c1cf4e824baa439c
      </StyledApp>
    );
  }
}

const mapStateToProps = state => ({
  stylists: state.stylists
});

export default connect(
  mapStateToProps,
  { getStylists }
)(App);
