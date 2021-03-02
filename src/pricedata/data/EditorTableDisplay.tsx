import { Grid } from "@material-ui/core";
import { Edit, OpenInNew, RemoveCircle, ViewColumn } from "@material-ui/icons";
import React from "react";
import { PriceData } from "../objects/PriceData";
import { SeriesData } from "../objects/SeriesData";
import { DynamicColumn } from "./tables/DynamicColumn";
import SeriesDisplayComponent from "./tables/SeriesDisplayComponent";

interface Props {
	// data
	selectedPriceDataId: string;
	listOfSeries: SeriesData[];
	selectedPriceData: PriceData[];
	columns: DynamicColumn[];

	// functions
	viewData: (priceData: PriceData) => void;
	addData: (priceData: PriceData) => void;
	removeData: (priceData: PriceData) => void;
	addSeries: (priceData: PriceData[]) => void;
	removeSeries: (PriceData: PriceData[]) => void;
	selectAll: () => void;
	clearSelection: () => void;
	reload: () => void;
}

const EditorTableDisplay = (props: Props) => {
	if(props.listOfSeries.length === 0) {
		return null;
	} else {
		return(
			<Grid item xs={props.selectedPriceDataId === "" ? 12 : 9}>
				<div style={{maxHeight: '65vh', overflow: 'auto', backgroundColor: "rgb(231, 231, 231)"}}>
					<div id="tableControls">
						<OpenInNew onClick={props.selectAll} style={{color: 'green', marginRight: 2}} />
						<RemoveCircle onClick={props.clearSelection} style={{color: 'red', marginRight: 2}} />
						<ViewColumn style={{marginRight: 2}} />
					</div>
					<table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
						<thead>
							<tr style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}></th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Name</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Model No.</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Manufacturer</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Type</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>WxL</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Created On</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Draft Date</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Exp Date</th>
								<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Price</th>
								{
									props.columns.map(column => (
										<th>{column.columnType + " : " + column.key}<Edit style={{marginLeft: 10}} /></th>
									))
								}
							</tr>
						</thead>
						<tbody>
						{
							props.listOfSeries.map((series, index) => (
								<SeriesDisplayComponent 
									key={series.seriesName + index}
									series={series.priceData}
									seriesName={series.seriesName}
									selectedData={props.selectedPriceData}
									columns={props.columns}

									viewData={props.viewData}
									addData={props.addData}
									removeData={props.removeData}
									addSeries={props.addSeries}
									removeSeries={props.removeSeries}
									
								/>
							))
						}
						</tbody>
					</table>
				</div>
			</Grid>
		)
	}
	
}

export default EditorTableDisplay;