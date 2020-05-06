import React, { useState, useEffect } from "react";
import Qrcode from 'qrcode.react';
import socket from './socket';
import ContactList from './ContactList';

const QrcodeContainer = props => {
	const [client, setClient] = useState(socket());
	const [qrCode, setQrcode] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);

	useEffect(() => {
		client.registerQrcodeHandler(handleQrcode);
		client.registerContactsHandler(handleReceivedContacts);
	}, []);

	const handleQrcode = qrcode => { 
		console.log('qrcode', qrcode);
		setQrcode(qrcode);
	}

	const handleReceivedContacts = contacts => {
    // mapeia os dados que vem do whatsapp web
    console.log('contacts', contacts);
    const byName = function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    const sortedContacts = contacts.sort(byName)
      .map(contact => ({ ...contact, checked: false }))
  
    setContacts(sortedContacts);
    setQrcode(null);
  }
  
  const handleImportSelectedContacts = () => {
    const selectedContacts = rowsSelected
      .map(index => contacts[index])
      .map(({ checked, ...rest }) => rest);
    console.log('handle selected contacts', selectedContacts);
  }

  const handleRowsSelect = rowsSelected => setRowsSelected(rowsSelected);

	return (
		<div style={{ margin: '10px 10px 10px 10px' }}>
      {qrCode 
        ? <Qrcode  value={qrCode} /> 
        : <ContactList 
            contacts={contacts} 
            handleRowsSelect={handleRowsSelect}
            rowsSelected={rowsSelected}
            handleImportSelectedContacts={handleImportSelectedContacts} />}
		</div>);
		
}

export default QrcodeContainer;