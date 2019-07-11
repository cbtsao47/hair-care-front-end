import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import PictureList from "../Pictures/PictureList";
import axios from "axios";
import GeoMap from "./GeoMap.js";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 5px solid #f9899e;
  border-radius: 15px;
  margin: 10px 15px;
  padding: 20px;
  width: 325px;
  background: #1d0b32;

  img {
    border-radius: 15px;
    max-width: 300px;
    max-height: 300px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .link {
    font-size: 1.8rem;
    color: #f9899e;
    margin: 0 auto;
    margin-bottom: 15px;
    border: 3px solid #f9899e;
    border-radius: 15px;
    padding: 10px;
    :hover {
      color: #1d0b32;
      background: #f9899e;
    }
  }

  .stylist-info {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 15px;
    margin-bottom: 15px;

    span {
      font-size: 1.8rem;
      font-weight: 900;
      color: #f9899e;
    }

    h4 {
      font-size: 1.8rem;
      color: #f9899e;
      font-family: "Muli";
      margin-bottom: 10px;
    }
  }

  .stylist-map {
    margin: 0 auto;
  }
`;

export default class StylistProfile extends Component {
  state = { stylist: {} };
  componentDidMount() {
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/stylists/${
          this.props.match.params.id
        }`,
        headers
      )
      .then(res => {
        this.setState({ stylist: res.data[0] });
      })
      .catch(err => console.log(err.response));
  }
  render() {
    const { stylist } = this.state;
    return (
      <StyledDiv className="container">
        {" "}
        <img src={stylist.profile_photo} alt={`${stylist.first_name}`} />
        <Link className="link" to={`/stylists/${stylist.id}/pictures`}>
          View pictures
        </Link>
        <div className="stylist-info">
          <span>Name:&nbsp;</span>
          <h4>{stylist.first_name}</h4>
        </div>
        <div className="stylist-info">
          <span>Address:&nbsp;</span>
          <h4>{stylist.address}</h4>
        </div>
        <div className="stylist-info">
          <span>City:&nbsp;</span>
          <h4>{stylist.city}</h4>
        </div>
        <div className="stylist-info">
          <span>State:&nbsp;</span>
          <h4>{stylist.state}</h4>
        </div>
        <div className="stylist-info">
          <span>Zip:&nbsp;</span>
          <h4>{stylist.zip}</h4>
        </div>
        <GeoMap className="stylist-map" id={this.props.match.params.id} />
        <div className="geomap-div">
          <Route
            path="/stylists/:id/pictures"
            render={props => <PictureList {...props} />}
          />
        </div>
      </StyledDiv>
    );
  }
}
