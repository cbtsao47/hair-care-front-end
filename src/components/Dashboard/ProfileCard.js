import React, { Component } from "react";

const ProfileCard = ({ stylist }) => {
  return (
    <div>
      <h4>picture</h4>
      <h4>name</h4>
      <h4>age</h4>
      <h4>location</h4>
      <h4>contact number</h4>
      <h4>average cost</h4>
      <textarea placeholder="describe your store" />
      <h4>links to social media</h4>
    </div>
  );
};

export default ProfileCard;