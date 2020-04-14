import React, { Component, Fragment } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Card,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  Divider
} from "@material-ui/core";
import { countries } from "./Country";
import PaymentDialog from "./PaymentDialog";
import { connect } from "react-redux";

class Checkout extends Component {
  state = {
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    mobile: "",
    country: "United States",
    city: "",
    address: "",
    open: false
  };

  getTotalCost = () => {
    let { cartList = [] } = this.props;
    let totalCost = 0;
    cartList.forEach(product => {
      totalCost += product.amount * product.price;
    });
    return totalCost;
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    this.toggleDialog();
  };

  toggleDialog = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    let {
      firstName,
      lastName,
      company,
      email,
      mobile,
      country,
      city,
      address
    } = this.state;

    let { cartList = [] } = this.props;

    return (
      <Card className="checkout m-sm-30 p-sm-24">
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <h5 className="font-medium mt-0 mb-6">Billing Details</h5>
          <Grid container spacing={3}>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Grid container spacing={3} className="mb-2">
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    label="First Name"
                    onChange={this.handleChange}
                    type="text"
                    name="firstName"
                    value={firstName}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    label="Last Name"
                    onChange={this.handleChange}
                    type="text"
                    name="lastName"
                    value={lastName}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextValidator
                className="mb-5"
                variant="outlined"
                label="Company"
                onChange={this.handleChange}
                type="text"
                name="company"
                value={company}
                fullWidth
              />

              <Grid container spacing={3} className="mb-2">
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    label="Email"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid"
                    ]}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    label="Mobile"
                    onChange={this.handleChange}
                    type="number"
                    name="mobile"
                    value={mobile}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} className="mb-2">
                <Grid item xs={6}>
                  <TextValidator
                    label="Country"
                    select
                    name="country"
                    variant="outlined"
                    value={country}
                    onChange={this.handleChange}
                    fullWidth
                  >
                    {countries.map(country => (
                      <MenuItem key={country.code} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextValidator>
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    label="City"
                    onChange={this.handleChange}
                    type="text"
                    name="city"
                    value={city}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextValidator
                variant="outlined"
                className="mb-5"
                label="Address\"
                onChange={this.handleChange}
                type="text"
                name="address"
                value={address}
                validators={["required"]}
                errorMessages={["this field is required"]}
                fullWidth
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Create an account?"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <div className="flex justify-between mb-4">
                <h6 className="m-0">Porduct</h6>
                <h6 className="m-0">Total Price</h6>
              </div>
              <div className="checkout__product-list">
                {cartList.map(product => (
                  <Fragment key={product.id}>
                    <div className="flex justify-between py-4">
                      <span className="text-muted pr-8">{product.title}</span>
                      <span className="text-muted">
                        ${product.price * product.amount}
                      </span>
                    </div>
                    <Divider></Divider>
                  </Fragment>
                ))}
                <div className="flex justify-between mb-8 mt-4">
                  <h6 className="m-0">Total</h6>
                  <h6 className="m-0">${this.getTotalCost().toFixed(2)}</h6>
                </div>
                <Button
                  className="w-full"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Place Order
                </Button>
              </div>
            </Grid>
          </Grid>
        </ValidatorForm>

        <PaymentDialog
          open={this.state.open}
          toggleDialog={this.toggleDialog}
        ></PaymentDialog>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  cartList: state.ecommerce.cartList,
  user: state.user
});

export default connect(mapStateToProps, {})(Checkout);
