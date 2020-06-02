import React from "react";
import { Card, Grid, Button } from "@material-ui/core";
import QrcodeVideo from './QrcodeVideo';
import Qrcode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';

const QrcodeCard = ({ qrcode }) => (
  <div className="pricing m-sm-30 position-relative">
    <div className="w-full text-left ml-1 mb-11">
      <h3 className="m-0 pl-5 pt-4 pb-2 font-medium">
        Para usar o whatspipe no seu computador:
      </h3>
      <p className="m-0 pl-10 pt-6 text-muted">
        1. Abra o Whatsapp
      </p>
      <p className="m-0 pl-10 pt-6 text-muted">
        2. Toque em mais <b>Opções</b> ou <b>Ajustes</b> e selecione <b>Whatsapp Web</b>
      </p>
      <p className="m-0 pl-10 pt-6 text-muted">
        3. Aponte seu celular para essa tela para capturar o código
      </p>
    </div>
    <div>
      <Grid container spacing={6} style={{ justifyContent: 'space-evenly' }}>
        <QrcodeVideo startVideo/>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <Card elevation={6} className="pricing__card text-center p-sm-24">
            <div className="mb-4">
              <h5>QR Code</h5>
            </div>
            {qrcode 
              ? <Qrcode value={qrcode} style={{ width: 200, height: 200 }}/> 
              : <Skeleton height={200} width={200} />
            }
            <div className="mb-6">
              {qrcode
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
