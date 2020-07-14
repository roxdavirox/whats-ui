import { schema } from 'normalizr';

const id = { idAttribute: 'id' };

const messageSchema = new schema.Entity('messages', {}, id);

const chatSchema = new schema.Entity('chats', {
  messages: [messageSchema]
}, id);

const contactSchema = new schema.Entity(
  'contacts',
  {}, 
  id
);

export {
  chatSchema,
  contactSchema,
  messageSchema
};
