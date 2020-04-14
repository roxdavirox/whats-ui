import React, { Component } from "react";
import {
  Icon,
  IconButton,
  Avatar,
  Tooltip,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import ScrumBoardContainer from "./ScrumBoardContainer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNewCardInList } from "./ScrumBoardService";
import { MatxMenu } from "matx";

import {
  getBoardById,
  addListInBoard,
  getAllMembers,
  getAllLabels,
  addMemberInBoard,
  deleteMemberFromBoard
} from "../../redux/actions/ScrumBoardActions";

class Board extends Component {
  state = {
    board: {
      title: "",
      members: [],
      list: []
    }
  };

  componentDidMount() {
    let boardId = this.props.match.params.id;
    this.props.getBoardById(boardId);
    this.props.getAllMembers();
    this.props.getAllLabels();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      board: { ...nextProps.board }
    };
  }

  handleAddList = listTitle => {
    if (listTitle !== "") {
      this.props.addListInBoard({
        boardId: this.state.board.id,
        listTitle
      });
    }
  };

  handleAddNewCard = cardData => {
    addNewCardInList({
      boardId: this.props.match.params.id,
      ...cardData
    }).then(list => {
      this.setState({ board: { ...this.state.board, list: [...list.data] } });
    });
  };

  handleChange = event => {
    let memberId = event.target.value;
    let { members, id } = this.state.board;
    let { deleteMemberFromBoard, addMemberInBoard } = this.props;
    if (members.some(member => member.id === memberId)) {
      deleteMemberFromBoard({ boardId: id, memberId });
    } else addMemberInBoard({ boardId: id, memberId });
  };

  render() {
    let { members = [], title, list = [] } = this.state.board;
    let { memberList = [] } = this.props;

    return (
      <div className="scrum-board m-sm-30">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/scrum-board">
              <IconButton>
                <Icon>arrow_back</Icon>
              </IconButton>
            </Link>
            <h5 className="m-0 ml-2 capitalize">{title}</h5>
            <IconButton className="ml-2">
              <Icon>star_outline</Icon>
            </IconButton>
          </div>

          <div className="flex position-relative face-group">
            {members.map((member, index) => (
              <Tooltip key={index} title={member.name} fontSize="large">
                <Avatar className="avatar" src={member.avatar} />
              </Tooltip>
            ))}
            <MatxMenu
              horizontalPosition="right"
              shouldCloseOnItemClick={false}
              menuButton={
                <Tooltip title={"Add"} fontSize="large">
                  <Avatar className="avatar ml--3 cursor-pointer">+</Avatar>
                </Tooltip>
              }
            >
              {memberList.map(user => (
                <FormControlLabel
                  className="ml-0"
                  key={user.id}
                  control={
                    <Checkbox
                      checked={members.some(member => member.id === user.id)}
                      onChange={this.handleChange}
                      value={user.id}
                    />
                  }
                  label={
                    <div className="flex items-center">
                      <Avatar src={user.avatar} className="size-24"></Avatar>
                      <span className="ml-3">{user.name}</span>
                    </div>
                  }
                />
              ))}
            </MatxMenu>
            {/* <Avatar className="number-avatar avatar">+3</Avatar> */}
          </div>
        </div>

        <div className="position-relative">
          <ScrumBoardContainer
            list={list}
            handleAddList={this.handleAddList}
            handleAddNewCard={this.handleAddNewCard}
          ></ScrumBoardContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getBoardById: PropTypes.func.isRequired,
  addListInBoard: PropTypes.func.isRequired,
  getAllMembers: PropTypes.func.isRequired,
  getAllLabels: PropTypes.func.isRequired,
  addMemberInBoard: PropTypes.func.isRequired,
  deleteMemberFromBoard: PropTypes.func.isRequired,
  board: state.scrumboard.board,
  memberList: state.scrumboard.memberList,
  labelList: state.scrumboard.labelList
});

export default connect(mapStateToProps, {
  getBoardById,
  addListInBoard,
  getAllMembers,
  getAllLabels,
  addMemberInBoard,
  deleteMemberFromBoard
})(Board);
