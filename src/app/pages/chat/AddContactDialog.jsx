import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addNewContact, closeAddContactDialog } from '../../redux/actions/ChatActions';

function AddContactDialog(props) {
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddContactDialog());
  };

  const handleSave = () => {
    dispatch(addNewContact(
      contactName,
      phone
    ));
    handleClose();
  };

  const handleNameChange = e => setContactName(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  
  const openAddContact = useSelector(({ chat }) => chat.openAddContact);

  return (
    <>
      {openAddContact &&
        <Dialog 
          onClose={handleClose}
          open={openAddContact}
        >
          <DialogTitle>Adicionar contato</DialogTitle>
          <TextField
            onChange={handleNameChange}
            value={contactName}
            label="Nome do contato"
            variant="standard"
          />
          <TextField
            onChange={handlePhoneChange}
            value={phone}
            label="Número"
            variant="standard"
          />
          <Button onClick={handleSave}>Adicionar</Button>
      </Dialog>
      }
    </>
  );
}

export default AddContactDialog;
