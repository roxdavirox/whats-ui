import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from "@material-ui/core";
import InputText from './InputText';
import ImagePreviewDialog from './ImagePreviewDialog';
import { uploadImage } from '../../redux/actions/ChatActions';
import ChatTopbar from "./ChatTopbar";
import Scrollbar from 'react-perfect-scrollbar';
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import EmptyMessage from "./EmptyMessage";
import MessageList from './MessageList';
import { getMessagesByContactId } from '../../redux/actions/ChatActions';

const ChatContainer = ({
  setRef,
  handleMessageSend,
  handleOpenTransferList,
  onSaveDialogOpen,
  parentScrollRef
}) => {
  const { 
    contactId,
    currentChatRoom,
    imageModalOpen,
    contacts
  } = useSelector(({ chat }) => chat);
  const currentContact = contacts[contactId] || false ;
  const currentUser = useSelector(({ user }) => user);
  const inputRef = useRef();
  const dispatch = useDispatch();
  
  const loader = (
    <div className="w-full text-center p-6" key="loader">
      <CircularProgress variant="indeterminate"></CircularProgress>
    </div>
  );

  const handleUploadImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = e => {
    e.preventDefault();
    let [file] = e.target.files;
    if (!file) return;
    dispatch(uploadImage({ 
      imageFile: file,
      contactId,
      ownerId: currentUser.ownerId,
      userId: currentUser.id,
    }));
  };

  const handleLoadMessages = (contactId, hasMoreMessage) => {
    if (!hasMoreMessage) return;
    dispatch(getMessagesByContactId(contactId));
  }

  return (
    <>
      <input
        hidden
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        ref={inputRef} />
      {imageModalOpen && <ImagePreviewDialog />}
      <div className="chat-container flex-column position-relative" style={{ height: '100%' }}>
        <ChatTopbar 
          onSaveDialogOpen={onSaveDialogOpen}
          onImageUploadClick={handleUploadImageClick}
          onOpenTransferList={handleOpenTransferList}
        />
        <Scrollbar 
          className="p-8 h-full-screen scroll-y chat-message-list flex-grow position-relative"
          containerRef={ref => {
            setRef({current: ref});
          }}
          onScrollUp={e => {
            const position = e.scrollTop;
            if (position <= 50 && currentContact.chat.hasMoreMessage) {
              handleLoadMessages(currentContact.id, currentContact.chat.hasMoreMessage);
              parentScrollRef.current.scrollTop = parentScrollRef.current.scrollHeight / 4;
            }
          }}
        >
          {currentChatRoom === "" && <EmptyMessage />}
          {parentScrollRef && parentScrollRef.current && currentContact.chat && (
          <InfiniteScroll
            style={{ height: '100%' }}
            pageStart={0}
            isReverse
            hasMore={currentContact.chat && currentContact.chat.hasMoreMessage}
            loader={loader}
            getScrollParent={() => parentScrollRef}
            useWindow={true}
            threshold={100}
          >
            {currentContact.chat
              && currentContact.chat.messages
              && <MessageList messages={currentContact.chat.messages} />
            }
          </InfiniteScroll>
          )}
        </Scrollbar>
        <Divider />
        {currentChatRoom !== "" && <InputText onSend={handleMessageSend}/>}
      </div>
    </>
  );
};

export default ChatContainer;
