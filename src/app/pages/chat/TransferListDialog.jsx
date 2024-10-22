
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { selectTransferUsers } from '../../redux/selectors/ChatSelectors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function TransferListDialog(props) {
  const classes = useStyles();
  const { onClose, onSelect, open} = props;
  const transferUsers = useSelector(selectTransferUsers)

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (selectedUserId) => {
    onSelect(selectedUserId);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Atendentes</DialogTitle>
      <List>
        {transferUsers && transferUsers.map(user => (
          <ListItem button 
            onClick={() => handleListItemClick(user.id)}
            key={user.id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default TransferListDialog;
