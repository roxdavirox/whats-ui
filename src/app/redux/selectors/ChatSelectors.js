export const selectRecentChats = store => {
  const { contact, chat } = store;
  if (!contact) return [];
  const { contacts } = contact;
  const { recentChats } = chat;
  if (!recentChats) return [];

  return recentChats
    .map(chat => ({ 
      contact: contacts[chat.contactId], 
      ...chat 
    }))
    .filter(c => c.contact && c.contact.active)
    .sort(function(a, b) {
      a = new Date(a.lastMessageTime);
      b = new Date(b.lastMessageTime);
      return a > b ? -1 : a < b ? 1 : 0;
    });
}