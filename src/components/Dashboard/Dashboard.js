import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import ProjectList from "./ProjectList";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <ProfileCard />
        <ProjectList />
      </div>
    );
  }
}
export default Dashboard;
