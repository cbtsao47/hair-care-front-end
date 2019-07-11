import React from "react";
import Comment from "./Comment";
import axios from "axios";
import styled from "styled-components";

const StyledCommentDiv = styled.div`
width: 100%;
`;

const CommentSection = props => {
  const deleteComments = id => {
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };

    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/comments/${id}`,
        headers
      )
      .then(res => {
        props.getAllPictureComments();
      });
  };
  const { comments } = props;
  return (
    <StyledCommentDiv>
      {comments.map((comment, i) => (
        <Comment
          key={i}
          comment={comment}
          deleteComments={() => deleteComments(comment.id)}
        />
      ))}
    </StyledCommentDiv>
  );
}

export default CommentSection;
