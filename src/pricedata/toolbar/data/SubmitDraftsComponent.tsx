import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { MobileFriendly } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { pushToPending } from '../../data/PriceDataServices';
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

class SubmitDraftsComponent extends React.Component<Props, State> {
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
		this.submitDrafts = this.submitDrafts.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private validateDrafts() {
		const { selectedPriceData } = this.props;
		var draftsValid = true;
		var invalidDrafts: PriceData[] = [];
		selectedPriceData.forEach(data => {
			if(data.error || data.dataUpdated) {
				draftsValid = false;
				invalidDrafts.push(data);
			}
		});

		// this.setState({ draftsValid: draftsValid, invalidDrafts: invalidDrafts });
		return draftsValid;
	}

	private submitDrafts() {
		/*if(this.validateDrafts()) {
			console.log("Drafts valid");
		} else {
			console.log("Data invalid");
		}*/
		pushToPending(new DataIdListPackage(this.props.selectedPriceData)).then(res => {
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
		const { renderModal, loading, error, errorMessage } = this.state;
		

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Submit Drafts">
					<div className="buttonMinimal" onClick={this.showModal} >
						<MobileFriendly style={{color: 'green'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Submit {this.props.selectedPriceData.length} Drafts
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<div style={{padding: 15}}>
								<SaveBox />
								<div>Note: this may take a minute...</div>
							</div>
							:
							<Button variant="contained" onClick={this.submitDrafts}>Submit</Button>
						}
						
						{/*
							!draftsValid &&
							<div>
								<div><span style={{color: 'red'}}>Cannot submit!</span> The following drafts selected are either modified or contain errors:</div>
							</div>
						*/}
						{
							error &&
							<div>
								<div>There appears to have been an error</div>
								<div>{errorMessage}</div>
							</div>
						}

					</DialogContent>
					<DialogActions>
						{
							!loading &&
							<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
						}
					</DialogActions>
					
				</Dialog>
			</div>
		)
	}
}

export default SubmitDraftsComponent;