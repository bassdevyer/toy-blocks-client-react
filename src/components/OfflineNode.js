import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import colors from "../constants/colors";

const OfflineNode = () => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <span className={classes.text}>
        {"Offline node :-("}
      </span>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  text: ({ online }) => ({
    fontSize: theme.typography.pxToRem(14),
    display: "block",
    lineHeight: 1.5,
    fontWeight: "400",
    letterSpacing: 1,
    paddingLeft: 5,
    color: online ? colors.text : colors.faded,
  }),
}));

export default OfflineNode;
