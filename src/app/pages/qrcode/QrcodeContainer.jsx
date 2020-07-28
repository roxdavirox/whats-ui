import React, { useEffect, memo } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import QrcodeCard from './QrcodeCard';
import Container from '@material-ui/core/Container';
import { setConnectionStatus, setQrcode } from '../../redux/actions/QrcodeActions';
import socket from './socket';
import { setPerfectScrollbar } from '../../redux/actions/LayoutActions';

const QrcodeContainer = props => {
	const dispatch = useDispatch();
	const code = useSelector(({ qrcode }) => qrcode.code);
	const isConnected = useSelector(({ qrcode }) => qrcode.isConnected);
	const currentUser = useSelector(({ user }) => user);

	useEffect(() => {
		dispatch(setPerfectScrollbar(true));
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
		if (!isConnected) return;
		dispatch(setQrcode(null));
	}

	const handleQrcode = qrcode => dispatch(setQrcode(qrcode));

	if (!currentUser || currentUser.role !== 'ADMIN') return;

	return (
		<Container >
			{code && <QrcodeCard qrcode={code} isConnected={isConnected}/>}
		</Container>
  );
}

export default memo(QrcodeContainer);