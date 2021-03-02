import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Card, CardContent, Button } from '@material-ui/core';
import { createUserProfile } from '../../services/UserServices';
import { msalApp } from '../../auth/authUtils';
import { User } from '../../objects/user/User';
import { MicrosoftToken } from '../../objects/tokens/MicrosoftToken';
import { getMicrosoftProfile } from '../../auth/AuthServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { getAllSalesOffices } from '../../services/SalesOfficeServices';

interface NewUserDisplayProps {
	findUser: () => void;
}
interface NewUserDisplayState {
	licenseNumber: string;
	profilePictureUrl: string;
	submitted: boolean;
	userExists: boolean;

	salesOffices: SalesOffice[];
	selectedSalesOffice: SalesOffice;

	validSalesOfficeSelected: boolean;

}


class NewUserDisplay extends React.Component<NewUserDisplayProps, NewUserDisplayState> {
	constructor(props: NewUserDisplayProps) {
		super(props);
		this.state = {
			licenseNumber: "",
			profilePictureUrl: "",
			submitted: false,
			userExists: false,
			salesOffices: [],
			selectedSalesOffice: new SalesOffice(),

			validSalesOfficeSelected: false
		}

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleLocationSelection = this.handleLocationSelection.bind(this);
		this.submitNewSystemUser = this.submitNewSystemUser.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		getAllSalesOffices().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					salesOffices: res.data
				});
			}
		});
	}

	private handleFormChange(event: { target: { name: string, value: string }; }) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({
			[name]: value
		});
	}

	private handleLocationSelection(event: { target: { value: any; }; }) {
		const { value } = event.target;
		const { salesOffices } = this.state;
		let selectedLocation: SalesOffice = salesOffices.find(office => office.id === value) || new SalesOffice();
		if(selectedLocation.avalaraId !== 0) {
			this.setState({ selectedSalesOffice: selectedLocation, validSalesOfficeSelected: true });
		} else {
			this.setState({ validSalesOfficeSelected: false });
		}
	}

	public logout() {
		msalApp.logout();
	}

	private submitNewSystemUser() {
		this.setState({ submitted: true });
		if(this.state.validSalesOfficeSelected) {
			let newUser = new User();
			let microsoftProfile: MicrosoftToken = getMicrosoftProfile();
			newUser.licenseNumber = this.state.licenseNumber;
			newUser.profilePictureUrl = this.state.profilePictureUrl;
			newUser.name = microsoftProfile.name;
			newUser.email = microsoftProfile.preferred_username;
	
			newUser.locationId = this.state.selectedSalesOffice.id;
			newUser.location = this.state.selectedSalesOffice.officeName;
	
			createUserProfile(newUser).then(res => {
				if(validateHTMLResponse(res)) {
					this.props.findUser();
				} else if (res.status === 409) {
					this.setState({
						userExists: true
					})
				}
			});
		}
	}

	public render() {
		const { licenseNumber, profilePictureUrl, userExists } = this.state;
		return(
			<>
				<AppBar position="static" style={{width: '100%'}}>
					<Toolbar>
						<Typography variant="h6" color="inherit">Welcome New User!</Typography>
					</Toolbar>
				</AppBar>
				<Card>
					<CardContent>
						<h4>It appears we don't have you registered on this system.  Please fill out the information below for access!</h4>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<TextField
								label="Enter License Number if Applicable"
								margin="normal"
								variant="outlined"
								name="licenseNumber"
								value={licenseNumber}
								onChange={this.handleFormChange}
							/>

							<TextField
								label="URL to Profile Picture (optional)"
								margin="normal"
								variant="outlined"
								name="profilePictureUrl"
								value={profilePictureUrl}
								onChange={this.handleFormChange}
							/>

							<select name="locationId" value={this.state.selectedSalesOffice.id} onChange={this.handleLocationSelection} style={{padding: 10, marginTop: 15, marginBottom: 5}} >
								<option value="">select location</option>
								{
									this.state.salesOffices.map(location => (
										<option key={location.id} value={location.id}>{location.officeName}</option>
									))
								}
							</select>
							{
								(this.state.submitted === true && this.state.validSalesOfficeSelected === false) &&
								<p style={{color: "red"}}>You must select your sales office first!</p>
							}
						</div>
						{
							userExists === true &&
							<div style={{marginTop: 10, marginBottom: 10, color: 'red'}}>
								<p>Email already exists in the system!</p>
							</div>
						}
						<div style={{marginTop: 15, display: 'flex', justifyContent: 'space-between'}}>
							{
								this.state.validSalesOfficeSelected === true &&
								<Button variant="contained" color="primary" onClick={this.submitNewSystemUser}>Create Account</Button>
							}
							<Button variant="outlined" onClick={this.logout}>Return to login</Button>
						</div>
					</CardContent>
				</Card>
			</>
		)
	}
}

export default NewUserDisplay;