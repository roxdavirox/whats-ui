import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  ClickAwayListener,
  TextField,
  InputAdornment,
  IconButton,
  Icon
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllBoard,
  addNewBoard
} from "../../redux/actions/ScrumBoardActions";

class AppScrumBoard extends Component {
  state = {
    shouldOpenDialog: false,
    textFieldValue: "",
    boardList: []
  };

  componentDidMount() {
    this.props.getAllBoard();
  }

  openEditorDialog = value => {
    this.setState({ shouldOpenDialog: value });
  };

  handleChange = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      this.handleAddNewBoard();
    } else this.setState({ textFieldValue: event.target.value });
  };

  handleAddNewBoard = () => {
    let title = this.state.textFieldValue.trim();
    if (title !== "") {
      this.props.addNewBoard(title);
      this.setState({ textFieldValue: "" });
    }
  };

  render() {
    let { shouldOpenDialog, textFieldValue } = this.state;
    let { boardList = [] } = this.props;

    return (
      <div className="scrum-board m-sm-30">
        <Grid container spacing={2}>
          {boardList.map(board => (
            <Grid key={board.id} item lg={3} md={3} sm={12} xs={12}>
              <Link to={`/scrum-board/${board.id}`}>
                <Card className="p-6 cursor-pointer h-152" elevation={3}>
                  <h5 className="whitespace-pre-wrap capitalize m-0 font-medium">
                    {board.title}
                  </h5>
                </Card>
              </Link>
            </Grid>
          ))}
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {shouldOpenDialog ? (
              <ClickAwayListener
                onClickAway={() => this.openEditorDialog(false)}
              >
                <Card className="p-6 h-152 w-288" elevation={3}>
                  <TextField
                    size="small"
                    onChange={this.handleChange}
                    onKeyDown={this.handleChange}
                    className="mb-3"
                    variant="outlined"
                    label="Board Title"
                    value={textFieldValue}
                    autoFocus
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => this.openEditorDialog(false)}
                          >
                            <Icon fontSize="small">clear</Icon>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={this.handleAddNewBoard}
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              </ClickAwayListener>
            ) : (
              <Card
                onClick={() => this.openEditorDialog(true)}
                className="p-6 flex items-center justify-center cursor-pointer h-150px"
                elevation={3}
              >
                <div className="text-primary text-center font-medium">
                  <h1 className="m-0 text-primary font-normal">+</h1>
                  <div>Create New Board</div>
                </div>
              </Card>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllBoard: PropTypes.func.isRequired,
  addNewBoard: PropTypes.func.isRequired,
  boardList: state.scrumboard.boardList
});

export default connect(mapStateToProps, { getAllBoard, addNewBoard })(
  AppScrumBoard
);
