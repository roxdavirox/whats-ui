import React, { useState, useEffect } from "react";
import Qrcode from 'qrcode.react';
import socket from './socket';
import ContactList from './ContactList';

const QrcodeContainer = props => {
    const [client, setClient] = useState(socket());
    const [qrCode, setQrcode] = useState(null);
    const [contacts, setContacts] = useState([{
        name: 'Felipe',
        phone: '+55011987654321'
    }]);

    useEffect(() => {
        client.registerQrcodeHandler(handleQrcode);
    }, []);

    const handleQrcode = qrcode => { 
        console.log('qrcode', qrcode);
        setQrcode(qrcode);
    }

    return (
        <div style={{ margin: '10px 10px 10px 10px' }}>
            {qrCode ? <Qrcode  value={qrCode} /> : <ContactList contacts={contacts}/>}
        </div>);
        
}

export default QrcodeContainer;