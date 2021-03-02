import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { Equation } from '../../equations/objects/Equation';
import { EquationData } from '../../equations/objects/EquationData';
import { updateEquationInData } from '../../data/PriceDataServices';
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
	selectedEquation: new Equation(),

	notes: "",
	equation: ""
}

class EditSelectedEquationDataComponent extends React.Component<Props, State> {
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

	private saveEdits() {
		const { selectedEquation } = this.props;
		this.setState({ loading: true });
		let _newData = new EquationData();
		_newData.id = selectedEquation.id;
		_newData.key = selectedEquation.key;
		_newData.name = selectedEquation.name;

		_newData.notes = this.state.notes;
		_newData.equation = this.state.equation;

		let updatePackage = new EquationDataUpdatePackage(this.props.selectedPriceData, _newData);
	

		updateEquationInData(updatePackage).then(response => {
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
		const { renderModal, error, errorMessage, loading } = this.state;

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Edit Equation">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Edit style={{color: 'green'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Edit <span style={{color: '#e35146'}}>{this.props.selectedEquation.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<SaveBox />
							:
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
								<div>{this.props.selectedEquation.key}</div>
								<div>{this.props.selectedEquation.notes}</div>
								<div>Value</div>
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
									<StandardButton onClick={this.saveEdits}>Edit</StandardButton>
									<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default EditSelectedEquationDataComponent;