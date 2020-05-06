import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatAvatar from "./ChatAvatar";

const ContactList = ({ contacts }) => (
  <List>
    {contacts && contacts.map(contact => (
      <ListItem button key={contact.jid}>
        <ListItemIcon>
         <ChatAvatar src={contact.eurl} />
        </ListItemIcon>
        <ListItemText primary={contact.name} />
      </ListItem>
    ))}
  </List>
);

export default ContactList;
