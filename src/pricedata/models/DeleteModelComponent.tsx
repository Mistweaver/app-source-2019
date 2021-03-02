import React from 'react';
import { Model } from '../../objects/models/Model';
import { deleteModel } from './ModelServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { checkIfDev } from '../../auth/AccessControlFunctions';

interface DeleteModelComponentProps {
	model: Model;
	reload: () => void;
}

interface DeleteModelComponentState {
	// component state variables
	render: boolean;
	deleting: boolean;
	error: boolean;
	errorMessage: string;
}

class DeleteModelComponent extends React.Component<DeleteModelComponentProps, DeleteModelComponentState> {
	constructor(props: DeleteModelComponentProps) {
		super(props);
		this.state = {
			render: false,
			deleting: false,
			error: false,
			errorMessage: "",
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.delete = this.delete.bind(this);

	}

	private showModal() {
		this.setState({ render: true });
	}

	private closeModal() {
		this.setState({ render: false });
	}



	

	private delete() {
		this.setState({ deleting: true });
		deleteModel(this.props.model.id).then(res => {
			this.setState({ deleting: false });
			if(validateHTMLResponse(res)) {
				this.props.reload();
			} else {
				this.setState({
					error: true,
					errorMessage: res.status
				})
			}
		});
	}

	public render() {
		if(this.props.model.id === "" || !checkIfDev()) {
			return null;
		} else {
			return(
				<div style={{marginTop: 'auto', marginBottom: 'auto'}}>
					<Tooltip title="Delete Model">
						<div className="buttonMinimal" onClick={this.showModal} >
							<Delete style={{color: 'red'}} />
						</div>						
					</Tooltip>
					<Dialog
						open={this.state.render}
						onClose={this.closeModal}
						maxWidth="sm"            
						fullWidth={true}
					>
						<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
							Delete {"Model Number " + this.props.model.modelNumber}
						</DialogTitle>
						<DialogContent>
						{
							this.state.deleting ?
							<div style={{padding: 10}}>
								<LinearProgress />
								<p>Deleting...</p>
							</div>
							:
							<>
								<div>
									<div><span style={{color: 'red'}}>Are you sure?</span> I'm afraid I can't undo this Dave...</div>
									{ this.state.error && <p><span style={{color: 'red'}}>Error: </span>{this.state.errorMessage}</p> }
								</div>
								<DialogActions>
									<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
										<Button variant="contained" color="secondary" onClick={this.delete}>Delete</Button> 
										<Button variant="outlined" color="primary" onClick={this.closeModal}>Cancel</Button>
									</div>
								</DialogActions>
							</>
						}
						</DialogContent>
						
					</Dialog>
				</div>
				
			)
		}
	}
}
export default DeleteModelComponent;