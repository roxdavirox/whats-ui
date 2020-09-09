import React, { useState, forwardRef } from 'react';
import {
  Icon,
  Fab,
  TextField,
} from "@material-ui/core";

const InputText = forwardRef((props, ref) => {
  const [message, setMessage] = useState('');

  const sendMessageOnEnter = event => {
    if (event.key === "Enter" && !event.shiftKey) {
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
  
  return (
    <div className="flex items-center px-4 py-2">
      <TextField
        label="Digite aqui"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={sendMessageOnEnter}
        fullWidth
        multiline={true}
        rows={1}
        variant="outlined"
        autoFocus={false}
        inputRef={ref}
      />
     <div>
      <Fab
        onClick={handleSend}
        color="primary"
        className="ml-4"
      >
        <Icon>send</Icon>
      </Fab>
    </div>
  </div>
  )
})

export default InputText;
