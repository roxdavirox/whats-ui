import React from "react";
import ContactItem from './ContactItem';

const ContactList = ({ contacts }) => {
  return contacts.map(contact => (
    <ContactItem contact={contact} />    
  ));
};

export default ContactList;
