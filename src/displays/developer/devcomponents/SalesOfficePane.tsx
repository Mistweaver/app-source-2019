import React from 'react';
import { Card, CardContent, Button, Divider, Grid, LinearProgress } from '@material-ui/core';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { AvalaraCompanyLocation } from '../../../objects/avalaraobjects/AvalaraCompanyLocation';
import { addObject, updateObject } from '../../../services/CrudServices';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { STATES } from '../../../data/staticdata';
import { Factory } from '../../../objects/factory/Factory';
import { Delete } from '@material-ui/icons';

interface SalesOfficePaneProps {
	salesOffice: SalesOffice;
	avalaraLocations: AvalaraCompanyLocation[];
	factories: Factory[];
	loadOffices: () => void;
}

interface SalesOfficePaneState {
	salesOffice: SalesOffice;
	newOffice: boolean;
	newManufacturer: string;

	edited: boolean;
	saving: boolean;
	error: boolean;
}

class SalesOfficePane extends React.Component<SalesOfficePaneProps,  SalesOfficePaneState> {
	constructor(props: SalesOfficePaneProps) {
		super(props);
		this.state = {
			salesOffice: this.props.salesOffice,
			newOffice: true,
			newManufacturer: "",
			edited: false,
			saving: false,
			error: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.saveOffice = this.saveOffice.bind(this);
		this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
		this.handleFactorySelection = this.handleFactorySelection.bind(this);
	}

	componentDidMount() {
		if(this.props.salesOffice.officeName === 'New Office') {
			this.setState({ newOffice: true});
		} else {
			this.setState({ newOffice: false});
		}
	}

	componentDidUpdate(prevProps: SalesOfficePaneProps) {
		if(prevProps !== this.props) {
			this.setState({ salesOffice: this.props.salesOffice});
			if(this.props.salesOffice.officeName === 'New Office') {
				this.setState({ newOffice: true});
			} else {
				this.setState({ newOffice: false});
			}
		}

	}

	private handleChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		let updatedOffice = this.state.salesOffice;
		//@ts-ignore
		updatedOffice[name] = value;
		this.setState({ salesOffice: updatedOffice, edited: true });
	}

