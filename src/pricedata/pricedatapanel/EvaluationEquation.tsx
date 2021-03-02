import { Button, Popover } from "@material-ui/core";
import React, { useState } from "react";
import { EquationData } from "../equations/objects/EquationData";
import { detokenizeEquation, evaluateEquation, PriceData } from "../objects/PriceData";

interface Props {
	equation: EquationData;
	priceData: PriceData;
}

export const EvaluateEquation = (props: Props) => {
	const [render, setRender] = useState(false);
	// const [error, setError] = useState(false);
	const [equation, setEquation] = useState("");
	const [value, setValue] = useState("");

	let detokenizedEquation = "";
	let evaluatedEquation = "";

	function evaluate() {
		setRender(true);
		detokenizedEquation = detokenizeEquation(props.equation.equation, props.priceData); 
		evaluatedEquation = evaluateEquation(props.equation.equation, props.priceData)
		console.log(detokenizedEquation);
		console.log(evaluatedEquation);
		setEquation(detokenizedEquation); 
		setValue(evaluatedEquation);
	}
	

	return(
		<div>
			<Button variant="outlined" color="primary" onClick={evaluate}>=</Button>
			<Popover
				open={render}
				// anchorEl={anchorEl}
				onClose={() => setRender(false)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<div style={{padding: 20, border: '3px solid lightgrey'}}>
					<div><b>{props.equation.name}</b> : {props.equation.key} </div>
					{props.equation.equation}
					<div>Evaluation:</div>
					{equation + " = "}<b>{value}</b>
				</div>
			</Popover>
		</div>


	)



}