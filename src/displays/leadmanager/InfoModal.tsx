import React from 'react';
import { DialogContent, DialogActions, Dialog, Button } from '@material-ui/core';

interface InfoModalProps {
	open: boolean;
	onClose: () => void;
	error: boolean;
	errorMessage: string;
	errorStatus: number;
}

interface InfoModalState {}

class InfoModal extends React.Component<InfoModalProps, InfoModalState> {
	constructor(props: InfoModalProps) {
		super(props);
		this.state = {

		}
	}

	public render() {
		const { open, onClose, error, errorMessage, errorStatus } = this.props;
		return(
			<Dialog 
				open={open}
				onClose={onClose}
				maxWidth="sm"
				fullWidth
			>
				<DialogContent>
					<div style={{padding: 25, color: error ? "red" : "black"}}>
						{errorStatus + " " + errorMessage}
					</div>

				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={this.props.onClose}>Close</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default InfoModal;