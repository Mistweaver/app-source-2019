import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { SuccessBox } from '../../../components/responseboxes/SuccessBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { Variable } from '../../variables/objects/Variable';
import { deleteVariable } from '../../variables/VariableServices';

interface DeleteVariableComponentProps {
	variable: Variable;
	reload: () => void;
}

interface DeleteVariableComponentState {
	deleting: boolean;
	deletionSuccessful: boolean;

	buttonClicked: boolean;
	idMatchString: string;

	error: boolean;
	errorMessage: string;
	renderModal: boolean;

}

const initialState = {
	deleting: false,
	deletionSuccessful: false,
	buttonClicked: false,
	idMatchString: "",

	error: false,
	errorMessage: "",
	renderModal: false
}

class DeleteVariableComponent extends React.Component<DeleteVariableComponentProps, DeleteVariableComponentState> {
	constructor(props: DeleteVariableComponentProps) {
		super(props);
		this.state = initialState;
		
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.delete = this.delete.bind(this);
		this.changeObjectMatchString = this.changeObjectMatchString.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		if(!this.state.deleting) {
			this.setState(initialState);
		}
	}

	private changeObjectMatchString(event: { target: { value: string }; }) {
		this.setState({ idMatchString: event.target.value });
	}

	
	private delete() {
		this.setState({ deleting: true });
		deleteVariable(this.props.variable.id).then(res => {
			this.setState({ deleting: true });
			if(validateHTMLResponse(res)) {
				this.props.reload();
				this.setState({ deletionSuccessful: true });
			} else {
				this.setState({
					error: true,
					errorMessage: "Error: " + res.status
				});
			}
		});
	}

	// 

	public render() {
		const { deleting, idMatchString, renderModal, error, errorMessage, deletionSuccessful } = this.state;
		return(
			<div>
				<Tooltip title="Delete Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Delete style={{color: 'red'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Delete <span style={{color: '#e35146'}}>{this.props.variable.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							deletionSuccessful ?
								<div>
									<SuccessBox />
									<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
										<Button onClick={this.closeModal}>Close</Button>
									</div>
								</div>
							:
							<div>
								{
									deleting ?
									<SaveBox />
									:
									<div>
										<div><span style={{color: 'red'}}>WARNING!:</span> this action will not only delete this variable, but remove it from all existing price data. THIS CANNOT BE UNDONE!</div>
										<div>Enter the variable ID to confirm you wish to delete</div>
										<div style={{fontWeight: 500}}>{this.props.variable.id}</div>
										<input value={idMatchString} onChange={this.changeObjectMatchString} />
										{
											this.state.idMatchString === this.props.variable.id &&
											<div style={{color: 'red'}}>ID's do not match!</div>
										}
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
							!deleting && !deletionSuccessful&&
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
								{
									this.state.idMatchString === this.props.variable.id &&
									<button className="buttonCritical" onClick={this.delete}>Delete Forever</button>
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

export default DeleteVariableComponent;