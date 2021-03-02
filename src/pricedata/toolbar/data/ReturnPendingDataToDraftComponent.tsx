import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Undo } from '@material-ui/icons';
import React from 'react';
import { PATH } from '../../../ApplicationConfiguration';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import axiosInterceptor from '../../../utilities/AxiosInterceptor';
import { PriceData } from '../../objects/PriceData';
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
	failures: PriceData[];
}

class ReturnPendingDataToDraftComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			errorMessage: "",
			renderModal: false,
			failures: []
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.returnPendingDataToDraft = this.returnPendingDataToDraft.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private returnPendingDataToDraft() {
		this.setState({ loading: true });

		axiosInterceptor.post(`${PATH}/pricedata/pending/cancel`, new DataIdListPackage(this.props.selectedPriceData)).then(res =>{
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.props.reload();
				if(res.data.length > 0) {
					this.setState({ error: true, errorMessage: "Failed to delete the following draft ids:", failures: res.data});
				} else {
					this.closeModal();
				}
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		}).catch(error => {
			this.setState({ error: true, errorMessage: error, loading: false });
		});
	}

	public render() {
		const { renderModal, loading, error, errorMessage, failures } = this.state;
		var selectedDataSize = this.props.selectedPriceData.length;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Return To Draft">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Undo style={{color: 'red'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="xs"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Return Pending Data to Draft
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<SaveBox />
							:
							<div>
								<div>Are you sure you wish to return these {selectedDataSize} updates to draft?</div>
								<StandardButton onClick={this.returnPendingDataToDraft}>Return to Draft</StandardButton>
							</div>
						}
						{
							error &&
							<div>
								<div>There appears to have been an error</div>
								<div>{errorMessage.toString()}</div>
							</div>
						}
						{
							failures.map(failCase => (
								<div>{failCase.id + " : " + failCase.name + " " + failCase.model.modelNumber + " " + failCase.seriesName}</div>
							))
						}
					</DialogContent>
					<DialogActions>
						{
							!loading &&
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
								<CriticalButton onClick={this.closeModal}>Close</CriticalButton>
							</div>
						}
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default ReturnPendingDataToDraftComponent;