import { LinearProgress } from "@material-ui/core";
import React from "react";

export function SaveBox() {
	return(
		<div style={{textAlign: 'center', padding: 10}}>
			<div style={{marginBottom: 10}}>Saving...</div>
			<LinearProgress />
		</div>
	)
}