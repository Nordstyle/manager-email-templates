import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  link: {
    color: "#fff",
    textDecoration: "none"
  }
});

const Header = props => {
  const classes = useStyles(props);
  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Link className={classes.link} to="/">
          <Typography variant={"h6"}> Email Template Manager </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
