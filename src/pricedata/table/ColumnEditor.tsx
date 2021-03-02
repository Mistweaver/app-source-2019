import { Chip, Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { Column } from "./Column";

interface Props {
	columns: Column[];
	toggleColumnVisibility: (column: Column) => void
}

export const ColumnEditor = (props: Props) => {
	
	let modelProperties: Column[] = [];
	let priceDataProperties: Column[] = [];
	let corePriceData: Column[] = [];
	let variables: Column[] = [];
	let equations: Column[] = [];

	for(let i = 0; i < props.columns.length; i++) {
		let column = props.columns[i];
		switch(column.type) {
			case "CORE":
				corePriceData.push(column);
				break;
			case "MODEL":
				modelProperties.push(column);
				break;
			case "PRICEDATA":
				priceDataProperties.push(column);
				break;
			case "VAR":
				variables.push(column);
				break;
			case "EQN":
				equations.push(column);
				break;
			default:
				break;
		}
	}

	// list of available columns
	return(
		<div style={{padding: 15}}>
			<div style={{marginBottom: 15}}>Click to highlight the fields you wish to export</div>
			<Grid container spacing={1}>
				<Grid item xs={3}>
					<div style={{marginBottom: 10, fontWeight: 700}}>Model Properties</div>
					<div style={{display: 'flex', flexDirection: 'column'}}>
					{
						modelProperties.map(column => (
							<ColumnButton key={column.id} column={column} toggle={props.toggleColumnVisibility} />
						))
					}
					</div>
					<div style={{marginBottom: 10, marginTop: 10, fontWeight: 700}}>Price Data Properties</div>
					<div style={{display: 'flex', flexDirection: 'column'}}>
					{
						priceDataProperties.map(column => (
							<ColumnButton key={column.id} column={column} toggle={props.toggleColumnVisibility} />
						))
					}	
					</div>
				</Grid>
				<Grid item xs={3}>
					<div style={{marginBottom: 10, fontWeight: 700}}>Core Price Data</div>
					<div style={{display: 'flex', flexDirection: 'column'}}>
					{
						corePriceData.map(column => (
							<ColumnButton key={column.id} column={column} toggle={props.toggleColumnVisibility} />
						))
					}	
					</div>
				</Grid>
				<Grid item xs={3}>
					<div style={{marginBottom: 10, fontWeight: 700}}>Variables</div>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						{
							variables.map(column => (
								<ColumnButton key={column.id} column={column} toggle={props.toggleColumnVisibility} />
							))
						}
					</div>
				</Grid>
				<Grid item xs={3}>
					<div style={{marginBottom: 10, fontWeight: 700}}>Equations</div>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						{
							equations.map(column => (
								<ColumnButton key={column.id} column={column} toggle={props.toggleColumnVisibility} />
							))
						}
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

const ColumnButton = (props: { column: Column; toggle: (column: Column) => void }) => {
	const { column } = props;

	function changeVisibility() {
		props.toggle(new Column(column.id, column.key, column.header, column.type, !column.visible))
	}

	if(props.column.visible) {
		return( 
			<Tooltip title={props.column.header}>
				<Chip label={props.column.header} onClick={changeVisibility} color="primary" /> 
			</Tooltip>
		)
	} else {
		return( 
			<Tooltip title={props.column.header}>
				<Chip label={props.column.header} onClick={changeVisibility} clickable /> 
			</Tooltip>
		)
	}

}