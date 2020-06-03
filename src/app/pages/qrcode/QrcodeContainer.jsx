import React, { useEffect, memo } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import QrcodeCard from './QrcodeCard';
import Container from '@material-ui/core/Container';
import { setConnectionStatus, setQrcode } from '../../redux/actions/QrcodeActions';
import socket from './socket';

const QrcodeContainer = props => {
	const dispatch = useDispatch();
	// const client = useSelector(({ qrcode }) => qrcode.qrcodeSocketClient);
	const code = useSelector(({ qrcode }) => qrcode.code);
	const isConnected = useSelector(({ qrcode }) => qrcode.isConnected);
	
	useEffect(() => {
		const client = socket();
    client.registerQrcodeHandler(handleQrcode);
		client.registerConnectionStatus(handleConnection);
		console.log('render')
    return () => {
      client.disconnect();
    }
	}, []);

	const handleConnection = isConnected => {
		dispatch(setConnectionStatus(isConnected));
		dispatch(setQrcode(null));
	}

	const handleQrcode = qrcode => { 
		console.log('qrcode', qrcode);
		dispatch(setQrcode(qrcode));
	}

	return (
		<Container >
			<QrcodeCard qrcode={code} isConnected={isConnected}/>}
		</Container>
  );
}

export default memo(QrcodeContainer);