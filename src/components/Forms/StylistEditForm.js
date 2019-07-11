import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;

  input {
    padding: 15px;
    border: 3px solid #f9899e;
    border-radius: 12px;
    margin-bottom: 25px;
    width: 100%;
    font-size: 1.8rem;
    font-family: "Muli";

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

  button {
    border: 2px solid #f9899e;
    border-radius: 15px;
    background: #1d0b32;
    color: #f9899e;
    font-size: 1.8rem;
    font-family: "Muli";
    padding: 10px 20px;
    margin-top: 20px;
    margin-bottom: 15px;
    cursor: pointer;

    :hover {
      transform: scale(1.1, 1.1);
      background-color: #4947e5;
    }
  }
`;

class StylistSignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      profile_photo: "",
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      zip: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    const newInfo = { ...this.state };
    if (newInfo['profile_photo'] === "") {
      delete newInfo['profile_photo'];
    }

    Axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/stylists/${localStorage.getItem(
        "userID"
      )}`,
      newInfo,
      headers
    )
      .then(res =>
        this.props.history.push(`/profile/${localStorage.getItem("userID")}`)
      )
      .catch(err => ({ err }));
  };

  componentDidMount() {
    Axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/stylists/${localStorage.getItem(
        "userID"
      )}`)
      .then(res => {
        const { first_name, last_name, address, city, state, zip } = res.data[0];
        this.setState({
          first_name,
          last_name,
          address,
          city,
          state,
          zip,
        });
      })
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2>Please Change Your Information</h2>
        <input
          type="text"
          name="profile_photo"
          value={this.state.profile_photo}
          placeholder="Picture of yourself"
          onChange={this.handleChange}
        />
        <input
          name="first_name"
          value={this.state.first_name}
          type="text"
          placeholder="First Name"
          onChange={this.handleChange}
        />
        <input
          name="last_name"
          value={this.state.last_name}
          type="text"
          placeholder="Last Name"
          onChange={this.handleChange}
        />
        <input
          name="address"
          value={this.state.address}
          type="text"
          placeholder="Address"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="city"
          value={this.state.city}
          placeholder="City"
          onChange={this.handleChange}
        />
        <input
          name="state"
          value={this.state.state}
          type="text"
          placeholder="State"
          onChange={this.handleChange}
        />
        <input
          name="zip"
          value={this.state.zip}
          type="text"
          placeholder="Zip"
          onChange={this.handleChange}
        />

        <button type="submit">Edit Information</button>
      </StyledForm>
    );
  }
}

export default StylistSignUpForm;
