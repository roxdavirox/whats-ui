import React, { useState } from "react";
import ContactItem from './ContactItem';
import Button from "@material-ui/core/Button";
import MuiDatatable from "mui-datatables";

const ContactList = ({ contacts, handleContactCheck }) => {
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
    customRowRender: data => {
      const [ jid, name, phone, eurl] = data;
      
      return (
        <tr key={jid}>
          <td colSpan={4} style={{ paddingTop: "10px"}}>
            <ContactItem
              contact={{ name, phone, eurl }}
            />
          </td>
        </tr>
      );
    },
  };

  return (
    <>
      <p>{contactCount ? `Deseja importar ${contactCount} contat${contactCount > 1 ? 'os' : 'o'}?`: 'Conectado'}</p>
      {contactCount > 0 && (<Button className="mb-4" variant="contained" color="primary">
        Importar
      </Button>)}
      <MuiDatatable data={Object.values(contacts)} options={options} columns={columns} />
    </>
    )
    
};

export default ContactList;
