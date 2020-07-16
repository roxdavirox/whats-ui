export const selectCurrentContact = ({ contact }) => contact.byId[contact.contactId] || false;

export const selectContacts = ({ contact }) =>
  contact.allIds.map(id => contact.byId[id]);