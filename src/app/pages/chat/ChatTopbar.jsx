import React from 'react';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import ChatAvatar from "./ChatAvatar";

const ChatTopbar = ({ onImageUploadClick, onSaveDialogOpen, onOpenTransferList }) => {
  const { 
    contactId,
    contacts,
    currentChatRoom,
  } = useSelector(({ chat }) => chat);
  const currentContact = contacts[contactId] || false ;

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
      {currentChatRoom !== "" && (
        <Menu 
          onSaveDialogOpen={onSaveDialogOpen}
          onImageUploadClick={onImageUploadClick}
          onOpenTransferList={onOpenTransferList}
        />
      )}
    </div>
  );
}

export default ChatTopbar;
