import React from 'react';import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { VariableData } from '../../variables/objects/VariableData';
import { PlaylistAdd } from '@material-ui/icons';
import { addVariableToData } from '../../data/PriceDataServices';
import { VariableDataUpdatePackage } from '../../variables/objects/VariableDataUpdatePackage';
import { SaveBox } from '../../../components/responseboxes/SaveBox';

interface Props {
	selectedPriceData: PriceData[];
	selectedVariable: VariableData;
	reload: () => void;

}

interface State {
	adding: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	responseData: PriceData[];

	// properties available to edit
	notes: string;
	value: string;
}

const initialState = {
	adding: false,
	error: false,
	errorMessage: "",
	renderModal: false,

	responseData: [],

	notes: "",
	value: ""
}

class AddSelectedVariableDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addVariable = this.addVariable.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	private showModal() {
		this.setState({
			renderModal: true,
			notes: this.props.selectedVariable.notes,
			value: this.props.selectedVariable.value.toString()
		});
	}

	private closeModal() {
		this.setState(initialState);
	}

	private handleInput(event: { target: { name: string, value: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value})
	}

	private addVariable() {
		const { selectedVariable } = this.props;
		this.setState({ adding: true });
		let _newData = new VariableData();
		_newData.id = selectedVariable.id;
		_newData.key = selectedVariable.key;
		_newData.name = selectedVariable.name;

		_newData.notes = this.state.notes;
		_newData.value = parseFloat(this.state.value);

		let updatePackage = new VariableDataUpdatePackage(this.props.selectedPriceData, _newData);

		addVariableToData(updatePackage).then(response => {
			this.setState({ adding: false });
			if(validateHTMLResponse(response)) {
				this.setState({ responseData: response.data });
				this.props.reload();
				this.closeModal();
			} else {
				this.setState({ error: true, errorMessage: response.data });
			}
		});
	}

	public render() {
		const { renderModal, error, errorMessage, adding } = this.state;

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Add Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<PlaylistAdd style={{color: 'limegreen'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Add <span style={{color: '#e35146'}}>{this.props.selectedVariable.name}</span> to {this.props.selectedPriceData.length} drafts
					</DialogTitle>
					<DialogContent>
						{
							adding ?
							<SaveBox />

							:
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
								<div>{this.props.selectedVariable.key}</div>
								<div>{this.props.selectedVariable.notes}</div>
								<div>Current Value: {this.props.selectedVariable.value}</div>
								<div>Value</div>
								<input name="value" value={this.state.value} onChange={this.handleInput} />
								<div>Notes</div>
								<input name="notes" value={this.state.notes} onChange={this.handleInput} />
							</div>
						}
						{
							error &&
							<div>
								<div>There appears to have been an error</div>
								<div>{errorMessage.toString()}</div>
							</div>
						}
					</DialogContent>
					{
						!adding &&
						<DialogActions>
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
								<StandardButton onClick={this.addVariable}>Add</StandardButton>
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						</DialogActions>
					}
					
				</Dialog>
			</div>
		)
	}
}

export default AddSelectedVariableDataComponent;