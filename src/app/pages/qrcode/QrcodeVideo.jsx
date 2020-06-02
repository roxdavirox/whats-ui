import React from 'react';
import YouTube from 'react-youtube';
import Overlay from 'react-image-overlay'
import { Card, Grid, Button } from "@material-ui/core";

const QrcodeVideo = ({ startVideo }) => {
  const videoOptions = {
    height: 390,
    width: 640,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleReady = () => console.log('youtube video ready event');

  return (
    <div className="pricing m-sm-30 position-relative">
      <Grid container>
        <Grid item>
          {startVideo 
            ? <YouTube videoId="Hcu2LX_hktQ" opts={videoOptions} onReady={handleReady} />
            : <Overlay 
                url='/assets/images/illustrations/qrcode-video-image.jpg' // required
                overlayUrl='/assets/images/start.png' // required
                imageHeight={videoOptions.height}
                imageWidth={videoOptions.width}
                position={'center'}
                overlayWidth={50}
                overlayHeight={50}
                overlayPadding={20}
                watermark={false}
              />}
        </Grid>
      </Grid>
    </div>);
}

export default QrcodeVideo;
