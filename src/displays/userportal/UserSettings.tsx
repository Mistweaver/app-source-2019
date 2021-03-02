import React from 'react';
import { Divider, TextField, Grid, Button } from '@material-ui/core';
import { getUserByEmail, updateUserProfile } from '../../services/UserServices';
import { MicrosoftToken } from '../../objects/tokens/MicrosoftToken';
import { User } from '../../objects/user/User';
import { getMicrosoftProfile, currentTokenExpiration } from '../../auth/AuthServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { FlexedRowInfo } from '../../components/flexedrowdisplay/FlexedRowInfo';

interface UserSettingsState {
	profilePictureUrl: string;
	microsoftProfile: MicrosoftToken;
	submitted: boolean;
	userEdited: boolean;
	user: User;
}

class UserSettings extends React.Component<{}, UserSettingsState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			profilePictureUrl: "",
			microsoftProfile: getMicrosoftProfile(),
			submitted: false,
			user: new User(),
			userEdited: false,
		}

		this.findUserByEmail = this.findUserByEmail.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.cancelChanges = this.cancelChanges.bind(this);
	}

	componentDidMount() {
		this.findUserByEmail();
	}

	private handleFormChange(event: { target: { name: string, value: string }; }) {
		this.setState({ userEdited: true });
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({
			[name]: value
		});
	}

	private findUserByEmail() {
		getUserByEmail(this.state.microsoftProfile.preferred_username).then(res => {
			// console.log(res);
			if(validateHTMLResponse(res)) {
				this.setState({ 
					user: res.data,
					profilePictureUrl: res.data.profilePictureUrl,
				});
			}
		});
	}

	private saveChanges() {
		let updatedUser = new User();
		updatedUser.name = this.state.user.name;
		updatedUser.id = this.state.user.id;
		updatedUser.email = this.state.user.email;
		updatedUser.createdBy = this.state.user.createdBy;
		updatedUser.creationTime = this.state.user.creationTime;
		updatedUser.deleted = this.state.user.deleted;
		updatedUser.licenseNumber = this.state.user.licenseNumber;
		updatedUser.location = this.state.user.location;
		updatedUser.locationId = this.state.user.locationId;
		
		updatedUser.profilePictureUrl = this.state.profilePictureUrl;
		updateUserProfile(updatedUser).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ 
					user: res.data,
					profilePictureUrl: res.data.profilePictureUrl,
					userEdited: false
				});
			}
		})
	}

	private cancelChanges() {
		let { user } = this.state;
		this.setState({ 
			profilePictureUrl: user.profilePictureUrl,
			userEdited: false
		});
	}

	public render() {
		const { user, microsoftProfile,profilePictureUrl, userEdited } = this.state;
		return(
			<div style={{padding: 15}}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<div style={{backgroundColor: 'rgb(231, 231, 231)', marginBottom: 15}}>
							<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 15}}>
								Welcome {microsoftProfile.name}!
							</div>
							<div style={{padding: 15}}>
								<TextField
									label="URL to Profile Picture (optional)"
									margin="normal"
									variant="outlined"
									name="profilePictureUrl"
									value={profilePictureUrl}
									onChange={this.handleFormChange}
									style={{width: '100%'}}
								/>
								<Divider style={{margin: 15}} />
								
								<h5 style={{margin: 0}}><b>License Number:</b> {user.licenseNumber === "" ? "none" : user.licenseNumber}</h5>

								{
									userEdited &&
									<div style={{marginTop: 15, display: 'flex', justifyContent: 'space-between'}}>
										<Button variant="contained" color="primary" onClick={this.saveChanges}>Save Changes</Button>
										<Button variant="outlined" onClick={this.cancelChanges}>Cancel</Button>
									</div>
								}
							</div>
						</div>

						<div style={{backgroundColor: 'rgb(231, 231, 231)'}}>
							<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 15}}>
								AzureAD Information
							</div>
							<div style={{padding: 15}}>
								<FlexedRowInfo field="Name" bold={true} property={microsoftProfile.name} />
								<FlexedRowInfo field="Email" bold={true} property={microsoftProfile.preferred_username} />
								<FlexedRowInfo field="Current Token Expiration" bold={true} property={currentTokenExpiration().toLocaleString()} />
								{
									microsoftProfile.roles.map((role, index) => (
										<FlexedRowInfo key={role} field={'Role ' +(index + 1)} bold={true} property={role} />
									))
								}
							</div>
						</div>
						
					</Grid>
				</Grid>	
			</div>	
		)
	}
}

export default UserSettings;