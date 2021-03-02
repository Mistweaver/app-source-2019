import React from 'react';
import { User } from '../../objects/user/User';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { getUsersByLocation } from '../../services/UserServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { reassignAgreement } from './ReassignmentFunctions';

interface ReassignAgreementProps {
	open: boolean;
	onClose: () => void;
	locationId: string;
	agreementId: string;
}

interface ReassignAgreementState {
	reassignedKey: string;
	users: User[];
	error: boolean;
}

class ReassignAgreement extends React.Component<ReassignAgreementProps, ReassignAgreementState> {
	constructor(props: ReassignAgreementProps) {
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
		getUsersByLocation(this.props.locationId).then(res => {
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
		reassignAgreement(this.props.agreementId, this.state.reassignedKey).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.onClose();
			} else {
				this.setState({ error: true });
			}
		});
	}

	public render() {
		const { open, onClose } = this.props;
		const { reassignedKey, users, error } = this.state;

		return(
			<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth={true}
		>
			<DialogTitle id="simple-dialog-title">Reassign Agreement to User</DialogTitle>
			<DialogContent>
				<p>Select the user to reassign this agreement to.</p>
				<select onChange={this.selectReassignedUserKey}>
					{
						users.map(user => (
							<option value={user.email}>{user.name}</option>
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

export default ReassignAgreement;