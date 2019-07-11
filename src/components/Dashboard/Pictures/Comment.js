import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border: 3px solid #f9899e;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 5px;
  .comment {
    padding: 0;
  }
  .icon {
    margin-left: 5px;
    opacity: 0;
    width: 15px;
    height: auto;
    transition: all 1s ease-in-out;
    :hover {
      opacity: 1;
    }
  }
`;
const Comment = props => {
  return (
    <StyledDiv>
      <p className="comment">{props.comment.comment}</p>
      <div>
        <FontAwesomeIcon
          className="icon"
          icon="times"
          onClick={() => props.deleteComments(props.comment.id)}
        />
      </div>
    </StyledDiv>
  );
};
export default Comment;
