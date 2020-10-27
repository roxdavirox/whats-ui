import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Tooltip from '@material-ui/core/Tooltip';

const StarButton = props => (
  <Tooltip title={props.title}>
    <IconButton arial-label="Edit" {...props}>
      {props.fixed 
        ? <StarIcon fontSize="small" />
        : <StarBorderIcon fontSize="small" />
      }
    </IconButton>
  </Tooltip>
);

export default StarButton;