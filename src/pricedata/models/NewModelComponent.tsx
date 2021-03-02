import React from 'react';
import { ModelForm } from './ModelForm';
import { Model } from '../../objects/models/Model';
import { addModel } from './ModelServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { NewModelPackage } from '../objects/NewModelPackage';

interface NewModelProps {
	modelId: string;
	modelNumber: string;
	cancelModelCreation: () => void;
	returnNewModel: (model: Model) => void;
}

interface NewModelState {
	// model information
	factoryId: string;
	type: string;
	width: number;
	length1: number;
	length2: number;
	numberOfBathrooms: number;
	numberOfBedrooms: number;
	numberOfDens: number;
	extraFeatures: string;
	notes: string;
	estimatedSquareFeet: number;

	adding: boolean;
	error: boolean;
	errorMessage: string;

}

const initialState = {
	factoryId: "",
	type: "HUD",
	width: 0,
	length1: 0,
	length2: 0,
	numberOfBathrooms: 0,
	numberOfBedrooms: 0,
	numberOfDens: 0,
	extraFeatures: "",
	notes: "",
	estimatedSquareFeet: 0,
	adding: false,
	error: false,
	errorMessage: ""
}

class NewModelComponent extends React.Component<NewModelProps, NewModelState> {
	constructor(props: NewModelProps) {
		super(props);
		this.state = initialState;

		this.handleInput = this.handleInput.bind(this);
		this.handleNumericInput = this.handleNumericInput.bind(this);
		this.add = this.add.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	
	private handleInput(event: { target: { name: string, value: string }; } ) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value });
	}

	private handleNumericInput(event: { target: { name: string, value: string }; } ) {
		if(!isNaN(parseFloat(event.target.value))) {
			//@ts-ignore
			this.setState({ [event.target.name]: parseFloat(event.target.value) });
		}
	}

	private add() {
		this.setState({ adding: true });

		let model = new NewModelPackage();
		model.modelNumber = this.props.modelNumber;
		model.factoryId = this.state.factoryId;
		model.type = this.state.type;
		model.width = this.state.width;
		model.length1 = this.state.length1;
		model.length2 = this.state.length2;
		model.numberOfBathrooms = this.state.numberOfBathrooms;
		model.numberOfBedrooms = this.state.numberOfBedrooms;
		model.numberOfDens = this.state.numberOfDens;
		model.extraFeatures = this.state.extraFeatures;
		model.notes = this.state.notes;
		model.estimatedSquareFeet = this.state.estimatedSquareFeet;

		// add the model to the system.  This includes adding it to the inventory for the given location
		addModel(model).then(res => {
			this.setState({ adding: false });
			if(validateHTMLResponse(res)) {
				this.setState(initialState);
				this.props.returnNewModel(res.data);
			} else {
				this.setState({error: true, errorMessage: res.data });
			}
		});
	}

	private cancel() {
		this.setState(initialState);
		this.props.cancelModelCreation();
	}

	public render() {
		if(this.props.modelId === "" && this.props.modelNumber !== "") {
			return(
				<div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Add New Model {this.props.modelNumber}</div>
					<div style={{padding: 15, backgroundColor: "rgb(231, 231, 231)"}}>
						<ModelForm 
							handleInput={this.handleInput}
							handleNumericInput={this.handleNumericInput}
							factoryId={this.state.factoryId}
							type={this.state.type}
							numberOfBathrooms={this.state.numberOfBathrooms}
							numberOfBedrooms={this.state.numberOfBedrooms}
							numberOfDens={this.state.numberOfDens}
							width={this.state.width}
							length1={this.state.length1}
							length2={this.state.length2}
							extraFeatures={this.state.extraFeatures}
							notes={this.state.notes}
							estimatedSquareFeet={this.state.estimatedSquareFeet}
						
						/>	
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<button onClick={this.add}>Add This Model</button>
							<button onClick={this.cancel}>Cancel</button>
						</div>		
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default NewModelComponent;