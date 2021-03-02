import React from 'react';
import { Grid, Button, Card, CardContent,LinearProgress } from '@material-ui/core';
import { FACTORY_DISPLAY } from '../../../data/tablesettings';
import { sortFactories } from '../../../utilities/UtilityServices';

import { Factory } from '../../../objects/factory/Factory';
import FactoryPane from './FactoryPane';

interface FactoryManagerProps {
	factories: Factory[];
	reloadFactories: () => void;
}

interface FactoryManagerState {
	showFactoryPane: boolean;
	selectedFactory: Factory;
	refresh: number;
	loading: boolean;
}

class FactoryManager extends React.Component<FactoryManagerProps, FactoryManagerState> {
	constructor(props: FactoryManagerProps) {
		super(props);
		this.state = {
			showFactoryPane: false,
			selectedFactory: new Factory(),
			refresh: 0,
			loading: false,
		}

		this.selectFactory = this.selectFactory.bind(this);
		this.addFactory = this.addFactory.bind(this);
	}


	private selectFactory(object: Object) {
		this.setState({
			showFactoryPane: true,
			selectedFactory: Object.assign(new Factory(), object)
		});
	}

	private addFactory() {
		this.setState({
			showFactoryPane: true,
			selectedFactory: new Factory()
		});
	}

	public renderRowCells(object: any) {
		let cells: any[] = [];
		FACTORY_DISPLAY.forEach(header=> {
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
		const { factories } = this.props;
		const { showFactoryPane, selectedFactory } = this.state;
		factories.sort(sortFactories);
		console.log(factories);
		return(
			<div>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<Card>
							<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>{factories.length} Total Factories</div>
							<CardContent>
								{
									this.state.loading &&
									<LinearProgress />
								}
								<Button onClick={this.addFactory} variant="contained" color="primary" style={{marginBottom: 10}}>Add Factory</Button>
								<div>
									{
										factories.length === 0 && this.state.loading === false ?
										<div>
											No factories found.  If you believe this to be an error, please contact an IT admin.
										</div>
										:
										<table style={{width: '100%', fontSize: 13}}>
											<thead>
												<tr >
													{
														FACTORY_DISPLAY.map(header => (
															<th key={header.columnDef} style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}}>{header.header}</th>
														))
													}
												</tr>
											</thead>
											<tbody>
												{
													factories.map(factory => (
														<tr key={factory.id} onClick={() => this.selectFactory(factory)}  style={{cursor: 'pointer'}} >
															{this.renderRowCells(factory)}
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
						

						{ showFactoryPane === true &&
							<FactoryPane 
								factory={selectedFactory}
								loadFactories={this.props.reloadFactories}
							/>
						}
					</Grid>
				</Grid>
			</div>
			
		)
	}
}

export default FactoryManager;