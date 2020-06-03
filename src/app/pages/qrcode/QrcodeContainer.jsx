import React, { useEffect, memo } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import QrcodeCard from './QrcodeCard';
import Container from '@material-ui/core/Container';
import { setConnectionStatus, setQrcode } from '../../redux/actions/QrcodeActions';
import socket from './socket';

const QrcodeContainer = props => {
	const dispatch = useDispatch();
	const code = useSelector(({ qrcode }) => qrcode.code);
	const isConnected = useSelector(({ qrcode }) => qrcode.isConnected);
	
	useEffect(() => {
		const client = socket();
    client.registerQrcodeHandler(handleQrcode);
		client.registerConnectionStatus(handleConnection);
    return () => {
			client.disconnect();
			dispatch(setQrcode(null));
    }
	}, []);

	const handleConnection = isConnected => {
		dispatch(setConnectionStatus(isConnected));
		dispatch(setQrcode(null));
	}

	const handleQrcode = qrcode => dispatch(setQrcode(qrcode));

	return (
		<Container >
			<QrcodeCard qrcode={code} isConnected={isConnected}/>}
		</Container>
  );
}

export default memo(QrcodeContainer);