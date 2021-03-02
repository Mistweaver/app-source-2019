import { Chip, Tooltip } from '@material-ui/core';
import { Pageview, Clear } from '@material-ui/icons';
import React from 'react';
import CreateNewEquationComponent from './equations/CreateNewEquationComponent';
import { EquationData } from '../equations/objects/EquationData';
import { PriceData } from '../objects/PriceData';
import { VariableData } from '../variables/objects/VariableData';
import CreateNewVariableComponent from './variables/CreateNewVariableComponent';
import CreateDraftsComponent from './data/CreateDraftsComponent';
import DeleteDraftComponent from './data/DeleteDraftComponent';
import RecalculateDataComponent from './data/RecalculateDataComponent';
import SeriesNameEditComponent from './data/SeriesNameEditComponent';
import SubmitDraftsComponent from './data/SubmitDraftsComponent';
import TemplateApplyComponent from './data/TemplateApplyComponent';
import AddEquationComponent from './equations/AddEquationComponent';
import EditEquationDataComponent from './equations/EditSelectedEquationDataComponent';
import RemoveEquationDataComponent from './equations/RemoveEquationDataComponent';
import AddVariableComponent from './variables/AddVariableComponent';
import AddVariableDataComponent from './variables/AddSelectedVariableDataComponent';
import EditVariableDataComponent from './variables/EditSelectedVariableDataComponent';
import RemoveVariableDataComponent from './variables/RemoveVariableDataComponent';
import { SetActiveDate } from './data/SetActiveDate';
import { SetExpirationDate } from './data/SetExpirationDate';
import { ExportData } from './data/ExportData';

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

const DraftToolbar = (props: Props) => {
	const { selectedData, selectedVariable, selectedEquation } = props;
	const selectedDataSize = selectedData.length;

	if(selectedDataSize < 1) {
		return null
	} else {
		return(
			<div style={{marginBottom: 5, backgroundColor: 'rgb(231, 231, 231)'}}>
				<div style={{display: 'flex', padding: 3}}>
					<div style={{padding: 3, display: 'flex'}}>
						{/*<Home />*/}
						<ExportData selectedPriceData={selectedData} />

						<SeriesNameEditComponent selectedPriceData={selectedData} />
						<SetActiveDate selectedPriceData={selectedData} reload={props.reloadData} />
						<SetExpirationDate selectedPriceData={selectedData} reload={props.reloadData} />
						<RecalculateDataComponent selectedPriceData={selectedData} reload={props.reloadData} />
						<SubmitDraftsComponent selectedPriceData={selectedData} reload={props.reloadData} />
						<DeleteDraftComponent selectedPriceData={selectedData} reloadData={props.reloadData} />
					</div>
					<div style={{marginLeft: 5, borderLeft: '1px solid black', padding: 3, display: 'flex'}}>
						<CreateDraftsComponent 
							selectedData={selectedData}
							reload={props.reloadData}
						/>
						<TemplateApplyComponent dataToApplyTemplateTo={selectedData} selectedTemplate={new PriceData()} reload={props.reloadData} />
					</div>
					<div style={{marginLeft: 5, borderLeft: '1px solid black', padding: 3, display: 'flex'}}>
						<Chip label="VARS" />
						<AddVariableComponent selectedPriceData={selectedData} reload={props.reloadData} />
						<CreateNewVariableComponent reload={props.reloadData} />
						{
							selectedVariable.id !== "" &&
							<>
								<AddVariableDataComponent selectedPriceData={selectedData} selectedVariable={selectedVariable} reload={props.reloadData} />
								<EditVariableDataComponent selectedPriceData={selectedData} selectedVariable={selectedVariable} reload={props.reloadData} />
								<RemoveVariableDataComponent selectedPriceData={selectedData} selectedVariable={selectedVariable} reload={props.reloadData} />
							</>
						}
					</div>
					<div style={{marginLeft: 5, borderLeft: '1px solid black', padding: 3, display: 'flex'}}>
						<Chip label="EQNS" />
						<AddEquationComponent selectedPriceData={selectedData} reload={props.reloadData} />
						<CreateNewEquationComponent reload={props.reloadData} />
						{
							selectedEquation.id !== "" &&
							<>
								<EditEquationDataComponent selectedPriceData={selectedData} selectedEquation={selectedEquation} reload={props.reloadData} />
								<RemoveEquationDataComponent selectedPriceData={selectedData} selectedEquation={selectedEquation} reload={props.reloadData} />
							</>
							
						}
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

export default DraftToolbar;