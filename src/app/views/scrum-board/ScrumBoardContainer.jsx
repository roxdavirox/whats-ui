import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardEditorDialog from "./CardEditorDialog";
import Scrollbar from "react-perfect-scrollbar";
import BoardList from "./BoardList";
import {
  Avatar,
  Card,
  ClickAwayListener,
  TextField,
  InputAdornment,
  IconButton,
  Icon,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  reorderCardInList,
  reorderList,
  moveCardInList
} from "../../redux/actions/ScrumBoardActions";

class ScrumBoardContainer extends Component {
  state = {
    dataLoaded: false,
    list: [],
    shouldOpenDialog: false,
    shouldOpenAddList: false,
    columnTitle: ""
  };

  // convert this into a list instead of hard coded state object
  componentDidMount() {}

  handleCardClick = card => {
    this.setState({ shouldOpenDialog: true, card: card });
  };

  handleDialogClose = () => {
    this.setState({ shouldOpenDialog: false });
  };

  handleAddListToggle = value => {
    this.setState({ shouldOpenAddList: value });
  };

  handleChange = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      this.props.handleAddList(this.state.columnTitle);
      this.setState({ columnTitle: "" });
    } else this.setState({ columnTitle: event.target.value });
  };

  onDragEnd = result => {
    const { source, destination } = result;
    let { board, reorderCardInList, moveCardInList, reorderList } = this.props;

    // if dropped outside of list
    if (!destination) {
      return;
    }

    if (source.droppableId === "horizontal-droppable") {
      reorderList(board.id, source.index, destination.index);
    } else {
      if (source.droppableId === destination.droppableId) {
        reorderCardInList(
          board.id,
          source.droppableId,
          source.index,
          destination.index
        );
      } else {
        moveCardInList(
          board.id,
          source.droppableId,
          destination.droppableId,
          source,
          destination
        );
      }
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let { shouldOpenDialog, shouldOpenAddList, columnTitle, card } = this.state;
    let { list, handleAddList, handleAddNewCard } = this.props;

    return (
      <Scrollbar className="position-relative flex pb-4 w-full">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="horizontal-droppable" direction="horizontal">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex"
              >
                {list.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                    type="column"
                  >
                    {(provided, snapshot) => (
                      <BoardList
                        data={{ provided, snapshot, column }}
                        handleCardClick={this.handleCardClick}
                        handleDialogClose={this.handleDialogClose}
                        handleAddNewCard={handleAddNewCard}
                      ></BoardList>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div>
          {shouldOpenAddList ? (
            <ClickAwayListener
              onClickAway={() => this.handleAddListToggle(false)}
            >
              <Card
                className="list-column border-radius-0 cursor-pointer p-4 min-w-288"
                elevation={3}
              >
                <TextField
                  size="small"
                  className="mb-3"
                  variant="outlined"
                  name="columnTitle"
                  value={columnTitle}
                  fullWidth
                  onChange={this.handleChange}
                  onKeyDown={this.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => this.handleAddListToggle(false)}
                        >
                          <Icon fontSize="small">clear</Icon>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      handleAddList(columnTitle);
                      this.setState({ columnTitle: "" });
                    }}
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
              className="list-column cursor-pointer flex items-center py-4 px-4 bg-light-gray min-w-288"
              elevation={3}
              onClick={() => this.handleAddListToggle(true)}
            >
              <Avatar className="size-24 bg-error">+</Avatar>
              <span className="ml-8 font-medium">Add List</span>
            </Card>
          )}
        </div>

        {shouldOpenDialog && (
          <CardEditorDialog
            card={card}
            open={shouldOpenDialog}
            handleClose={this.handleDialogClose}
          ></CardEditorDialog>
        )}
      </Scrollbar>
    );
  }
}

const mapStateToProps = state => ({
  reorderCardInList: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired,
  moveCardInList: PropTypes.func.isRequired,
  board: state.scrumboard.board,
  memberList: state.scrumboard.memberList,
  labelList: state.scrumboard.labelList
});

export default connect(mapStateToProps, {
  reorderCardInList,
  reorderList,
  moveCardInList
})(ScrumBoardContainer);
