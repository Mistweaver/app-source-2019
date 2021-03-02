import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { recalculatePricing } from '../../data/PriceDataServices';
import { DataIdListPackage } from '../../restpackages/DataIdListPackage';

interface Props {
	selectedPriceData: PriceData[];
	reload: () => void;
}

interface State {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	responseData: PriceData[];

}

class RecalculateDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			errorMessage: "",
			renderModal: false,
			responseData: []
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.calculate = this.calculate.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private calculate() {
		this.setState({ loading: true, error: false, errorMessage: "" });

		recalculatePricing(new DataIdListPackage(this.props.selectedPriceData)).then(res => {
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.closeModal();
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		});
	}

	public render() {
		const { renderModal, loading } = this.state;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Calculate Pricing">
					<div className="buttonMinimal" onClick={this.showModal} >
						<span className="material-icons" style={{color: 'purple'}}>
							calculate
						</span>
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					// onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Calculate Pricing For {this.props.selectedPriceData.length} Drafts
					</DialogTitle>
					<DialogContent>
						<div style={{display: 'flex'}}>
							<div style={{margin: 'auto', textAlign: 'center'}}>
							{
								loading ?
								<div style={{padding: 15}}>
									<SaveBox />
									<div>Note: this may take a minute...</div>
								</div>
								:
								<Button variant="contained" onClick={this.calculate}>Recalculate Prices</Button>

							}
							</div>
						</div>
						
					</DialogContent>
					<DialogActions>
						{
							!loading &&
							<CriticalButton onClick={this.closeModal}>Close</CriticalButton>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default RecalculateDataComponent;