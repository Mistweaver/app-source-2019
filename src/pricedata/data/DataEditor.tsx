import { Grid } from '@material-ui/core';
import React from 'react';
import { ACTIVE, DRAFT, PENDING } from '../../data/staticdata';
import { EquationData } from '../equations/objects/EquationData';
import { PriceData } from '../objects/PriceData';
import { SeriesData } from '../objects/SeriesData';
import { VariableData } from '../variables/objects/VariableData';
import EditorTableDisplay from './EditorTableDisplay';
import PriceDataPanel from '../pricedatapanel/PriceDataPanel';
import { DynamicColumn } from './tables/DynamicColumn';
import ActiveDataToolbar from '../toolbar/ActiveDataToolbar';
import DraftToolbar from '../toolbar/DraftToolbar';
import PendingDataToolbar from '../toolbar/PendingDataToolbar';

interface Props {
	locationQueryId: string;
	render: boolean;
	dataType: string;
	data: SeriesData[];

	reload: () => void;
}

interface State {
	viewingPriceDataId: string;
	selectedDataList: PriceData[];

	selectedVariable: VariableData;
	selectedEquation: EquationData;

	dynamicColumns: DynamicColumn[];


}

class DataEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			viewingPriceDataId: "",
			selectedDataList: [],

			selectedEquation: new EquationData(),
			selectedVariable: new VariableData(),

			dynamicColumns: []


		}
		this.viewData = this.viewData.bind(this);
		this.clearSelection = this.clearSelection.bind(this);
		this.addPriceDataToSelection = this.addPriceDataToSelection.bind(this);
		this.removePriceDataFromSelection = this.removePriceDataFromSelection.bind(this);
		this.addGroupToList = this.addGroupToList.bind(this);
		this.removeGroupFromList = this.removeGroupFromList.bind(this);

		this.selectEquation = this.selectEquation.bind(this);
		this.selectVariable = this.selectVariable.bind(this);
		this.clearSelectedEquation = this.clearSelectedEquation.bind(this);
		this.clearSelectedVariable = this.clearSelectedVariable.bind(this);

		
		this.selectAll = this.selectAll.bind(this);
		this.addColumn = this.addColumn.bind(this);
		this.updateColumn = this.updateColumn.bind(this);
		this.removeColumn = this.removeColumn.bind(this);
	}
	
	private viewData(data: PriceData) { this.setState({ viewingPriceDataId: data.id }); }

	private selectEquation(equation: EquationData) {
		this.setState({ selectedEquation: equation });
	}

	private clearSelectedEquation() {
		this.setState({ selectedEquation: new EquationData() })
	}

	private selectVariable(variable: VariableData) {
		this.setState({ selectedVariable: variable });
	}

	private clearSelectedVariable() {
		this.setState({ selectedVariable: new VariableData() })
	}

	private addPriceDataToSelection(data: PriceData) {
		let newArray = this.state.selectedDataList.slice();
		newArray.splice(0, 0, data);
		this.setState({ selectedDataList: newArray });
	}

	private removePriceDataFromSelection(data: PriceData) {
		const { selectedDataList } = this.state;
		var i = 0, len = selectedDataList.length;
		while(i < len) {
			if(selectedDataList[i].id === data.id) {
				// index = i;
				let newArray = this.state.selectedDataList.slice();
				newArray.splice(i, 1);
				this.setState({ selectedDataList: newArray });
				i = len;
			}
			i++;
		}
	}

	private addGroupToList(group: PriceData[]) {
		let newArray = this.state.selectedDataList.slice();
		group.forEach(data => {
			newArray.splice(0, 0, data);
		});
		this.setState({ selectedDataList: newArray });
	}

	private removeGroupFromList(group: PriceData[]) {
		const { selectedDataList } = this.state;
		let newArray = selectedDataList.slice();
		group.forEach(data => {
			var i = 0;
			while(i < newArray.length) {
				if(newArray[i].id === data.id) {
					newArray.splice(i, 1);
					i = 0;
				}
				i++;
			}
		});
		this.setState({ selectedDataList: newArray });
	}

	private clearSelection() {
		this.setState({ selectedDataList: [] });
	}

	private selectAll() {
		let allData: PriceData[] = [];
		this.props.data.forEach(series => {
			series.priceData.forEach(data => {
				allData.push(data);
			});
		});
		this.setState({ selectedDataList: allData });
	}

	private addColumn() {
		let newArray = this.state.dynamicColumns.slice();
		newArray.splice(0, 0, new DynamicColumn());
		this.setState({ dynamicColumns: newArray });
	}

	private removeColumn(index: number) {
		let newArray = this.state.dynamicColumns.slice();
		newArray.splice(index, 1);
		this.setState({ dynamicColumns: newArray });
	}

	private updateColumn(index: number, update: DynamicColumn) {
		const newArray = [...this.state.dynamicColumns];
		newArray[index] = update;
		this.setState({ dynamicColumns: newArray });
	}

	private renderToolbar(dataType: string) {
		const { locationQueryId,  } = this.props;
		const { selectedDataList } = this.state;

		switch(dataType) {
			case ACTIVE:
				return(
					<ActiveDataToolbar 
						selectedLocationId={locationQueryId}
						selectedData={selectedDataList}
						selectedEquation={this.state.selectedEquation}
						selectedVariable={this.state.selectedVariable}

						clearSelectedEquation={this.clearSelectedEquation}
						clearSelectedVariable={this.clearSelectedVariable}
						clearSelection={this.clearSelection}
						reloadData={this.props.reload}
					/>
				);
			case PENDING:
				return(
					<PendingDataToolbar 
						selectedLocationId={locationQueryId}
						selectedData={selectedDataList}
						selectedEquation={this.state.selectedEquation}
						selectedVariable={this.state.selectedVariable}

						clearSelectedEquation={this.clearSelectedEquation}
						clearSelectedVariable={this.clearSelectedVariable}
						clearSelection={this.clearSelection}
						reloadData={this.props.reload}
					/>
				);
			case DRAFT:
				return(
					<DraftToolbar 
						selectedLocationId={locationQueryId}
						selectedData={selectedDataList}
						selectedEquation={this.state.selectedEquation}
						selectedVariable={this.state.selectedVariable}

						clearSelectedEquation={this.clearSelectedEquation}
						clearSelectedVariable={this.clearSelectedVariable}
						clearSelection={this.clearSelection}
						reloadData={this.props.reload}
					/>
				);
			default:
				return null;
		}
	}


	public render() {
		const { data, render, dataType } = this.props;
		const { viewingPriceDataId, selectedDataList, dynamicColumns } = this.state;

		if(render) {
			return(
				<div>
					{this.renderToolbar(dataType)}
					<Grid container spacing={1}>
						<EditorTableDisplay 
							selectedPriceDataId={viewingPriceDataId}
							listOfSeries={data}
							selectedPriceData={selectedDataList}

							viewData={this.viewData}
							addData={this.addPriceDataToSelection}
							removeData={this.removePriceDataFromSelection}
							addSeries={this.addGroupToList}
							removeSeries={this.removeGroupFromList}

							selectAll={this.selectAll}
							clearSelection={this.clearSelection}
							reload={this.props.reload}
							
							columns={dynamicColumns}
						/>
						<PriceDataPanel 
							id={viewingPriceDataId}
							selectVariableData={this.selectVariable}
							selectEquationData={this.selectEquation}
							reload={this.props.reload}
						/>
					</Grid>
					
				</div>
			)
		} else {
			return null
		}
		
	}
}

export default DataEditor;