import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatAvatar from "./ChatAvatar";
import Divider from '@material-ui/core/Divider';
import { closeContactListDialog } from '../../redux/actions/ChatActions';

const ContactList = ({ contacts, handleContactClick }) => {
  const dispatch = useDispatch();
  const handleCloseContactList = () => dispatch(closeContactListDialog());

  return (
    <List>
      {Object.values(contacts) && Object.values(contacts).map((contact, index) => (
        <Fragment >
          <ListItem button >
            <ListItemIcon>
            <ChatAvatar src={contact.eurl} />
            </ListItemIcon>
            <ListItemText primary={contact.name} onClick={() => {
              handleContactClick(contact.id);
              handleCloseContactList();
            }} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}

export default ContactList;
