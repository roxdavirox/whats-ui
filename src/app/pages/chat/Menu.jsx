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
import { finishContact } from '../../redux/actions/ChatActions';

const style = {
  menuItem: {
    justifyContent: 'space-between', width: '100%'
  },
  divContainer: {
    minWidth: '160px'
  }
}

const Menu = ({ onSaveDialogOpen, onImageUploadClick, onOpenTransferList }) => {
  const dispatch = useDispatch();
  const handleFinishContact = () => dispatch(finishContact());

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
          onClick={onOpenTransferList} 
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
      </div>
    </MatxMenu>
  )
}



export default Menu;