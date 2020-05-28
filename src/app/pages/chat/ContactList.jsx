import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatAvatar from "./ChatAvatar";
import Divider from '@material-ui/core/Divider';

const ContactList = ({ contacts, handleContactClick }) => {
  return (
    <List>
      {Object.values(contacts) && Object.values(contacts).map((contact, index) => (
        <Fragment key={index}>
          <ListItem button key={index}>
            <ListItemIcon>
            <ChatAvatar src={contact.eurl} />
            </ListItemIcon>
            <ListItemText primary={contact.name} onClick={() => handleContactClick(contact.id)} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}

export default ContactList;
