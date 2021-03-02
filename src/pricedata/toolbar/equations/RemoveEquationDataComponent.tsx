import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { EquationData } from '../../equations/objects/EquationData';
import { EquationDataUpdatePackage } from '../../equations/objects/EquationDataUpdatePackage';
import { PriceData } from '../../objects/PriceData';
import { removeEquationFromData } from '../../data/PriceDataServices';

interface Props {
	selectedPriceData: PriceData[];
	selectedEquation: EquationData;
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

class RemoveEquationDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.removeEquation = this.removeEquation.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState(initialState);
	}



	private removeEquation() {
		this.setState({ loading: true });
		let updatePackage = new EquationDataUpdatePackage(this.props.selectedPriceData, this.props.selectedEquation);
		removeEquationFromData(updatePackage).then(response => {
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

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Remove Equation">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Remove style={{color: 'red'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Remove Equation <span style={{color: '#e35146'}}>{this.props.selectedEquation.name}</span>
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<SaveBox />
							:
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
								<div>Remove this equation from {this.props.selectedPriceData.length} data?</div>
								<div><span style={{color: '#e35146'}}>{this.props.selectedEquation.name}</span></div>
								<div>{this.props.selectedEquation.key}</div>
								<StandardButton onClick={this.removeEquation}>Remove</StandardButton>
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

export default RemoveEquationDataComponent;