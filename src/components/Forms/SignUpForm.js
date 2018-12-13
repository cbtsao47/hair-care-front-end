import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledSignUpForm = styled.div`
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

    div {
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

    input[type="text"], input[type="password"] {
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
    }

    label {
      font-family: 'Muli';
      font-size: 1.4rem;
    }


    .radio-container {
      justify-content: center;
      align-items: center;
      padding: 10px 0;

      input[type="radio"] {
        margin-right: 10px;
      }

      h4 {
        font-family: 'Muli';
        font-size: 1.4rem;
        margin-right: 20px;
        margin-bottom: 0;
      }
    }

    .signup-btn {
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

  .login-btn {
    color: #f9899e;
    font-family: 'Muli';
    font-size: 1.4rem;

    :hover {
      color: #4947e5;
    }
  }
`;
class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isStylist: false
    };
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleRadio = e => {
    this.setState({
      [e.target.name]: Boolean(e.target.value)
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, isStylist } = this.state;
    console.log(this.state);
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
      username,
      password,
      isStylist
    })
      .then(res => {
        const { username, password } = this.state;
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
          username,
          password
        })
          .then(res => {
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("hairCareUsername", username);
            this.props.handleLogIn();
          })
          .catch(err => console.log("login POST ERR", err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <StyledSignUpForm>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <FontAwesomeIcon icon="envelope" />
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <FontAwesomeIcon icon="key" />
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <label htmlFor="isStylist">Are you a Stylist?</label>
          <div className="radio-container">
            <input
              type="radio"
              name="isStylist"
              value="true"
              onChange={this.handleRadio}
              required
            />
            <h4>Yes</h4>
            <input
              type="radio"
              name="isStylist"
              value="false"
              onChange={this.handleRaiod}
              required
            />
            <h4>No</h4>
          </div>
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
        <Link className="login-btn" to="/">
          Click here to log in
        </Link>
      </StyledSignUpForm>
    );
    // }
  }
}

export default SignUpForm;
