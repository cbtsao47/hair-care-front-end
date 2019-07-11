import React from "react";
import { Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LogInForm";

const LoginSignUp = ({ handleLogIn }) => {
  return (
    <div className="login-signup">
      <Route
        exact
        path="/"
        render={props => <LoginForm {...props} handleLogIn={handleLogIn} />}
      />
      <Route
        path="/signup"
        render={props => <SignUpForm {...props} handleLogIn={handleLogIn} />}
      />
    </div>
  );
};

export default LoginSignUp;
