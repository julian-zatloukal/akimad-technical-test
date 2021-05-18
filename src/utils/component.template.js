import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Component() {
  const classes = useStyles();

  return <React.Fragment>{/* component body */}</React.Fragment>;
}