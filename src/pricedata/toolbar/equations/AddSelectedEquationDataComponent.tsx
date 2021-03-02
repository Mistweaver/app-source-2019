import React from 'react';import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { EquationData } from '../../equations/objects/EquationData';
import { PlaylistAdd } from '@material-ui/icons';
import { addEquationToData } from '../../data/PriceDataServices';
import { EquationDataUpdatePackage } from '../../equations/objects/EquationDataUpdatePackage';
import { SaveBox } from '../../../components/responseboxes/SaveBox';

interface Props {
	selectedPriceData: PriceData[];
	selectedEquation: EquationData;
	reload: () => void;

}

interface State {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	responseData: PriceData[];

	// properties available to edit
	notes: string;
	equation: string;
}

const initialState = {
	loading: false,
	error: false,
	errorMessage: "",
	renderModal: false,

	responseData: [],

	notes: "",
	equation: ""
}

class AddSelectedEquationDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addEquation = this.addEquation.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	private showModal() {
		this.setState({
			renderModal: true,
			notes: this.props.selectedEquation.notes,
			equation: this.props.selectedEquation.equation
		});
	}

	private closeModal() {
		this.setState(initialState);
	}

	private handleInput(event: { target: { name: string, value: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value})
	}

	private addEquation() {
		const { selectedEquation } = this.props;
		this.setState({ loading: true });
		let _newData = new EquationData();
		_newData.id = selectedEquation.id;
		_newData.key = selectedEquation.key;
		_newData.name = selectedEquation.name;
		_newData.roundingDirection = "UP";
		_newData.roundingPosition = 0.1;

		_newData.notes = this.state.notes;
		_newData.equation = this.state.equation;

		let updatePackage = new EquationDataUpdatePackage(this.props.selectedPriceData, _newData);

		addEquationToData(updatePackage).then(response => {
			this.setState({ loading: false });
			if(validateHTMLResponse(response)) {
				this.setState({ responseData: response.data });
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});
	}

	public render() {
		const { renderModal, responseData, error, errorMessage, loading } = this.state;
		var selectedDataSize = this.props.selectedPriceData.length;

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Add Equation">
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
						Add <span style={{color: '#e35146'}}>{this.props.selectedEquation.name}</span> to {selectedDataSize} drafts
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<SaveBox />
							:
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
								<div>{this.props.selectedEquation.key}</div>
								<div>{this.props.selectedEquation.notes}</div>
								<div>Current Value: {this.props.selectedEquation.equation}</div>
								<div>Equation String</div>
								<input name="equation" value={this.state.equation} onChange={this.handleInput} />
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
					<DialogActions>
						{
							!loading &&
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
								<StandardButton onClick={this.addEquation}>Add</StandardButton>
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default AddSelectedEquationDataComponent;