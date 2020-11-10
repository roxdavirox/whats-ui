import React, { useRef, forwardRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from "@material-ui/core";
import InputText from './InputText';
import ImagePreviewDialog from './ImagePreviewDialog';
import { uploadImage, uploadDocument, uploadVideo } from '../../redux/actions/ChatActions';
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
import QrcodeContainer from '../qrcode/QrcodeContainer';
import { useEffect } from "react";

const acceptedFiles = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp'];

const ChatContainer = forwardRef((props, ref) => {
  const {
    setRef,
    handleMessageSend,
    onSaveDialogOpen,
    parentScrollRef,
    onFinishContactNotify,
  } = props;
  const { 
    currentChatRoom,
    imageModalOpen,
  } = useSelector(({ chat }) => chat);
  const currentContact = useSelector(selectCurrentContact);
  const currentChat = useSelector(selectCurrentChat);
  const currentUser = useSelector(({ user }) => user);
  const inputImageRef = useRef();
  const inputFileRef = useRef();
  const inputVideoRef = useRef();
  const dispatch = useDispatch();
	const qrcodeIsConnected = useSelector(({ qrcode }) => qrcode.isConnected);
  
  const handlePasteFiles = (e) => {
    if (e.clipboardData && e.clipboardData.items.length > 0) {
      
      let files = [];
      for(var i = 0; i < e.clipboardData.items.length; i++) {
        const file = e.clipboardData.items[i];
        if (acceptedFiles.includes(file.type)) {
          files.push(file.getAsFile());
        }
      }

      dispatch(uploadImage({ 
        files,
        ownerId: currentUser.ownerId,
        userId: currentUser.id,
      }));
    }
  }

  const handleDropFiles = e => {
    e.preventDefault();
    let files = [];

    if (e.dataTransfer && e.dataTransfer.items.length > 0) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        const file = e.dataTransfer.items[i];
        if (file.kind === 'file' && acceptedFiles.includes(file.type)) {
          files.push(file.getAsFile());
        }
      }

      dispatch(uploadImage({ 
        files,
        ownerId: currentUser.ownerId,
        userId: currentUser.id,
      }));
    }
  }

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  useEffect(() => {
    window.addEventListener('paste', handlePasteFiles);
    return () => { window.removeEventListener('paste', handlePasteFiles); }
  }, []);

  useEffect(() => {
    window.addEventListener('drop', handleDropFiles);
    return () => window.removeEventListener('drop', handleDropFiles);
  }, []);

  useEffect(() => {
    if (!parentScrollRef || !parentScrollRef.current) return;
    parentScrollRef.current.scrollTop = 999999;
  },);

  const loader = (
    <div className="w-full text-center p-6" key="loader">
      <CircularProgress variant="indeterminate"></CircularProgress>
    </div>
  );

  const handleUploadImageClick = () => {
    inputImageRef.current.click();
  }

  const handleImageChange = e => {
    e.preventDefault();
    const { files } = e.target;
    if (!files) return;
    dispatch(uploadImage({ 
      files,
      ownerId: currentUser.ownerId,
      userId: currentUser.id,
    }));
    e.target.value = null;
  };

  const handleFileUploadClick = () => {
    inputFileRef.current.click();
  }

  const handleFileChange = e => {
    e.preventDefault();
    const { files } = e.target;
    if (!files) return;
    dispatch(uploadDocument({
      files,
      ownerId: currentUser.ownerId,
      userId: currentUser.id
    }));
    e.target.value = null;
  }

  const handleVideoUploadClick = () => {
    inputVideoRef.current.click();
  }

  const handleVideoChange = e => {
    e.preventDefault();
    const { files } = e.target;
    if (!files) return;
    dispatch(uploadVideo({
      files,
      ownerId: currentUser.ownerId,
      userId: currentUser.id
    }));
    e.target.value = null;
  }

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
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={inputImageRef} />
      <input
        hidden
        type="file"
        multiple
        onChange={handleFileChange}
        ref={inputFileRef} />
      <input
        hidden
        type="file"
        accept="video/*"
        multiple
        onChange={handleVideoChange}
        ref={inputVideoRef} />
      {imageModalOpen && <ImagePreviewDialog />}
      <div 
        className="chat-container flex-column position-relative"
        style={{ height: '100%' }}
        onDragOver={handleDragOver}
      >
        <ChatTopbar 
          onSaveDialogOpen={onSaveDialogOpen}
          onImageUploadClick={handleUploadImageClick}
          onFileUploadClick={handleFileUploadClick}
          onVideoUploadClick={handleVideoUploadClick}
          onFinishContactNotify={onFinishContactNotify}
        />
        {!qrcodeIsConnected && <QrcodeContainer />}
        {currentChatRoom === "" && qrcodeIsConnected && <EmptyMessage />}
        {currentChatRoom !== "" && (
          <Scrollbar 
            className="p-2 h-full-screen scroll-y chat-message-list flex-grow position-relative"
            containerRef={ref => {
              setRef({current: ref});
            }}
            onScrollUp={e => {
              if (!currentContact) return;
              const position = e.scrollTop;
              if (position <= 20 && currentChat.hasMoreMessage) {
                handleLoadMessages(currentContact.id, currentChat.hasMoreMessage);
                parentScrollRef.current.scrollTop = parentScrollRef.current.scrollHeight / 5;
              }
            }}
          >
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
              onClick={() => {
                const selection = window.getSelection().toString();
                if (!selection.length) {
                  ref.current.focus();
                }
              }}
            >
              <MessageList />
            </InfiniteScroll>
            )}
          </Scrollbar>
        )}
        <Divider />
        {currentChatRoom !== "" 
          && currentContact.userId === currentUser.id
          && <InputText ref={ref} onSend={handleMessageSend}/>}
      </div>
    </>
  );
});

export default ChatContainer;
