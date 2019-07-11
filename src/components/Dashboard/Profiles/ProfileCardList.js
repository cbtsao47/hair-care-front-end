import React from "react";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledProfileCardList = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ProfileCardList = props => {
  const { stylists } = props;
  return (
    <StyledProfileCardList>
      {stylists.map((stylist, i) => (
        <Link key={i} to={`/stylists/${stylist.id}`}>
          <ProfileCard stylist={stylist} />
        </Link>
      ))}
    </StyledProfileCardList>
  );
};
export default ProfileCardList;
