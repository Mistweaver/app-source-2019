import React from 'react';
import { Grid, Button, Card, CardContent,LinearProgress } from '@material-ui/core';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { AvalaraCompanyLocation } from '../../../objects/avalaraobjects/AvalaraCompanyLocation';
import { SALES_OFFICE_DISPLAY } from '../../../data/tablesettings';
import { getCompanyLocations } from '../../../services/AvalaraServices';
import SalesOfficePane from './SalesOfficePane';
import { sortSalesOffices } from '../../../utilities/UtilityServices';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { getAllFactories } from '../../../services/FactoryServices';
import { Factory } from '../../../objects/factory/Factory';

interface LocationControlProps {
	salesOffices: SalesOffice[];
	reloadOffices: () => void;
}

interface LocationControlState {
	showSalesOfficePane: boolean;
	selectedSalesOffice: SalesOffice;
	refresh: number;
	avalaraLocations: AvalaraCompanyLocation[];
	factories: Factory[];
	loading: boolean;
}

class LocationControl extends React.Component<LocationControlProps, LocationControlState> {
	constructor(props: LocationControlProps) {
		super(props);
		this.state = {
			showSalesOfficePane: false,
			selectedSalesOffice: new SalesOffice(),
			refresh: 0,
			avalaraLocations: [],
			factories: [],
			loading: false,
		}

		this.selectSalesOffice = this.selectSalesOffice.bind(this);
		this.addSalesOffice = this.addSalesOffice.bind(this);
	}

	componentDidMount() {
		getCompanyLocations().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					avalaraLocations: res.data.object.value
				});
			}
		});

		getAllFactories().then(res => {
			console.log(res);
			if(validateHTMLResponse(res)) {
				this.setState({
					factories: res.data
				});
			}
		});
	}



	private selectSalesOffice(object: Object) {
		this.setState({
			showSalesOfficePane: true,
			selectedSalesOffice: Object.assign(new SalesOffice(), object)
		});
	}

	private addSalesOffice() {
		this.setState({
			showSalesOfficePane: true,
			selectedSalesOffice: new SalesOffice()
		});
	}

	public renderRowCells(object: any) {
		let cells: any[] = [];
		SALES_OFFICE_DISPLAY.forEach(header=> {
			if(header.columnDef === 'modificationTime') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{new Date(object[header.columnDef]).toLocaleString()}</td>
				)
			} else if(header.columnDef === 'creationTime') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{new Date(object[header.columnDef]).toLocaleDateString()}</td>
				)
			} else if(header.columnDef === 'stateId') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			} else if(header.columnDef === 'userId') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			} else if(header.columnDef === 'month') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{returnMonthIntAsString(object[header.columnDef])}</td>
				)
			} else {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			}
		})
		return cells;
	}


	public render() {
		const { salesOffices } = this.props;
		const { showSalesOfficePane, selectedSalesOffice, avalaraLocations, factories } = this.state;
		salesOffices.sort(sortSalesOffices);
		return(
			<div>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<Card>
							<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>{salesOffices.length} Total Offices</div>
							<CardContent>
								{
									this.state.loading &&
									<LinearProgress />
								}
								<Button onClick={this.addSalesOffice} variant="contained" color="primary" style={{marginBottom: 10}}>Add Office</Button>
								<div>
									{
										salesOffices.length === 0 && this.state.loading === false ?
										<div>
											No leads found.  If you believe this to be an error, contact an IT admin
										</div>
										:
										<table style={{width: '100%', fontSize: 13}}>
											<thead>
												<tr >
													{
														SALES_OFFICE_DISPLAY.map(header => (
															<th key={header.columnDef} style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}}>{header.header}</th>
														))
													}
												</tr>
											</thead>
											<tbody>
												{
													salesOffices.map(office => (
														<tr key={office.id} onClick={() => this.selectSalesOffice(office)}  style={{cursor: 'pointer'}} >
															{this.renderRowCells(office)}
														</tr>
													))
												}
											</tbody>
										</table>
									}
								</div>
									
								
							</CardContent>
						</Card>
						
					</Grid>
					<Grid item xs={7}>
						

						{ showSalesOfficePane === true &&
							<SalesOfficePane 
								salesOffice={selectedSalesOffice}
								loadOffices={this.props.reloadOffices}
								avalaraLocations={avalaraLocations}
								factories={factories}
							/>
						}
					</Grid>
				</Grid>
			</div>
			
		)
	}
}

export default LocationControl;