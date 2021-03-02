import React, { useState } from 'react';
import { msalApp } from '../../../auth/authUtils';
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Slide } from '@material-ui/core';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import EjectIcon from '@material-ui/icons/Eject';
import PlaceIcon from '@material-ui/icons/Place';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ComputerIcon from '@material-ui/icons/Computer';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { connect } from 'react-redux';
import { updatePath } from "../../actions/ApplicationActions";
import AndroidIcon from '@material-ui/icons/Android';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { checkIfAdmin, checkIfDev } from '../../../auth/AccessControlFunctions';

const PackageJSON = require('../../../../package.json');

interface Props {
	updatePath: (newPath: string) => void;
}

const Navigation = (props: Props) => {
	const [render, toggleNavigation] = useState(false);

	function updatePath(newPath: string) {
		props.updatePath(newPath);
	}
	
	function logout() {
		msalApp.logout();
	}

	return(
		<div style={{backgroundColor: 'rgb(231, 231, 231)', display: 'flex'}}>
			<Slide direction="right" in={render} mountOnEnter unmountOnExit>
				<div>
					<List component="nav" subheader={<ListSubheader component="div" id="nested-list-subheader">Navigation</ListSubheader>}>
						<ListItem button onClick={() => updatePath("/myleads")}>
							<ListItemIcon>
								<AssessmentIcon style={{color: '#cf8613'}} />
							</ListItemIcon>
							<ListItemText primary="My Purchase Agreements" />
						</ListItem>
						<ListItem button onClick={() => updatePath("/myofficepricesheet")}>
							<ListItemIcon>
								<AssignmentIndIcon style={{color: '#9725cc'}} />
							</ListItemIcon>
							<ListItemText primary="Office Price Sheet" />
						</ListItem>
						<Divider />
						{
							checkIfAdmin() &&
							<>
								<ListItem button onClick={() => updatePath("/locations")}>
									<ListItemIcon>
										<PlaceIcon style={{color: '#bd332b'}} />
									</ListItemIcon>
									<ListItemText primary="Manage Location" />
								</ListItem>
								<Divider />
								<ListItem button onClick={() => updatePath("/leads")}>
									<ListItemIcon>
										<FolderSharedIcon style={{color: '#3babb8'}} />
									</ListItemIcon>
									<ListItemText primary="All Purchase Agreements" />
								</ListItem>
								<Divider />
								<ListItem button onClick={() => updatePath("/admin")}>
									<ListItemIcon>
										<DeveloperBoardIcon style={{color: '#e0492b'}}/>
									</ListItemIcon>
									<ListItemText primary="Admin Tools" />
								</ListItem>
								<ListItem button onClick={() => updatePath("/inventory")}>
									<ListItemIcon>
										<MoneyIcon style={{color: '#c4a747'}} />
									</ListItemIcon>
									<ListItemText primary="Prices and Inventory" />
								</ListItem>
								<Divider />
							</>
						}
					
						{
							checkIfDev() &&
							<>
								<ListItem button onClick={() => updatePath("/dev")}>
									<ListItemIcon>
										<AndroidIcon style={{color: '#3eb85f'}}/>
									</ListItemIcon>
									<ListItemText primary="Developer Tools" />
								</ListItem>
								<Divider />
							</>
						}
					
						<ListItem button onClick={() => updatePath("/usersettings")}>
							<ListItemIcon>
								<ComputerIcon style={{color: '#030ffc'}} />
							</ListItemIcon>
							<ListItemText primary="User Portal" />
						</ListItem>
						<ListItem button onClick={logout}>
							<ListItemIcon><EjectIcon style={{color: '#821f2b'}} /></ListItemIcon><ListItemText primary="Logout" />
						</ListItem>
					</List>
					<div style={{padding: 5, fontSize: '9pt', bottom: 0}}>
					{'v' + PackageJSON.version}
					</div>
				
				</div>
			</Slide>
			<div style={{borderLeft: '2px solid lightgrey', cursor: 'pointer', display: 'flex', padding: 2}} onClick={() => toggleNavigation(!render)}>
				{ render ? <ArrowLeftIcon style={{margin: 'auto'}} /> : <ArrowRightIcon style={{margin: 'auto'}} />}
			</div>
		</div>
	)
}

export default connect(null, { updatePath })(Navigation);