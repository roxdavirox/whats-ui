import React from "react";
import { Card, Grid, Button } from "@material-ui/core";

const QrcodeCard = () => (
  <div className="pricing m-sm-30 position-relative">
    <div className="w-full text-left ml-1 mb-11">
      <h3 className="m-0 font-medium">
        Para user o whatspipe no seu computador:
      </h3>
      <p className="m-0 pt-4 text-muted">
        Pay month or year and cancel at any time
      </p>
    </div>
    <div>
      <Grid container spacing={6} style={{ justifyContent: 'space-evenly' }}>
        <Grid item lg={8} md={8} sm={8} xs={12}>
          <Card elevation={6} className="pricing__card text-center p-sm-24">
            <img
              className="mb-4"
              src="/assets/images/illustrations/upgrade.svg"
              alt="upgrade"
            />
            <div className="mb-4">
              <h5>Growing</h5>
              <h1>$195</h1>
              <small className="text-muted">Monthly</small>
            </div>

            <div className="mb-6">
              <p className="mt-0">Complete CRM service</p>
              <p>10000GB disk space</p>
              <p className="mb-0">upto 15 users</p>
            </div>

            <Button variant="contained" color="primary" className="uppercase">
              Sign up
            </Button>
          </Card>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <Card elevation={6} className="pricing__card text-center p-sm-24">
            <img
              className="mb-4"
              src="/assets/images/illustrations/upgrade.svg"
              alt="upgrade"
            />
            <div className="mb-4">
              <h5>Growing</h5>
              <h1>$195</h1>
              <small className="text-muted">Monthly</small>
            </div>

            <div className="mb-6">
              <p className="mt-0">Complete CRM service</p>
              <p>10000GB disk space</p>
              <p className="mb-0">upto 15 users</p>
            </div>

            <Button variant="contained" color="primary" className="uppercase">
              Sign up
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default QrcodeCard;
