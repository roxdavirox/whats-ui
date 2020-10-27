import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ButtonMoreHorizIcon = props => (
  <IconButton arial-label="Edit" {...props}>
    <MoreHorizIcon fontSize="small" />
  </IconButton>
);

export default ButtonMoreHorizIcon;
