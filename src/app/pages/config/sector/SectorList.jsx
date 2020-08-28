import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default ({ sectors }) => {
  if (!sectors) return <h1>Nenhum setor</h1>;
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const [personName, setPersonName] = React.useState([]);

  return (
    <>
      {sectors && sectors.map((sector, index) => (
        <div key={index}>
          <TextField label="Comando" variant="outlined" />
          <TextField label="Setor" variant="outlined" />
          <TextField label="Algoritmo" variant="outlined" select style={{ minWidth: '120px' }}>
            {[{ id: '1', name: 'aleatório'}].map(({ name, id }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </TextField>
          <FormControl style={{ maxWidth: '120px' }}>
            <InputLabel style={{ padding: '0px 10px'}}>Atendentes </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              style={{ minWidth: '240px' }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={false} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        ))
      }
    </>
  )
}