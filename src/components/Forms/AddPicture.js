import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//styles

const StyledLoginComp = styled.div`
  font-family: sans-serif;
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: black;
  transform: translate(-50%, -50%);
  text-align: center;

  h1 {
    font-size: 36px;
    border-bottom: 2px solid black;
    // border-radius: 3%;
    margin-bottom: 30px;
    padding: 12px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      width: 100%;
      font-size: 20px;
      padding: 10px 0;
      margin: 10px 0;
      border-bottom: 2px solid black;
    }
    input {
      outline: none;
      border: none;
      color: black;
      background: none;
      font-size: 20px;
      margin: 0 10px;
    }

    .login-btn {
      margin: 20px auto 30px auto;
      border: 1px solid black;
      background: none;
      width: 50%;
      transition: all 0.3s ease-in-out;
      :hover {
        transform: scale(1.1);
        cursor: pointer;
      }
    }
  }

  .sign-up-btn {
    text-decoration: none;
    border-bottom: 1px solid black;
    color: black;
  }
`;

class AddPicture extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      comments: []
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
  };
  render() {
    return (
      <StyledLoginComp>
        <h1>Stylogue</h1>
        <form onSubmit={this.handleSumbmit}>
          <div>
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
          <div>
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
            Log In
          </button>
        </form>
        <Link className="sign-up-btn" to="/signup">
          Click Here To Sign Up
        </Link>
      </StyledLoginComp>
    );
  }
}

export default AddPicture;
