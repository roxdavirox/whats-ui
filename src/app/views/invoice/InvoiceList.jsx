import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  Icon,
  IconButton
} from "@material-ui/core";
import { getAllInvoice, deleteInvoice } from "./InvoiceService";
import { Link } from "react-router-dom";
import { ConfirmationDialog } from "matx";
import { classList } from "utils";

class InvoiceList extends Component {
  state = {
    invoiceList: [],
    shouldShowConfirmationDialog: false
  };

  componentDidMount() {
    getAllInvoice().then(res => this.setState({ invoiceList: res.data }));
  }

  handeViewClick = invoiceId => {
    this.props.history.push(`/invoice/${invoiceId}`);
    // getInvoiceById(invoiceId).then(res => console.log(res.data));
  };

  handeDeleteClick = invoice => {
    this.setState({ shouldShowConfirmationDialog: true, invoice });
  };

  handleConfirmationResponse = () => {
    let { invoice } = this.state;
    deleteInvoice(invoice).then(res => {
      this.setState({
        invoiceList: res.data,
        shouldShowConfirmationDialog: false
      });
    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

  render() {
    let { invoiceList } = this.state;
    return (
      <div className="m-sm-30">
        <Link to="/invoice/add">
          <Button className="mb-4" variant="contained" color="primary">
            Add Invoice
          </Button>
        </Link>
        <Card elevation={6} className="w-full overflow-auto">
          <Table className="min-w-3000">
            <TableHead>
              <TableRow>
                <TableCell className="pl-sm-24">Order No.</TableCell>
                <TableCell className="px-0">Bill From</TableCell>
                <TableCell className="px-0">Bill To</TableCell>
                <TableCell className="px-0">Status</TableCell>
                <TableCell className="px-0">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceList.map((invoice, index) => (
                <TableRow key={invoice.id}>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {invoice.orderNo}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {invoice.seller.name}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {invoice.buyer.name}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    <small
                      className={classList({
                        "border-radius-4  text-white px-2 py-2px": true,
                        "bg-primary": invoice.status === "delivered",
                        "bg-secondary": invoice.status === "processing",
                        "bg-error": invoice.status === "pending"
                      })}
                    >
                      {invoice.status}
                    </small>
                  </TableCell>
                  <TableCell className="pl-0">
                    <IconButton
                      color="primary"
                      className="mr-2"
                      onClick={() => this.handeViewClick(invoice.id)}
                    >
                      <Icon>chevron_right</Icon>
                    </IconButton>
                    <IconButton onClick={() => this.handeDeleteClick(invoice)}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <ConfirmationDialog
          open={this.state.shouldShowConfirmationDialog}
          onConfirmDialogClose={this.handleDialogClose}
          onYesClick={this.handleConfirmationResponse}
          text="Are you sure to delete?"
        />
      </div>
    );
  }
}

export default InvoiceList;
