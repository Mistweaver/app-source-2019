import React from 'react';
import { PriceData } from '../objects/PriceData';
import { Column } from './Column';
import { ColumnGenerator } from './ColumnGenerator';

interface Props {
	priceDataToDisplay: PriceData[]; 	// has a list of data

}

interface State {
	columns: Column[];				// has a list of columns for the data
	buildingTable: boolean;			//	rendering table boolean flag
	buildingColumns: boolean;
}

const initialState = {
	priceDataToDisplay: [],
	columns: [],
	buildingTable: true,
	buildingColumns: true,
}

class PriceDataTable extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
	}

	componentDidMount() {
		this.buildColumns();
		
	}

	componentDidUpdate(prevProps: Props) {
		if(this.props.priceDataToDisplay !== prevProps.priceDataToDisplay) {
			this.buildColumns();
		}
	}

	private buildColumns() {
		this.setState({ buildingColumns: true });
		let _columns = ColumnGenerator(this.props.priceDataToDisplay);
		this.setState({ columns: _columns, buildingColumns: false });
	}

	private updateRow() {
		// get the price dat
	}


	/*
		table component

		https://legacy-zurb.netlify.app/playground/css-boxshadow-experiments

		state
		loading keys boolean flag
		render component boolean flag

		when component is rendered
		get the current list of column keys, and set it
		generate the column list


	

		functions()
		add column to list
		remove column from list
		set column list
		close

		exports the column editor
		exports the default column state
 */
}

export default PriceDataTable;