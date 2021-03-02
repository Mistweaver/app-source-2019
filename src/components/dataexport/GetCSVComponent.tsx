import { Button, LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { PATH } from "../../ApplicationConfiguration";
import { PriceData } from "../../pricedata/objects/PriceData";
import { Column } from "../../pricedata/table/Column";
import axiosInterceptor from "../../utilities/AxiosInterceptor";

interface Props {
	priceData: PriceData[];
	columns: Column[];
}

export const GetCSVComponent = (props: Props) => {
	const [loading, setLoading ] = useState(false);
	const [error, setError] = useState(false);
	// const [success, setSuccess] = useState(false);

	function getCSVData() {
		setError(false);
		setLoading(true);

		// build a list of the price data IDs
		let priceDataIds: string[] = [];
		props.priceData.forEach(data => {
			priceDataIds.push(data.id);
		});
		// build a list of the column object IDs
		let columnIds: string[] = [];
		props.columns.forEach(column => {
			columnIds.push(column.id);
		});

		// send a list of the price data and column keys to the server
		axiosInterceptor.post(PATH + '/pricedata/csv', {
			priceDataIds: priceDataIds,
			columnIds: columnIds
		}).then(response => {
			// get a CSV file back
			console.log(response);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setError(true);
			setLoading(false);
		});
	
	}

	if(loading) {
		return(
			<div style={{padding: 10}}>
				<div style={{marginBottom: 10}}>Creating CSV File...</div>
				<LinearProgress />
			</div>
		)
	} else {
		return(
			<div style={{marginTop: 10}}>
				<Button variant="outlined" onClick={getCSVData}>Get CSV Data</Button>
				{ error && <div style={{color: 'red'}}>Oops.  An error occurred.</div> }
			</div>
		)
	}
}