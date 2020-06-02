import React, { useState, useEffect, memo } from "react";
import Qrcode from 'qrcode.react';
import socket from './socket';
import history from "history.js";
import QrcodeCard from './QrcodeCard';
import QrcodeVideo from './QrcodeVideo';

const QrcodeContainer = props => {
	const [client, setClient] = useState(socket());
	const [qrCode, setQrcode] = useState(null);
	const [startVideo, setVideoStart] = useState(false);

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

	const handleStartVideo = () => {
		setVideoStart(true);
		console.log('click');
	}

	return (
		<div style={{ margin: '10px 10px 10px 10px' }}>
			<QrcodeCard />
      {qrCode && <Qrcode  value={qrCode} />}
			<div onClick={handleStartVideo}>
				<QrcodeVideo startVideo={startVideo}/>
			</div>
    </div>
    );
		
}

export default memo(QrcodeContainer);