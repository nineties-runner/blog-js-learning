import * as React from "react";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Icon,
  TextField,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentSkeleton from "../components/CommentSkeleton";
import imagePlaceholder from "../img/noimg.jpg";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../redux/slices/postsSlice";
import {
  fetchPostComments,
  fetchSendComment,
} from "../redux/slices/commentsSlice";
import FullPostSkeleton from "../components/FullPostSkeleton";

const FullPost = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSinglePost(id));
    dispatch(fetchPostComments(id));
  }, [id, dispatch]);

  const handleCommentSend = async () => {
    const params = {
      id,
      body: {
        text: comment,
      },
    };
    await dispatch(fetchSendComment(params));
    dispatch(fetchPostComments(id));
  };

  const post = useSelector((state) => state.posts.currentItem);
  const comments = useSelector((state) => state.comments.currentItem);
  const date = moment(new Date(post?.createdAt)).format("LL");

  const postLoading = Boolean(post);
  const commentsLoading = Boolean(comments);

  return (
    <>
      {postLoading ? (
        <Box
          sx={{
            width: "100%",
            // height: 600,
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              src={post.imageUrl ? post.imageUrl : imagePlaceholder}
              sx={{ height: 300 }}
            />
            <Container
              disableGutters
              sx={{
                height: "330px",

                display: "flex",
                flexDirection: "column",
                padding: 1,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Comments
              </Typography>
              <Box
                sx={{
                  overflowY: "scroll",
                  wordWrap: "break-word",
                }}
              >
                {!commentsLoading ? (
                  Array.from(new Array(5)).map((item, index) => {
                    return <CommentSkeleton index={index} />;
                  })
                ) : [...comments]?.length !== 0 ? (
                  [...comments]?.reverse().map((comment, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          textAlign: "justify",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "secondary.light",
                          }}
                        >
                          <Avatar
                            alt=""
                            src={comment?.user?.avatarUrl}
                            sx={{
                              mr: 1,
                              width: 24,
                              height: 24,
                            }}
                          />
                          {comment?.user?.fullName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, color: "primary.light" }}
                        >
                          {comment.text}
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography>No comments yet.</Typography>
                )}
              </Box>
            </Container>
            <Box display="flex" sx={{ mt: "auto", width: "100%" }}>
              <TextField
                placeholder="Leave a comment"
                value={comment}
                sx={{ flexGrow: 1, mr: 1 }}
                onChange={(e) => setComment(e.target.value)}
              ></TextField>
              <Button variant="" onClick={handleCommentSend}>
                Send
              </Button>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />
          <Box
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                mb: 0.5,
              }}
            >
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  alt=""
                  src={post?.user?.avatarUrl}
                  sx={{ mr: 1, width: 32, height: 32 }}
                />
                {post?.user?.fullName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", ml: "auto" }}
              >
                {date}
              </Typography>
            </Box>
            <Box sx={{}}>
              <Typography variant="h6">{post?.title}</Typography>
              <Typography variant="body1">{post?.text}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Icon
                component={VisibilityIcon}
                sx={{ mr: 0.25, opacity: 0.4 }}
              ></Icon>
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                {post?.viewsCount}
              </Typography>
              <Breadcrumbs
                sx={{
                  alignItems: "left",
                }}
                separator=""
              >
                {post?.tags &&
                  post.tags.map((tag, index) => {
                    return (
                      <Chip key={index} size="small" sx={{}} label={tag}></Chip>
                    );
                  })}
              </Breadcrumbs>
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  minWidth: 135,
                  alignItems: "flex-end",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <FullPostSkeleton />
      )}
    </>
  );
};

export default FullPost;
