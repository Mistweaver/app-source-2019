import React from 'react';
import { Dialog, AppBar, Toolbar, Typography, DialogContent, DialogActions, Button } from '@material-ui/core';
import { deleteChangeOrder } from '../../services/ChangeOrderServices';

interface ChangeOrderDeletionModalProps {
	open: boolean;
	onClose: () => void;
	closeDetails: () => void;
	changeOrderId: string;
}

interface ChangeOrderDeletionModalState {
	error: boolean;
	errorMessage: string;
	requestStatus: number;
}

class ChangeOrderDeletionModal extends React.Component<ChangeOrderDeletionModalProps, ChangeOrderDeletionModalState> {
	constructor(props: ChangeOrderDeletionModalProps) {
		super(props);
		this.state = {
			error: false,
			errorMessage: "",
			requestStatus: 0
		}

		this.delete = this.delete.bind(this);

	}

	
	private delete() {
		deleteChangeOrder(this.props.changeOrderId).then(res => {
			if(res.status >= 200 && res.status < 300) {
				this.props.onClose();
				this.props.closeDetails();
			} else if(res.status === 409) {
				this.setState({ error: true, errorMessage: res.message, requestStatus: res.status });
			} else {
				this.setState({ error: true, errorMessage: "Unknown Error", requestStatus: res.status });
			}
		});
	}


	public render() {
		const { open, onClose } = this.props;
		const { error, errorMessage, requestStatus } = this.state;
		return(
			<Dialog
				open={open}
				onClose={onClose}
				maxWidth="sm"
				fullWidth
			>
				<AppBar style={{position: 'relative'}} >
					<Toolbar>
						<Typography variant="h6" style={{flex: 1}}>
							Delete Change Order
						</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent>
					<div style={{padding: 25}}>
						Are you sure you wish to delete this change order?
					</div>
					{
						error &&
						<div style={{color: 'red'}}>{"Error " + requestStatus + ": " + errorMessage}</div>
					}
				</DialogContent>
				<DialogActions>
					<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
						<Button variant="contained" color="secondary" onClick={this.delete}>Delete</Button>
						<Button variant="outlined" color="primary" onClick={this.props.onClose}>Cancel</Button>
					</div>
				</DialogActions>
			</Dialog>
		)
	}
}

export default ChangeOrderDeletionModal;