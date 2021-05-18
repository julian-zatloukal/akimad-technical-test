import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { getUserDetails } from "../utils/apiRequests";
dayjs.extend(localizedFormat);

const useStyles = makeStyles((theme) => ({
  root: {},
  infoList: {},
  itemIcon: {
    justifyContent: "center",
  },
  followers: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    color: "#616161",
    marginRight: theme.spacing(2),
  },
  detailedContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    "& .MuiCollapse-wrapper": {
      width: "100%",
    },
    paddingBottom: "1rem",
    paddingTop: "1rem",
  },
  listsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.spacing(2),
  },
  repoList: {
    width: "100%",
    maxHeight: "9rem",
    overflowY: "auto",
  },
  listsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  repoTitle: {
    paddingLeft: theme.spacing(4),
    fontWeight: "bold",
    paddingBottom: theme.spacing(0.5),
  },
  orgsContainer: {
    // width: "50%"
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
  },
  orgsList: {
    maxHeight: "9rem",
    overflowY: "auto",
  },
  repoCointainer: {
    marginTop: "1rem",
  },
  progress: {
    marginRight: theme.spacing(2),
  },
}));

export default function UserItem({ userData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { isLoading, error, data, isSuccess } = useQuery(
    ["user-detailed", userData.id],
    () => getUserDetails(userData.login),
    {
      enabled: isActive,
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      onError: (ex) => {
        console.log(ex);
      },
    }
  );

  const onClick = () => {
    if (!open) {
      setOpen(true);
      if (!isActive) setIsActive(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <ListItem onClick={onClick} button>
        <ListItemAvatar>
          <Avatar src={userData.avatar_url}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={userData.login} />

        {open && isSuccess && (
          <Tooltip title="Followers">
            <Box className={classes.followers}>
              <PeopleIcon />
              {data.detailed.followers}
            </Box>
          </Tooltip>
        )}
        {isLoading && (
          <CircularProgress className={classes.progress} size={20} />
        )}

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={classes.detailedContainer}
      >
        {isSuccess ? (
          <Box className={classes.listsWrapper}>
            <Box className={classes.listsContainer}>
              <Box className={classes.orgsContainer}>
                <Box className={classes.repoTitle}>About</Box>
                <List dense={true} className={classes.infoList}>
                  {data.detailed.bio && (
                    <ListItem>
                      <Tooltip title="Biography">
                        <ListItemIcon className={classes.itemIcon}>
                          <AccountCircleIcon />
                        </ListItemIcon>
                      </Tooltip>

                      <ListItemText primary={data.detailed.bio} />
                    </ListItem>
                  )}

                  <ListItem>
                    <Tooltip title="Join date">
                      <ListItemIcon className={classes.itemIcon}>
                        <QueryBuilderIcon />
                      </ListItemIcon>
                    </Tooltip>

                    <ListItemText
                      primary={dayjs(data.detailed.created_at).format("LL")}
                    />
                  </ListItem>

                  {data.detailed.blog && (
                    <ListItem>
                      <Tooltip title="Website">
                        <ListItemIcon className={classes.itemIcon}>
                          <LanguageIcon />
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={data.detailed.blog} />
                    </ListItem>
                  )}

                  {data.detailed.location && (
                    <ListItem>
                      <Tooltip title="Location">
                        <ListItemIcon className={classes.itemIcon}>
                          <LocationOnIcon />
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={data.detailed.location} />
                    </ListItem>
                  )}
                </List>
              </Box>

              {data.orgs.length > 0 && (
                <Box className={classes.orgsContainer}>
                  <Box className={classes.repoTitle}>Organizations</Box>
                  <List dense={true} className={classes.orgsList}>
                    {data.orgs.map((org) => (
                      <ListItem key={org.id}>
                        <ListItemIcon className={classes.itemIcon}>
                          <BusinessIcon />
                        </ListItemIcon>

                        <ListItemText primary={org.login} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>

            {data.repos.length > 0 && (
              <Box className={classes.repoCointainer}>
                <Box className={classes.repoTitle}>Repositories</Box>
                <List dense={true} className={classes.repoList}>
                  {data.repos.map((repo) => (
                    <ListItem key={repo.id}>
                      <ListItemIcon className={classes.itemIcon}>
                        <LibraryBooksIcon />
                      </ListItemIcon>

                      <ListItemText primary={repo.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        ) : (
          <> </>
        )}
      </Collapse>
    </React.Fragment>
  );
}
