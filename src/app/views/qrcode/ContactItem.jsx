import React, { Fragment } from 'react';
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Hidden
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

const ContactItem = ({
    contact: { id, name, phone }
}) => {
    return (
        <Fragment key={id}>
            <Card className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                <Grid item md={5} xs={7}>
                    <div className="flex items-center">
                    <Checkbox />
                    <Hidden smDown>
                        <Fab
                            className="ml-4 bg-primary box-shadow-none text-white"
                            size="small"
                        >
                            <PersonIcon />
                        </Fab>
                    </Hidden>
                    <span className="card__roject-name font-medium">
                        {name}
                    </span>
                    </div>
                </Grid>

                <Grid item md={3} xs={4}>
                    <div className="text-muted">
                    {phone}
                    </div>
                </Grid>

                {/* <Hidden smDown>
                    <Grid item xs={3}>
                    <div className="flex position-relative face-group">
                        <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                        <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                        <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                        <Avatar className="number-avatar avatar">+3</Avatar>
                    </div>
                    </Grid>
                </Hidden> */}

                <Grid item xs={1}>
                    <div className="flex justify-end">
                    <IconButton>
                        <Icon>more_vert</Icon>
                    </IconButton>
                    </div>
                </Grid>
                </Grid>
            </Card>
            <div className="py-2" />
        </Fragment>
    )
}

export default ContactItem;