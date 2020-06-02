import React from 'react';
import YouTube from 'react-youtube';
import { Card, Grid } from "@material-ui/core";

const QrcodeVideo = ({ startVideo }) => {
  const videoOptions = {
    height: 390,
    width: 640,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="pricing m-sm-30 position-relative">
      <Grid container spacing={6} className="flex">
        <Grid item>
          <Card elevation={6}>
            {startVideo && <YouTube videoId="Hcu2LX_hktQ" opts={videoOptions}/>}
          </Card>
        </Grid>
      </Grid>
    </div>);
}

export default QrcodeVideo;
