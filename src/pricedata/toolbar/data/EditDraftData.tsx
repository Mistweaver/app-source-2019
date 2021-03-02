import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { UpdatePackage } from '../../restpackages/UpdatePackage';
import { updatePriceDataInfo } from '../../data/PriceDataServices';

interface Props {
	data: PriceData;
	reload: () => void;
}

interface State {
	// editable fields
	name: string;
	seriesName: string;
	activeDate: string;
	expirationDate: string


	loading: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;
}

class EditDraftDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: "",
			seriesName: "",
			activeDate: "",
			expirationDate: "",

			loading: false,
			error: false,
			errorMessage: "",
			renderModal: false,
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.editData = this.editData.bind(this);
	}

	private showModal() {
		const { data } = this.props;
		this.setState({ 
			renderModal: true,
			name: data.name,
			seriesName: data.seriesName,
			activeDate: data.activeDate,
			expirationDate: data.expirationDate,
		});
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private saveEdits() {
		const { data } = this.props;
		const { name, seriesName, activeDate, expirationDate } = this.state;
		this.setState({ loading: true });
		// build update package
		let updatePackage = new UpdatePackage(
			data.id, name, seriesName, activeDate, expirationDate
		);

		updatePriceDataInfo(updatePackage).then(res => {
			this.setState({ loading: false });
			// this.setStateFromData(res.data);
			if(validateHTMLResponse(res)) {
				this.closeModal();
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		}).catch(error => {
			this.setState({ error: true });
		})
	}

	private editData(event: { target: { name: string, value: string }}) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({ [name]: value, edited: true });
	}


	public render() {
		const { renderModal,name, seriesName, activeDate, expirationDate, loading } = this.state;

		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Edit Data">
					<div className="buttonMinimal" onClick={this.showModal} >
						<Edit style={{color: 'orange'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Edit Price Data Info
					</DialogTitle>
					<DialogContent>
						{
							loading ?
							<>
								<div>Saving...</div>
								<div>{name}</div>
								<div>{seriesName}</div>
								<div>{activeDate}</div>
								<div>{expirationDate}</div>
								<LinearProgress />
							</>
							:
							<>
								<div>Name</div>
								<input name="name" value={name} onChange={this.editData} />
								<div>Series Name</div>
								<input name="seriesName" value={seriesName} onChange={this.editData} />
								<div>Active Date</div>
								<input name="activeDate" value={activeDate} onChange={this.editData} />
								<div>Expiration Date</div>
								<input name="expirationDate" value={expirationDate} onChange={this.editData} />	
							</>
						}
					</DialogContent>
					<DialogActions>
						<StandardButton onClick={this.saveEdits}>Save Edits</StandardButton>
						<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default EditDraftDataComponent;