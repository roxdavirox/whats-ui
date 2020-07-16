export const selectMessages = store => {
  const { contact, chat, messages } = store;
  const { contactId } = contact;
  if (!contactId) return [];
  const currentChat = chat[contactId];
  const { messages: messagesIds } = currentChat;
  const selectedMessages = messagesIds.map(id => messages[id]);
  return selectedMessages || [];
}