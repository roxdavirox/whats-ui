import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ButtonMoreHorizIcon = props => (
  <IconButton arial-label="menu" {...props}>
    <ExpandMoreIcon />
  </IconButton>
);

export default ButtonMoreHorizIcon;