	private handleIdChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		let updatedOffice = this.state.salesOffice;
		//@ts-ignore
		updatedOffice[name] = parseInt(value);
		this.setState({ salesOffice: updatedOffice, edited: true });
	}

	private addObject(factory: string) {

		let newArray = this.state.salesOffice.factoryIDs.slice();
		let updatedOffice = this.state.salesOffice;
		newArray.splice(0, 0, factory);
		updatedOffice['factoryIDs'] = newArray;
		this.setState({ salesOffice: updatedOffice, edited: true });

	}

	private removeObject(index: number) {

		let newArray = this.state.salesOffice.factoryIDs.slice();
		let updatedOffice = this.state.salesOffice;
		newArray.splice(index, 1);
		updatedOffice['factoryIDs'] = newArray;
		this.setState({ salesOffice: updatedOffice, edited: true });

	}

    public getFactoryUniqueName(id: string) {
		var i: number = 0;

		/**
		 * Iterate through the factories array and return the unique name
		 * of the factory specified by the id argument.
		 */
		for(i=0; i<this.props.factories.length; i++) {
			if(this.props.factories[i].id === id) {
				return this.props.factories[i].uniqueName;
			}
		}
		
		/**
		 * Fell through, didn't find the id, just return the id.
		 */
		return id;
    }

	public saveOffice() {
		this.setState({ saving: true });
		const { salesOffice, newOffice } = this.state;
		if(newOffice) {
			addObject(salesOffice, 'salesoffices').then(res => {
				this.setState({ saving: false });
				if(validateHTMLResponse(res)) {
					this.setState({ edited: false, error: false });
					this.props.loadOffices();
				} else {
					this.setState({ error: true });
				}
			});
		} else {
			updateObject(salesOffice, 'salesoffices').then(res => {
				this.setState({ saving: false });
				if(validateHTMLResponse(res)) {
					this.setState({ edited: false, error: false });
					this.props.loadOffices();
				} else {
					this.setState({ error: true });
				}
			})
		}
	}

	public handleManufacturerChange(event: { target: { value: any; }; }) {
		this.setState({ newManufacturer: event.target.value})
	}

	public handleFactorySelection(event: { target: { value: any; }; }) {
		this.addObject(event.target.value);
	}

	public render() {
		const { avalaraLocations } = this.props;
		const { factories } = this.props;
		const { factoryIDs } = this.state.salesOffice;
		const { newOffice, salesOffice } = this.state;
		console.log(salesOffice);
		return(
			<Card>
				{
					newOffice === false ?
					<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>{'Office ID: ' + salesOffice.id}</div>
					:
					<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>New Office</div>
				}
				<CardContent style={{fontSize: 13}}>
					{/*
						newOffice === false &&
							<div style={{ display: 'flex', flexDirection: 'column'}}>
								<span><b>Created By:</b> {salesOffice.createdBy}</span>
								<span><b>Created On:</b> {new Date(salesOffice.creationTime).toLocaleString()}</span>
								<span><b>Last Modified By:</b> {salesOffice.modifiedBy}</span>
								<span><b>Last Modified On:</b> {new Date(salesOffice.modificationTime).toLocaleString()}</span>
							</div>
					*/}
					<Grid container spacing={2}>
						<Grid item xs={7}>
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office Name</b></label>
									<input id="officeName" name="officeName" value={salesOffice.officeName} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office Title</b></label>
									<input id="officeTitle" name="officeTitle" value={salesOffice.officeTitle} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office Address</b></label>
									<input id="officeAddress" name="officeAddress" value={salesOffice.officeAddress} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office City</b></label>
									<input id="officeCity" name="officeCity" value={salesOffice.officeCity} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office County</b></label>
									<input id="officeCounty" name="officeCounty" value={salesOffice.officeCounty} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office State</b></label>
									<input list="states" id="officeState" name="officeState" value={salesOffice.officeState} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
									<datalist id="states">
										{
											STATES.map(state => (
												<option key={state.id} value={state.abbreviation}>{state.name}</option>
											))
										}
									</datalist>
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Region</b></label>
									<select name="region" value={salesOffice.region} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}}>
										<option value="">unassigned</option>
										<option value="region-1">region-1</option>
										<option value="region-2">region-2</option>
									</select>
								</div>

								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office Zip</b></label>
									<input id="officeZip" name="officeZip" value={salesOffice.officeZip} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office Phone Number</b></label>
									<input id="officePhoneNumber" name="officePhoneNumber" value={salesOffice.officePhoneNumber} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Office Fax Number</b></label>
									<input id="officeFaxNumber" name="officeFaxNumber" value={salesOffice.officeFaxNumber} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>License Number</b></label>
									<input list="licenseNumber" id="licenseNumber" name="licenseNumber" value={salesOffice.licenseNumber} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Client Consultant Id</b></label>
									<input id="clientConsultantId" name="clientConsultantId" value={salesOffice.clientConsultantId} onChange={this.handleIdChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Avalara Id</b></label>
									<select name="avalaraId" value={salesOffice.avalaraId} onChange={this.handleIdChange} style={{ padding: 5, minWidth: 250}}>
										<option value="">n/a</option>
										{
											avalaraLocations.map(location => (
												<option key={location.id} value={location.id}>{location.description + ' - ' + location.id}</option>
											))
										}
									</select>
								</div>

								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Avalara Location Code</b></label>
									<select name="locationCode" value={salesOffice.locationCode} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}}>
										<option value="">n/a</option>
										{
											avalaraLocations.map(location => (
												<option key={location.id} value={location.locationCode}>{location.description + ' - ' + location.locationCode}</option>
											))
										}
									</select>
								</div>

								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<div>
										<select
											defaultValue=""
											onChange={this.handleFactorySelection}
											style={{ padding: 8 }}
											> 
											<option value="">...select factories</option>
												{
													factories.map(factory => (
														<option key={factory.id} value={factory.id}>{factory.uniqueName}</option>
													))
												}
										</select>
									</div>
									<div style={{display: 'flex', flexDirection: 'column'}}>
									{
										factoryIDs.map((factory, index) => (
											<div key={factory + index} style={{display: 'flex', justifyContent: 'space-between', border: '1px solid grey', borderRadius: 10, padding: 5}}>
												{this.getFactoryUniqueName(factory)}
												<Delete onClick={() => this.removeObject(index)} style={{color: 'red', cursor: 'pointer'}} />
											</div>
										))
									}
									</div>
								</div>
							</div>
						</Grid>
					</Grid>
					
					
					
						
					<Divider style={{margin: 5}} />
					{
						this.state.edited === true &&
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							{
								this.state.saving ?
								<LinearProgress />
								:
								<Button variant="contained" color="primary" onClick={this.saveOffice}>Save</Button>
							}
						</div>
					}
					
				</CardContent>
			</Card>
		)
	}
}

export default SalesOfficePane;