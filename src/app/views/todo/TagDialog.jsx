import React, { Component } from "react";
import { Dialog, TextField, Button } from "@material-ui/core";
import { getAllTodoTag, addNewTag, deleteTag } from "./TodoService";
import { generateRandomId } from "utils";

class TagDialog extends Component {
  state = {
    name: "",
    tagList: []
  };

  componentDidMount() {
    getAllTodoTag().then(({ data }) => {
      this.setState({
        tagList: [...data]
      });
    });
  }

  handleChange = event => {
    if (event.key === "Enter") {
      this.handleAddNewTag();
    } else {
      this.setState({
        name: event.target.value
      });
    }
  };

  handleAddNewTag = event => {
    let { name } = this.state;

    if (name.trim() !== "")
      addNewTag({
        id: generateRandomId(),
        name: name.trim()
      }).then(({ data }) => {
        this.setState({ tagList: data, name: "" });
        this.props.reloadTagList();
      });
  };

  handleDeleteTag = id => {
    deleteTag({ id, name: this.state.name }).then(({ data }) => {
      this.setState({ tagList: data });
      this.props.reloadTagList();
    });
  };

  render() {
    let { open, handleClose } = this.props;
    let { tagList, name } = this.state;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <div className="px-4 py-6">
          <div className="flex items-center">
            <TextField
              variant="outlined"
              size="small"
              onChange={this.handleChange}
              onKeyDown={this.handleChange}
              value={name}
              className="flex-grow"
              label="New tag*"
            />
            <div>
              <Button
                onClick={this.handleAddNewTag}
                className=""
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </div>
          </div>
          <div className="pt-4">
            {tagList.map((tag, index) => (
              <div
                className="flex items-center justify-between my-2"
                key={tag.id}
              >
                <span>{index + 1}</span>
                <span className="capitalize">{tag.name}</span>
                <Button
                  onClickCapture={() => this.handleDeleteTag(tag.id)}
                  className="bg-error"
                  variant="contained"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <div className="pt-4 text-right">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default TagDialog;
