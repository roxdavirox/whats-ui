import React, { Component } from "react";
import TodoItem from "./TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getAllTodo,
  updateTodoById,
  reorderTodoList,
  getAllTodoTag
} from "./TodoService";
import { Icon, IconButton, MenuItem, Button, Card } from "@material-ui/core";
import { MatxMenu } from "matx";

class TodoList extends Component {
  todoList = [];
  state = {
    tagList: [],
    todoList: []
  };

  componentDidMount() {
    this.props.setSearchFunction(this.search);
    getAllTodo().then(({ data }) => {
      getAllTodoTag().then(({ data: tagList }) => {
        this.setState({
          tagList,
          todoList: [...data]
        });
        this.todoList = [...data];
      });
    });
  }

  search = query => {
    query = query.toLowerCase();
    let filteredTodoList = this.todoList.filter(
      todo =>
        todo.title.toLowerCase().match(query) ||
        todo.note.toLowerCase().match(query)
    );
    this.setState({
      todoList: [...filteredTodoList]
    });
  };

  updateTodo = todo => {
    updateTodoById(todo).then(({ data }) => {
      this.setState({
        todoList: [...data]
      });
      this.todoList = [...data];
    });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  handleDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    let todoList = this.reorder(
      this.state.todoList,
      result.source.index,
      result.destination.index
    );

    reorderTodoList(todoList).then(({ data }) => {
      this.setState({
        todoList: [...data]
      });
      this.todoList = [...data];
    });
  };

  filterTodoListByProperty = (queryField, queryValue) => {
    if (queryField !== "all") {
      this.setState({
        todoList: [
          ...this.todoList.filter(todo => todo[queryField] === queryValue)
        ]
      });
    } else {
      this.setState({
        todoList: [...this.todoList]
      });
    }
  };

  filterTodoListByTag = tagId => {
    if (tagId !== "all")
      this.setState({
        todoList: [...this.todoList.filter(todo => todo.tag.includes(tagId))]
      });
    else {
      this.setState({
        todoList: [...this.todoList]
      });
    }
  };

  render() {
    let { todoList, tagList } = this.state;
    return (
      <Card className="todo position-relative m-sm-30">
        <div className="todo-list__topbar bg-light-gray py-2 flex flex-wrap items-center justify-between">
          <div>
            <MatxMenu
              menuButton={
                <IconButton>
                  <Icon>arrow_drop_down</Icon>
                </IconButton>
              }
            >
              <MenuItem onClick={() => this.filterTodoListByProperty("all")}>
                All
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("read", true)}
              >
                Read
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("read", false)}
              >
                Unread
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("done", true)}
              >
                Done
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("done", false)}
              >
                Undone
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("important", true)}
              >
                Important
              </MenuItem>
              <MenuItem
                onClick={() =>
                  this.filterTodoListByProperty("important", false)
                }
              >
                Unimportant
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("starred", true)}
              >
                Starred
              </MenuItem>
              <MenuItem
                onClick={() => this.filterTodoListByProperty("starred", false)}
              >
                Unstarred
              </MenuItem>
            </MatxMenu>
            <MatxMenu
              menuButton={
                <IconButton>
                  <Icon>label</Icon>
                </IconButton>
              }
            >
              <MenuItem
                className="capitalize"
                onClick={() => this.filterTodoListByTag("all")}
              >
                all
              </MenuItem>
              {tagList.map(tag => (
                <MenuItem
                  key={tag.id}
                  className="capitalize"
                  onClick={() => this.filterTodoListByTag(tag.id)}
                >
                  {tag.name}
                </MenuItem>
              ))}
            </MatxMenu>
          </div>
          <div className="pr-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/todo/list/add")}
            >
              Create Todo
            </Button>
          </div>
        </div>

        <div className="todo-list">
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todoList.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <TodoItem
                            tagList={tagList}
                            updateTodo={this.updateTodo}
                            key={index}
                            todo={todo}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Card>
    );
  }
}

export default TodoList;
