import React, { useState, useEffect, memo } from "react";
import socket from './socket';
import history from "history.js";
import QrcodeCard from './QrcodeCard';
import Container from '@material-ui/core/Container';

const QrcodeContainer = props => {
	const [client, setClient] = useState(socket());
	const [qrcode, setQrcode] = useState(null);
	const [qrcodeIsConnected, setQrcodeConnectionStatus] = useState(false);

	useEffect(() => {
    client.registerQrcodeHandler(handleQrcode);
    client.registerConnectionStatus(handleConnection);
    return () => {
      client.disconnect();
      setClient(null);
    }
	}, []);


	const handleConnection = isConnected => {
		setQrcodeConnectionStatus(isConnected);
		if (isConnected) {
			// history.push({ pathname: "/chat" });
		}
	}

	const handleQrcode = qrcode => { 
		console.log('qrcode', qrcode);
		setQrcode(qrcode);
	}

	return (
		<Container >
			<QrcodeCard qrcode={qrcode} isConnected={qrcodeIsConnected}/>}
		</Container>
    );
		
}

export default memo(QrcodeContainer);