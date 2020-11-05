import { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const useAudioRecorder = () => {
  const [isRecording, setRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [buffer, setBuffer] = useState(null);
  const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }))

  const mediaPermissionSuccess = () => {
    console.log('Permission Granted');
    setIsBlocked(false);
  };

  const mediaPermissionDenied = () => {
    console.log('Permission Denied');
    setIsBlocked(true);
  };

  useEffect(() => {
    navigator.getUserMedia({ audio: true }, mediaPermissionSuccess, mediaPermissionDenied);
  }, []);

  const start = () => {
    if (isBlocked) return;
    Mp3Recorder
      .start()
      .then(() => setRecording(true))
      .catch(console.error);
  }

  const stop = () => {
    return new Promise((resolve, reject) => {
      Mp3Recorder
      .stop()
      .getMp3()
      .then(([buf, blob]) => {
        setBuffer(buf);
        setRecording(false);
        resolve(blob);
      })
      .catch(reject);
    });
  }

  return {
    start,
    stop,
    buffer,
    isRecording
  }
}

export default useAudioRecorder;
