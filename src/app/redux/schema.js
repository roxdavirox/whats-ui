import { schema } from 'normalizr';

const id = { idAttribute: 'id' };

const messageSchema = new schema.Entity('messages', {});

const chatSchema = new schema.Entity('chats', {
  messages: [messageSchema]
}, {
  idAttribute: 'contactId'
});

const contactSchema = new schema.Entity(
  'contacts',
  { chat: chatSchema }, 
  id
);

const transferUserSchema = new schema.Entity('transferUsers', {});

export {
  chatSchema,
  contactSchema,
  messageSchema,
  transferUserSchema
};
