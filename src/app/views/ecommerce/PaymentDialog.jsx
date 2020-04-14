import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Dialog, Grid, Button } from "@material-ui/core";

class PaymentDialog extends Component {
  state = {
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {};

  render() {
    let { open, toggleDialog } = this.props;
    let { cardHolderName, cardNumber, expiryDate, cvc } = this.state;

    return (
      <Dialog open={open} onClose={toggleDialog} scroll="body">
        <div className="p-sm-24 text-center position-relative">
          <img
            className="h-160 mb-4"
            src="/assets/images/debit-card.png"
            alt="debit-card"
          />
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <TextValidator
              className="mb-4"
              variant="outlined"
              label="Card Number"
              onChange={this.handleChange}
              type="number"
              name="cardNumber"
              value={cardNumber}
              validators={[
                "required",
                "minStringLength:16",
                "maxStringLength: 16"
              ]}
              errorMessages={[
                "this field is required",
                "invalid card",
                "invalid card"
              ]}
              fullWidth
            />

            <Grid container spacing={3} className="mb-8">
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  label="Expiry Date"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="12/19"
                  name="expiryDate"
                  value={expiryDate}
                  validators={[
                    "required",
                    "minStringLength: 5",
                    "maxStringLength: 5"
                  ]}
                  errorMessages={[
                    "this field is required",
                    "invalid expiry date",
                    "invalid expiry date"
                  ]}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  label="CVC"
                  onChange={this.handleChange}
                  type="text"
                  name="cvc"
                  value={cvc}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextValidator
              className="mb-6"
              variant="outlined"
              label="Full Name"
              onChange={this.handleChange}
              type="text"
              name="cardHolderName"
              value={cardHolderName}
              validators={["required"]}
              errorMessages={["this field is required"]}
              fullWidth
            />
            <div className="flex justify-end">
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleDialog}
                className="mr-3"
                type="button"
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Pay
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default PaymentDialog;
