import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentSection from "./CommentSection";
import Image from '../../Image';
import axios from "axios";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid black;
  width: 100%;
`;
const StyledCommentSection = styled.div`
  display: flex;
  justify-content: center;
`;
class Picture extends Component {
  state = {
    comment: "",
    comments: [],
    likes: 0,
    liked: false
  };
  handleLikes = e => {
    if (this.state.liked) {
      this.setState({
        ...this.state,
        likes: this.state.likes - 1,
        liked: !this.state.liked
      });
    } else {
      this.setState({
        ...this.state,
        likes: this.state.likes + 1,
        liked: !this.state.liked
      });
    }
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  getAllPictureComments = () => {
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/comments/picture/${
          this.props.picture.id
        }`,
        headers
      )
      .then(res => {
        this.setState({
          ...this.state,
          comments: res.data
        });
      })
      .catch();
  };
  getPictureLikes = () => {
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/likes/picture/${
          this.props.picture.id
        }`,
        headers
      )
      .then(res => {
        this.setState({
          ...this.state,
          likes: res.data.length > 0 ? res.data[0].likes : 0
        });
      });
  };
  addComments = e => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/comments/picture/${
          this.props.picture.id
        }`,
        { comment: this.state.comment },
        headers
      )
      .then(res => {
        this.getAllPictureComments();
        this.setState({ ...this.state, comment: "" });
      })
      .catch(err => ({ err }));
  };
  componentDidMount() {
    this.getAllPictureComments();
    this.getPictureLikes();
  }
  render() {
    return (
      <StyledDiv>
        <Image picture = { this.props.picture } />
        <p onClick={this.handleLikes}>
          <FontAwesomeIcon icon="heart" /> {this.state.likes}
        </p>
        <StyledCommentSection>
          <CommentSection
            comments={this.state.comments}
            picture={this.props.picture.id}
            getAllPictureComments={this.getAllPictureComments}
          />
        </StyledCommentSection>
        <form onSubmit={this.addComments}>
          <input
            name="comment"
            type="text"
            placeholder="Add a comment"
            onChange={this.handleChange}
            value={this.state.comment}
          />
        </form>
      </StyledDiv>
    );
  }
}
export default Picture;
