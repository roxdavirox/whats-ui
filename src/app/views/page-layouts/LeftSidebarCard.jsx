import React, { Component } from "react";
import {
  Card,
  MenuItem,
  Divider,
  IconButton,
  Icon,
  Hidden
} from "@material-ui/core";
import { MatxSidenavContainer, MatxSidenav, MatxSidenavContent } from "matx";

class LeftSidebarCard extends Component {
  state = { open: true };

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className="left-sidenav-card">
        <div className="header-bg" />
        <div className="left-sidenav-card__content">
          <MatxSidenavContainer>
            <MatxSidenav
              width="320px"
              bgClass="bg-transperant"
              open={this.state.open}
              toggleSidenav={this.toggleSidenav}
            >
              <div className="left-sidenav-card__sidenav">
                <Hidden smUp>
                  <div className="flex justify-end">
                    <IconButton onClick={this.toggleSidenav}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </div>
                </Hidden>
                <h6 className="sidenav__header pl-9 p-6">Sidebar header</h6>
                <div className="py-17" />
                <div className="bg-default">
                  <MenuItem className="pl-8">List 1</MenuItem>
                  <MenuItem className="pl-8">List 1</MenuItem>
                  <MenuItem className="pl-8">List 1</MenuItem>
                  <MenuItem className="pl-8">List 1</MenuItem>
                  <MenuItem className="pl-8">List 1</MenuItem>
                  <MenuItem className="pl-8">List 1</MenuItem>
                  <MenuItem className="pl-8">List 1</MenuItem>
                </div>
              </div>
            </MatxSidenav>
            <MatxSidenavContent>
              <h5 className="text-white pl-6 p-6">Left sidebar card</h5>
              <div className="py-5" />
              <div className="pb-6px" />
              <Card className="content-card m-4" elevation={2}>
                <div className="card-header flex flex-wrap items-center ml-2">
                  <div className="show-on-mobile">
                    <IconButton onClick={this.toggleSidenav}>
                      <Icon>short_text</Icon>
                    </IconButton>
                  </div>
                  <div className="hide-on-mobile">
                    <div className="pl-4"></div>
                  </div>
                  <div>Card toolbar</div>
                </div>
                <Divider />
                <p className="whitespace-pre-wrap p-6 m-0">
                  {`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.`}
                </p>
              </Card>
            </MatxSidenavContent>
          </MatxSidenavContainer>
        </div>
      </div>
    );
  }
}

export default LeftSidebarCard;
