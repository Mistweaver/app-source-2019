import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../components/buttons/CriticalButton';
import { PriceData } from '../objects/PriceData';

interface Props {
	data: PriceData;
}
interface State {
	renderModal: boolean;
}

class ErrorModal extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			renderModal: false
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	private showModal() { this.setState({ renderModal: true }); }
	private closeModal() { this.setState({ renderModal: false }); }

	public render() {
		const { renderModal } = this.state;

		if(this.props.data.error) {
			return(
				<div style={{margin: 'auto'}}>
					<Tooltip title="Error Present">
						<div className="buttonMinimal" onClick={this.showModal} >
							<Error style={{color: 'red'}} />
						</div>						
					</Tooltip>
					<Dialog
						open={renderModal}
						onClose={this.closeModal}
						maxWidth="sm"            
						fullWidth={true}
					>
						<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
							<span style={{color: 'red'}}>Error</span> Found in Data
						</DialogTitle>
						<DialogContent>
							<div style={{marginBottom: 25}}>The following error was found: </div>
							<div>{this.props.data.errorDetails}</div>
						</DialogContent>
						<DialogActions>
							<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
						</DialogActions>
					</Dialog>
				</div>
			)
		} else {
			return null;
		}
		
	}
}

export default ErrorModal;