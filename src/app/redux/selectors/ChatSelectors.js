export const selectRecentChats = store => {
  const { contact, chat, user } = store;
  if (!contact) return [];
  
  if (!chat.allIds) return [];

  const recentChats = chat.allIds.map(id => chat.byId[id]);
  return recentChats
    .map(chat => ({ 
      contact: contact.byId[chat.contactId], 
      ...chat 
    }))
    .filter(c => c.contact && c.contact.active && c.userId === user.id)
    .sort(function(a, b) {
      a = new Date(a.lastMessageTime);
      b = new Date(b.lastMessageTime);
      return a > b ? -1 : a < b ? 1 : 0;
    });
}

export const selectFixedChats = store => selectRecentChats(store).filter(chat => chat.fixed);

export const selectChats = store => selectRecentChats(store).filter(chat => !chat.fixed);

export const selectCurrentChat = ({ chat, contact }) => {
  if (!contact.contactId) return {};
  if (!chat.byId) return {};
  return chat.byId[contact.contactId] || {};
}

export const selectTransferUsers = ({ chat, user }) => {
  if (!chat.byId) return [];

  if (!chat.transferUsers.byId) return []

  return chat
    .transferUsers
    .allIds
    .filter(id => id !== user.id)
    .map(userId => chat.transferUsers.byId[userId]);
}