import { Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import LocationDropdown from '../../../redux/containers/locationdropdown/LocationDropdown';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { createDraftsFromData } from '../../data/PriceDataServices';
import { DraftPackage } from '../../data/DraftPackage';

interface CreateDraftsComponentProps {
	selectedData: PriceData[];
	reload: () => void;
}

interface CreateDraftsComponentState {
	draftDate: string;
	dateValid: boolean;
	locationsToAdd: SalesOffice[];
	creatingDrafts: boolean;

	addMultipleLocations: boolean;

	error: boolean;
	errorMessage: string;
	renderModal: boolean;
}

const initialState = {
	draftDate: "",
	dateValid: false,

	addMultipleLocations: false,

	locationsToAdd: [],
	creatingDrafts: false,

	error: false,
	errorMessage: "",
	renderModal: false,
}

class CreateDraftsComponent extends React.Component<CreateDraftsComponentProps, CreateDraftsComponentState> {
	constructor(props: CreateDraftsComponentProps) {
		super(props);
		this.state = initialState;

		this.handleInput = this.handleInput.bind(this);
		this.addLocation = this.addLocation.bind(this);
		this.removeLocation = this.removeLocation.bind(this);
		this.createDrafts = this.createDrafts.bind(this);
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addDraftToMultipleLocations = this.addDraftToMultipleLocations.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState(initialState);
	}


	private handleInput(event: { target: { name: string, value: string }; } ) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value, edited: true, dateValid: true });
	}

	private addDraftToMultipleLocations() {
		if(this.state.addMultipleLocations) {
			this.setState({ addMultipleLocations: false, locationsToAdd: [] });
		} else {
			this.setState({ addMultipleLocations: true });
		}
	}

	private addLocation(office: SalesOffice) {
		let newArray = this.state.locationsToAdd.slice();
		newArray.splice(0, 0, office);
		this.setState({ locationsToAdd: newArray });
	}

	private removeLocation(index: number) {
		let newArray = this.state.locationsToAdd.slice();
		newArray.splice(index, 1);
		this.setState({ locationsToAdd: newArray });
	}


	private createDrafts() {
		const { selectedData } = this.props;
		const { draftDate } = this.state;
		this.setState({ creatingDrafts: true });
		// validate date
		if(this.state.draftDate.trim() === "") {
			this.setState({ error: true, errorMessage: "Please enter a draft date"});
		} else {
			// validate location
			
			// create a string list of all the data ids
			let dataIdList: string[] = [];
			selectedData.forEach(data => {
				dataIdList.push(data.id);
			});

			let locationIds: string[] = [];
			this.state.locationsToAdd.forEach(location => {
				locationIds.push(location.id);
			});

			let draftPackage = new DraftPackage();
			draftPackage.draftDate = draftDate;
			draftPackage.locationIds = locationIds;
			draftPackage.priceDataIds = dataIdList;
			createDraftsFromData(draftPackage).then(res => {
				this.setState({ creatingDrafts: false });
				if(validateHTMLResponse(res)) {
					this.props.reload();
					this.closeModal();
				}
			});

		}
		
	}

	public render() {
		const { selectedData } = this.props;
		const { draftDate, locationsToAdd, creatingDrafts, addMultipleLocations, renderModal, error, errorMessage } = this.state;
		var selectedDataSize = selectedData.length;

		if(selectedDataSize === 0) {
			return null;
		} else {
			return(
				<div style={{margin: 'auto'}}>
					<Tooltip title="Create Drafts">
						<div className="buttonMinimal" onClick={this.showModal} >
							<Add style={{color: 'green'}} />
						</div>						
					</Tooltip>
					<Dialog
						open={renderModal}
						onClose={this.closeModal}
						maxWidth="sm"            
						fullWidth={true}
					>
						<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
							Create Drafts
						</DialogTitle>
						<DialogContent>
							<div>Enter draft date</div>
							<input name="draftDate" placeholder="mm/dd/yyyy" value={draftDate} onChange={this.handleInput} style={{padding: 5}} />
							<div style={{fontSize: '9pt', marginBottom: 10}}>Note: if a draft already exists for the given date, a new draft will not be created.</div>
							
							<div style={{display: 'flex'}}>
								<Checkbox
									checked={addMultipleLocations}
									onChange={this.addDraftToMultipleLocations}
									color="primary"
								/>
								<div style={{marginTop: 'auto', marginBottom: 'auto'}}>Create drafts for selected data at multiple locations?</div>
							</div>
									
							{
								addMultipleLocations &&
								<>
									<div style={{padding: 5}}>Select locations to create drafts</div>
									<LocationDropdown currentSelection={""} allLocationsOption={false} selectLocation={this.addLocation} />
									<div style={{padding: 5, marginTop: 10, borderBottom: '1px solid grey'}}>Selected Locations: </div>
									<div style={{padding: 5, marginBottom: 10}}>
										{
											locationsToAdd.map((location, index) => (
												<Chip
													key={location.id + index}
													label={location.officeName}
													variant="outlined"
													onDelete={() => this.removeLocation(index)}
													color="primary"
													style={{margin: 2}}
												/>
											))
										}
									</div>
								</>
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
								creatingDrafts ?
								<LinearProgress />
								:
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
									<StandardButton onClick={this.createDrafts}>Create {selectedData.length} Drafts</StandardButton>
									<CriticalButton onClick={this.closeModal}>Close</CriticalButton>
								</div>
							}
						</DialogActions>
					</Dialog>
				</div>
			)
		}
	}
}

export default CreateDraftsComponent;