import React, { useState } from "react";
import MuiDatatable from "mui-datatables";
import CustomToolbarSelect from './CustomToolbarSelect';

const ContactList = ({ 
  contacts,
  handleContactCheck,
  handleImportSelectedContacts,
  handleRowsSelect,
  rowsSelected
}) => {
  const contactCount = Object.values(contacts).length;
  const columns = [
    {
      name: "jid",
      label: "jid",
      options: {
        display: 'excluded'
      }
    },
    {
      name: "name",
      label: "Nome"
    },
    {
      name: "phone",
      label: "Numero"
    },
    {
      name: "eurl",
      label: "",
      options: {
        display: 'excluded'
      }
    }
  ]
  const options = {
    filterType: 'checkbox',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect 
        selectedRows={selectedRows} 
        displayData={displayData} 
        setSelectedRows={setSelectedRows}
        handleImportSelectedContacts={handleImportSelectedContacts} />
    ),
    textLabels: {
      selectedRows: {
        text: "Contato(s) selecionado(s)",
      },
    },
    rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      const { dataIndex } = rowsSelected[0];
      console.log(rowsSelected, allRows);
      handleContactCheck(dataIndex);
      handleRowsSelect(allRows.map(row => row.dataIndex));
    },
  };

  return (
    <>
      {contactCount > 0 
        ? <>
            <p>Selecione os contatos do celular para importar para o whatsapipe.</p>
            <MuiDatatable 
              title={<h6>Contatos</h6>}
              data={contacts}
              options={options}
              columns={columns} />
          </>
        : 'Conectado'}
    </>
    )
    
};

export default ContactList;
