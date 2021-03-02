import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Tooltip, Button } from '@material-ui/core';
import { Add, Clear, } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { Model } from '../../../objects/models/Model';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { PriceDataWithOfficePackage } from '../objects/PriceDataWithOfficePackage';
import NewDataPackageComponent from './NewDataPackageComponent';

interface Props {
	model: Model;
	existingPriceData: PriceDataWithOfficePackage[];
	reload: () => void;
}

interface State {
	useExistingData: boolean;
	selectedExistingData: PriceDataWithOfficePackage;
	// just a placeholder for rendering
	newDataPackages: number[];

	basePrice: number;
	draftDate: string;

	render: boolean;
}

class NewDataForModelComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			newDataPackages: [],
			useExistingData: false,
			selectedExistingData: new PriceDataWithOfficePackage(),

			basePrice: 0,
			draftDate: "",

			render: false,
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.addAnotherPackage = this.addAnotherPackage.bind(this);
		this.removePackage = this.removePackage.bind(this);
		this.selectExistingData = this.selectExistingData.bind(this);
		this.clearSelection = this.clearSelection.bind(this);
	}

	private openModal() { this.setState({ render: true }); }
	private closeModal() { this.setState({ render: false, newDataPackages: [] }); }

	private inputChange(event: { target: { name: string, value: string }; }) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value });
	}

	private addAnotherPackage() {
		let newArray = this.state.newDataPackages.slice();
		newArray.splice(0, 0, this.state.newDataPackages.length + 1);
		this.setState({ newDataPackages: newArray });
	}

	private removePackage(index: number) {
		let newArray = this.state.newDataPackages.slice();
		newArray.splice(index, 1);
		this.setState({ newDataPackages: newArray });
	}

	private handleCheck() {
		if(this.state.useExistingData) {
			this.setState({useExistingData: false, selectedExistingData: new PriceDataWithOfficePackage()});
		} else {
			this.setState({useExistingData: true});
		}
		

	}

	private selectExistingData(data: PriceDataWithOfficePackage) {
		console.log(data);
		this.setState({ selectedExistingData: data });
	}

	private clearSelection() {
		this.setState({ selectedExistingData: new PriceDataWithOfficePackage() })
	}


	public render() {
		const { model, existingPriceData } = this.props;
		const { render, draftDate, basePrice, useExistingData, selectedExistingData } = this.state;
		return(
			<div style={{marginTop: 'auto', marginBottom: 'auto'}}>
				<Tooltip title="Add Data">
					<div className="buttonMinimal" onClick={this.openModal} >
						<Add style={{color: 'green'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={render}
					onClose={this.closeModal}
					maxWidth="lg"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Create New Data for {model.modelNumber}
					</DialogTitle>
					<DialogContent>
						<div style={{display: 'flex', marginBottom: 10}}>
							
							{
								this.props.existingPriceData.length > 0 &&
								<div style={{display: 'flex'}}>
									<div style={{display: 'flex'}}>
										<Checkbox
											checked={!useExistingData}
											onChange={this.handleCheck}
											color="primary"
										/>
										<div style={{marginTop: 'auto', marginBottom: 'auto'}}>Create new data at selected locations</div>
									</div>
									<div style={{display: 'flex'}}>
										<Checkbox
											checked={useExistingData}
											onChange={this.handleCheck}
											color="primary"
										/>
										<div style={{marginTop: 'auto', marginBottom: 'auto'}}>Add existing data to new locations</div>
									</div>
									
								</div>
							}
						</div>
					
						{
							useExistingData &&
							<>
								<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 10}}>
										{
											selectedExistingData.data.id === "" ?
											"Select which data to use:" :
											"Selected:"
										}
								</div>
								<table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
									<thead>
										<tr>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Model No.</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Name</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Location</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Series</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Status</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Base Price</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
									{
										selectedExistingData.data.id === "" ?
										<>
											{
												existingPriceData.map(priceData => (
													<tr key={priceData.data.id} className="leadRow" onClick={() => this.selectExistingData(priceData)}>
														<td>{priceData.data.model.modelNumber}</td>
														<td>{priceData.data.name}</td>
														<td>{priceData.office.officeName}</td>
														<td>{priceData.data.seriesName}</td>
														<td>{priceData.data.status}</td>
														<td>{FormatNumberAsMoney(priceData.data.basePrice)}</td>
													</tr>
												))
											}
										</>
										:
										<tr key={selectedExistingData.data.id} className="rowSelected">
											<td>{selectedExistingData.data.model.modelNumber}</td>
											<td>{selectedExistingData.data.name}</td>
											<td>{selectedExistingData.office.officeName}</td>
											<td>{selectedExistingData.data.seriesName}</td>
											<td>{selectedExistingData.data.status}</td>
											<td>{FormatNumberAsMoney(selectedExistingData.data.basePrice)}</td>
											<td><Clear style={{color: 'red'}} onClick={this.clearSelection} /></td>
										</tr>
									}
									</tbody>
								</table>
							</>
						}

						<div style={{marginBottom: 20, marginLeft: 15, marginTop: 10}}>
							<div style={{fontWeight: 525}}>Draft Date</div>
							<input name="draftDate" value={draftDate} onChange={this.inputChange} />
							<div style={{fontWeight: 525}}>Base Price</div>
							{
								this.state.selectedExistingData.data.id === "" ?
								<input name="basePrice" value={basePrice} onChange={this.inputChange} />
								:
								<div>{FormatNumberAsMoney(this.state.selectedExistingData.data.basePrice)}</div>
							}
						</div>	


						<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 10}}>
							Select Locations		
						</div>
					
						<div style={{marginTop: 10}}>
							<table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
								<thead>
									<tr>
										<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Location</th>
										<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Series</th>
										<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Name</th>
										<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Var/Eqn Template (optional)</th>
										<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Price</th>
										<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Save</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{this.state.newDataPackages.map((data, index) => (
										<NewDataPackageComponent 
											key={"newDataPackage" + index}
											modelId={this.props.model.id}
											basePrice={this.state.basePrice}
											draftDate={this.state.draftDate}
											selectedExistingData={this.state.selectedExistingData}
											delete={() => this.removePackage(index)}
											reload={this.props.reload}
										/>
									))}

									<tr>
										<td><Button onClick={this.addAnotherPackage}>Add Another Location</Button></td>
									</tr>
								</tbody>
							</table>
						</div>
					</DialogContent>
					<DialogActions>
						<CriticalButton onClick={this.closeModal}>Close</CriticalButton>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default NewDataForModelComponent;