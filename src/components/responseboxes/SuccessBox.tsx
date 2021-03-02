import { CheckCircle } from "@material-ui/icons";
import React from "react";

export function SuccessBox() {
	return(
		<div style={{textAlign: 'center', padding: 10}}>
			<CheckCircle style={{color: 'green'}} />
			<div style={{marginBottom: 10}}>All good!</div>
		</div>
	)
}