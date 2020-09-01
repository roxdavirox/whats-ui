import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SectorList from './SectorList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddSectorDialog from './AddSectorDialog';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'relative',
  },
  card: {
    padding: '10px 10px',
    display: 'flex',
    flexDirection: 'column'
  },
  boxFab: {
    display: 'flex',
    alignSelf: 'flex-end',
    margin: '10px 10px'
  },
  box: {
    margin: '10px 10px'
  },
  textField: {
    minWidth: '340px',
  },
  textBox: {
    margin: '10px 10px',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState([]);

  return (
    <>
      {openModal && <AddSectorDialog />}
      <Container maxWidth="md">
        <Card className={classes.card}>
          <Box className={classes.box}>
            <div className={classes.textBox} style={{ maxWidth: '300px'}}>
              <Typography variant="h4">Texto inicial</Typography>
              <Button variant="contained" size="larger" color="primary">
                Salvar
              </Button>
            </div>
            <div>
              <TextField 
                label="Digite aqui o texto inicial..."
                variant="outlined"
                multiline
                className={classes.textField}
              />
            </div>
          </Box>
          <Box className={classes.box}>
            <Typography variant="h4">Descrição dos setores</Typography>
            <SectorList sectors={[{ command: '1', name: 'Comercial', type: 'aleatório' }]} />
          </Box>
          <Box className={classes.boxFab}>
            <Fab size="larger" color="primary" aria-label="add" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Box>
        </Card>
      </Container>
    </>
  );
}
