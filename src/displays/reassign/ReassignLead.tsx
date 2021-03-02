import React from 'react';
import { User } from '../../objects/user/User';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { getUsersByLocation } from '../../services/UserServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { reassignLead } from './ReassignmentFunctions';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';

interface ReassignLeadProps {
	open: boolean;
	onClose: () => void;
	reloadLead: () => void;
	locationId: string;
	leadId: string;
	salesOffices: SalesOffice[];
}

interface ReassignLeadState {
	reassignedKey: string;
	users: User[];
	error: boolean;
}

class ReassignLead extends React.Component<ReassignLeadProps, ReassignLeadState> {
	constructor(props: ReassignLeadProps) {
		super(props);
		this.state = {
			reassignedKey: "",
			users: [],
			error: false
		}

		this.reassign = this.reassign.bind(this);
		this.selectReassignedUserKey = this.selectReassignedUserKey.bind(this);
	}

	componentDidMount() {
		this.loadLocationUsers()
	}

	componentDidUpdate(prevProps: ReassignLeadProps) {
		if(prevProps !== this.props) {
			this.loadLocationUsers()
		}
	}

	private loadLocationUsers() {
		const { locationId, salesOffices } = this.props;
		let leadSalesOffice: SalesOffice = salesOffices.find(office => office.clientConsultantId === parseInt(locationId)) || new SalesOffice();
		getUsersByLocation(leadSalesOffice.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					users: res.data._embedded.users
				});
			}
		});
	}

	private selectReassignedUserKey(event: any) {
		this.setState({ reassignedKey: event.target.value });
	}

	private reassign() {
		reassignLead(this.props.leadId, this.state.reassignedKey).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.reloadLead();
				this.props.onClose();
			} else {
				this.setState({ error: true });
			}
		});
	}
	
	public render() {
		const { open, onClose } = this.props;
		const { reassignedKey, users, error } = this.state;
		// console.log("REASSIGN LEAD PROPS");
		// console.log(this.props);
		return(
			<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth={true}
		>
			<DialogTitle id="simple-dialog-title">Reassign Lead to User</DialogTitle>
			<DialogContent>
				<p>Select the user to reassign this lead to.</p>
				<select onChange={this.selectReassignedUserKey}>
					{
						users.map(user => (
							<option key={user.id} value={user.email}>{user.name}</option>
						))
					}
				</select>
				{
					error &&
					<p style={{color: 'red'}}>There was an error during reassignment</p>
				}
			</DialogContent>
			<DialogActions style={{justifyContent: 'space-between'}}>
				{
					reassignedKey !== "" &&
					<Button onClick={this.reassign} color="primary" variant="contained">
						Reassign Lead
					</Button>
				}
				<Button onClick={onClose} color="primary" variant="outlined">
					Cancel
				</Button>
				
			</DialogActions>
		</Dialog>
		)
	}
}

export default ReassignLead;