import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { FiberNew } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { SuccessBox } from '../../../components/responseboxes/SuccessBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { Variable } from '../../variables/objects/Variable';
import { createNewVariable } from '../../variables/VariableServices';

interface Props {
	reload: () => void;
}

interface State {
	saving: boolean;
	creationSuccessful: boolean;

	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	name: string;
	key: string;
	notes: string;
}

const initialState = {
	saving: false,
	creationSuccessful: false,

	error: false,
	errorMessage: "",
	renderModal: false,

	notes: "",
	name: "",
	key: ""
}

class CreateNewVariableComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.createVariable = this.createVariable.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
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

	private createVariable() {
		this.setState({ saving: true });
		let newVariable = new Variable();
		newVariable.name = this.state.name;
		newVariable.key = this.state.key;
		newVariable.notes = this.state.notes;

		createNewVariable(newVariable).then(res => {
			this.setState({ saving: false });
			if(validateHTMLResponse(res)) {
				this.closeModal();
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		});
	}

	private clearSuccessMessage() {

	}


	public render() {
		const { renderModal, error, errorMessage, saving, creationSuccessful } = this.state;

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Create Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<FiberNew style={{color: 'blue'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Create New Variable
					</DialogTitle>
					<DialogContent>
						{
							creationSuccessful ?
								<div>
									<SuccessBox />
									<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
										<Button onClick={this.clearSuccessMessage}>Clear</Button>
										<Button onClick={this.closeModal}>Close</Button>
									</div>
								</div>
							:
							<div>
								{
									saving ?
									<SaveBox />
									:
									<div>
										<div style={{marginBottom: 10}}>Enter the following information</div>
										<div>Variable Name</div>
										<input name="name" value={this.state.name} onChange={this.handleInput} />
										<div>Variable Key</div>
										<input name="key" value={this.state.key} onChange={this.handleInput} />
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
							</div>
						}
					</DialogContent>
					<DialogActions>
						{
							!saving &&
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
								<StandardButton onClick={this.createVariable}>Create Variable <span style={{color: '#e35146'}}>{this.state.name}</span></StandardButton>
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default CreateNewVariableComponent;