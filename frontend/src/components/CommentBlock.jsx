import { Avatar, Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments } from "../redux/slices/commentsSlice";

import CommentSkeleton from "./CommentSkeleton";
import React from "react";

const CommentBlock = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  const comments = useSelector((state) => state.comments.items);
  const commentsLoading =
    useSelector((state) => state.comments.status) !== "loaded";
  console.log(commentsLoading);

  return (
    <Container
      sx={{
        height: 500,
        alignItems: "center",
        mt: 1,
        padding: 0,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Latest comments
      </Typography>
      {!commentsLoading
        ? comments
            .slice(-5)
            .reverse()
            .map((comment, index) => {
              return (
                <Box
                  key={index}
                  sx={{ opacity: 1 - index * 0.2, wordBreak: "break-all" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "secondary.main",
                    }}
                  >
                    <Avatar
                      alt=""
                      src={comment?.user?.avatarUrl}
                      sx={{ mr: 1, width: 24, height: 24 }}
                    />
                    {comment?.user?.fullName}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {comment.text}
                  </Typography>
                </Box>
              );
            })
        : Array.from(new Array(5)).map((item, index) => {
            return <CommentSkeleton key={index} index={index} />;
          })}
    </Container>
  );
};

export default CommentBlock;
