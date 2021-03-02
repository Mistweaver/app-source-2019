import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Button } from '@material-ui/core';
import { ModelSelectionDataPackage } from '../../../actions/AgreementEditorActions';

interface CustomModelSelectionProps {
	expanded: string;
	expandPanel: (panel: string) => void;
	selectModel: (dataPackage: ModelSelectionDataPackage) => void;
	close: () => void;
}
interface CustomModelSelectionState {
	make: string,
	model: string,
	manufacturer: string,
	modelType: string,
	bedrooms: string,
	baths: string,
	floorSize: string,
	hitchSize: string,
	approximateSquareFeet: string,
	retailPrice: string,
	factoryDirectPrice: string,
	factoryTotalCost: string,
	promoName: string,
	promotionDiscountAmount: string
}

class CustomModelSelection extends React.Component<CustomModelSelectionProps, CustomModelSelectionState> {
	constructor(props: CustomModelSelectionProps) {
		super(props);
		this.state = {
			make: "",
			model: "",
			manufacturer: "",
			modelType: "",
			bedrooms: "",
			baths: "",
			floorSize: "",
			hitchSize: "",
			approximateSquareFeet: "0",
			retailPrice: "0",
			factoryDirectPrice: "0",
			factoryTotalCost: "0",
			promoName: "",
			promotionDiscountAmount: "0"
		}

		this.handleChange = this.handleChange.bind(this);
		this.applyCustomModel = this.applyCustomModel.bind(this);

	}

	private handleChange(event: { target: { name: string, value: string }}) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({ [name]: value });
	}

	private applyCustomModel() {
		let modelSelectionDataPackage = new ModelSelectionDataPackage();

		modelSelectionDataPackage.make = this.state.make;
		modelSelectionDataPackage.model = this.state.model;
		modelSelectionDataPackage.manufacturer = this.state.manufacturer;
		modelSelectionDataPackage.modelType = this.state.modelType;
		modelSelectionDataPackage.bedrooms = this.state.bedrooms;
		modelSelectionDataPackage.baths =this.state.baths;
		modelSelectionDataPackage.floorSize = this.state.floorSize;
		modelSelectionDataPackage.hitchSize = this.state.hitchSize;
		modelSelectionDataPackage.approximateSquareFeet = parseFloat(this.state.approximateSquareFeet);
		modelSelectionDataPackage.retailPrice = parseFloat(this.state.retailPrice);
		modelSelectionDataPackage.factoryDirectPrice = parseFloat(this.state.factoryDirectPrice);
		modelSelectionDataPackage.factoryTotalCost = parseFloat(this.state.factoryTotalCost);
		
		modelSelectionDataPackage.promotionName = this.state.promoName;
		modelSelectionDataPackage.promotionDiscountPrice = parseFloat(this.state.promotionDiscountAmount);

		modelSelectionDataPackage.promotionSelectionHalf = "";
		modelSelectionDataPackage.modelSelectionDate = new Date().toLocaleDateString();

		this.props.selectModel(modelSelectionDataPackage);
		this.props.close();
	}

	public render() {
		const { expanded, expandPanel } = this.props;
		return(
			<Accordion square expanded={expanded === ('admin-select')} onChange={() => expandPanel('admin-select')}>
				<AccordionSummary aria-controls="admin-select-content" id="admin-select-header">
					<Typography>Admin - Enter Custom Model</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<label>Make</label>
								<input value={this.state.make} onChange={this.handleChange} name="make" />
								<label>Model</label>
								<input value={this.state.model} onChange={this.handleChange} name="model" />
								<label>Manufacturer</label>
								<input value={this.state.manufacturer} onChange={this.handleChange} name="manufacturer" />
								<label>Model Type (HUD or PM)</label>
								<input value={this.state.modelType} onChange={this.handleChange} name="modelType" />
								<label>Bedrooms</label>
								<input value={this.state.bedrooms} onChange={this.handleChange} name="bedrooms" />
								<label>Baths</label>
								<input value={this.state.baths} onChange={this.handleChange} name="baths" />
								<label>Floor Size</label>
								<input value={this.state.floorSize} onChange={this.handleChange} name="floorSize" />
								<label>Hitch Size</label>
								<input value={this.state.hitchSize} onChange={this.handleChange} name="hitchSize" />
							</div>
						</Grid>
						<Grid item xs={6}>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<label>Approximate Square Feet</label>
								<input value={this.state.approximateSquareFeet} onChange={this.handleChange} name="approximateSquareFeet" />
								<label>Retail Price</label>
								<input value={this.state.retailPrice} onChange={this.handleChange} name="retailPrice" />
								<label>Factory Direct Price</label>
								<input value={this.state.factoryDirectPrice} onChange={this.handleChange} name="factoryDirectPrice" />
								<label>Promotion Name</label>
								<input value={this.state.promoName} onChange={this.handleChange} name="promoName" />
								<label>Promotion Discount Price</label>
								<input value={this.state.promotionDiscountAmount} onChange={this.handleChange} name="promotionDiscountAmount" />
							</div>
						</Grid>
					</Grid>
					<div style={{marginTop: 10}}>
						<Button variant="contained" color="secondary" onClick={this.applyCustomModel}>Apply Custom Model</Button>
					</div>
				</AccordionDetails>
			</Accordion>
		)
	}
}

export default CustomModelSelection;