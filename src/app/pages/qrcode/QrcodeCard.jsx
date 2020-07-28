import React from "react";
import { Card, Grid, Button } from "@material-ui/core";
import Qrcode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';

const QrcodeCard = ({ qrcode, isConnected }) => (
  <div className="pricing m-sm-30 position-relative">
    <div>
      <Grid container spacing={4} style={{ justifyContent: 'space-evenly' }}>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Card elevation={6} className="pricing__card text-center p-sm-24">
            <div className="mb-4">
              <h4 className="text-muted">QR Code</h4>
            </div>
            {isConnected 
                ? <img style={{ width: 200, height: 200 }} src={'/assets/images/qrcode-whatspipe.png'} alt="qr code conectado" />
                : qrcode
                  ? <Qrcode value={qrcode} style={{ width: 200, height: 200 }}/> 
                  : <Skeleton height={200} width={200} />
            }
            <div className="mb-6">
              {isConnected 
                ? <p className="text-muted">Conectado</p>
                : qrcode
                  ? <small className="text-muted">Passe a camera aqui</small>
                  : <small className="text-muted">gerando QR code...</small>
              }
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default QrcodeCard;
