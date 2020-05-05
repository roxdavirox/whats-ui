import React, { useState } from "react";
import ContactItem from './ContactItem';
import Button from "@material-ui/core/Button";

const ContactList = ({ contacts, handleContactCheck }) => {
  const contactCount = Object.values(contacts).length;
  return (
    <>
      <p>{contactCount && `Deseja importar ${contactCount} contat${contactCount > 1 ? 'os' : 'o'}?`}</p>
      <Button className="mb-4" variant="contained" color="primary">
        Importar
      </Button>
      {Object.values(contacts)
        .map(contact => (<ContactItem contact={contact} handleContactCheck={handleContactCheck} />))}
    </>
    )
    
};

export default ContactList;
