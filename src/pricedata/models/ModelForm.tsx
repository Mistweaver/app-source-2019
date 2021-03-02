import React from 'react';

interface ModelFormProps {
	handleInput: (event: { target: { name: string, value: string }; }) => void;
	handleNumericInput: (event: { target: { name: string, value: string }; } ) => void;
	factoryId: string;
	type: string;
	numberOfBedrooms: number;
	numberOfBathrooms: number;
	numberOfDens: number;
	width: number;
	length1: number;
	length2: number;
	estimatedSquareFeet: number;
	extraFeatures: string;
	notes: string;
}

export const ModelForm = (props: ModelFormProps) => {
	return(
		<div>
			<div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', marginBottom: 10}}>
				<div className="flexedRow">
					<span>Manufacturer</span>
					<input name="factoryId" value={props.factoryId} onChange={props.handleInput} />
				</div>
				<div className="flexedRow">
					<span>Type</span>
					<select name="type" value={props.type} onChange={props.handleInput}>
						<option value="HUD">HUD</option>
						<option value="PM">PM</option>
						<option value="PM-HUD">PM-HUD</option>
					</select>
				</div>
				<div className="flexedRow">
					<span>Bedrooms</span>
					<input name="numberOfBedrooms" type="number" min="0.01" step="0.01" value={props.numberOfBedrooms} onChange={props.handleNumericInput} />
				</div>
				<div className="flexedRow">
					<span>Bathrooms</span>
					<input name="numberOfBathrooms" type="number" min="0.01" step="0.01" value={props.numberOfBathrooms} onChange={props.handleNumericInput} />
				</div>
				<div className="flexedRow">
					<span>Dens</span>
					<input name="numberOfDens" type="number" min="0.01" step="0.01" value={props.numberOfDens} onChange={props.handleNumericInput} />
				</div>

				<div className="flexedRow">
					<span>Width</span>
					<input name="width" type="number" min="0.01" step="0.01" value={props.width} onChange={props.handleNumericInput} />
				</div>
				<div className="flexedRow">
					<span>Length 1 </span>
					<input name="length1" type="number" min="0.01" step="0.01" value={props.length1} onChange={props.handleNumericInput} />
				</div>
				<div className="flexedRow">
					<span>Length 2 </span>
					<input name="length2" type="number" min="0.01" step="0.01" value={props.length2} onChange={props.handleNumericInput} />
				</div>
				<div className="flexedRow">
					<span>Sq. Feet</span>
					<input name="estimatedSquareFeet" type="number" min="0.01" step="0.01" value={props.estimatedSquareFeet} onChange={props.handleNumericInput} />
				</div>
				<div style={{display: 'flex', flexDirection: 'column', marginTop: 10, marginBottom: 10}}>
					<span>Extra Features</span>
					<textarea name="extraFeatures" value={props.extraFeatures} onChange={props.handleInput} />
				</div>

				<div style={{display: 'flex', flexDirection: 'column'}}>
					<span>Notes</span>
					<textarea name="notes" value={props.notes} onChange={props.handleInput} />
				</div>
			</div>
		</div>
	)
}