import { Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { Equation } from '../../equations/objects/Equation';
import { EquationData } from '../../equations/objects/EquationData';
import { getAllEquations } from '../../equations/EquationServices';
import { addEquationToData } from '../../data/PriceDataServices';
import { EquationDataUpdatePackage } from '../../equations/objects/EquationDataUpdatePackage';
import { SortEquationsAlphabetically } from '../../data/functions/SortEquationsAlphabetically';
import { SaveBox } from '../../../components/responseboxes/SaveBox';

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
	
	existingEquations: Equation[];
	loadingEquations: boolean;
	selectedEquation: Equation;

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
	existingEquations: [],
	loadingEquations: false,
	selectedEquation: new Equation(),

	notes: "",
	equation: ""
}

class AddEquationComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addEquation = this.addEquation.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.selectEquation = this.selectEquation.bind(this);
	}

	private showModal() {
		this.setState({
			renderModal: true,
			notes: "",
			equation: ""
		});
		this.getExistingEquations();
	}

	private closeModal() {
		this.setState(initialState);
	}

	private handleInput(event: { target: { name: string, value: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value})
	}

	private getExistingEquations() {
		this.setState({ loadingEquations: true });
		getAllEquations().then(res => {
			this.setState({ loadingEquations: false });
			if(validateHTMLResponse(res)) {
				this.setState({ existingEquations: res.data });
			}
		})
	}

	private selectEquation(event: { target: { value: string }}) {
		this.setState({selectedEquation: this.state.existingEquations[parseInt(event.target.value)]});
	}

	private addEquation() {
		const { selectedEquation } = this.state;
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
		this.state.existingEquations.sort(SortEquationsAlphabetically);
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Add Equation">
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
						Add Equation To Price Data
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<SaveBox />
							:
							
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
								<div>Select Equation</div>
								{
									this.state.loadingEquations ?
									<LinearProgress />
									:
									<select onChange={this.selectEquation}>
										{this.state.existingEquations.map((equation, index) =>
											<option key={index} value={index}>
												{equation.name}
											</option>
										)}
									</select>
								}
								
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
								{
									this.state.selectedEquation.id !== "" &&
									<StandardButton onClick={this.addEquation}>Add <span style={{color: '#e35146'}}>{this.state.selectedEquation.name}</span></StandardButton>
								}
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default AddEquationComponent;


