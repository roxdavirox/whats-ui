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
import { getMessagesByContactId } from '../../redux/actions/MessageActions';
import { useDebouncedCallback } from 'use-debounce';
import { selectCurrentContact, } from '../../redux/selectors/ContactSelectors';
import { selectCurrentChat } from '../../redux/selectors/ChatSelectors';

const ChatContainer = ({
  setRef,
  handleMessageSend,
  onSaveDialogOpen,
  parentScrollRef
}) => {
  const { 
    currentChatRoom,
    imageModalOpen,
  } = useSelector(({ chat }) => chat);
  const currentContact = useSelector(selectCurrentContact);
  const currentChat = useSelector(selectCurrentChat);
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
      ownerId: currentUser.ownerId,
      userId: currentUser.id,
    }));
    e.target.value = null;
  };

  const [handleLoadMessagesDebounce] = useDebouncedCallback(
    (contactId) => {
      dispatch(getMessagesByContactId(contactId));
    },
    1000
  );

  const handleLoadMessages = (contactId, hasMoreMessage) => {
    if (!hasMoreMessage) return;
    handleLoadMessagesDebounce(contactId);
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
        />
        <Scrollbar 
          className="p-2 h-full-screen scroll-y chat-message-list flex-grow position-relative"
          containerRef={ref => {
            setRef({current: ref});
          }}
          onScrollUp={e => {
            if (!currentContact) return;
            const position = e.scrollTop;
            if (position <= 50 && currentChat.hasMoreMessage) {
              handleLoadMessages(currentContact.id, currentChat.hasMoreMessage);
              parentScrollRef.current.scrollTop = parentScrollRef.current.scrollHeight / 4;
            }
          }}
        >
          {currentChatRoom === "" && <EmptyMessage />}
          {parentScrollRef && parentScrollRef.current && (
          <InfiniteScroll
            style={{ height: '100%' }}
            pageStart={0}
            isReverse
            hasMore={currentChat && currentChat.hasMoreMessage}
            loader={loader}
            getScrollParent={() => parentScrollRef}
            useWindow={true}
            threshold={100}
          >
            <MessageList />
          </InfiniteScroll>
          )}
        </Scrollbar>
        <Divider />
        {currentChatRoom !== "" 
          && currentContact.userId === currentUser.id
          && <InputText onSend={handleMessageSend}/>}
      </div>
    </>
  );
};

export default ChatContainer;
