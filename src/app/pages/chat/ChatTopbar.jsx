import React from 'react';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import ChatAvatar from "./ChatAvatar";
import { selectCurrentContact } from '../../redux/selectors/ContactSelectors';

const ChatTopbar = ({ onImageUploadClick, onSaveDialogOpen }) => {
  const { 
    currentChatRoom,
  } = useSelector(({ chat }) => chat);
  const currentUser = useSelector(({ user }) => user);

  const currentContact = useSelector(selectCurrentContact);

  return (
    <div className="chat-container__topbar flex items-center justify-between p-1 bg-primary">
      <div className="flex items-center" style={{ minHeight: '48px' }}>
        <div className="hide-on-mobile">
          <div className="pl-3"></div>
        </div>
        {currentContact && (
          <>
            <ChatAvatar
              src={currentContact.eurl}
              status={currentContact.status}
            />
            <h5 className="position-relative ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
              {`${currentContact.name} (${currentContact.phone})`}
            </h5>
          </>
        )}
      </div>
      {currentChatRoom !== "" 
        && currentUser.id === currentContact.userId
        && (
        <Menu 
          onSaveDialogOpen={onSaveDialogOpen}
          onImageUploadClick={onImageUploadClick}
        />
      )}
    </div>
  );
}

export default ChatTopbar;
