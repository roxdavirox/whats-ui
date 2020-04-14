import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  Icon,
  MenuItem,
  IconButton,
  TextField,
  InputAdornment,
  ClickAwayListener,
  Button
} from "@material-ui/core";
import ScrumBoardCard from "./ScrumBoardCard";
import Scrollbar from "react-perfect-scrollbar";
import { MatxMenu } from "matx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  renameListInBoard,
  deleteListFromBoard,
  addNewCardInList
} from "../../redux/actions/ScrumBoardActions";

class BoardList extends Component {
  state = {
    shouldOpenTitleEditor: false,
    shouldOpenAddCard: false,
    cardTitleText: "",
    columnTitleText: ""
  };

  handleChange = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (event.target.name === "cardTitleText") {
        this.handleAddNewCard();
      } else {
        this.handleRenameList();
      }
    } else this.setState({ [event.target.name]: event.target.value });
  };

  handleRenameList = () => {
    this.props.renameListInBoard({
      boardId: this.props.board.id,
      listId: this.props.data.column.id,
      listTitle: this.state.columnTitleText
    });
    this.openTitleEditor(false);
  };

  openTitleEditor = value => {
    this.setState({ shouldOpenTitleEditor: value });
  };

  openAddCard = value => {
    this.setState({ shouldOpenAddCard: value });
  };

  handleAddNewCard = () => {
    let { cardTitleText } = this.state;
    if (cardTitleText.trim() !== "") {
      this.props.addNewCardInList({
        boardId: this.props.board.id,
        listId: this.props.data.column.id,
        cardTitle: this.state.cardTitleText
      });
      this.setState({ cardTitleText: "" });
    }
  };

  handleListDelete = () => {
    this.props.deleteListFromBoard({
      boardId: this.props.board.id,
      listId: this.props.data.column.id
    });
  };

  render() {
    let { provided, snapshot, column } = this.props.data;
    let {
      shouldOpenAddCard,
      shouldOpenTitleEditor,
      cardTitleText
    } = this.state;
    let { handleCardClick } = this.props;

    return (
      <Card
        className="list-column position-relative pt-2 w-288"
        elevation={snapshot.isDragging ? 10 : 3}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps.style
        }}
      >
        <Droppable droppableId={column.id} direction="vertical" type="card">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="position-relative px-4">
              <div className="flex items-center justify-between pb-2">
                {shouldOpenTitleEditor ? (
                  <ClickAwayListener
                    onClickAway={() => this.openTitleEditor(false)}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      defaultValue={column.title}
                      onChange={this.handleChange}
                      onKeyDown={this.handleChange}
                      name="columnTitleText"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={this.handleRenameList}
                            >
                              <Icon fontSize="small">done</Icon>
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </ClickAwayListener>
                ) : (
                  <h4
                    className="m-0 flex-grow py-1 capitalize"
                    onClick={() => this.openTitleEditor(true)}
                  >
                    {column.title}
                  </h4>
                )}
                <MatxMenu
                  horizontalPosition="right"
                  menuButton={
                    <IconButton>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  }
                >
                  <MenuItem className="flex items-center min-w-148">
                    <Icon> settings </Icon>
                    <span className="pl-4"> Settings </span>
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleListDelete}
                    className="flex items-center min-w-148"
                  >
                    <Icon> delete </Icon>
                    <span className="pl-4"> Delete </span>
                  </MenuItem>
                </MatxMenu>
              </div>

              <Scrollbar className="position-relative h-380">
                {column.cardList.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                    type="card"
                  >
                    {(provided, snapshot) => (
                      <Card
                        className="list-column__card borderborder-radius-4 bg-light-gray"
                        elevation={snapshot.isDragging ? 10 : 3}
                        onClick={() =>
                          handleCardClick({ ...card, listId: column.id })
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style
                        }}
                      >
                        <ScrumBoardCard card={card}></ScrumBoardCard>
                      </Card>
                    )}
                  </Draggable>
                ))}
              </Scrollbar>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* ===================================================== */}
        {shouldOpenAddCard ? (
          <ClickAwayListener onClickAway={() => this.openAddCard(false)}>
            <Card
              className="position-bottom border-radius-0 cursor-pointer p-4 w-full"
              elevation={5}
            >
              <TextField
                size="small"
                className="mb-3"
                variant="outlined"
                name="cardTitleText"
                value={cardTitleText}
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => this.openAddCard(false)}
                      >
                        <Icon fontSize="small">clear</Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className="flex justify-end">
                <Button
                  onClick={this.handleAddNewCard}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </div>
            </Card>
          </ClickAwayListener>
        ) : (
          <div className="flex">
            <Button
              className="font-medium flex-grow border-radius-0"
              variant="contained"
              color="primary"
              onClick={() => this.openAddCard(true)}
            >
              + Add Card
            </Button>
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  renameListInBoard: PropTypes.func.isRequired,
  deleteListFromBoard: PropTypes.func.isRequired,
  addNewCardInList: PropTypes.func.isRequired,
  board: state.scrumboard.board
});

export default connect(mapStateToProps, {
  renameListInBoard,
  deleteListFromBoard,
  addNewCardInList
})(BoardList);
