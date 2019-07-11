import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "../Image";
import loading_gif from '../../assets/loading_gif.gif';

const StylistProfileComp = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #1d0b32;
  width: 325px;
  border-radius: 15px;
  border: 5px solid #f9899e;
  padding: 20px;

  .profile-photo {
    max-width: 300px;
    max-height: 300px;
    border-radius: 15px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .my-profile-info {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    padding: 0 15px;

    span {
      font-size: 1.8rem;
      font-weight: 900;
      color: #f9899e;
    }
  }

  a,
  p {
    color: #f9899e;
    font-size: 1.8rem;
    padding: 0 15px;
    margin-bottom: 15px;
  }

  a:hover {
    color: #4947e5;
  }

  .stylist-pictures {
    margin: 0 auto;
    padding-top: 20px;
  }
  .edit-upload-btn {
    border-radius: 15px;
    border: 2px solid #f9899e;
    padding: 10px;
    background: #1d0b32;
    :hover {
      background: #f9899e;
      color: #1d0b32;
    }
  }
`;

const StyledStylistProfileForm = styled.form`
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
      transform: scale(1.1);
      background-color: #4947e5;
    }
  }

  .loading-gif {
    position: fixed;
    bottom: 40%;
  }
`;

export default class MyProfile extends Component {
  state = {
    stylist: {
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      profile_photo: ""
    },
    exists: false,
    pictures: [],
    loading: false
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      stylist: {
        ...this.state.stylist,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      loading: !this.state.loading
    });

    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/stylists/${localStorage.getItem(
        "userID"
      )}`,
      { ...this.state.stylist },
      headers
    )
      .then(res => {
        Axios
          .get(
            `${
              process.env.REACT_APP_BACKEND_URL
            }/api/stylists/${localStorage.getItem("userID")}`
          )
          .then(res => {
            if (res.data.length) {
              this.setState({
                ...this.state,
                exists: true,
                stylist: res.data[0],
                loading: !this.state.loading
              });
            } else {
              this.setState({
                ...this.state,
                loading: !this.state.loading,
              });
            }
          })
          .catch(err => {
            console.log(err.response);
            this.setState({
              ...this.state,
              loading: !this.state.loading,
            });
          });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          ...this.state,
          loading: !this.state.loading,
        });
      });
  };
  componentDidMount() {
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/stylists/${localStorage.getItem(
        "userID"
      )}`
    )
      .then(res => {
        if (res.data.length) {
          this.setState(
            { ...this.state, exists: true, stylist: res.data[0] },
            () => {
              Axios.get(
                `${
                  process.env.REACT_APP_BACKEND_URL
                }/api/pictures/stylist/${localStorage.getItem("userID")}`,
                headers
              )
                .then(res => {
                  this.setState({
                    ...this.state,
                    pictures: res.data
                  });
                })
                .catch(err => console.log(err.response));
            }
          );
        }
      })
      .catch(err => console.log(err.response));
  }
  render() {
    const { exists, stylist, pictures } = this.state;
    if (exists) {
      return (
        <StylistProfileComp>
          {
            stylist.profile_photo
            ?
            <img
              className="profile-photo"
              src={stylist.profile_photo}
              alt={`${stylist.first_name}`}
            />
            :
            <p>This user has no profile pic :(</p>
          }
          <div className="my-profile-info">
            <span>First Name:&nbsp;</span> <p>{stylist.first_name}</p>
          </div>
          <div className="my-profile-info">
            <span>Last Name:&nbsp;</span> <p>{stylist.last_name}</p>
          </div>
          <div className="my-profile-info">
            <span>Address:&nbsp;</span> <p>{stylist.address}</p>
          </div>
          <div className="my-profile-info">
            <span>City:&nbsp;</span> <p>{stylist.city}</p>
          </div>
          <div className="my-profile-info">
            <span>State:&nbsp;</span> <p>{stylist.state}</p>
          </div>
          <div className="my-profile-info">
            <span>Zip:&nbsp;</span> <p>{stylist.zip}</p>
          </div>

          <Link
            className="edit-upload-btn"
            to={`/profile/${localStorage.getItem("userID")}/edit`}
          >
            Edit Profile
          </Link>

          <Link
            className="edit-upload-btn"
            to={`/profile/${localStorage.getItem("userID")}/upload`}
          >
            Upload picture
          </Link>

          <p className="stylist-pictures">{stylist.first_name}'s pictures</p>

          {pictures.length <= 0 ? (
            <p>You haven't uploaded any pictures yet.</p>
          ) : (
            pictures.map((picture, i) => <Image key={i} picture={picture} />)
          )}
        </StylistProfileComp>
      );
    } else {
      return (
        <StyledStylistProfileForm onSubmit={this.handleSubmit}>
          <h2>Create your stylist profile</h2>

          <input
            name="first_name"
            placeholder="First name"
            onChange={this.handleChange}
            value={this.state.stylist.first_name}
            required
          />
          <input
            name="last_name"
            placeholder="Last name"
            onChange={this.handleChange}
            value={this.state.stylist.last_name}
            required
          />
          <input
            name="address"
            placeholder="Address"
            onChange={this.handleChange}
            value={this.state.stylist.address}
            required
          />
          <input
            name="city"
            placeholder="City"
            onChange={this.handleChange}
            value={this.state.stylist.city}
            required
          />
          <input
            name="state"
            placeholder="State"
            onChange={this.handleChange}
            value={this.state.stylist.state}
            required
          />
          <input
            name="zip"
            placeholder="Zip"
            onChange={this.handleChange}
            value={this.state.stylist.zip}
            required
          />
          <input
            name="profile_photo"
            placeholder="Link to profile photo"
            onChange={this.handleChange}
            value={this.state.stylist.profile_photo}
            required
          />
          <button>{this.state.loading ? "Loading" : "Submit"}</button>

          {
            this.state.loading &&
            // <div className = 'loading-overlay'>
            //   <img src = {loading_gif} alt = 'loading' />
            // </div>
            <img className = 'loading-gif' src = {loading_gif} alt = 'loading' />
          }
        </StyledStylistProfileForm>
      );
    }
  }
}
