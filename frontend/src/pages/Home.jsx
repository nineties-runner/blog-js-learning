import React from "react";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CommentBlock from "../components/CommentBlock";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import { fetchPosts } from "../redux/slices/postsSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.items);
  const postsLoaded = useSelector((state) => state.posts.status) === "loaded";

  return (
    <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
      <Box
        sx={{
          flexBasis: 700,
          flexGrow: 1,
        }}
      >
        {!postsLoaded ? (
          <>
            {Array.from(new Array(5)).map((item, index) => (
              <PostSkeleton index={index} />
            ))}
          </>
        ) : (
          posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              text={post.text}
              tags={post.tags}
              user={post.user}
              createdAt={post.createdAt}
              imageUrl={post.imageUrl}
            />
          ))
        )}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ ml: 2 }}></Divider>
      <Box
        sx={{
          flexBasis: 300,
          flexGrow: 1,
        }}
      >
        <CommentBlock></CommentBlock>
        {/* <CreatePostButton /> */}
      </Box>
    </Box>
  );
};

export default Home;
