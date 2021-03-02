import { Chip, Tooltip } from '@material-ui/core';
import { Pageview, Clear } from '@material-ui/icons';
import React from 'react';
import ExportCSV from '../../components/dataexport/ExportCSV';
import { EquationData } from '../equations/objects/EquationData';
import { PriceData } from '../objects/PriceData';
import { VariableData } from '../variables/objects/VariableData';
import CreateDraftsComponent from './data/CreateDraftsComponent';
import { ExportData } from './data/ExportData';
import { SetExpirationDate } from './data/SetExpirationDate';

interface Props {
	selectedLocationId: string;
	selectedData: PriceData[];
	selectedVariable: VariableData;
	selectedEquation: EquationData;

	reloadData: () => void;
	clearSelection: () => void;
	clearSelectedVariable: () => void;
	clearSelectedEquation: () => void;
}

const ActiveDataToolbar = (props: Props) => {
	const { selectedData, selectedVariable, selectedEquation } = props;
	const selectedDataSize = selectedData.length;

	if(selectedDataSize < 1) {
		return null
	} else {
		return(
			<div style={{marginBottom: 5, backgroundColor: 'rgb(231, 231, 231)'}}>
				<div style={{display: 'flex', padding: 3}}>
					<div style={{padding: 3, display: 'flex'}}>
						<CreateDraftsComponent 
							selectedData={selectedData}
							reload={props.reloadData}
						/>
						<SetExpirationDate selectedPriceData={selectedData} reload={props.reloadData} />
						<ExportData selectedPriceData={selectedData} />
						<ExportCSV priceData={selectedData} />
						<div style={{display: 'flex', marginLeft: 5, paddingLeft: 10, borderLeft: '1px solid black', }}>
							<Chip 
								label={selectedDataSize + " drafts selected"} 
								style={{color: 'green'}}
								variant="outlined" 
								onDelete={props.clearSelection}
								deleteIcon={
									<Tooltip title="Clear Selection">
										<Clear style={{color: 'grey'}} />
									</Tooltip>
								}
							/>
							<Tooltip title="View Selection Only">
								<div className="buttonMinimal">
									<Pageview style={{color: 'darkgreen'}} />
								</div>						
							</Tooltip>
						</div>
						<div style={{display: 'flex', marginLeft: 5, paddingLeft: 10, borderLeft: '1px solid black', }}>
							{
								selectedVariable.id !== "" &&
								
								<Chip
									label={"VAR " + selectedVariable.name + " selected"}
									variant="outlined"
									color="primary"
									onDelete={props.clearSelectedVariable}
								/>
							}
							{
								selectedEquation.id !== "" &&
								<Chip
									label={"EQN " + selectedEquation.name + " selected"}
									variant="outlined"
									color="primary"
									onDelete={props.clearSelectedEquation}
								/>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ActiveDataToolbar;