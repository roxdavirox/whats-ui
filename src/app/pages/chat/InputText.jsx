import React, { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Icon,
  Fab,
  TextField,
} from "@material-ui/core";
import useAudioRecorder from 'app/components/customHooks/AudioRecorder';
import useTimer from 'app/components/customHooks/Timer';
import { uploadAudio } from 'app/redux/actions/ChatActions';
import MicIcon from '@material-ui/icons/Mic';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const InputText = forwardRef((props, ref) => {
  const [message, setMessage] = useState('');

  const { start, stop, isRecording } = useAudioRecorder();
  const { seconds, startTimer, reset } = useTimer();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ user }) => user);

  const sendMessageOnEnter = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      let msg = message.trim();
      if (msg !== "") props.onSend(message.trim());
      setMessage('');
    }
  };

  const handleSend = () => {
    let msg = message.trim();
    if (msg !== "") props.onSend(message.trim());
    setMessage('');
  }

  const handleStart = () => {
    start();
    startTimer();
  };

  const handleStop = () => {
    stop().then(blob => {
      dispatch(uploadAudio({
        blob,
        ownerId: currentUser.ownerId,
        userId: currentUser.id
      }));
      reset();
    });
  }

  const handleCancel = () => {
    stop();
    reset();
  }

  const handleChange = e => {
    setMessage(e.target.value);
  }
  
  return (
    <div className="flex items-center px-4 py-2">
      <TextField
        label="Digite aqui"
        value={message}
        onChange={handleChange}
        onKeyDown={sendMessageOnEnter}
        fullWidth
        multiline={true}
        rows={2}
        variant="outlined"
        autoFocus={false}
        inputRef={ref}
      />
     <div style={{ display: 'flex', alignItems: 'center' }}>
       {message && (
        <Fab
          onClick={handleSend}
          color="primary"
          className="ml-4"
        >
          <Icon>send</Icon>
        </Fab>
       )}
       {!message && !isRecording && (
        <Fab
          onClick={handleStart}
          color="primary"
          className="ml-4"
        >
          <MicIcon />
        </Fab>
       )}
       {!message && isRecording && (
        <>
          <Fab
            onClick={handleCancel}
            color="primary"
            className="ml-4"
          >
            <CancelOutlinedIcon />
          </Fab>
          <div 
            className="ml-4"
            style={{ color:'gray' }}
          >{seconds}s</div>
          <Fab
            onClick={handleStop}
            color="primary"
            className="ml-4"
          >
            <CheckCircleOutlineOutlinedIcon />
          </Fab>
        </>
       )}
    </div>
  </div>
  )
})

export default InputText;
