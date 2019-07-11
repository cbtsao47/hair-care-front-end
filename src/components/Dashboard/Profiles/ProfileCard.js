import React from "react";
import styled from "styled-components";

const StyledProfileCard = styled.div`
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


  .profile-card-photo {
    border-radius: 15px;
    max-width: 300px;
    max-height: 300px;
    margin: 0 auto;
    margin-bottom: 15px;
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
      font-family: 'Muli';
      margin-bottom: 10px;
      
    }
}


`;

const ProfileCard = props => {
  const { stylist } = props;
  return (
    <StyledProfileCard>
        <img className = 'profile-card-photo' src={stylist.profile_photo} alt={stylist.first_name} />
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
    </StyledProfileCard>
  );
};

export default ProfileCard;
