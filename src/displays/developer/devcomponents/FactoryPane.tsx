import React from 'react';
import { Card, CardContent, Button, Divider, Grid, LinearProgress } from '@material-ui/core';
import { addObject, updateObject } from '../../../services/CrudServices';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { STATES } from '../../../data/staticdata';
import { Factory } from '../../../objects/factory/Factory';

interface FactoryPaneProps {
	factory: Factory;
	loadFactories: () => void;
}

interface FactoryPaneState {
	factory: Factory;
	newFactory: boolean;
	newManufacturer: string;

	edited: boolean;
	saving: boolean;
	error: boolean;
}

class FactoryPane extends React.Component<FactoryPaneProps,  FactoryPaneState> {
	constructor(props: FactoryPaneProps) {
		super(props);
		this.state = {
			factory: this.props.factory,
			newFactory: true,
			newManufacturer: "",
			edited: false,
			saving: false,
			error: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.saveFactory = this.saveFactory.bind(this);
		this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
	}

	componentDidMount() {
		if(this.props.factory.uniqueName === 'New Factory') {
			this.setState({ newFactory: true});
		} else {
			this.setState({ newFactory: false});
		}
	}

	componentDidUpdate(prevProps: FactoryPaneProps) {
		if(prevProps !== this.props) {
			this.setState({ factory: this.props.factory});
			if(this.props.factory.uniqueName === 'New Factory') {
				this.setState({ newFactory: true});
			} else {
				this.setState({ newFactory: false});
			}
		}

	}

	private handleChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		let updatedFactory = this.state.factory;
		//@ts-ignore
		updatedFactory[name] = value;
		this.setState({ factory: updatedFactory, edited: true });
	}

	private handleIdChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		let updatedFactory = this.state.factory;
		//@ts-ignore
		updatedFactory[name] = parseInt(value);
		this.setState({ factory: updatedFactory, edited: true });
	}

	public saveFactory() {
		this.setState({ saving: true });
		const { factory, newFactory } = this.state;
		if(newFactory) {
			addObject(factory, 'factories').then(res => {
				this.setState({ saving: false });
				if(validateHTMLResponse(res)) {
					this.setState({ edited: false, error: false });
					this.props.loadFactories();
				} else {
					this.setState({ error: true });
				}
			});
		} else {
			updateObject(factory, 'factories').then(res => {
				this.setState({ saving: false });
				if(validateHTMLResponse(res)) {
					this.setState({ edited: false, error: false });
					this.props.loadFactories();
				} else {
					this.setState({ error: true });
				}
			})
		}
	}

	public handleManufacturerChange(event: { target: { value: any; }; }) {
		this.setState({ newManufacturer: event.target.value})
	}

	public render() {
		const { newFactory, factory } = this.state;
		return(
			<Card>
				{
					newFactory === false ?
					<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>{'Factory ID: ' + factory.id}</div>
					:
					<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>New Factory</div>
				}
				<CardContent style={{fontSize: 13}}>
					{/*
						newFactory === false &&
							<div style={{ display: 'flex', flexDirection: 'column'}}>
								<span><b>Created By:</b> {factory.createdBy}</span>
								<span><b>Created On:</b> {new Date(factory.creationTime).toLocaleString()}</span>
								<span><b>Last Modified By:</b> {factory.modifiedBy}</span>
								<span><b>Last Modified On:</b> {new Date(factory.modificationTime).toLocaleString()}</span>
							</div>
					*/}
					<Grid container spacing={2}>
						<Grid item xs={7}>
							<div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Unique Name</b></label>
									<input id="uniqueName" name="uniqueName" value={factory.uniqueName} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Display Name</b></label>
									<input id="displayName" name="displayName" value={factory.displayName} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Manufacturer Name</b></label>
									<input id="manufacturerName" name="manufacturerName" value={factory.manufacturerName} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Street</b></label>
									<input id="street" name="street" value={factory.street} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>City</b></label>
									<input id="city" name="city" value={factory.city} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>State</b></label>
									<input list="states" id="state" name="state" value={factory.state} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
									<datalist id="states">
										{
											STATES.map(state => (
												<option key={state.id} value={state.abbreviation}>{state.name}</option>
											))
										}
									</datalist>
								</div>

								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Zip Code</b></label>
									<input id="zipCode" name="zipCode" value={factory.zipCode} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Phone Number</b></label>
									<input id="phoneNumber" name="phoneNumber" value={factory.phoneNumber} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Fax Number</b></label>
									<input id="faxNumber" name="faxNumber" value={factory.faxNumber} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Printable Entity Name</b></label>
									<input id="printableEntityName" name="printableEntityName" value={factory.printableEntityName} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Printable Entity Address</b></label>
									<input id="printableEntityAddress" name="printableEntityAddress" value={factory.printableEntityAddress} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Printable Entity City</b></label>
									<input id="printableEntityCity" name="printableEntityCity" value={factory.printableEntityCity} onChange={this.handleChange} style={{ padding: 5, minWidth: 250}} />
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Add E New Model Paragraph</b></label>
									<textarea id="addendumENewModelParagraph" name="addendumENewModelParagraph" value={factory.addendumENewModelParagraph} onChange={this.handleChange} style={{ padding: 5, minWidth: 250, fontFamily: 'sans-serif'}}>
                                        </textarea>
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
									<label><b>Add E Show Model Paragraph</b></label>
									<textarea id="addendumEShowModelParagraph" name="addendumEShowModelParagraph" value={factory.addendumEShowModelParagraph} onChange={this.handleChange} style={{ padding: 5, minWidth: 250, fontFamily: 'sans-serif'}}>
                                        </textarea>
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
								<Button variant="contained" color="primary" onClick={this.saveFactory}>Save</Button>
							}
						</div>
					}
					
				</CardContent>
			</Card>
		)
	}
}

export default FactoryPane;