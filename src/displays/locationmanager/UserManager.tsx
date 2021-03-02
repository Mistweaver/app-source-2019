import React from 'react';
import { getUsersByLocation, updateUserProfile } from '../../services/UserServices';
import { Grid, Card, CardHeader, Avatar, CardContent, Button, Divider, TextField, MenuItem, LinearProgress } from '@material-ui/core';
import BlankProfileImage from '../../resources/blankprofile.png';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { User } from '../../objects/user/User';
import { checkIfAdmin, checkIfDev } from '../../auth/AccessControlFunctions';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';

interface UserManagerProps {
	salesOffice: SalesOffice;
	salesOffices: SalesOffice[];
}

interface UserManagerState {
	locationUsers: User[];
	selectedUser: User;
	displayUserOptions: boolean;

	userEdited: boolean;
	loading: boolean;
}

class UserManager extends React.Component<UserManagerProps, UserManagerState> {
	constructor(props: UserManagerProps) {
		super(props);
		this.state = {
			locationUsers: [],
			selectedUser: new User(),
			displayUserOptions: false,

			userEdited: false,
			loading: true
		}

		this.selectUser = this.selectUser.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleUserLocationChange = this.handleUserLocationChange.bind(this);
		this.saveUserChanges = this.saveUserChanges.bind(this);
		this.cancelUserChanges = this.cancelUserChanges.bind(this);
	}

	componentDidMount() {
		this.getLocationUsers();
	}

	componentDidUpdate(prevProps: UserManagerProps) {
		if(prevProps.salesOffice.id !== this.props.salesOffice.id && this.props.salesOffice.id !== "") { 
			this.getLocationUsers();
		} 
	}

	getLocationUsers() {
		this.setState({ loading: true});
		getUsersByLocation(this.props.salesOffice.id).then(res => {
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.setState({
					locationUsers: res.data._embedded.users
				});
			}
		});
	}

	private selectUser(user: User) {
		this.setState({
			selectedUser: user,
			displayUserOptions: true
		})
	}

	private handleUserChange(event: { target: { name: string, value: string}}) {
		this.setState({ userEdited: true  });
		const { name, value } = event.target;
		this.setState(prevState => ({
			selectedUser: {
				...prevState.selectedUser,
				[name]: value
			}
		}));
	}

	private handleUserLocationChange(event: any) {
		this.setState({ userEdited: true  });
		if(event.target.value === "") {
			this.setState(prevState => ({
				selectedUser: {
					...prevState.selectedUser,
					location: "unassigned",
					locationId: ""
				}
			}));
		} else { 
			let selectedOffice: SalesOffice = this.props.salesOffices.find(office => office.id === event.target.value) || new SalesOffice();
			this.setState(prevState => ({
				selectedUser: {
					...prevState.selectedUser,
					location: selectedOffice.officeName,
					locationId: selectedOffice.id
				}
			}));
		}
	}

	private saveUserChanges() {
		this.setState({ loading: true, displayUserOptions: false });
		updateUserProfile(this.state.selectedUser).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ userEdited: false, loading: false });
				this.getLocationUsers();
			}
		})
		
	}

	private cancelUserChanges() {
		this.setState({ userEdited: false, displayUserOptions: false });
		this.getLocationUsers();
	}


	public render() {
		const { salesOffices } = this.props;
		const { locationUsers, selectedUser, displayUserOptions, userEdited, loading } = this.state;
		return(
			<Grid container spacing={2}>
				<Grid item xs={5}>
					{
						loading ?
						<LinearProgress style={{marginTop: 10}} />
						:
						<div style={{/*maxHeight: '70vh', overflowY: 'scroll'*/}}>
							{
								locationUsers.map(user => (
									<Card key={user.id} style={{marginTop: 5, cursor: 'pointer'}} onClick={() => this.selectUser(user)}>
										<CardHeader
											avatar={
												<Avatar style={{
														margin: 5,
														width: 50,
														height: 50,
														backgroundColor: 'white'
													}}
													aria-label="User" src={user.profilePictureUrl || BlankProfileImage}
												>
												</Avatar>
											}
											// title={'Welcome username'}
											title={user.name}
											subheader={user.email}
										/>
									</Card>
								))
							}
						</div>
					}
				</Grid>
				<Grid item xs={7}>
					{
						displayUserOptions === true &&
						<Card style={{marginTop: 5}}>
							<CardHeader
								avatar={
									<Avatar style={{
											margin: 5,
											width: 50,
											height: 50,
											backgroundColor: 'white'
										}}
										aria-label="User" src={selectedUser.profilePictureUrl || BlankProfileImage}
									>
									</Avatar>
								}
								title={selectedUser.name }
							/>
							<Divider />
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs={8}>
										<div style={{display: 'flex', flexDirection: 'column'}}>
										{
											checkIfAdmin() ?
											<>
												<TextField
													label="Name"
													name="name"
													value={selectedUser.name}
													margin="normal"
													onChange={this.handleUserChange}
													variant="outlined"
												/>
												<TextField
													label="License Number"
													name="licenseNumber"
													value={selectedUser.licenseNumber}
													margin="normal"
													onChange={this.handleUserChange}
													variant="outlined"
												/>
												<TextField
													select
													label="Location"
													value={selectedUser.locationId}
													name="location"
													onChange={this.handleUserLocationChange}
													margin="normal"
													variant="outlined"
												>

													<MenuItem value="">unassigned</MenuItem>
														{
															salesOffices.map(location => (
																<MenuItem key={location.id} value={location.id}>{location.officeName}</MenuItem>
															))
														}
												</TextField>
												<TextField
													label="Profile Picture URL"
													name="profilePictureUrl"
													value={selectedUser.profilePictureUrl}
													margin="normal"
													onChange={this.handleUserChange}
													variant="outlined"
												/>
											</>
											:
											<>
												<TextField
													disabled
													label="Name"
													value={selectedUser.name}
													margin="normal"
												/>
												<TextField
													disabled
													label="License Number"
													value={selectedUser.licenseNumber}
													margin="normal"
												/>
												<TextField
													disabled
													label="Location"
													value={selectedUser.location}
													margin="normal"
												/>
												<TextField
													disabled
													label="Profile Picture URL"
													value={selectedUser.profilePictureUrl}
													margin="normal"
												/>
											</>
										}
										{
											checkIfDev() ?
											<TextField
												label="Email"
												name="email"
												value={selectedUser.email}
												margin="normal"
												variant="outlined"
												onChange={this.handleUserChange}
												helperText="Warning: this value is set from your Microsoft profile.  Changing it could cause a fatal error"
											/>
											:
											<TextField
												disabled
												label="Email"
												value={selectedUser.email}
												margin="normal"
											/>
										}
										</div>
										{
											userEdited &&
											<div>
												<Button variant="contained" color="primary" onClick={this.saveUserChanges}>Save Changes</Button>
												<Button variant="outlined" color="secondary" style={{marginLeft: 10}} onClick={this.cancelUserChanges}>Cancel Changes</Button>
											</div>
										}
									</Grid>
								</Grid>
							
								
						
							</CardContent>
						</Card>
					}
				</Grid>
			</Grid>
		)
	}
}

export default UserManager;