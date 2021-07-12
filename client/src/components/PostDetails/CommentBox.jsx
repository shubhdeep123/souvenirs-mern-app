import React, { useState, useRef,useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStlyes from "./styles";
import { commentPost } from "../../actions/postsAction";

const CommentBox = ({ post }) => {
  const classes = useStlyes();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef(null);

  const scrollToBottom = () => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  
  const handleComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    
    //Fast feedback
    setComments((prevComments) => [...prevComments, finalComment]);
    setComment("");
    
    const newComments = await dispatch(commentPost(finalComment, post._id));
    
    // feedback from db
    setComments(newComments);
    setComment("");
  };
  
  useEffect(scrollToBottom, [comments]);
  
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments {`(${comments.length})`}
          </Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}:</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleComment}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
