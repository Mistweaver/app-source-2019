import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { removeVariableFromData } from '../../data/PriceDataServices';
import { VariableData } from '../../variables/objects/VariableData';
import { VariableDataUpdatePackage } from '../../variables/objects/VariableDataUpdatePackage';
import { SaveBox } from '../../../components/responseboxes/SaveBox';

interface Props {
	selectedPriceData: PriceData[];
	selectedVariable: VariableData;
	reload: () => void;

}

interface State {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	responseData: PriceData[];
}

const initialState = {
	loading: false,
	error: false,
	errorMessage: "",
	renderModal: false,

	responseData: [],
}

class RemoveVariableDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.removeVariable = this.removeVariable.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState(initialState);
	}



	private removeVariable() {
		this.setState({ loading: true });
		let updatePackage = new VariableDataUpdatePackage(this.props.selectedPriceData, this.props.selectedVariable);

		removeVariableFromData(updatePackage).then(response => {
			this.setState({ loading: false });
			if(validateHTMLResponse(response)) {
				this.setState({ responseData: response.data });
				this.props.reload();
				this.closeModal();
			} else {
				this.setState({ error: true, errorMessage: response.data });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});
	}

	public render() {
		const { renderModal, error, errorMessage, loading } = this.state;
		var selectedDataSize = this.props.selectedPriceData.length;

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Remove Variable">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Remove style={{color: 'red'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Remove Variable <span style={{color: '#e35146'}}>{this.props.selectedVariable.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<SaveBox />
							:
							
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
								<div>Remove this variable from {selectedDataSize} data?</div>
								<div>{this.props.selectedVariable.name}</div>
								<div>{this.props.selectedVariable.key}</div>
								<StandardButton onClick={this.removeVariable}>Remove</StandardButton>
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
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default RemoveVariableDataComponent;