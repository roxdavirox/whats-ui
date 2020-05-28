import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SaveContactDialog(props) {
  const { onClose, onSave, open } = props;
  const [contactName, setContactName] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave(contactName);
    onClose();
  };
  console.log('render save');
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Salvar contato</DialogTitle>
      <TextField onChange={e => setContactName(e.target.value)} value={contactName} />
      <Button onClick={handleSave}>Salvar</Button>
    </Dialog>
  );
}

export default SaveContactDialog;
