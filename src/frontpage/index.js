import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 800,
    height: 600,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "1rem 1rem",
    padding: "2rem 2rem 0 2rem",
  },
  usernameTextfield: {
    width: "100%",
    // margin: "2rem 2rem 0 2rem"
  },
  controls: {
    display: "flex",
    width: "100%",
    gap: "1rem",
    alignItems: "flex-end"
  },
  searchButton: {
    height: "2.25rem",
    width: "7rem",
  }
}));

export default function Frontpage() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.controls} >
        <TextField
          className={classes.usernameTextfield}
          label="Github username"
        />
        <Button className={classes.searchButton} variant="contained" color="primary">
          Search
        </Button>
        </Box>
        
      </Box>
    </Box>
  );
}
