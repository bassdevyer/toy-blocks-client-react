import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({ block }) => {
  const classes = useStyles();
  return (
    <Box className={classes.blockItem}>
      <Typography
        variant="subtitle1"
        className={classes.index}
      >
        {block.index}
      </Typography>
      <Typography className={classes.heading}>
        {block.data || "Unknown"}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  blockItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: colors.contentBackground,
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  index: {
    fontSize: theme.typography.pxToRem(12),
    color: colors.primary,
    lineHeight: 2,
  },
}));

Block.propTypes = {
  block: PropTypes.shape({
    index: PropTypes.number,
    timestamp: PropTypes.number,
    data: PropTypes.string,
    'previous-hash': PropTypes.string,
    'hash': PropTypes.string
  }).isRequired
};

export default Block;
