import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  AppBar,
  IconButton,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
// import { MenuIcon } from "@mui/icons-material";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }} mb="3rem">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BOOK LIBRARY
          </Typography>
          <Link to="/list" style={{ color: "white" }}>
            <Button color="inherit">LIST</Button>
          </Link>
          <Link to="/" style={{ color: "white" }}>
            <Button color="inherit">FORM</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
