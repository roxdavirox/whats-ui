import React, { Fragment } from 'react';
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Avatar,
  Hidden
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

const ContactItem = ({
	contact: { jid, name, phone, eurl = '/assets/faces/default-avatar.png', checked = false  },
	handleContactCheck
}) => {
	const handleCheck = () => handleContactCheck(jid);
	return (
		<Fragment key={jid}>
			<Card className="py-2 px-4 project-card">
				<Grid container alignItems="center">
				<Grid item md={5} xs={7}>
					<div className="flex items-center">
					<Checkbox value={checked} onClick={handleCheck}/>
					<Hidden smDown>
						<Fab
							className="ml-4 bg-primary box-shadow-none text-white"
							size="small"
						>
							<Avatar className="avatar" src={eurl} />

							{/* <PersonIcon /> */}
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