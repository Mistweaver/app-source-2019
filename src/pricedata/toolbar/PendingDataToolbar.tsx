import { Chip, Tooltip } from '@material-ui/core';
import { Pageview, Clear } from '@material-ui/icons';
import React from 'react';
import { EquationData } from '../equations/objects/EquationData';
import { PriceData } from '../objects/PriceData';
import { VariableData } from '../variables/objects/VariableData';
import { ExportData } from './data/ExportData';
import ReturnPendingDataToDraftComponent from './data/ReturnPendingDataToDraftComponent';

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

const PendingDataToolbar = (props: Props) => {
	const { selectedData, selectedVariable, selectedEquation } = props;
	const selectedDataSize = selectedData.length;

	if(selectedDataSize < 1) {
		return null
	} else {
		return(
			<div style={{marginBottom: 5, backgroundColor: 'rgb(231, 231, 231)'}}>
				<div style={{display: 'flex', padding: 3}}>
					<div style={{padding: 3, display: 'flex'}}>
						<ExportData selectedPriceData={selectedData} />

						<ReturnPendingDataToDraftComponent selectedPriceData={selectedData} reload={props.reloadData} />
					</div>
				</div>
				{/* SECOND ROW */}
				<div style={{ padding: 3, display: 'flex'}}>
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
					<div style={{display: 'flex', marginLeft: 5, borderLeft: '1px solid black', borderRight: '1px solid black'}}>
						<Tooltip title="View Selection Only">
							<div className="buttonMinimal">
								<Pageview style={{color: 'darkgreen'}} />
							</div>						
						</Tooltip>
					</div>
					<div style={{display: 'flex', marginLeft: 5}}>
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
		)
	}
}

export default PendingDataToolbar;