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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { getUserDetails } from "../utils/apiRequests";
dayjs.extend(localizedFormat);

const useStyles = makeStyles((theme) => ({
  root: {},
  infoList: {
    width: "50%",
  },
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
  },
  listsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.spacing(2),
  },
  repoList: {
    width: "50%",
  },
}));

export default function UserItem({ userData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const {
    isLoading,
    error,
    data,
    isSuccess,
  } = useQuery(
    ["user-detailed", userData.id],
    () => getUserDetails(userData.login),
    {
      enabled: isActive,
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={classes.detailedContainer}
      >
        {isSuccess ? (
          <Box className={classes.listsContainer}>
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

            <List dense={true} className={classes.repoList}>
              {
                data.orgs.map((org) => ( <ListItem>
                  <ListItemIcon className={classes.itemIcon}>
                    <BusinessIcon />
                  </ListItemIcon>
  
                  <ListItemText primary={org.login} />
                </ListItem>))
              }
             
            </List>
          </Box>
        ) : (
          <> </>
        )}
      </Collapse>
    </React.Fragment>
  );
}
