import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { List } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { PriceData } from '../../objects/PriceData';

interface Props {
	selectedPriceData: PriceData[];
}

interface State {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	newSeriesName: string;
}

class SeriesNameEditComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			errorMessage: "",
			renderModal: false,

			newSeriesName: "",
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private action() {
		
	}

	private handleChange(event: { target: { value: string }; }) {
		this.setState({ newSeriesName: event.target.value });
	}

	public render() {
		const { renderModal } = this.state;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Change Series Name">
					<div className="buttonMinimal" onClick={this.showModal} >
						<List style={{color: 'blue'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Change Series Name
					</DialogTitle>
					<DialogContent>
						<label>Enter new series name for {this.props.selectedPriceData.length} drafts selected</label>
						<div>
							<input onChange={this.handleChange} placeholder="enter series name" value={this.state.newSeriesName} />
						</div>
					</DialogContent>
					<DialogActions>
						<StandardButton onClick={this.action}>Set</StandardButton>
						<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default SeriesNameEditComponent;