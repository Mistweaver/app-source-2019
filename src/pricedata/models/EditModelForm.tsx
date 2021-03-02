import React from 'react';
import { Model } from '../../objects/models/Model';
import { saveModelEdits } from './ModelServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { LinearProgress } from '@material-ui/core';
import StandardButton from '../../components/buttons/StandardButton';
import CriticalButton from '../../components/buttons/CriticalButton';

interface Props {
	model: Model;
}

interface State {
	// component state variables
	edited: boolean;
	saving: boolean;

	error: boolean;
	errorMessage: string;

	// form variables
	manufacturerId: string;
	modelNumber: string;
	factoryId: string;
	type: string;

	width: number;
	widthInches: number;
	widthFeet: number;
	length1: number;
	lengthInches: number;
	lengthFeet: number;
	length2: number;
	length2Inches: number;
	length2Feet: number;
	numberOfBathrooms: number;
	numberOfBedrooms: number;
	numberOfDens: number;
	extraFeatures: string;
	notes: string;
	estimatedSquareFeet: number;
	squareFootageWarning: boolean;

	// website variables
	imageUrl: string;
	blueprintUrl: string;
}

class EditModelForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			edited: false,
			saving: false,
			error: false,
			errorMessage: "",

			manufacturerId: "",
			modelNumber: "",
			factoryId: "",
			type: "",
		
			width: 0,
			widthInches: 0,
			widthFeet: 0,
			length1: 0,
			lengthFeet: 0,
			lengthInches: 0,
			length2: 0,
			length2Feet: 0,
			length2Inches: 0,
			numberOfBathrooms: 0,
			numberOfBedrooms: 0,
			numberOfDens: 0,
			extraFeatures: "",
			notes: "",
			estimatedSquareFeet: 0,
			squareFootageWarning: false,

			// website variables
			imageUrl: "",
			blueprintUrl: "",
		}

		
		this.cancelEdits = this.cancelEdits.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleNumericInput = this.handleNumericInput.bind(this);
		this.changeSquareFootage = this.changeSquareFootage.bind(this);

		this.updateLength2Feet = this.updateLength2Feet.bind(this);
		this.updateLength2Inches = this.updateLength2Inches.bind(this);
		this.updateLengthFeet = this.updateLengthFeet.bind(this);
		this.updateLengthInches = this.updateLengthInches.bind(this);
		this.updateWidthFeet = this.updateWidthFeet.bind(this);
		this.updateWidthInches = this.updateWidthInches.bind(this);

	}

	componentDidMount() {
		this.getModelFromProps();
	}

	componentDidUpdate(prevProps: Props) {
		if(prevProps.model !== this.props.model) {
			this.getModelFromProps();
		}
	}


	private getModelFromProps() {
		this.setState({ 
			edited: false,
			factoryId: this.props.model.factoryId,
			modelNumber: this.props.model.modelNumber,
			type: this.props.model.type,
			width: this.props.model.width,
			length1: this.props.model.length1,
			length2: this.props.model.length2,
			widthInches: 0,
			widthFeet: 0,
			lengthFeet: 0,
			lengthInches: 0,
			length2Feet: 0,
			length2Inches: 0,
			numberOfBathrooms: this.props.model.numberOfBathrooms,
			numberOfBedrooms: this.props.model.numberOfBedrooms,
			numberOfDens: this.props.model.numberOfDens,
			extraFeatures: this.props.model.extraFeatures,
			notes: this.props.model.notes,
			estimatedSquareFeet: this.props.model.estimatedSquareFeet,
		
			// website variables
			imageUrl: this.props.model.imageUrl,
			blueprintUrl: this.props.model.blueprintUrl,
		});
	}

	private handleInput(event: { target: { name: string, value: string }; } ) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value, edited: true });
	}

	private handleNumericInput(event: { target: { name: string, value: string }; } ) {
		//@ts-ignore
		this.setState({ [event.target.name]: parseFloat(event.target.value), edited: true });
	}

	private updateWidthFeet(event: { target: { value: string }; } ) {
		let newFeet = parseInt(event.target.value);
		let newWidth = newFeet + this.convertInchesToFeetDecimal(this.state.widthInches);
		this.setState({ widthFeet: newFeet, width: newWidth });
	}
	private updateWidthInches(event: { target: { value: string }; } ) {
		let newInches = parseInt(event.target.value);
		let newWidth = this.state.widthFeet + this.convertInchesToFeetDecimal(newInches);
		this.setState({ widthInches: newInches, width: newWidth });
	}
	private updateLengthFeet(event: { target: { value: string }; } ) {
		let newFeet = parseInt(event.target.value);
		let newLength = newFeet + this.convertInchesToFeetDecimal(this.state.lengthInches);
		this.setState({ lengthFeet: newFeet, length1: newLength });
	}
	private updateLengthInches(event: { target: { value: string }; } ) {
		let newInches = parseInt(event.target.value);
		let newLength = this.state.lengthFeet + this.convertInchesToFeetDecimal(newInches);
		this.setState({ lengthInches: newInches, length1: newLength });
	}
	private updateLength2Feet(event: { target: { value: string }; } ) {
		let newFeet = parseInt(event.target.value);
		let newLength2 = newFeet + this.convertInchesToFeetDecimal(this.state.length2Inches);
		this.setState({ length2Feet: newFeet, length2: newLength2 });
	}
	private updateLength2Inches(event: { target: { value: string }; } ) {
		let newInches = parseInt(event.target.value);
		let newLength = this.state.length2Feet + this.convertInchesToFeetDecimal(newInches);
		this.setState({ length2Inches: newInches, length2: newLength });
	}

	private convertInchesToFeetDecimal(inches: number) {
		return parseFloat((inches / 12).toFixed(3));
	}

	private changeSquareFootage(event: { target: { name: string, value: string }; } ) {
		this.setState({ estimatedSquareFeet: parseFloat(event.target.value), squareFootageWarning: true, edited: true });
	}

	private cancelEdits() {
		this.setState({ squareFootageWarning: false });
		this.getModelFromProps();
	}

	private saveEdits() {
		this.setState({ saving: true });
		let editedModel = new Model();
		// carry-over properties
		editedModel.id = this.props.model.id;
		editedModel.createdBy = this.props.model.createdBy;
		editedModel.creationTime = this.props.model.creationTime;
		editedModel.retired = this.props.model.retired;
		editedModel.deleted = this.props.model.deleted;
		// editable properties
		editedModel.modelNumber = this.state.modelNumber;
		editedModel.factoryId = this.state.factoryId;
		editedModel.type = this.state.type;
		editedModel.width = this.state.width;
		editedModel.length1 = this.state.length1;
		editedModel.length2 = this.state.length2;
		editedModel.numberOfBathrooms = this.state.numberOfBathrooms;
		editedModel.numberOfBedrooms = this.state.numberOfBedrooms;
		editedModel.numberOfDens = this.state.numberOfDens;
		editedModel.extraFeatures = this.state.extraFeatures;
		editedModel.notes = this.state.notes;
		editedModel.estimatedSquareFeet = this.state.estimatedSquareFeet;
		editedModel.imageUrl = this.state.imageUrl;
		editedModel.blueprintUrl = this.state.blueprintUrl;


		saveModelEdits(editedModel).then(res => {
			this.setState({ saving: false });
			if(validateHTMLResponse(res)) {
				this.setState({ edited: false });
			} else {
				this.setState({
					error: true,
					errorMessage: res.status
				})
			}
		});
	}

	public render() {
		// const { model } = this.props;
		const { 
			edited,
			factoryId,
			modelNumber,
			type,
			width,
			length1,
			length2,
			widthInches,
			widthFeet,
			lengthFeet,
			lengthInches,
			length2Feet,
			length2Inches,
			numberOfBathrooms,
			numberOfBedrooms,
			numberOfDens,
			extraFeatures,
			notes,
			estimatedSquareFeet,
			// imageUrl,
			// blueprintUrl,
			squareFootageWarning,

			saving,
			error,
			errorMessage,
		} = this.state;

		if(this.props.model.id === "") {
			return null;
		} else {
			return(
				
				<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
					<div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
						<div className="flexedRow">
							<span>Model Number</span>
							<input name="modelNumber" value={modelNumber} onChange={this.handleInput} />
						</div>
						<div className="flexedRow">
							<span>Factory ID</span>
							<input name="factoryId" value={factoryId} onChange={this.handleInput} />
						</div>
						<div className="flexedRow">
							<span>Type</span>
							<select name="type" value={type} onChange={this.handleInput}>
								<option value="HUD">HUD</option>
								<option value="PM">PM</option>
								<option value="PM-HUD">PM-HUD</option>
							</select>
						</div>
						<div className="flexedRow">
							<span>Bedrooms</span>
							<input name="numberOfBedrooms" type="number" min="0.01" step="0.01" value={numberOfBedrooms} onChange={this.handleNumericInput} />
						</div>
						<div className="flexedRow">
							<span>Bathrooms</span>
							<input name="numberOfBathrooms" type="number" min="0.01" step="0.01" value={numberOfBathrooms} onChange={this.handleNumericInput} />
						</div>
						<div className="flexedRow">
							<span>Dens</span>
							<input name="numberOfDens" type="number" min="0.01" step="0.01" value={numberOfDens} onChange={this.handleNumericInput} />
						</div>

						<div className="flexedRow">
							<span>Width</span>
							<input name="width" type="number" min="0.01" step="0.01" value={width} onChange={this.handleNumericInput} />
						</div>
						<div className="flexedRow">
							<span></span>
							<div>
								<span>Ft.</span>
								<input name="widthFeet" type="number" min="0" step="1" value={widthFeet} onChange={this.updateWidthFeet} style={{width: '40px'}} />
								<span>In.</span>
								<input name="widthInches" type="number" min="0" max="12" step="1" value={widthInches} onChange={this.updateWidthInches} style={{width: '40px'}} />
							</div>
						</div>
						<div className="flexedRow">
							<span>Length 1</span>
							<input name="length1" type="number" min="0.01" step="0.01" value={length1} onChange={this.handleNumericInput} />
						</div>
						<div className="flexedRow">
							<span></span>
							<div>
								<span>Ft.</span>
								<input name="lengthFeet" type="number" min="0" step="1" value={lengthFeet} onChange={this.updateLengthFeet} style={{width: '40px'}} />
								<span>In.</span>
								<input name="lengthInches" type="number" min="1" max="11" step="1" value={lengthInches} onChange={this.updateLengthInches} style={{width: '40px'}} />
							</div>
						</div>
						<div className="flexedRow">
							<span>Length 2 </span>
							<input name="length2" type="number" min="0.01" step="0.01" value={length2} onChange={this.handleNumericInput} />
						</div>
						<div className="flexedRow">
							<span></span>
							<div>
								<span>Ft.</span>
								<input name="length2Feet" type="number" min="0" step="1" value={length2Feet} onChange={this.updateLength2Feet} style={{width: '40px'}} />
								<span>In.</span>
								<input name="length2Inches" type="number" min="1" max="11" step="1" value={length2Inches} onChange={this.updateLength2Inches} style={{width: '40px'}} />
							</div>
						</div>
						<div className="flexedRow">
							<span>Sq. Feet</span>
							<input name="estimatedSquareFeet" type="number" min="0.01" step="0.01" value={estimatedSquareFeet} onChange={this.changeSquareFootage} />
						</div>
						{
							squareFootageWarning &&
							<p><span style={{color: 'red'}}>Warning:</span> changing the square footage will update all active data, pending data, and drafts for the model</p>
						}
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<span>Extra Features</span>
							<textarea name="extraFeatures" value={extraFeatures} onChange={this.handleInput} />
						</div>

						<div style={{display: 'flex', flexDirection: 'column'}}>
							<span>Notes</span>
							<textarea name="notes" value={notes} onChange={this.handleInput} />
						</div>
					</div>
					{ error && <p><span style={{color: 'red'}}>Error: </span>{errorMessage}</p> }

					{
						saving ?
						<div style={{padding: 10}}>
							<LinearProgress />
							<p>Saving...</p>
						</div>
						:
						<div style={{display: 'flex', justifyContent: 'space-between', padding: 10}}>
							<div>
								{ edited && 
									<div>
										<StandardButton onClick={this.saveEdits}>Save Changes</StandardButton> 
										<CriticalButton onClick={this.cancelEdits}>Cancel</CriticalButton>
									</div>	
								}
							</div>
						</div>
					}

				</div>
				
			)
		}
	}
}
export default EditModelForm;