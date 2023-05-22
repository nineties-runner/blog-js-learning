import React from "react";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        display: "flex",
      }}
    >
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
        <TextField sx={{}}></TextField>
        <Button sx={{ height: "90%", ml: 1 }}>Search</Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
