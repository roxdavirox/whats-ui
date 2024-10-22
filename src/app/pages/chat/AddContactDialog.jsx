import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addNewContact, closeAddContactDialog } from '../../redux/actions/ContactActions';
import { FormControl } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 10px 10px'
  },
  button: {
    placeSelf: 'flex-end'
  }
}));

const MaskedTextField = ({ value, onChange }) => (
  <InputMask
    mask="+55 (99) 99999-9999"
    value={value}
    label="Número do contato"
    onChange={onChange}
  >
    {(inputProps) =>
      <TextField
        {...inputProps}
        placeholder="Digite o numero aqui"
        variant="outlined"
        disableUnderline
      />
    }
  </InputMask>
);

const formatBeforeSaveContact = phone => {
  if (!phone) return;

  const formatedPhone = phone.match(/\d/g).join('');
  
  return formatedPhone;
}

function AddContactDialog(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddContactDialog());
  };

  const handleSave = () => {
    const onlyNumbersPhone = formatBeforeSaveContact(phone);
    dispatch(addNewContact(
      contactName,
      onlyNumbersPhone,
      enqueueSnackbar
    ));
    setContactName('');
    setPhone('');
    handleClose();
  };

  const handleNameChange = e => setContactName(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  
  const openAddContact = useSelector(({ contact }) => contact.openAddContact);

  return (
    <>
      {openAddContact &&
      <Dialog 
        onClose={handleClose}
        open={openAddContact}
        >
          <Container className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off">
              <DialogTitle>Adicionar contato</DialogTitle>
              <Container className={classes.container}>
                <FormControl>
                  <TextField
                    onChange={handleNameChange}
                    value={contactName}
                    label="Nome do contato"
                    variant="outlined"
                    />
                </FormControl>
                <FormControl>
                  <MaskedTextField
                    onChange={handlePhoneChange}
                    value={phone}
                    />
                </FormControl>
              </Container>
            </form>
            <div className={classes.container}>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Adicionar
              </Button>
            </div>
        </Container>
      </Dialog>
      }
    </>
  );
}

export default AddContactDialog;
