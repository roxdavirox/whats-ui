import React from 'react';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeImageModal } from '../../redux/actions/ChatActions';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 10;
  const left = 10;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    marging: 'auto',
    // maxHeight: '70%'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'initial',
    width: 400,
    // height: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
}));

export default function ImageModal({ children }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const dispatch = useDispatch();
  const classes = useStyles();
  const { imageModalOpen, fileUrl } = useSelector(({ chat }) => chat);
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => dispatch(closeImageModal())

  return (
    <div >
      <Modal
        open={imageModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div style={modalStyle} className={classes.paper}>
          <img
            src={fileUrl}
            alt="arquivo de imagem"
            style={{ width: '100%', height: '100%' }}
            
          />
        </div>
      </Modal>
    </div>
  );
}