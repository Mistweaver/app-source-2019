import { Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { addVariableToData } from '../../data/PriceDataServices';
import { Variable } from '../../variables/objects/Variable';
import { VariableData } from '../../variables/objects/VariableData';
import { VariableDataUpdatePackage } from '../../variables/objects/VariableDataUpdatePackage';
import { getAllVariables } from '../../variables/VariableServices';
import { SortVariablesAlphabetically } from '../../data/functions/SortVariablesAlphabetically';

interface Props {
	selectedPriceData: PriceData[];
	reload: () => void;
}

interface State {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	responseData: PriceData[];
	
	existingVariables: Variable[];
	loadingVariables: boolean;
	selectedVariable: Variable;

	// properties available to edit
	notes: string;
	value: string;
}

const initialState = {
	loading: false,
	error: false,
	errorMessage: "",
	renderModal: false,

	responseData: [],
	existingVariables: [],
	loadingVariables: false,
	selectedVariable: new Variable(),

	notes: "",
	value: ""
}

class AddVariableComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addVariable = this.addVariable.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.selectVariable = this.selectVariable.bind(this);
	}

	private showModal() {
		this.setState({
			renderModal: true,
			notes: "",
			value: ""
		});
		this.getExistingVariables();
	}

	private closeModal() {
		this.setState(initialState);
	}

	private handleInput(event: { target: { name: string, value: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value})
	}

	private getExistingVariables() {
		this.setState({ loadingVariables: true });
		getAllVariables().then(res => {
			this.setState({ loadingVariables: false });
			if(validateHTMLResponse(res)) {
				this.setState({ existingVariables: res.data });
			}
		})
	}

	private selectVariable(event: { target: { value: string }}) {
		this.setState({selectedVariable: this.state.existingVariables[parseInt(event.target.value)]});
	}

	private addVariable() {
		const { selectedVariable } = this.state;
		this.setState({ loading: true });
		let _newData = new VariableData();
		_newData.id = selectedVariable.id;
		_newData.key = selectedVariable.key;
		_newData.name = selectedVariable.name;

		_newData.notes = this.state.notes;
		_newData.value = parseFloat(this.state.value);

		let updatePackage = new VariableDataUpdatePackage(this.props.selectedPriceData, _newData);

		addVariableToData(updatePackage).then(response => {
			this.setState({ loading: false });
			if(validateHTMLResponse(response)) {
				this.setState({ responseData: response.data });
				this.props.reload();
				this.closeModal();
			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});
	}

	public render() {
		const { renderModal, responseData } = this.state;
		var selectedDataSize = this.props.selectedPriceData.length;
		this.state.existingVariables.sort(SortVariablesAlphabetically);

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Add Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Add style={{color: 'blue'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Add Variable To Price Data
					</DialogTitle>
					<DialogContent>
						<div>Select Variable</div>
						{
							this.state.loadingVariables ?
							<LinearProgress />
							:
							<select onChange={this.selectVariable}>
								{this.state.existingVariables.map((equation, index) =>
									<option key={index} value={index}>
										{equation.name}
									</option>
								)}
							</select>
						}
						
						<div>Value</div>
						<input name="value" value={this.state.value} onChange={this.handleInput} />
						<div>Notes</div>
						<input name="notes" value={this.state.notes} onChange={this.handleInput} />
					{
						responseData.length !== 0 &&
						<div>
							Response Data
						</div>
					}
					</DialogContent>
					<DialogActions>
						<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
						{
							selectedDataSize > 0 && this.state.selectedVariable.id !== "" &&
							<StandardButton onClick={this.addVariable}>Add <span style={{color: '#e35146'}}>{this.state.selectedVariable.name}</span></StandardButton>
						}
							<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default AddVariableComponent;