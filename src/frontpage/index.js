import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingButton from "@material-ui/lab/LoadingButton";

import { queryUsername } from "../utils/apiRequests";
import UserItem from "./UserItem";

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
    height: 620,
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
    // backgroundColor: "#556cd6 !important",
  },
  resultsContainer: {
    width: "100%",
    height: "100%",
    marginTop: "1rem",
    overflowY: "auto",
  },
  resultList: {
    paddingRight: theme.spacing(3),
    height: "95%",
  },
  progress: {
    color: "white",
  },
  footer: {
    color: "gray",
    marginTop: theme.spacing(2)
  }
}));

export default function Frontpage() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastUserCount, setLastUserCount] = useState(0)
  const listContainer = useRef(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onInputError, setOnInputError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const onSearch = () => {
    if (searchQuery.length !== 0) {
      setIsLoading(true);
      setPage(1);
      queryUsername(searchQuery, 1)
        .then((data) => {
          setUsers(data.items);
          setIsLoading(false);
          setLastUserCount(data.total_count)
        })
        .catch((ex) => {
          setAlertMessage(ex.message);
          setAlertOpen(true);
          setIsLoading(false);
        });
    } else {
      setOnInputError(true);
      setAlertMessage("Please fill the username field")
      setAlertOpen(true)
    }
  };

  const requestMoreUsers = () => {
    if (lastUserCount/30 > (page + 1))  {
      setIsLoading(true);
      queryUsername(searchQuery, page + 1).then(({items}) => {
        setUsers((prev) => [...prev, ...users]);
        setIsLoading(false);
        setPage((prev) => prev + 1);
      });
    }
  
  };

  const onListScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <
      listContainer.current.offsetHeight
    ) {
      if (!isLoading) {
        requestMoreUsers();
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box className={classes.container}>
        <Box className={classes.controls}>
          <TextField
            className={classes.usernameTextfield}
            label="Github username"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setOnInputError(false)
            }}
            error={onInputError}
          />
          <LoadingButton
            className={classes.searchButton}
            variant="contained"
            color="primary"
            onClick={onSearch}
            loading={isLoading}
          >
            Search
          </LoadingButton>
        </Box>

        <Paper
          className={classes.resultsContainer}
          variant="outlined"
          onScroll={onListScroll}
          innerRef={listContainer}
        >
          <List dense={false} className={classes.resultList}>
            {users.map((user) => (
              <Box key={user.id}>
                <UserItem userData={user} />
                <Divider variant="inset" component="li" />
              </Box>
            ))}
          </List>
        </Paper>
        <Box className={classes.footer}>
          By Julian Zatloukal for Akimad.
        </Box>
      </Box>

      
    </Box>
  );
}
