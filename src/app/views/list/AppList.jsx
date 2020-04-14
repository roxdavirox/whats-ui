import React, { Component } from "react";
import ListTopbar from "./ListTopbar";
import { getAllList } from "./ListService";
import ListView from "./ListView";
import GridView from "./GridView";
import { Hidden } from "@material-ui/core";

class AppList extends Component {
  originalList = [];
  state = {
    textfieldValue: "",
    sliderValue: 50,
    list: [],
    viewMode: "grid" // list, grid
  };

  handleInputChange = event => {
    event.persist();
    this.setState(
      {
        textfieldValue: event.target.value
      },
      () =>
        this.setState({
          list: this.originalList.filter(item =>
            item.projectName
              .toLowerCase()
              .match(event.target.value.toLowerCase())
          )
        })
    );
  };

  handleSldierChange = (event, value) => {
    this.setState({
      sliderValue: value
    });
  };

  handleViewChange = view => {
    this.setState({
      viewMode: view
    });
  };

  componentDidMount() {
    getAllList().then(response => {
      this.originalList = [...response.data];
      this.setState({
        list: [...response.data]
      });
    });
  }

  render() {
    let { list, textfieldValue, sliderValue, viewMode } = this.state;
    return (
      <div className="list m-sm-30">
        <div className="mb-4">
          <ListTopbar
            viewMode={viewMode}
            handleViewChange={this.handleViewChange}
            handleInputChange={this.handleInputChange}
            handleSldierChange={this.handleSldierChange}
            sliderValue={sliderValue}
            textfieldValue={textfieldValue}
          ></ListTopbar>
        </div>
        <Hidden xsDown>
          {viewMode === "list" ? (
            <ListView list={list}></ListView>
          ) : (
            <GridView list={list} sliderValue={sliderValue}></GridView>
          )}
        </Hidden>

        <Hidden smUp>
          <GridView list={list} sliderValue={sliderValue}></GridView>
        </Hidden>
      </div>
    );
  }
}

export default AppList;
