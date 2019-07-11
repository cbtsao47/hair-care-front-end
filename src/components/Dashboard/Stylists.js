import React, { Component } from "react";
import ProfileCardList from "./Profiles/ProfileCardList";
import { connect } from 'react-redux';
import styled from 'styled-components';

// Action creators
import { getStylists } from "../../store/actions/index.js";

const StyledStylists = styled.div`
  width: 80%;
  display: flex;

  flex-direction: column;
  text-align: center;

  .stylists {
    margin-bottom: 25px;
  }
`;

class Stylists extends Component {
  componentDidMount() {
    this.props.getStylists(localStorage.getItem("userToken"));
  }
  render() {
    return (
      <StyledStylists>
        <div>
        <h1 className="stylists">Stylists</h1>
        </div>
        
        <ProfileCardList {...this.props} />
      </StyledStylists>
    );
  }
};


const mapStateToProps = state => ({
  stylists: state.stylists
});

export default connect(
  mapStateToProps,
  { getStylists }
)(Stylists);
