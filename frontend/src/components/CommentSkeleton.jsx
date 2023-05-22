import { Avatar, Box, Skeleton, Typography } from "@mui/material";

import React from "react";

const CommentSkeleton = (props) => {
  return (
    <Box
      display="flex"
      sx={{ mb: 0.5, flexFlow: "row wrap", opacity: 1 - props.index * 0.2 }}
    >
      <Skeleton
        variant="circular"
        sx={{
          mr: 1,
          padding: 0,
        }}
      >
        <Avatar sx={{ height: 24, width: 24, padding: 0 }}></Avatar>
      </Skeleton>
      <Skeleton>
        <Typography>Placeholder</Typography>
      </Skeleton>
      <Skeleton animation="pulse" width="100%">
        <Typography>Placeholder</Typography>
      </Skeleton>
    </Box>
  );
};

export default CommentSkeleton;
