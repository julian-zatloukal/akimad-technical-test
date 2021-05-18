import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import { queryUsername } from "../utils/apiRequests";
import UserItem from "./UserItem"

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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: "1rem 1rem",
    padding: "2rem 2rem 2rem 2rem",
  },
  usernameTextfield: {
    width: "100%",
  },
  controls: {
    display: "flex",
    width: "100%",
    gap: "1rem",
    alignItems: "flex-end",
  },
  searchButton: {
    height: "2.25rem",
    width: "7rem",
  },
  resultsContainer: {
    width: "100%",
    height: "100%",
    marginTop: "1rem",
    overflowY: "auto"
  },
  resultList: {
    paddingRight: theme.spacing(3),
    height: "95%",
  },
}));

export default function Frontpage() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const onSearch = () => {
    queryUsername(searchQuery).then((users) => {
      console.log(users)
      setUsers(users)
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.controls}>
          <TextField
            className={classes.usernameTextfield}
            label="Github username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className={classes.searchButton}
            variant="contained"
            color="primary"
            onClick={onSearch}
          >
            Search
          </Button>
        </Box>

        <Paper className={classes.resultsContainer} variant="outlined">
          <List dense={false} className={classes.resultList}>
            {users.map((user) => (
              <Box key={user.id}>
                <UserItem userData={user} />
                <Divider variant="inset" component="li" />
              </Box>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
