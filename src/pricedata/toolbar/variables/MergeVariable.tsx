import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Tooltip } from '@material-ui/core';
import { MergeType } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { SuccessBox } from '../../../components/responseboxes/SuccessBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { Variable } from '../../variables/objects/Variable';
import { getAllVariables } from '../../variables/VariableServices';

interface Props {
	variable: Variable;
	variableList: Variable[];
	reload: () => void;
}

interface State {
	merging: boolean;
	mergeSuccessful: boolean;

	variableIdToMergeWith: string;

	buttonClicked: boolean;

	error: boolean;
	errorMessage: string;
	renderModal: boolean;

}

const initialState = {
	merging: false,
	mergeSuccessful: false,
	buttonClicked: false,

	variableIdToMergeWith: "",
	error: false,
	errorMessage: "",
	renderModal: false,
}

class MergeVariableComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.selectVariable = this.selectVariable.bind(this);
		this.merge = this.merge.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		if(!this.state.merging) {
			this.setState(initialState);
		}
	}

	private selectVariable(event: { target: { value: string }; }) {
		this.setState({ variableIdToMergeWith: event.target.value });
	}

	
	private merge() {
		this.setState({ merging: true });
		/*deleteVariable(this.props.variable.id).then(res => {
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
		});*/
	}

	// 

	public render() {
		const { renderModal, error, errorMessage, mergeSuccessful, merging, variableIdToMergeWith } = this.state;
		return(
			<div>
				<Tooltip title="Merge Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<MergeType style={{color: 'green'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Merge <span style={{color: '#e35146'}}>{this.props.variable.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							mergeSuccessful ?
								<div>
									<SuccessBox />
									<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
										<Button onClick={this.closeModal}>Close</Button>
									</div>
								</div>
							:
							<div>
								{
									merging ?
									<SaveBox />
									:
									<div>
										<div>Select the variable you wish to merge with:</div>
										<select value={variableIdToMergeWith} onChange={this.selectVariable}>
											{
												this.props.variableList.map(variable => (
													<option key={variable.id} value={variable.id}>{variable.key + " : " + variable.name}</option>
												))
											}
										</select>
										<button className="buttonCritical" onClick={this.merge}>Merge Variables</button>
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
							!merging &&
							<CriticalButton onClick={this.closeModal}>Close</CriticalButton>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default MergeVariableComponent;