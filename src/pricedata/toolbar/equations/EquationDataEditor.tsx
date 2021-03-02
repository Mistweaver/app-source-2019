import { Dialog, DialogTitle, DialogActions, Button, Accordion, AccordionDetails, AccordionSummary, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Save, Clear, ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { updateEquationInData, removeEquationFromData } from '../../data/PriceDataServices';
import { EquationData } from '../../equations/objects/EquationData';
import { EquationDataUpdatePackage } from '../../equations/objects/EquationDataUpdatePackage';

interface EquationDataEditorProps {
	priceData: PriceData;
	equation: EquationData;
	select: (equation: EquationData) => void;
	reload: () => void;
}

interface EquationDataEditorState {
	renderModal: boolean;
	newEquationValue: string;
	changeNotes: string;

	edited: boolean;
	removing: boolean;
	saving: boolean;

	error: boolean;
	errorMessage: string;
}

const initialState = {
	renderModal: false,
	newEquationValue: "",
	changeNotes: "",

	edited: false,
	removing: false,
	saving: false,
	error: false,
	errorMessage: ""
}

class EquationDataEditor extends React.Component<EquationDataEditorProps, EquationDataEditorState> {
	constructor(props: EquationDataEditorProps) {
		super(props);
		this.state = initialState;

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.changeEquation = this.changeEquation.bind(this);
		this.removeEquation = this.removeEquation.bind(this);
		this.changeNotes = this.changeNotes.bind(this);
		this.select = this.select.bind(this);
		this.cancelEdits = this.cancelEdits.bind(this);
		this.beginRemoval = this.beginRemoval.bind(this);
		this.stopRemoval = this.stopRemoval.bind(this);
	}

	private changeEquation(event: { target: { value: string }; }) {
		this.setState({ newEquationValue: event.target.value, edited: true });
	}

	private changeNotes(event: { target: { value: string }; }) {
		this.setState({ changeNotes: event.target.value, edited: false });
	}

	private beginRemoval() { this.setState({ removing: true }); }
	private stopRemoval() { this.setState({ removing: false }); }


	private showModal() {
		this.setState({
			renderModal: true,
			newEquationValue: this.props.equation.equation,
			changeNotes: this.props.equation.notes
		});
	}

	private closeModal() {
		this.setState(initialState);
	}

	private cancelEdits() {
		this.setState({
			newEquationValue: this.props.equation.equation,
			changeNotes: this.props.equation.notes,
			edited: false
		});
	}



	private saveEdits() {
		const { equation } = this.props;
		this.setState({ saving: true });
		let _newData = new EquationData();
		_newData.id = equation.id;
		_newData.key = equation.key;
		_newData.name = equation.name;

		_newData.notes = this.state.changeNotes;
		_newData.equation = this.state.newEquationValue;

		let updatePackage = new EquationDataUpdatePackage([this.props.priceData], _newData);
	

		updateEquationInData(updatePackage).then(response => {
			this.setState({ saving: false });
			if(validateHTMLResponse(response)) {
				// this.setState({ responseData: response.data });
				this.props.reload();
				this.closeModal();

			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});
	}

	private select() {
		this.props.select(this.props.equation);
		this.closeModal();
	}

	private removeEquation() {
		this.setState({ saving: false });
		let updatePackage = new EquationDataUpdatePackage([this.props.priceData], this.props.equation);
		removeEquationFromData(updatePackage).then(response => {
			this.setState({ saving: false });
			if(validateHTMLResponse(response)) {
				// this.setState({ responseData: response.data });
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
		const { equation } = this.props;
		const { renderModal, newEquationValue, changeNotes, edited, removing, saving } = this.state;
		return(
			<>
				<div onClick={this.showModal}>
					{this.props.children}
				</div>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Edit <span style={{color: '#e35146'}}>{equation.name}</span>
					</DialogTitle>
					<div style={{padding: 15}}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<div>{"Database ID: " + equation.id}</div>
								<div>{"Key: " + equation.key}</div>
								<div>{"Notes: " + equation.notes}</div>
								<div>Current Equation</div>
								<div>{equation.equation}</div>
								<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
									<div>New Equation</div>
									<input value={newEquationValue} onChange={this.changeEquation}/>
									<div>Change Notes</div>
									<input value={changeNotes} onChange={this.changeNotes}/>
								</div>
								
							</Grid>
							{
								saving ?
								<div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
									<div>Saving...</div>
									<div style={{padding: 10}}>
										<CircularProgress />
									</div>
								</div>
								:
								<Grid item xs={4}>
									<div style={{display: 'flex', flexDirection: 'column' }}>
										{
											edited &&
											<>
												<Button onClick={this.saveEdits} variant="contained" style={{marginBottom: 5}}><Save style={{color: 'blue', marginRight: 5}} /> Save</Button>
												<Button onClick={this.cancelEdits} variant="contained" style={{marginBottom: 5}}><Clear style={{color: 'red', marginRight: 5}} /> Undo</Button>
											</>
										}
										<Button onClick={this.select} variant="contained" style={{marginBottom: 5}}>Select</Button>
										<Button onClick={this.closeModal} color="primary" variant="outlined">Close</Button>
									</div>
								</Grid>
							}
							
						</Grid>
					</div>
					{
						!saving &&
						<DialogActions>
							<Accordion expanded={removing} onChange={removing ? this.stopRemoval : this.beginRemoval} style={{width: '100%'}}>
								<AccordionSummary>
									<Typography>Remove <span style={{color: '#e35146'}}>{equation.name}</span></Typography>
									{ this.state.removing ? <ExpandLess /> : <ExpandMore /> }
								</AccordionSummary>
								<AccordionDetails>
									<div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
										<div style={{marginBottom: 10}}>Are you sure?</div>
										<div style={{display: 'flex', justifyContent: 'space-between'}}>
											<Button onClick={this.stopRemoval} variant="contained">Cancel</Button>
											<Button onClick={this.removeEquation} color="secondary" variant="contained">Remove</Button>
										</div>
									</div>
									
								</AccordionDetails>
							</Accordion>
						</DialogActions>
					}
				</Dialog>
			</>
			
		)
	}
}

export default EquationDataEditor;