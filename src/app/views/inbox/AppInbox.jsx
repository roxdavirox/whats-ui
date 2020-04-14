import React, { Component } from "react";
import { MatxSidenavContainer, MatxSidenav, MatxSidenavContent } from "matx";
import InboxMessageList from "./InboxMessagList";
import { isMobile } from "utils";
import InboxSidenav from "./InboxSidenav";
import InboxTopBar from "./InboxTopbar";
import { getAllMessage } from "./InboxService";

class AppInbox extends Component {
  container = React.createRef();
  state = {
    shouldOpenSidenav: true,
    masterCheckbox: false,
    messageList: []
  };

  toggleSidenav = () => {
    this.setState({ shouldOpenSidenav: !this.state.shouldOpenSidenav });
  };

  handleMasterCheckbox = event => {
    let temp = this.state.messageList;
    let isChecked = event.target.checked;
    if (isChecked) {
      temp.map(message => {
        message.selected = true;
        return message;
      });
      this.setState({
        messageList: [...temp],
        masterCheckbox: event.target.checked
      });
    } else {
      temp.map(message => {
        message.selected = false;
        return message;
      });
      this.setState({
        messageList: [...temp],
        masterCheckbox: event.target.checked
      });
    }
  };

  handleCheckboxSelection = (event, index) => {
    event.persist();
    let temp = this.state.messageList;
    temp[index].selected = event.target.checked;
    this.setState({
      messageList: [...temp]
    });
  };

  windowResizeListener = e => {
    if (isMobile()) this.setState({ shouldOpenSidenav: false });
    else this.setState({ shouldOpenSidenav: true });
  };

  componentDidMount() {
    getAllMessage().then(data => {
      this.setState({
        messageList: data.data
      });
    });

    if (isMobile()) this.setState({ shouldOpenSidenav: false });
    if (window) window.addEventListener("resize", this.windowResizeListener);
  }

  componentWillUnmount() {
    if (window) window.removeEventListener("resize", this.windowResizeListener);
  }

  render() {
    let { masterCheckbox } = this.state;
    return (
      <div className="inbox flex m-sm-30">
        <div className="inbox__sidenav w-full">
          <MatxSidenavContainer>
            <MatxSidenav
              width="220px"
              toggleSidenav={this.toggleSidenav}
              open={this.state.shouldOpenSidenav}
            >
              <InboxSidenav />
            </MatxSidenav>
            <MatxSidenavContent>
              <InboxTopBar
                masterCheckbox={masterCheckbox}
                handleMasterCheckbox={this.handleMasterCheckbox}
                toggleSidenav={this.toggleSidenav}
              />
              <InboxMessageList
                handleCheckboxSelection={this.handleCheckboxSelection}
                messageList={this.state.messageList}
              />
            </MatxSidenavContent>
          </MatxSidenavContainer>
        </div>
      </div>
    );
  }
}

export default AppInbox;
