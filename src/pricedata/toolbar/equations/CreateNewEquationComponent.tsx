import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { FiberNew } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { SuccessBox } from '../../../components/responseboxes/SuccessBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { createNewEquation } from '../../equations/EquationServices';
import { Equation } from '../../equations/objects/Equation';
import { FormatNameAsKey } from '../../data/functions/FormatNameAsKey';

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

class CreateNewEquationComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.editName = this.editName.bind(this);
		this.editNotes = this.editNotes.bind(this);

		this.createEquation = this.createEquation.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		if(!this.state.saving) {
			this.setState(initialState);
		}
	}

	private editName(event: { target: { value: string }}) {
		this.setState({ name: event.target.value, key: FormatNameAsKey(event.target.value) });
	}

	private editNotes(event: { target: { value: string }}) {
		this.setState({ notes: event.target.value });
	}

	private createEquation() {
		this.setState({ saving: true });
		let newEquation = new Equation();
		newEquation.name = this.state.name;
		newEquation.key = this.state.key;
		newEquation.notes = this.state.notes;

		createNewEquation(newEquation).then(res => {
			this.setState({ saving: false });
			if(validateHTMLResponse(res)) {
				this.props.reload();
				this.setState({ creationSuccessful: true });
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
				<Tooltip title="Create Equation">
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
						Create New Equation
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
										<div>Equation Name</div>
										<input name="name" value={this.state.name} onChange={this.editName} style={{marginBottom: 10}} />
										<div>Equation Key</div>
										<div style={{marginBottom: 10}}>
											<span style={{fontWeight: 600}}>[</span>
											<span style={{fontWeight: 525, color: '#e35146'}}>{this.state.key}</span>
											<span style={{fontWeight: 600}}>]</span>
											
										</div>
										<div>Notes</div>
										<textarea name="notes" value={this.state.notes} onChange={this.editNotes} />
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
								<StandardButton onClick={this.createEquation}>Create Equation</StandardButton>
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default CreateNewEquationComponent;