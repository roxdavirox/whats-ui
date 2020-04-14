import React, { Component } from "react";
import { Dialog, Button, IconButton, Icon, Fab } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { RichTextEditor } from "matx";

class InboxComposeDialog extends Component {
  state = {
    to: "",
    subject: "",
    content: "",
    attachment: null
  };

  handleSubmit = event => {
    // console.log(this.state);
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleContentChange = contentHtml => {
    this.setState({
      content: contentHtml
    });
  };

  handleAttachmentSelection = event => {
    this.setState({
      attachment: event.target.files[0]
    });
  };

  render() {
    let { to, subject, content, attachment } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        {/* <RichTextEditor placeholder="insert text here..." /> */}
        <div className="inbox-form p-6">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <TextValidator
              className="mb-4 w-full"
              label="To"
              onChange={this.handleChange}
              type="email"
              name="to"
              value={to}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <TextValidator
              className="mb-4 w-full"
              label="Subject"
              onChange={this.handleChange}
              type="text"
              name="subject"
              value={subject}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <RichTextEditor
              content={content}
              handleContentChange={this.handleContentChange}
              placeholder="insert text here..."
            />
            <div className="mt-4 flex flex-wrap justify-between">
              <Button onClick={handleClose}>Cancel</Button>

              <div className="flex items-center">
                {attachment && <p className="mr-6">{attachment.name}</p>}
                <label htmlFor="attachment">
                  <IconButton className="mr-2" component="span">
                    <Icon>attachment</Icon>
                  </IconButton>
                </label>
                <input
                  onChange={this.handleAttachmentSelection}
                  className="hidden"
                  id="attachment"
                  type="file"
                />
                <Fab size="medium" color="secondary" type="submit">
                  <Icon>send</Icon>
                </Fab>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default InboxComposeDialog;
