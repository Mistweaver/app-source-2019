import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { PATH } from '../../../ApplicationConfiguration';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import axiosInterceptor from '../../../utilities/AxiosInterceptor';
import { PriceData } from '../../objects/PriceData';
import { DraftPackage } from '../../data/DraftPackage';

interface Props {
	selectedPriceData: PriceData[];
	reloadData: () => void;
}

interface State {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	failedDeletions: PriceData[];
}

class DeleteDraftComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			errorMessage: "",
			renderModal: false,

			failedDeletions: []
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.deleteDrafts = this.deleteDrafts.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private deleteDrafts() {
		this.setState({ loading: true });
		// create a string list of all the data ids
		let dataIdList: string[] = [];
		this.props.selectedPriceData.forEach(data => {
			dataIdList.push(data.id);
		});

		let deletionPackage = new DraftPackage();
		deletionPackage.priceDataIds = dataIdList;
		// console.log("Deletion Package");
		// console.log(deletionPackage);
		// console.log(deletionPackage.priceDataIds.length);

		axiosInterceptor.post(`${PATH}/pricedata/drafts/delete`, deletionPackage).then(res =>{
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.props.reloadData();
				if(res.data.length > 0) {
					this.setState({ error: true, errorMessage: "Failed to delete the following draft ids:", failedDeletions: res.data});
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
		const { renderModal, loading, error, errorMessage, failedDeletions } = this.state;
		var selectedDataSize = this.props.selectedPriceData.length;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Delete Drafts">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Delete style={{color: 'red'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="xs"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Delete Selected Drafts
					</DialogTitle>
					<DialogContent>
						{
							selectedDataSize > 0 ?
							<div>Are you sure you wish to delete these {selectedDataSize} drafts?</div>
							:
							<div><span style={{color: 'red'}}>Error!</span> You haven't selected any drafts!</div>
						}
						{
							error &&
							<div>
								<div>There appears to have been an error</div>
								<div>{errorMessage.toString()}</div>
							</div>
						}
						{
							failedDeletions.map(failCase => (
								<div>{failCase.id + " : " + failCase.name + " " + failCase.model.modelNumber + " " + failCase.seriesName}</div>
							))
						}
					</DialogContent>
					{
						loading ?
						<div style={{padding: 15}}>
							<LinearProgress />
						</div>
						:
						<DialogActions>
							<div style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
							{
								selectedDataSize > 0 &&
								<StandardButton onClick={this.deleteDrafts}>Delete</StandardButton>
							}
								<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
							</div>
						</DialogActions>
					}
					
				</Dialog>
			</div>
		)
	}
}

export default DeleteDraftComponent;