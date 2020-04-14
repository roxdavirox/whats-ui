import React, { Component, Fragment } from "react";
import {
  Card,
  Icon,
  Avatar,
  Grid,
  Badge,
  Fab,
  Divider,
  IconButton,
  Button,
  Hidden
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MatxSidenavContainer, MatxSidenav, MatxSidenavContent } from "matx";
import DummyChart from "./DummyChart";
import ProfileBarChart from "./ProfileBarChart";

class UserProfile extends Component {
  state = { open: true };

  paymentList = [
    {
      img: "/assets/images/payment-methods/master-card.png",
      type: "Master Card",
      product: "Bundled product",
      amount: 909
    },
    {
      img: "/assets/images/payment-methods/paypal.png",
      type: "Master Card",
      product: "Bundled product",
      amount: 303
    },
    {
      img: "/assets/images/payment-methods/visa.png",
      type: "Paypal",
      product: "Bundled product",
      amount: 330
    },
    {
      img: "/assets/images/payment-methods/maestro.png",
      type: "Paypal",
      product: "Bundled product",
      amount: 909
    },
    {
      img: "/assets/images/payment-methods/maestro.png",
      type: "Master Card",
      product: "Bundled product",
      amount: 909
    }
  ];

  shortcutList = [
    {
      title: "stars",
      icon: "star_outline"
    },
    {
      title: "events",
      icon: "email"
    },
    {
      title: "Photo",
      icon: "collections"
    },
    {
      title: "settings",
      icon: "brightness_7"
    },
    {
      title: "contacts",
      icon: "group"
    }
  ];

  windowResizeListener;

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleWindowResize = () => {
    return event => {
      if (event.target.innerWidth < 768) {
        this.setState({ mobile: true });
      } else this.setState({ mobile: false });
    };
  };

  componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({ open: false });
    }
    if (window)
      this.windowResizeListener = window.addEventListener("resize", event => {
        if (event.target.innerWidth < 768) {
          this.setState({ open: false });
        } else this.setState({ open: true });
      });
  }

  componentWillUnmount() {
    if (window) window.removeEventListener("resize", this.windowResizeListener);
  }

  render() {
    let { theme } = this.props;

    return (
      <div className="user-profile">
        <MatxSidenavContainer>
          <MatxSidenav
            width="300px"
            open={this.state.open}
            toggleSidenav={this.toggleSidenav}
          >
            <div className="header-bg bg-primary text-right">
              <Hidden smUp>
                <IconButton onClick={this.toggleSidenav}>
                  <Icon className="text-white">clear</Icon>
                </IconButton>
              </Hidden>
            </div>
            <div className="user-profile__sidenav flex-column items-center">
              <Avatar className="avatar mb-5" src="/assets/images/face-7.jpg" />
              <p className="capitalize text-white">watson joyce</p>
              <div className="py-3" />
              <div className="flex flex-wrap w-full px-12 mb-11">
                <div className="flex-grow">
                  <p className="uppercase text-light-white mb-1">balance</p>
                  <h4 className="font-medium text-white">$ 20,495</h4>
                </div>
                <div>
                  <p className="uppercase text-light-white mb-1">points</p>
                  <h4 className="font-medium text-white">PT 3,000</h4>
                </div>
                <div />
              </div>
              <div className="px-8 pt-2 bg-default">
                <Grid container spacing={3}>
                  <Grid item>
                    <Card className="sidenav__square-card bg-primary flex justify-center items-center">
                      <div className="text-light-white text-center">
                        <Icon>sentiment_very_satisfied</Icon>
                        <br />
                        <span className="pt-4">Dashboard</span>
                      </div>
                    </Card>
                  </Grid>
                  {this.shortcutList.map((item, ind) => (
                    <Grid item key={ind}>
                      <Card className="sidenav__square-card flex items-center justify-center">
                        <div className="text-muted text-center">
                          <Icon>{item.icon}</Icon>
                          <br />
                          <span className="pt-4">{item.title}</span>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <div className="py-4" />
                <div className="flex items-center justify-center text-primary">
                  <Button>
                    <Icon>sentiment_very_satisfied</Icon>
                    <h5 className="ml-8 text-primary font-medium mb-0">
                      Upgrade to premium
                    </h5>
                  </Button>
                </div>
                <div className="py-2"></div>
              </div>
            </div>
          </MatxSidenav>
          <MatxSidenavContent open={this.state.open}>
            <div className="header-bg bg-primary" />
            <div className="user-profile__content">
              <div className="flex justify-end menu-button">
                <IconButton onClick={this.toggleSidenav}>
                  <Icon className="text-white">menu</Icon>
                </IconButton>
              </div>
              <div className="content__top-card-holder">
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Card className="content__top-card flex items-center justify-between p-4">
                      <div>
                        <span className="text-light-white uppercase">
                          project created
                        </span>
                        <h4 className="font-normal text-white m-0 pt-2">15</h4>
                      </div>
                      <div className="content__chart">
                        <DummyChart height="40px" />
                      </div>
                    </Card>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Card className="content__top-card flex items-center justify-between p-4">
                      <div>
                        <span className="text-light-white uppercase">
                          completed
                        </span>
                        <h4 className="font-normal text-white m-0 pt-2">11</h4>
                      </div>
                      <div className="content__chart">
                        <DummyChart height="40px" />
                      </div>
                    </Card>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Card className="content__top-card flex items-center justify-between p-4">
                      <div>
                        <span className="text-light-white uppercase">
                          published
                        </span>
                        <h4 className="font-normal text-white m-0 pt-2">15</h4>
                      </div>
                      <div className="content__chart">
                        <DummyChart height="40px" />
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </div>
              <div className="py-8" />
              <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Card className="pb-4">
                    <h4 className="font-medium text-muted p-4 pb-0 mb-6">
                      Data Use
                    </h4>
                    <ProfileBarChart
                      height="220px"
                      color={[theme.palette.warn]}
                    />
                    <div className="pt-4 flex items-center justify-around">
                      <div>
                        <h1 className="font-normal m-0 mb-1">140</h1>
                        <span className="font-normal text-muted uppercase">
                          avg yearly
                        </span>
                      </div>
                      <div>
                        <h1 className="font-normal m-0 mb-1">12</h1>
                        <span className="font-normal text-muted uppercase">
                          avg monthly
                        </span>
                      </div>
                      <div>
                        <h1 className="font-normal m-0 mb-1">3</h1>
                        <span className="font-normal text-muted uppercase">
                          avg weekly
                        </span>
                      </div>
                    </div>
                  </Card>
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Card className="p-4 h-full">
                    <h4 className="font-medium text-muted pb-6 pb-0 mb-6">
                      Contacts
                    </h4>
                    <div className="flex items-center mb-4">
                      <Badge badgeContent="New" color="primary">
                        <Fab className="bg-light-primary box-shadow-none overflow-hidden">
                          <h4 className="text-primary m-0 font-normal">MR</h4>
                        </Fab>
                      </Badge>
                      <div className="ml-4">
                        <h5 className="m-0 mb-1 font-medium">Watson Joyce</h5>
                        <p className="m-0 text-muted">London</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <Fab className="bg-light-green box-shadow-none overflow-hidden">
                        <h4 className="text-green m-0 font-normal">WT</h4>
                      </Fab>
                      <div className="ml-4">
                        <h5 className="m-0 mb-1 font-medium">Watson Joyce</h5>
                        <p className="m-0 text-muted">London</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <Fab className="bg-light-error box-shadow-none overflow-hidden">
                        <h4 className="text-error m-0 font-normal">RY</h4>
                      </Fab>
                      <div className="ml-4">
                        <h5 className="m-0 mb-1 font-medium">Watson Joyce</h5>
                        <p className="m-0 text-muted">London</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Fab className="bg-light-primary box-shadow-none overflow-hidden">
                        <h4 className="text-error m-0 font-normal">MR</h4>
                      </Fab>
                      <div className="ml-4">
                        <h5 className="m-0 mb-1 font-medium">Watson Joyce</h5>
                        <p className="m-0 text-muted">London</p>
                      </div>
                    </div>
                  </Card>
                </Grid>

                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <div className="py-3"></div>
                  <Card className="user-profile__card flex py-4">
                    <div className="card__button-holder text-center">
                      <Fab
                        className="card__edge-button"
                        size="medium"
                        color="primary"
                      >
                        <Icon>trending_up</Icon>
                      </Fab>
                      <div className="py-4"></div>
                      <IconButton size="small">
                        <Icon>favorite</Icon>
                      </IconButton>
                      <p className="pb-4 m-0">65</p>

                      <IconButton size="small">
                        <Icon>chat</Icon>
                      </IconButton>
                      <p className="m-0">65</p>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between pr-4 pb-3">
                        <h5 className="m-0 font-medium capitalize">
                          update profile picture
                        </h5>
                        <span className="text-muted">12/03/2019</span>
                      </div>
                      <Divider className="mb-4"></Divider>
                      <div className="card__gray-box">
                        <img src="/assets/images/photo-1.jpg" alt="random" />
                      </div>
                    </div>
                  </Card>
                  <div className="py-7"></div>
                  <Card className="user-profile__card flex py-4">
                    <div className="card__button-holder text-center">
                      <Fab
                        className="card__edge-button edge-vertical-line"
                        size="medium"
                        color="primary"
                      >
                        <Icon>star_outline</Icon>
                      </Fab>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between pr-4 pb-3">
                        <h5 className="m-0 font-medium capitalize">
                          bought air ticket
                        </h5>
                        <span className="text-muted">12/03/2019</span>
                      </div>
                      <Divider></Divider>
                      <p className="m-0 pt-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </p>
                    </div>
                  </Card>
                  <div className="py-7"></div>
                  <Card className="user-profile__card flex py-4">
                    <div className="card__button-holder text-center">
                      <Fab
                        className="card__edge-button edge-vertical-line"
                        size="medium"
                        color="primary"
                      >
                        <Icon>date_range</Icon>
                      </Fab>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between pr-4 pb-3">
                        <h5 className="m-0 font-medium capitalize">
                          timeline box title
                        </h5>
                        <span className="text-muted">12/03/2019</span>
                      </div>
                      <Divider></Divider>
                      <p className="m-0 pt-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </p>
                    </div>
                  </Card>
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Card className="bills">
                    {this.paymentList.map((method, index) => (
                      <Fragment key={index}>
                        <div className="py-4 px-6 flex flex-wrap items-center justify-between">
                          <div className="flex flex-wrap items-center">
                            <div className="bills__icon flex items-center justify-center">
                              <img src={method.img} alt="master card" />
                            </div>
                            <div className="ml-4">
                              <h5 className="mb-1 font-medium">
                                {method.type}
                              </h5>
                              <span className="text-muted">
                                {method.product}
                              </span>
                            </div>
                          </div>
                        </div>
                        {index !== this.paymentList.length - 1 && <Divider />}
                      </Fragment>
                    ))}
                  </Card>
                </Grid>
              </Grid>
              <div className="py-2"></div>
            </div>
          </MatxSidenavContent>
        </MatxSidenavContainer>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(UserProfile);
