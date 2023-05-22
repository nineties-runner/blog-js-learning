import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Box,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { fetchAuth, fetchAuthRegister } from "../redux/slices/authSlice";

const AuthDialog = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const handleLogin = () => {
    dispatch(
      fetchAuth({
        email,
        password,
      })
    );
  };

  const handleRegister = () => {
    dispatch(
      fetchAuthRegister({
        email,
        password,
        fullName,
      })
    );
    props.handleClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <TabContext value={props.value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Login" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your email and password.
              </DialogContentText>
              <TextField
                autoFocus
                value={email}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                value={password}
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleClose}>Cancel</Button>
              <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
          </TabPanel>
          <TabPanel value="2">
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your email, password and full name.
              </DialogContentText>
              <TextField
                autoFocus
                value={email}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                value={password}
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                value={fullName}
                margin="dense"
                id="fullName"
                label="Full Name"
                fullWidth
                variant="standard"
                onChange={(e) => setFullName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleClose}>Cancel</Button>
              <Button onClick={handleRegister}>Register</Button>
            </DialogActions>
          </TabPanel>
        </TabContext>
      </Dialog>
    </>
  );
};

export default AuthDialog;
