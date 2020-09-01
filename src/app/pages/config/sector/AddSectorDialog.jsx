import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default ({ open, onClose }) => {

  const handleClose = () => onClose();

  return (
    <>
      <Dialog 
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>Adicionar setor</DialogTitle>
        
      </Dialog>
    </>
  )
};
