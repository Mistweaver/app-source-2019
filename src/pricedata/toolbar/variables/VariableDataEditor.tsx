import { Dialog, DialogTitle, Button, Grid, DialogActions, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { Clear, ExpandLess, ExpandMore, Save } from '@material-ui/icons';
import React from 'react';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { updateVariableInData, removeVariableFromData } from '../../data/PriceDataServices';
import { VariableData } from '../../variables/objects/VariableData';
import { VariableDataUpdatePackage } from '../../variables/objects/VariableDataUpdatePackage';

interface VariableDataEditorProps {
	priceData: PriceData;
	variable: VariableData;
	select: (variable: VariableData) => void;
	reload: () => void;
}

interface VariableDataEditorState {
	renderModal: boolean;
	newVariableValue: string;
	changeNotes: string;

	edited: boolean;
	removing: boolean;
	saving: boolean;

	error: boolean;
	errorMessage: string;
}

const initialState = {
	renderModal: false,
	newVariableValue: "",
	changeNotes: "",

	edited: false,
	removing: false,
	saving: false,
	error: false,
	errorMessage: ""
}

class VariableDataEditor extends React.Component<VariableDataEditorProps, VariableDataEditorState> {
	constructor(props: VariableDataEditorProps) {
		super(props);
		this.state = initialState;


		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.changeVariable = this.changeVariable.bind(this);
		this.removeVariable = this.removeVariable.bind(this);
		this.changeNotes = this.changeNotes.bind(this);
		this.select = this.select.bind(this);
		this.cancelEdits = this.cancelEdits.bind(this);
		this.beginRemoval = this.beginRemoval.bind(this);
		this.stopRemoval = this.stopRemoval.bind(this);
	}

	private changeVariable(event: { target: { value: string }; }) {
		this.setState({ newVariableValue: event.target.value, edited: true });
	}

	private changeNotes(event: { target: { value: string }; }) {
		this.setState({ changeNotes: event.target.value, edited: true });
	}

	private beginRemoval() { this.setState({ removing: true }); }
	private stopRemoval() { this.setState({ removing: false }); }



	private showModal() {
		this.setState({
			renderModal: true,
			newVariableValue: this.props.variable.value.toString(),
			changeNotes: this.props.variable.notes
		});
	}

	private closeModal() {
		this.setState(initialState);
	}

	private cancelEdits() {
		this.setState({
			newVariableValue: this.props.variable.value.toString(),
			changeNotes: this.props.variable.notes,
			edited: false
		});
	}


	private select() {
		this.props.select(this.props.variable);
		this.closeModal();
	}

	private saveEdit() {
		const { variable } = this.props;
		this.setState({ saving: true });
		let _newData = new VariableData();
		_newData.id = variable.id;
		_newData.key = variable.key;
		_newData.name = variable.name;

		_newData.notes = this.state.changeNotes;
		_newData.value = parseFloat(this.state.newVariableValue);

		let updatePackage = new VariableDataUpdatePackage([this.props.priceData], _newData);

		updateVariableInData(updatePackage).then(response => {
			this.setState({ saving: false });
			if(validateHTMLResponse(response)) {
				//this.setState({ responseData: response.data });
				this.props.reload();
				this.closeModal();
			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});
	}

	private removeVariable() {
		this.setState({ saving: true });
		let updatePackage = new VariableDataUpdatePackage([this.props.priceData], this.props.variable);

		removeVariableFromData(updatePackage).then(response => {
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
		const { variable } = this.props;
		const { renderModal, newVariableValue, changeNotes, edited, removing, saving } = this.state;
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
						Edit <span style={{color: '#e35146'}}>{variable.name}</span>
					</DialogTitle>
					<div style={{padding: 15}}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<div>{"Database ID: " + variable.id}</div>
								<div>{"Key: " + variable.key}</div>
								<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
									<div>Value</div>
									<input value={newVariableValue} onChange={this.changeVariable} style={{padding: 5, borderRadius: 5}} />
									<div>Notes</div>
									<textarea value={changeNotes} rows={4} onChange={this.changeNotes}  style={{padding: 5, borderRadius: 5}}/>
								</div>
								
							</Grid>
							{
								saving ?
								<SaveBox />
								:
								<Grid item xs={4}>
									<div style={{display: 'flex', flexDirection: 'column' }}>
										{
											edited &&
											<>
												<Button onClick={this.saveEdit} variant="contained" style={{marginBottom: 5}}><Save style={{color: 'blue', marginRight: 5}} /> Save</Button>
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
									<Typography>Remove <span style={{color: '#e35146'}}>{variable.name}</span></Typography>
									{ this.state.removing ? <ExpandLess /> : <ExpandMore /> }
								</AccordionSummary>
								<AccordionDetails>
									<div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
										<div style={{marginBottom: 10}}>Are you sure?</div>
										<div style={{display: 'flex', justifyContent: 'space-between'}}>
											<Button onClick={this.stopRemoval} variant="contained">Cancel</Button>
											<Button onClick={this.removeVariable} color="secondary" variant="contained">Remove</Button>
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

export default VariableDataEditor;