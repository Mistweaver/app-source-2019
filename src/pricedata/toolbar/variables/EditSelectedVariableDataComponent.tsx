import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { updateVariableInData } from '../../data/PriceDataServices';
import { Variable } from '../../variables/objects/Variable';
import { VariableData } from '../../variables/objects/VariableData';
import { VariableDataUpdatePackage } from '../../variables/objects/VariableDataUpdatePackage';

interface Props {
	selectedPriceData: PriceData[];
	selectedVariable: VariableData;
	reload: () => void;
}

interface State {
	saving: boolean;
	editSuccessful: boolean;

	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	responseData: PriceData[];

	// properties available to edit
	notes: string;
	value: string;
}

const initialState = {
	saving: false,
	editSuccessful: false,

	error: false,
	errorMessage: "",
	renderModal: false,

	responseData: [],
	selectedVariable: new Variable(),

	notes: "",
	value: ""
}

class EditSelectedVariableDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
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
		if(!this.state.saving) {
			this.setState(initialState);
		}
	}

	private handleInput(event: { target: { name: string, value: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value})
	}

	private saveEdits() {
		const { selectedVariable } = this.props;
		this.setState({ saving: true });
		let _newData = new VariableData();
		_newData.id = selectedVariable.id;
		_newData.key = selectedVariable.key;
		_newData.name = selectedVariable.name;

		_newData.notes = this.state.notes;
		_newData.value = parseFloat(this.state.value);

		let updatePackage = new VariableDataUpdatePackage(this.props.selectedPriceData, _newData);

		updateVariableInData(updatePackage).then(response => {
			this.setState({ saving: false });
			if(validateHTMLResponse(response)) {
				this.props.reload();
				this.setState({ responseData: response.data, editSuccessful: true });
			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});
	}

	public render() {
		const { renderModal, error, errorMessage, saving } = this.state;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Edit Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Edit style={{color: 'green'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="xs"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Edit <span style={{color: '#e35146'}}>{this.props.selectedVariable.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							saving ?
							<SaveBox />
							:
							<div style={{marginTop: 15, marginBottom: 15}}>
								<div>{"Key: " + this.props.selectedVariable.key}</div>
								<div style={{marginBottom: 15}}>{this.props.selectedVariable.notes}</div>
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
						!saving &&
						<DialogActions>
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
								<StandardButton onClick={this.saveEdits}>Edit</StandardButton>
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						</DialogActions>
					}
					
				</Dialog>
			</div>
		)
	}
}

export default EditSelectedVariableDataComponent;