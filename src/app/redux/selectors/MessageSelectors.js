export const selectMessages = store => {
  const { contact, chat, message } = store;
  const { contactId } = contact;
  if (!contactId) return [];
  const currentChat = chat.byId[contactId];
  if (!currentChat) return [];
  const { messages: messagesIds } = currentChat;
  const selectedMessages = messagesIds.map(id => message.byId[id]);
  const sortByLastDate = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
  const sortedMessages = selectedMessages.sort(sortByLastDate);
  return sortedMessages || [];
}