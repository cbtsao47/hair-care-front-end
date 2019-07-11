import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

const Auth = App => LoginSignUp =>
  class extends Component {
    constructor() {
      super();
      this.state = {
        loggedIn: false,
        err: ""
      };
    }
    handleLogIn = username => {
      this.setState({ loggedIn: true }, () => {
        this.props.history.push("/home");
      });
    };
    handleLogOut = () => {
      localStorage.removeItem("userID");
      localStorage.removeItem("userToken");
      localStorage.removeItem("hairCareUsername");
      this.setState({ loggedIn: false }, () => {
        this.props.history.push("/");
      });
    };
    logUserIn = credentials => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/stylists`, credentials)
        .then(res => {
          const token = res.data.token;
          localStorage.setItem("userToken", token);
          this.handleLogIn();
        })
        .catch(err =>
          this.setState({ err: "Account not found,please try again" })
        );
    };
    componentDidMount() {
      if (localStorage.getItem("userToken")) {
        this.handleLogIn();
      }
    }
    render() {
      const { loggedIn, username } = this.state;
      return loggedIn ? (
        <Route
          path="/"
          render={props => (
            <App
              {...props}
              handleLogOut={this.handleLogOut}
              username={username}
            />
          )}
        />
      ) : (
        <Route
          path="/"
          render={props => (
            <LoginSignUp {...props} handleLogIn={this.handleLogIn} />
          )}
        />
      );
    }
  };

export default Auth;
