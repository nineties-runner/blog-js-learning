import {
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  CardMedia,
  Chip,
  Skeleton,
  Typography,
} from "@mui/material";

import React from "react";

const PostSkeleton = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 4,
        opacity: 1 - props.index * 0.2,
      }}
    >
      <Skeleton variant="rounded">
        <CardMedia
          component="img"
          alt="Image"
          sx={{
            width: 300,
            height: Math.floor(Math.random() * 150) + 50,
            mr: 1,
          }}
        />
      </Skeleton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          flexGrow: 1,
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
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
            <Skeleton
              variant="circular"
              sx={{
                mr: 1,
                width: 32,
                height: 32,
              }}
            >
              <Avatar alt="" src="" />
            </Skeleton>
            <Skeleton
              variant="rounded"
              width={Math.floor(Math.random() * 75) + 75}
              height={18}
            ></Skeleton>
          </Typography>
          <Typography
            variant="body2"
            color="primary.dark"
            sx={{ display: "flex", alignItems: "center", ml: "auto" }}
          >
            <Skeleton
              variant="rounded"
              width={Math.floor(Math.random() * 75) + 40}
              height={18}
            ></Skeleton>
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            width={Math.floor(Math.random() * 200) + 100}
            height={32}
            sx={{ mb: 1 }}
          ></Skeleton>
          {Array.from(new Array(Math.floor(Math.random() * 5) + 1)).map(
            (item, index) => (
              <Skeleton
                variant="rounded"
                width={Math.floor(Math.random() * 300) + 100}
                height={24}
                sx={{ mt: 1 }}
              ></Skeleton>
            )
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Breadcrumbs
            sx={{
              alignItems: "left",
              mt: 1,
            }}
            separator=""
          >
            {Array.from(new Array(3)).map((item, index) => {
              return (
                <Skeleton
                  variant="rounded"
                  width={Math.floor(Math.random() * 48) + 12}
                  height={24}
                  sx={{ borderRadius: 5 }}
                >
                  <Chip key={index} size="small" sx={{ mt: 1 }}></Chip>
                </Skeleton>
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
  );
};

export default PostSkeleton;
