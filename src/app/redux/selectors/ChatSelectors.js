export const getRecentChats = store => {
  const { chat } = store;
  if (!chat) return [];
  const { recentChats, contacts } = chat;
  if (!recentChats) return [];

  return recentChats.map(chat => ({ 
      contact: contacts[chat.contactId], 
      ...chat 
    }))
    .sort(function(a, b) {
      a = new Date(a.lastMessageTime);
      b = new Date(b.lastMessageTime);
      return a > b ? -1 : a < b ? 1 : 0;
    });
}