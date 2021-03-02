import { Button, LinearProgress } from '@material-ui/core';
import { Check, Clear, Save } from '@material-ui/icons';
import React from 'react';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import LocationDropdown from '../../../redux/containers/locationdropdown/LocationDropdown';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { LocationPriceData } from '../../objects/LocationPriceData';
import { SeriesData } from '../../objects/SeriesData';
import { getPriceDataForLocation } from '../../data/PriceDataServices';
import { createNewDataForModel } from '../ModelServices';
import { PriceDataWithOfficePackage } from '../objects/PriceDataWithOfficePackage';
import { NewDataForModelPackage } from './NewDataForModelPackage';

interface Props {
	modelId: string;
	basePrice: number;
	draftDate: string;
	selectedExistingData: PriceDataWithOfficePackage;
	
	delete: () => void;
	reload: () => void;
}

interface State {
	office: SalesOffice;
	seriesName: string;
	allSeriesData: SeriesData[];

	name: string;
	templateId: string;

	saving: boolean;
	added: boolean;
	error: boolean;
	errorMessage: string;
}

/***
 * functions
 * 
 * newDraftLocationPackage
 * 
 * select the location
 * select the series
 * enter the date for the draft
 * enter name of the model
 * 
 * - use existing data
 * 	- select data
 * - new data
 * 	- enter base price
 * 	- use vars/eqns
 * 	- select existing data from series to use
 */

class NewDataPackageComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			office: new SalesOffice(),
			seriesName: "",
			allSeriesData: [],

			name: "",
			templateId: "",
			added: false,
			saving: false,
			error: false,
			errorMessage: ""
			
		}
		this.selectLocation = this.selectLocation.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.createData = this.createData.bind(this);
	}

	private selectLocation(_office: SalesOffice) {
		this.setState({ office: _office });
		// get location data
		
		getPriceDataForLocation(_office.id).then(res => {
			if(validateHTMLResponse(res)) {
				let responseData: LocationPriceData = res.data;
				let _allSeriesData: SeriesData[] = [];
				responseData.activeData.forEach(data => {
					_allSeriesData.push(data);
				});
				responseData.pendingData.forEach(data => {
					_allSeriesData.push(data);
				});
				responseData.drafts.forEach(data => {
					_allSeriesData.push(data);
				});

				this.setState({ allSeriesData: _allSeriesData });
			} 
		})
	}

	private inputChange(event: { target: { name: string, value: string }; }) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value, error: false, errorMessage: "" });
	}

	private createData() {
		this.setState({ saving: true });
		let error = false;
		// check that name is not empty
		if(this.state.name.trim() === "") {
			error = true;
			this.setState({ error: true, errorMessage: "Name cannot be empty"});
		}

		// check that price is not 0
		if(this.props.basePrice === 0) {
			error = true;
			this.setState({ error: true, errorMessage: "Base price cannot be 0"});
		}

		// check that series name is not empty
		if(this.state.seriesName.trim() === "") {
			error = true;
			this.setState({ error: true, errorMessage: "Series name cannot be empty"});
		}
		// check that location id is not empty
		if(this.state.office.id.trim() === "") {
			error = true;
			this.setState({ error: true, errorMessage: "You must select a location"});
		}

		// check that location id is not empty
		if(this.props.draftDate.trim() === "") {
			error = true;
			this.setState({ error: true, errorMessage: "Draft date cannot be empty"});
		}

		if(error) {
			this.setState({ saving: false });
		}

		/****
		 * If Selected Existing Data is present
		 */

		let newDataForModelPackage = new NewDataForModelPackage(this.props.modelId);
		newDataForModelPackage.locationId = this.state.office.id;
		newDataForModelPackage.name = this.state.name;
		newDataForModelPackage.draftDate = this.props.draftDate;
		newDataForModelPackage.templateId = this.state.templateId;

		if(this.props.selectedExistingData.data.id === "") {
			newDataForModelPackage.seriesName = this.state.seriesName;
			newDataForModelPackage.basePrice = this.props.basePrice;

		} else {
			newDataForModelPackage.seriesName = this.props.selectedExistingData.data.seriesName;
			newDataForModelPackage.basePrice = this.props.selectedExistingData.data.basePrice;
			newDataForModelPackage.existingDataId = this.props.selectedExistingData.data.id;
		}



		

		createNewDataForModel(newDataForModelPackage).then(res => {
			this.setState({ saving: false });
			if(validateHTMLResponse(res)) {
				this.setState({ added: true });
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		});
	}

	public render() {
		const { office, seriesName, name, error, errorMessage, saving, added  } = this.state;
		if(saving) {
			return(
				<tr className="newModelDataRow">
					<td colSpan={6}>
						<div style={{marginBottom: 10, padding: 10}}>Saving...</div>
						<LinearProgress />
					</td>
				</tr>
			)
		} else if(added) { 
			return(
				<tr className="newModelDataRow">
					<td colSpan={6}>
						<div style={{marginBottom: 10, padding: 10}}><Check style={{color: 'green', marginRight: 10}}/> Data Added to {office.officeName}</div>
					</td>
				</tr>
			)
		} else {
			return(
				<>
					<tr className="newModelDataRow">
						<td style={{display: 'flex'}}>
							<LocationDropdown currentSelection={office.id} allLocationsOption={false} selectLocation={this.selectLocation} />
						</td>
						<td>
							{
								this.props.selectedExistingData.data.id === "" ?
								<>
									<input name="seriesName" value={seriesName} list={"series" + office.id} onChange={this.inputChange} style={{padding: 8}} />
									<datalist id={"series" + office.id}>
										{
											this.state.allSeriesData.map((series, index) => (
												<option key={series.seriesName + index} value={series.seriesName}>{series.seriesName + " - " + series.priceData[0].status}</option>
											))
										}
									</datalist>
								</>
								:
								<div>{this.props.selectedExistingData.data.seriesName}</div>
							}
							
						</td>
						<td>
							<input name="name" value={name} onChange={this.inputChange} style={{padding: 8}} />
						</td>
						<td>
							<select id="series" name="templateId" onChange={this.inputChange} style={{padding: 8}}>
								{
									this.props.selectedExistingData.data.id === "" ?
									<option value=""></option>
									:
									<option key={this.props.selectedExistingData.data.id} value={this.props.selectedExistingData.data.id}>
										{this.props.selectedExistingData.data.seriesName + " : " + this.props.selectedExistingData.data.name + " " + this.props.selectedExistingData.data.model.modelNumber + " - " + this.props.selectedExistingData.data.status}
									</option>
								}
								{
									this.state.allSeriesData.map(series => (
										series.priceData.map(data => (
											<option key={data.id} value={data.id}>{data.seriesName + " : " + data.name + " " + data.model.modelNumber + " - " + data.status}</option>
										))
									))
								}
							</select>
							
						</td>
						
						<td>
							{
								this.props.selectedExistingData.data.id === "" ?
								<div>{FormatNumberAsMoney(this.props.basePrice)}</div>
								:
								<div>{FormatNumberAsMoney(this.props.selectedExistingData.data.basePrice)}</div>
							}
						</td>
						<td>
							<Button variant="outlined" color="primary" onClick={this.createData}>
								<Save style={{color: 'green'}}/>
							</Button>
						</td>
						<td>
							<Clear onClick={this.props.delete} style={{color: 'red', cursor: 'pointer'}} />
						</td>
					</tr>
					<tr>
						<td>
							{
								error &&
								<div style={{marginBottom: 10, color: 'red'}}>
									Error: {errorMessage}
								</div>
							}
						</td>
					</tr>
				</>
			)
		}
	}
}

export default NewDataPackageComponent;