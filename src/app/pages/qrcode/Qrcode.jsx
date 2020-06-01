import React, { useState, useEffect, memo } from "react";
import Qrcode from 'qrcode.react';
import socket from './socket';
import history from "history.js";

const QrcodeContainer = props => {
	const [client, setClient] = useState(socket());
	const [qrCode, setQrcode] = useState(null);

	useEffect(() => {
    client.registerQrcodeHandler(handleQrcode);
    client.registerConnectionStatus(handleConnection);
    return () => {
      client.disconnect();
      setClient(null);
    }
	}, []);


	const handleConnection = isConnected => {
		if (isConnected) {
			history.push({ pathname: "/chat" });
		}
	}

	const handleQrcode = qrcode => { 
		console.log('qrcode', qrcode);
		setQrcode(qrcode);
	}

	return (
		<div style={{ margin: '10px 10px 10px 10px' }}>
      {qrCode && <Qrcode  value={qrCode} />}
    </div>
    );
		
}

export default memo(QrcodeContainer);