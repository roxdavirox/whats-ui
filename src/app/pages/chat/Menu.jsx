import React from 'react';
import { useDispatch } from 'react-redux';
import { MatxMenu } from "matx";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CallEndIcon from '@material-ui/icons/CallEnd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {
  IconButton,
  Icon,
  MenuItem
} from "@material-ui/core";
import { openTransferListDialog } from '../../redux/actions/ChatActions';
import { finishContact } from '../../redux/actions/ContactActions';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

const style = {
  menuItem: {
    justifyContent: 'space-between', width: '100%'
  },
  divContainer: {
    minWidth: '160px'
  }
}

const Menu = ({
  onSaveDialogOpen,
  onImageUploadClick,
  onFileUploadClick,
  onVideoUploadClick,
  onFinishContactNotify
}) => {
  const dispatch = useDispatch();
  const handleFinishContact = () => {
    onFinishContactNotify();
    dispatch(finishContact());
  };
  const handleOpenTransferList = () => {
    dispatch(openTransferListDialog());
  }

  return (
    <MatxMenu
      menuButton={
        <IconButton>
          <Icon className="text-white">more_vert</Icon>
        </IconButton>
      }
    >
      <div style={style.divContainer}>
        <MenuItem 
          style={style.menuItem}
          className="flex items-center" onClick={() => {
          onSaveDialogOpen();
        }}>
          Salvar contato <PersonAddIcon />
        </MenuItem>
        <MenuItem 
          className="flex items-center" 
          onClick={handleOpenTransferList} 
          style={style.menuItem}
        >
          Encaminhar<ArrowForwardIosIcon />
        </MenuItem>
        <MenuItem 
          className="flex items-center" 
          style={style.menuItem}
          onClick={handleFinishContact}
        >
          Finalizar <CallEndIcon />
        </MenuItem>
        <MenuItem
          className="flex items-center"
          onClick={onImageUploadClick}
          style={style.menuItem}
        >
          Enviar imagem <InsertPhotoIcon />
        </MenuItem>
        <MenuItem
          className="flex items-center"
          onClick={onVideoUploadClick}
          style={style.menuItem}
        >
          Enviar video <VideoLibraryIcon />
        </MenuItem>
        <MenuItem
          className="flex items-center"
          onClick={onFileUploadClick}
          style={style.menuItem}
        >
          Enviar documento <InsertDriveFileIcon />
        </MenuItem>
      </div>
    </MatxMenu>
  )
}

export default Menu;