import React, { useState, useEffect, memo } from "react";
import socket from './socket';
import history from "history.js";
import QrcodeCard from './QrcodeCard';

const QrcodeContainer = props => {
	const [client, setClient] = useState(socket());
	const [qrcode, setQrcode] = useState(null);

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
			<QrcodeCard qrcode={qrcode} />
    </div>
    );
		
}

export default memo(QrcodeContainer);