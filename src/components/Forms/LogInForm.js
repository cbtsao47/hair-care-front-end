import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//styles
const StyledLoginComp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border: 5px solid #1d0b32;
  border-radius: 15px;
  width: 50%;
  margin: 75px auto;

  @media (max-width: 800px) {
    padding: 35px;
  }


  h1 {
    font-size: 4rem;
    margin-bottom: 40px;
    font-family: 'Fredoka One';
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .input-div {
      width: 85%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 800px) {
        width: 100%;
      }
    }

    svg {
      padding: 0 10px 0 0;
      color: #4947e5;
      font-size: 3rem;
      margin-bottom: 25px;

      @media (max-width: 800px) {
        font-size: 2.6rem;
      }
    }

    input {
      padding: 15px;
      border: 3px solid #f9899e;
      border-radius: 12px;
      margin-bottom: 25px;
      width: 90%;
      font-size: 1.8rem;
      font-family: 'Muli';

      @media (max-width: 800px) {
        width: 80%;
      }

      @media (max-width: 500px) {
        width: 75%;
      }

      :focus {
        outline: none;
        font-size: 1.8rem;
        color: #4947e5;
        font-weight: 800;
      }

      ::placeholder {
        font-size: 1.8rem;
      }
    }

    .login-btn {
      border: 2px solid #f9899e;
      border-radius: 15px;
      background: #1d0b32;
      color: #f9899e;
      font-size: 1.8rem;
      font-family: 'Muli';
      padding: 10px 20px;
      margin-top: 20px;
      margin-bottom: 15px;
      cursor: pointer;

      :hover {
        transform: scale(1.1,1.1);
        background-color: #4947e5;
      }
    }
  }

  .sign-up-btn {
    color: #f9899e;
    font-family: 'Muli';
    font-size: 1.4rem;

    :hover {
      color: #4947e5;
    }
  }
`;

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isCheckingCredentials: false,
      wrongCredentials: false
    };
  }
  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSumbmit = e => {
    e.preventDefault();
    this.setState({
      isCheckingCredentials: true
    });
    const { username, password } = this.state;
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
      username,
      password
    })
      .then(res => {
        localStorage.setItem("userID", res.data.id);
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("hairCareUsername", username);
        this.setState({
          isCheckingCredentials: false
        });
        this.props.handleLogIn();
      })
      .catch(err =>
        this.setState({ isCheckingCredentials: false, wrongCredentials: true })
      );
  };
  render() {
    return (
      <StyledLoginComp>
        <h1>Log In</h1>
        <form onSubmit={this.handleSumbmit}>
          <div className="input-div">
            <FontAwesomeIcon icon="envelope" />

            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="input-div">
            <FontAwesomeIcon icon="key" />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              autoComplete="off"
            />
          </div>

          <button className="login-btn" type="submit">
            {this.state.isCheckingCredentials ? "Loading" : "Log In"}
          </button>
        </form>
        {this.state.wrongCredentials ? (
          <h4 className="log-in-fail">Log in failed, please try again</h4>
        ) : null}
        <Link className="sign-up-btn" to="/signup">
          Click here to sign up
        </Link>
      </StyledLoginComp>
    );
  }
}

export default LogInForm;
