import React from "react";
import {
  Box,
  Container,
  CardMedia,
  Breadcrumbs,
  Chip,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  Icon,
  Skeleton,
} from "@mui/material";
import CommentSkeleton from "./CommentSkeleton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import imagePlaceholder from "../img/noimg.jpg";

const FullPostSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "40%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="rounded">
            <CardMedia
              component="img"
              src={imagePlaceholder}
              sx={{ width: "100%" }}
            />
          </Skeleton>
          <Container
            disableGutters
            sx={{
              height: "330px",
              display: "flex",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <Skeleton variant="text">
              <Typography variant="h6" sx={{ mb: 1 }}>
                Comments
              </Typography>
            </Skeleton>
            <Box>
              {Array.from(new Array(5)).map((item, index) => {
                return <CommentSkeleton index={index} />;
              })}
            </Box>
          </Container>
          <Box display="flex" sx={{ mt: "auto", width: "100%" }}>
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: 53 }}
            ></Skeleton>
            <Skeleton variant="rounded" sx={{ width: "100%", ml: 1 }}>
              <Button variant="">Send</Button>
            </Skeleton>
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
            <Skeleton
              variant="circular"
              sx={{
                mr: 1,
                padding: 0,
              }}
            >
              <Avatar alt="" sx={{ mr: 1, height: 32, width: 24 }} />
            </Skeleton>
            <Skeleton variant="text">
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Full Name
              </Typography>
            </Skeleton>
            <Skeleton variant="text">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", ml: "auto" }}
              >
                Random date
              </Typography>
            </Skeleton>
          </Box>
          <Box sx={{}}>
            <Skeleton variant="text">
              <Typography variant="h6">Title</Typography>
            </Skeleton>
            {Array.from(new Array(15)).map((item, index) => (
              //   <PostSkeleton index={index} />
              <Skeleton variant="text">
                <Typography
                  variant="body1"
                  sx={{ width: Math.random() * 300 + 200 }}
                >
                  Placeholder
                </Typography>
              </Skeleton>
            ))}
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
            <Skeleton variant="text" sx={{ mr: 1 }}>
              <Typography variant="subtitle1">000</Typography>
            </Skeleton>
            <Breadcrumbs
              sx={{
                alignItems: "left",
              }}
              separator=""
            >
              {Array.from(new Array(5)).map((item, index) => {
                return (
                  <Skeleton variant="rounded">
                    <Chip
                      key={index}
                      size="small"
                      sx={{
                        width: Math.random() * 25 + 25,
                      }}
                    ></Chip>
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
    </>
  );
};

export default FullPostSkeleton;
