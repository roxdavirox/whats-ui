import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const StarButton = props => (
  <IconButton arial-label="Edit" {...props}>
    {props.fixed 
      ? <StarIcon fontSize="small" />
      : <StarBorderIcon fontSize="small" />
    }
  </IconButton>
);

export default StarButton;