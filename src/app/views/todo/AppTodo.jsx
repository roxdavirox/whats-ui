import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TodoList from "./TodoList";
import TodoEditor from "./TodoEditor";
import { withStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

const styles = theme => ({
  searchBox: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary
  }
});

class AppTodo extends Component {
  search = null;
  state = {
    query: ""
  };

  componentDidMount() {}

  handleQueryChange = event => {
    this.setState(
      {
        query: event.target.value
      },
      () => {
        this.search(this.state.query);
      }
    );
  };

  render() {
    let { query } = this.state;
    let { classes } = this.props;
    return (
      <div className="todo">
        <div className="todo__search-box-holder">
          <div className="flex-column items-center justify-center">
            <div
              className={`todo__search-box flex items-center pl-4 pr-24 ${classes.searchBox}`}
            >
              <Icon className="mr-4">search</Icon>
              <input
                className={`h-full flex-grow ${classes.searchBox}`}
                type="text"
                name="query"
                value={query}
                onChange={this.handleQueryChange}
              />
            </div>
          </div>
        </div>
        <div className="todo__content">
          <Switch>
            <Route path="/todo/list/:id" component={TodoEditor} />
            <Route
              exact
              path="/todo/list"
              render={props => (
                <TodoList
                  {...props}
                  setSearchFunction={searchFunction =>
                    (this.search = searchFunction)
                  }
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppTodo);
