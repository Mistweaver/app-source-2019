import React from 'react';
import { CardContent, Card, Button } from '@material-ui/core';
import { updateUserProfile } from '../../../services/UserServices';
import { User } from '../../../objects/user/User';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';


interface UserProps {
	user: User;
	loadUsers: (page: number, size: number, sort: string, searchState: string) => void;
	locations: SalesOffice[];
}

interface UserPaneState {
	user: User;
}
class UserPane extends React.Component<UserProps, UserPaneState> {
	constructor(props: UserProps) {
		super(props);
		this.state = {
			user: this.props.user,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleLocationSelection = this.handleLocationSelection.bind(this);
		this.saveUser = this.saveUser.bind(this);
	}

	componentDidMount() {}

	componentDidUpdate(prevProps: UserProps) {
		if(prevProps !== this.props) {
			this.setState({ user: this.props.user });
		}
	}

	private handleChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
	}

	private handleLocationSelection(event: { target: { value: any; }; }) {
		const { value } = event.target;
		const { locations } = this.props;
		let selectedLocation: SalesOffice = locations.find(office => office.id === value) || new SalesOffice();
		this.setState(prevState => ({
			user: {
				...prevState.user,
				location: selectedLocation.officeName,
				locationId: selectedLocation.id
			}
		}));
	}

	public saveUser() {
		const { user } = this.state;
		updateUserProfile(user).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadUsers(0, 20, "", "");
			}
		});
	}

	
	public render() {
		const { locations } = this.props;
		const { user } = this.state;
		return(
			<Card>
				<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>{'User ID: ' + user.id}</div>
				<CardContent>
					<div style={{marginTop: 10, display: 'flex', flexDirection: 'column', fontSize: 13}}>
						<span><b>Created By:</b> {user.createdBy}</span>
						<span><b>Created On:</b> {new Date(user.creationTime).toLocaleString()}</span>
						<span><b>Last Modified By:</b> {user.modifiedBy}</span>
						<span><b>Last Modified On:</b> {new Date(user.modificationTime).toLocaleString()}</span>
					</div>
					
					<div style={{display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%'}}>
						<input id="name" name="name" value={user.name} onChange={this.handleChange} placeholder="name" style={{padding: 10, marginBottom: 5}} />
						<input id="email" name="email" value={user.email} onChange={this.handleChange} placeholder="email" style={{padding: 10, marginBottom: 5}} />
						<input id="licenseNumber" name="licenseNumber" value={user.licenseNumber} onChange={this.handleChange} placeholder="license number" style={{padding: 10, marginBottom: 5}} />
						<select name="locationId" value={user.locationId} onChange={this.handleLocationSelection} style={{padding: 10, marginBottom: 5}} >
							<option value="">select location</option>
							{
								locations.map(location => (
									<option key={location.id} value={location.id}>{location.officeName}</option>
								))
							}
						</select>
						<Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
					</div>
				</CardContent>
			</Card>
		)
	}
}

export default UserPane;