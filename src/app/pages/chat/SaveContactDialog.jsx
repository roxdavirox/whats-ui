import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

function SaveContactDialog(props) {
  const { onClose, onSave, open } = props;
  const classes = useStyles();
  const [contactName, setContactName] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave(contactName);
    onClose();
  };

  const handleChangeContactName = e => setContactName(e.target.value);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Container className={classes.container}>
        <Container className={classes.container}>
          <DialogTitle id="simple-dialog-title">Salvar contato</DialogTitle>
          <FormControl>
            <TextField
              onChange={handleChangeContactName}
              value={contactName}
              label="Nome do contato"
              variant="outlined"
              />
          </FormControl>
        </Container>
        <Container className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.button}
          >
            Salvar
          </Button>
        </Container>
      </Container>
    </Dialog>
  );
}

export default SaveContactDialog;
