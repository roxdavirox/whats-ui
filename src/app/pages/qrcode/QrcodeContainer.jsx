import React, { useState, useEffect, memo } from "react";
import socket from './socket';
import history from "history.js";
import QrcodeCard from './QrcodeCard';
import Container from '@material-ui/core/Container';

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
		<Container >
			<QrcodeCard qrcode={qrcode} />
		</Container>
    );
		
}

export default memo(QrcodeContainer);