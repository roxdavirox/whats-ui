import React, { useState, useEffect } from "react";
import Qrcode from 'qrcode.react';
import socket from './socket';

const QrcodeContainer = props => {
    const [client, setClient] = useState(socket());
    const [code, setQrcode] = useState(null);

    useEffect(() => {
        client.registerQrcodeHandler(handleQrcode);
    }, []);

    const handleQrcode = qrcode => { 
        console.log('qrcode', qrcode);
        setQrcode(qrcode);
    }

    return code ? <Qrcode value={code} /> : <><p>Carregando QRcode</p></>
}

export default QrcodeContainer;