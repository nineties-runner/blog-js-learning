import "@fontsource/unbounded";
import "./App.css";

import { Container, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import FullPost from "./pages/FullPost";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/authSlice";
import Testing from "./pages/Testing";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Unbounded",
    fontSize: 12,
  },
  shape: {
    borderRadius: 4,
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Container sx={{ maxWidth: "100vw", minHeight: "100.1vh" }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/posts/:id" element={<FullPost />}></Route>
          <Route path="/testing" element={<Testing />}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
