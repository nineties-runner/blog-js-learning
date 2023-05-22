import * as React from "react";

import {
  Breadcrumbs,
  Chip,
  Box,
  Avatar,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import imagePlaceholder from "../img/noimg.jpg";
import moment from "moment";

const Post = (props) => {
  const date = moment(new Date(props.createdAt)).format("LL");

  return (
    <Box
      sx={{
        display: "flex",
        // backgroundColor: "primary.main",
        mb: 4,
      }}
    >
      <CardMedia
        component="img"
        image={props.imageUrl ? props.imageUrl : imagePlaceholder}
        alt="Image"
        sx={{ width: 300, mr: 1 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          flexGrow: 1,
          // backgroundColor: "primary",
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
            color="secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar
              alt=""
              src={props?.user?.avatarUrl}
              sx={{ mr: 1, width: 32, height: 32 }}
            />
            {props.user.fullName}
          </Typography>
          <Typography
            variant="body2"
            color="primary.light"
            sx={{ display: "flex", alignItems: "center", ml: "auto" }}
          >
            {date}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" color="primary.dark">
            {props.title}
          </Typography>
          <Typography
            variant="body1"
            color="primary.light"
            sx={{
              textAlign: "justify",
            }}
          >
            {props.text}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            // padding: 1,
            // maxHeight: "48px",
          }}
        >
          <Breadcrumbs
            sx={{
              // maxHeight: "32px",
              // overflow: "hidden",
              alignItems: "left",
              mt: 1,
            }}
            separator=""
          >
            {props.tags &&
              props.tags.map((tag, index) => {
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
          >
            <Button
              variant="text"
              sx={{
                ml: 1,
                padding: 0.5,
                color: "secondary.light",
              }}
              component={Link}
              to={`posts/${props.id}`}
            >
              View full post
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// const Post = (props) => {
//   return (
//     <Card sx={{ maxWidth: 700, mb: 2 }}>
//       <CardActionArea>
//         {props.imageUrl ? (
//           <CardMedia
//             component="img"
//             height=""
//             image={props.imageUrl}
//             alt="green iguana"
//           />
//         ) : null}
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {props.title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {props.text}
//           </Typography>
//           <Link to={`posts/${props.id}`}>
//             <Button
//               disableRipple={true}
//               size="small"
//               color="inherit"
//               variant="text"
//             >
//               Read full post
//             </Button>
//           </Link>
//           <br></br>
//           {props.tags.map((tag) => {
//             return (
//               <>
//                 <Button
//                   disableRipple={true}
//                   size="small"
//                   color="inherit"
//                   variant="text"
//                 >
//                   {tag}
//                 </Button>
//               </>
//             );
//           })}
//           {props.user._id === useSelector((state) => state.auth?.user?._id) ? (
//             <>
//               <EditButton id={props.id}></EditButton>
//               <DeleteButton id={props.id}></DeleteButton>
//             </>
//           ) : (
//             <></>
//           )}
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

export default Post;
