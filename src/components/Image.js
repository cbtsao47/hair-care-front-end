import React from "react";
import styled from "styled-components";
import moment from 'moment';

const StyledHomeImgContainer = styled.div`
width: 100%;
max-width: 600px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 20px;

img {
  margin:0 auto;
  margin-bottom: 10px;
  border: 5px solid #1d0b32;
  border-radius: 15px;
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
}
`;

const Image = ({picture}) => {
  return (
    <StyledHomeImgContainer className="home-img-container">
      <img
        alt="portfolio"
        src={
          picture.picture ||
          "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        }
      />
      <p>{moment(picture.created_at).fromNow()}</p>
    </StyledHomeImgContainer>
  );
};

export default Image;
