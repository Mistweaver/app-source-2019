import { LinearProgress } from '@material-ui/core';
import React from 'react';
import StandardButton from '../../../components/buttons/StandardButton';
import { Equation } from '../../equations/objects/Equation';

interface EditEquationComponentProps {
	variable: Equation;
	reloadEquations: () => void;
}
interface EditEquationComponentState {
	editMode: boolean;
	savingEdits: boolean;
	newEquationName: string;
	newEquationKey: string;
	newEquationNotes: string;

	keyValid: boolean;
	error: boolean;
	errorMessage: string;

}

class EditEquationComponent extends React.Component<EditEquationComponentProps, EditEquationComponentState> {
	constructor(props: EditEquationComponentProps) {
		super(props);
		this.state = {
			editMode: false,
			savingEdits: false,
			newEquationKey: "",
			newEquationName: "",
			newEquationNotes: "",

			keyValid: true,
			error: false,
			errorMessage: ""
		}

		this.enterEditMode = this.enterEditMode.bind(this);
		this.exitEditMode = this.exitEditMode.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.handleEquationChange = this.handleEquationChange.bind(this);
		this.changeEquationKey = this.changeEquationKey.bind(this);
	}

	private enterEditMode() { 
		const { variable } = this.props;
		this.setState({ editMode: true, newEquationKey: variable.key, newEquationName: variable.name, newEquationNotes: variable.notes });
	}

	private exitEditMode() { this.setState({ editMode: false }); }

	private saveEdits() {
		this.setState({ savingEdits: true });
		let editedEquation = Object.assign({}, this.props.variable, {
			key: this.state.newEquationKey,
			name: this.state.newEquationName,
			notes: this.state.newEquationNotes
		});

		/*updateEquation(editedEquation).then(res => {
			this.setState({ savingEdits: false });
			if(validateHTMLResponse(res)) {
				this.props.reloadEquations();
				this.setState({ editMode: false });
			} else {
				this.setState({
					error: true,
					errorMessage: "Error: " + res.status
				});
			}
		});*/
	}

	private handleEquationChange(event: { target: { value: string, name: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value });
	}

	private changeEquationKey(event: { target: { value: string, name: string }}) {
		if(this.validateKeyString(event.target.value)) {
			this.setState({ newEquationKey: event.target.value, keyValid: true });
		} else {
			this.setState({ newEquationKey: event.target.value, keyValid: false });
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
		const { newEquationNotes, newEquationKey, newEquationName, editMode, savingEdits, keyValid } = this.state;
		if(editMode) {
			return(
				<div style={{backgroundColor: "rgb(231, 231, 231)", display: 'flex', flexDirection: 'column'}}>
					<div style={{color: 'rgb(186, 210, 215)', backgroundColor: 'rgb(60, 73, 83)', padding: 10, fontSize: '11pt'}}>{"Edit " + this.props.variable.name}</div>
					<div style={{padding: 5, display: 'flex', flexDirection: 'column'}}>
					{
						savingEdits ?
						<>
							<span style={{marginBottom: 5}}>Saving Edits</span>
							<LinearProgress />
						</>
						:
						<>
							<label>Name</label>
							<input value={newEquationName} name="newEquationName" onChange={this.handleEquationChange} />
							<label>Key</label>
							<input value={newEquationKey} name="newEquationKey" onChange={this.changeEquationKey} />
							{
								!keyValid &&
								<p>Warning: key must begin with '[', end with ']', and only contain alphabetical characters</p>
							}
							<label>Notes</label>
							<input value={newEquationNotes} name="newEquationNotes" onChange={this.handleEquationChange} />
							<p>Warning: changing the name and/or key will change the name/key for all data!</p>
							<div style={{padding: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
								<button className="buttonMinimal" onClick={this.saveEdits}>Save Edits</button>
								<button className="buttonMinimal" onClick={this.exitEditMode}>Cancel</button>								
							</div>
						</>
					}
					</div>
				</div>
			)
		} else {
			return 	<StandardButton onClick={this.enterEditMode}>Edit Equation</StandardButton>
		}
		
	}
}

export default EditEquationComponent;