import React from "react";
import {
  Card,
  Icon,
  Avatar,
  MenuItem,
  IconButton,
  Grid,
  Hidden
} from "@material-ui/core";
import { MatxMenu } from "matx";

const ListView = ({ list = [] }) => {
  return (
    <div className="list-view">
      {list.map((item, index) => (
        <Card
          className={`list__card card p-2 position-relative ${
            index < list.length ? "mb-4" : ""
          }`}
          key={item.id}
          elevation={3}
        >
          <Grid container justify="space-between" alignItems="center">
            <Grid item md={6}>
              <div className="flex items-center">
                <img
                  className="project-image"
                  src={item.projectImage}
                  alt="project"
                />
                <div className="ml-4">
                  <p className="m-0 mb-2">{item.projectName}</p>
                  <div className="flex">
                    <small className="text-muted">{item.date}</small>
                    <small className="text-muted ml-6">{item.email}</small>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item md={2}>
              <div className="text-muted flex items-center">
                <Icon fontSize="small">chat_bubble_outline</Icon>
                <span className="mr-6 ml-1">{item.comment}</span>
                <Icon fontSize="small">desktop_windows</Icon>
                <span className="ml-1">{item.revision}</span>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="flex items-center">
                <Avatar src={item.userImage}></Avatar>
                <span className="ml-4">{item.userName}</span>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="card__button-group flex items-center bg-paper">
                <Icon
                  fontSize="small"
                  className="mr-4 text-muted cursor-pointer"
                >
                  filter_none
                </Icon>
                <Icon
                  fontSize="small"
                  className="mr-4 text-muted cursor-pointer"
                >
                  share
                </Icon>
                <Icon
                  fontSize="small"
                  className="mr-4 text-muted cursor-pointer"
                >
                  edit
                </Icon>
                <Icon
                  fontSize="small"
                  className="mr-4 text-muted cursor-pointer"
                >
                  delete
                </Icon>
              </div>

              <div className="card__drop-menu text-right">
                <Hidden smDown>
                  <MatxMenu
                    menuButton={
                      <IconButton>
                        <Icon>more_horiz</Icon>
                      </IconButton>
                    }
                  >
                    <MenuItem className="flex items-center">
                      <Icon className="mr-4">filter_none</Icon> Duplicate
                    </MenuItem>
                    <MenuItem className="flex items-center">
                      <Icon className="mr-4">share</Icon> Share
                    </MenuItem>
                    <MenuItem className="flex items-center">
                      <Icon className="mr-4">edit</Icon> Edit
                    </MenuItem>
                    <MenuItem className="flex items-center">
                      <Icon className="mr-4">delete</Icon> Delete
                    </MenuItem>
                  </MatxMenu>
                </Hidden>
              </div>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
};

export default ListView;
