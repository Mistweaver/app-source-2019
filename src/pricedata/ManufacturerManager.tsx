import React from 'react';
import { Manufacturer } from '../objects/manufacturer/Manufacturer';
import { updateManufacturer, addManufacturer } from './services/ManufacturerServices';
import { validateHTMLResponse } from '../services/HttpResponseChecker';
import { Grid, Slide, LinearProgress } from '@material-ui/core';
import { STATES } from '../data/staticdata';

interface ManufacturerManagerProps {}

interface ManufacturerManagerState {
	loading: boolean;
	edited: boolean;
	error: boolean;
	showManufacturerDetails: boolean;

	id: string;
	creationTime: string;
	createdBy: string;
	key: string;
	legalName: string;
	address: string;
	state: string;
	zip: string;
	city: string;

}

class ManufacturerManager extends React.Component<ManufacturerManagerProps, ManufacturerManagerState> {
	constructor(props: ManufacturerManagerProps) {
		super(props);
		this.state = {
			loading: false,
			edited: false,
			error: false,
			showManufacturerDetails: false,

			id: "",
			creationTime: "",
			createdBy: "",
			key: "",
			legalName: "",
			address: "",
			state: "",
			zip: "",
			city: ""
		}

		this.addNewManufacturer = this.addNewManufacturer.bind(this);
		this.selectManufacturer = this.selectManufacturer.bind(this);
		this.saveManufacturer = this.saveManufacturer.bind(this);
		this.deleteManufacturer = this.deleteManufacturer.bind(this);
		this.hideManufacturerDetails = this.hideManufacturerDetails.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	private addNewManufacturer() {
		this.setState({
			id: "",
			creationTime: "",
			createdBy: "",
			key: "",
			legalName: "",
			address: "",
			state: "",
			zip: "",
			city: "",

			edited: false,
			showManufacturerDetails: true
		});
	}

	private selectManufacturer(manufacturer: Manufacturer) {
		this.setState({
			id: manufacturer.id,
			creationTime: manufacturer.creationTime,
			createdBy: manufacturer.createdBy,
			key: manufacturer.key,
			legalName: manufacturer.legalName,
			address: manufacturer.address,
			state: manufacturer.state,
			zip: manufacturer.zip,
			city: manufacturer.city,

			edited: false,
			showManufacturerDetails: true
		});
	}

	private saveManufacturer() {
		this.setState({ loading: true });
		let manufacturer = new Manufacturer();
		manufacturer.key = this.state.key;
		manufacturer.legalName = this.state.legalName;
		manufacturer.address = this.state.address;
		manufacturer.state = this.state.state;
		manufacturer.zip = this.state.zip;
		manufacturer.city = this.state.city;

		if(this.state.id !== "") {
			manufacturer.id = this.state.id;
			manufacturer.createdBy = this.state.createdBy;
			manufacturer.creationTime = this.state.creationTime;
			updateManufacturer(manufacturer).then(res => {
				this.setState({ loading: false });
				if(validateHTMLResponse(res)) {
					this.setState({ edited: false, showManufacturerDetails: false });
					// this.props.loadManufacturers();
				} else {
					this.setState({ error: true });
				}
			});
		} else {
			addManufacturer(manufacturer).then(res => {
				this.setState({ loading: false });
				if(validateHTMLResponse(res)) {
					this.setState({ edited: false, showManufacturerDetails: false });
					// this.props.loadManufacturers();
				} else {
					this.setState({ error: true });
				}
			});
		}

	}

	// not currently using
	private deleteManufacturer() {}

	private handleChange(event: { target: { name: string, value: string }; }) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value, edited: true });
	}

	private hideManufacturerDetails() { this.setState({ showManufacturerDetails: false }); }

	public render() {
		// const { existingManufacturers } = this.props;
		const { loading, edited, error, showManufacturerDetails, id, key, legalName, address, state, zip, city } = this.state;
		return(
			
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>

						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
							<span>Existing Manufacturers</span>
							<button className="buttonMinimal" onClick={this.addNewManufacturer}>Add Manufacturer</button>
						</div>
						
						{/*
							existingManufacturers.map(manufacturer => (
								<div key={manufacturer.id} className="actionList" onClick={() => this.selectManufacturer(manufacturer)}>
									<span>{manufacturer.legalName}</span>
								</div>
							))
						*/}
					</div>
				</Grid>
				<Grid item xs={5}>
					<div style={{overflow: 'hidden'}}>
						<Slide direction="left" in={showManufacturerDetails} mountOnEnter unmountOnExit>
							<div style={{overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>

								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>
									{
										id !== "" ? <span>{"Manufacturer ID# " + id}</span> : <span>New Manufacturer</span>
									}
								</div>
								<div style={{padding: 10, display: 'flex', flexDirection: 'column'}}>
									<label>Key</label>
									<input name="key" value={key} onChange={this.handleChange} style={{padding: 5}}/>
									<label>Legal Name</label>
									<input name="legalName" value={legalName} onChange={this.handleChange} style={{padding: 5}}/>
									<label>Address</label>
									<input name="address" value={address} onChange={this.handleChange} style={{padding: 5}} />
									<label>City</label>
									<input name="city" value={city} onChange={this.handleChange} style={{padding: 5}}/>
									<label>State</label>
									<select name="state" value={state} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} >
										{
											STATES.map(state => (
												<option key={state.id} value={state.abbreviation} style={{padding: 5}}>{state.name}</option>
											))
										}
									</select>
									<label>Zip</label>
									<input name="zip" value={zip} onChange={this.handleChange} style={{padding: 5}}/>
									<div style={{marginTop: 10, display: 'flex' }}>
										{
											edited &&
											<>
												{
													loading ? <LinearProgress /> : <button className="buttonMinimal" onClick={this.saveManufacturer}>Save</button>
												}
											</>
										}
										<button className="buttonMinimal" onClick={this.hideManufacturerDetails}>{edited ? "Cancel Changes" : "Close Window"}</button>
									</div>
									{
										error &&
										<div style={{color: 'red'}}>There was an error saving.</div>
									}
								</div>						
							</div>
						</Slide>
					</div>
				</Grid>
			</Grid>
			
		)
	}
}

export default ManufacturerManager;