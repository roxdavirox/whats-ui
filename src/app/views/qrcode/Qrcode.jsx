import React, { useState, useEffect, memo } from "react";
import Qrcode from 'qrcode.react';
import socket from './socket';
import ContactList from './ContactList';

const QrcodeContainer = props => {
	const [client, setClient] = useState(socket());
	const [qrCode, setQrcode] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);

	useEffect(() => {
    const currentUser = {
      id: "a069df2c-8abe-45a1-9e15-d5d3d62b5044",
      ownerId: '8d4693dd-2fe3-41a5-913f-6e43118a70ee',
      name: 'Davi'
    };
    client.registerConnectHandler(() =>{}, currentUser);
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

    const sortedAndCheckedContacts = contacts.sort(byName)
      .map(contact => ({ ...contact, checked: false }))
  
    setContacts(sortedAndCheckedContacts);
    setQrcode(null);
  }
  
  const handleImportSelectedContacts = () => {
    const selectedContacts = rowsSelected
      .map(index => contacts[index])
      .map(({ checked, ...rest }) => rest);
    client.importContacts(selectedContacts);
    setContacts([]);
  }

  const handleRowsSelect = rowsSelected => setRowsSelected(rowsSelected);
  console.log('renderizando qrcode');
	return (
		<div style={{ margin: '10px 10px 10px 10px' }}>
      {qrCode 
        ? <Qrcode  value={qrCode} /> 
        : <ContactList 
            contacts={contacts} 
            handleRowsSelect={handleRowsSelect}
            rowsSelected={rowsSelected}
            handleImportSelectedContacts={handleImportSelectedContacts} />}
    </div>
    );
		
}

export default memo(QrcodeContainer);