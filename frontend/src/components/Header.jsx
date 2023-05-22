import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, authSelector } from "../redux/slices/authSlice";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AuthDialog from "./AuthDialog";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  const isLoggedIn = useSelector(authSelector);
  const authLoaded = useSelector((state) => state.auth.status) !== "loading";

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "white",
              }}
            >
              <RssFeedIcon></RssFeedIcon>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                HYPERBLOG
              </Typography>
            </Box>
            <Box sx={{ ml: "auto" }}>
              {authLoaded &&
                (!isLoggedIn ? (
                  <Box>
                    <Button
                      onClick={() => {
                        handleClickOpen();
                        setValue("1");
                      }}
                      sx={{ color: "primary.light" }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        handleClickOpen();
                        setValue("2");
                      }}
                      sx={{ color: "primary.light" }}
                    >
                      Register
                    </Button>
                    <AuthDialog
                      open={open}
                      value={value}
                      setValue={setValue}
                      handleClose={handleClose}
                    ></AuthDialog>
                  </Box>
                ) : (
                  <>
                    <Button
                      variant="inherit"
                      onClick={handleLogout}
                      sx={{
                        color: "secondary.light",
                        opacity: 0.5,
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      Log out
                    </Button>
                  </>
                ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
