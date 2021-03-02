import React from 'react';
import { Model } from '../../objects/models/Model';

interface ModelDisplayComponentProps {
	model: Model;
}

const ModelDisplayComponent = (props: ModelDisplayComponentProps) => {
	return(
		<>
			<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>Details</div>
			<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)", padding: 5}}>
				<span>{props.model.modelNumber}</span>
				<span>{props.model.type}</span>
				<span>{props.model.numberOfBedrooms.toString() + " bed " + props.model.numberOfBathrooms.toString() + " bathrooms" }</span>
				<span>{props.model.numberOfDens !== 0 && props.model.numberOfDens.toString() + " dens"}</span>
				<span>{props.model.width.toString() + " ft. wide"}</span>
				<span>{props.model.length1.toString() + " ft. "}{props.model.length2 !== 0 && "( " + props.model.length2.toString() + " ft. )"}  long</span>
				<span>{props.model.estimatedSquareFeet.toString() + " sq. ft."}</span>
				<span>Extra Features: {props.model.extraFeatures}</span>
				<span>Notes: {props.model.notes}</span>
			</div>
		</>
		
	)
}

export default ModelDisplayComponent;