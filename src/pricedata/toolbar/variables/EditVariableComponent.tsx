import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { Variable } from '../../variables/objects/Variable';
import { updateVariable } from '../../variables/VariableServices';

interface EditVariableComponentProps {
	variable: Variable;
	reloadVariables: () => void;
}
interface EditVariableComponentState {
	savingEdits: boolean;
	newVariableName: string;
	newVariableKey: string;
	newVariableNotes: string;

	keyValid: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

}

const initialState = {
	savingEdits: false,
	newVariableKey: "",
	newVariableName: "",
	newVariableNotes: "",

	keyValid: true,
	error: false,
	errorMessage: "",
	renderModal: false
}

class EditVariableComponent extends React.Component<EditVariableComponentProps, EditVariableComponentState> {
	constructor(props: EditVariableComponentProps) {
		super(props);
		this.state = initialState;

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.handleVariableChange = this.handleVariableChange.bind(this);
		this.changeVariableKey = this.changeVariableKey.bind(this);
	}

	private showModal() {
		const { variable } = this.props;
		this.setState({ 
			renderModal: true,
			newVariableKey: variable.key,
			newVariableName: variable.name,
			newVariableNotes: variable.notes
		});
	}

	private closeModal() {
		if(!this.state.savingEdits) {
			this.setState(initialState);
		}
	}

	private saveEdits() {
		this.setState({ savingEdits: true });
		let editedVariable = Object.assign({}, this.props.variable, {
			key: this.state.newVariableKey,
			name: this.state.newVariableName,
			notes: this.state.newVariableNotes
		});

		updateVariable(editedVariable).then(res => {
			this.setState({ savingEdits: false });
			if(validateHTMLResponse(res)) {
				this.props.reloadVariables();
				this.closeModal();
			} else {
				this.setState({
					error: true,
					errorMessage: "Error: " + res.status
				});
			}
		});
	}

	private handleVariableChange(event: { target: { value: string, name: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value });
	}

	private changeVariableKey(event: { target: { value: string, name: string }}) {
		if(this.validateKeyString(event.target.value)) {
			this.setState({ newVariableKey: event.target.value, keyValid: true });
		} else {
			this.setState({ newVariableKey: event.target.value, keyValid: false });
		}
	}

	private validateKeyString(_key: string) {
		if(_key[0] !== '[') {
			return false;
		} else if(_key[_key.length - 1] !== ']') {
			return false;
		}
		if(_key.length === 0) {
			return false;
		}
		let strippedKey = _key.replace("[", "");
		strippedKey = strippedKey.replace("]", "");
		if(strippedKey.match(/[^a-zA-Z]/)) {
			console.log("match");
			return false;	
		} else {
			return true;
		}
	}


	public render() {
		const { newVariableNotes, newVariableKey, newVariableName, renderModal, savingEdits, keyValid, error, errorMessage } = this.state;
		return(
			<div>
				<Tooltip title="Edit Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Edit style={{color: 'orange'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Edit <span style={{color: '#e35146'}}>{this.props.variable.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							savingEdits ?
							<SaveBox />
							:
							<div>
								<div>Name</div>
								<input value={newVariableName} name="newVariableName" onChange={this.handleVariableChange} />
								<div>Key</div>
								<input value={newVariableKey} name="newVariableKey" onChange={this.changeVariableKey} />
								{
									!keyValid &&
									<div>Warning: key must begin with '[', end with ']', and only contain alphabetical characters</div>
								}
								<div>Notes</div>
								<input value={newVariableNotes} name="newVariableNotes" onChange={this.handleVariableChange} />
								<div>Warning: changing the name and/or key will change the name/key for all data!</div>
								<div style={{padding: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
									<button className="buttonMinimal" onClick={this.saveEdits}>Save Edits</button>
								</div>
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
							!savingEdits && 
							<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
						}
					</DialogActions>
				</Dialog>
			</div>


			
		)
		
		
	}
}

export default EditVariableComponent;