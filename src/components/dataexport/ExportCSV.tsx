import { CircularProgress } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import React from 'react';
import { PriceData } from '../../pricedata/objects/PriceData';
import { Column } from '../../pricedata/table/Column';
import { ColumnEditor } from '../../pricedata/table/ColumnEditor';
import { ColumnGenerator } from '../../pricedata/table/ColumnGenerator';
import { ReplaceColumn } from '../../pricedata/table/ReplaceColumn';
import { ModalButton } from '../modal/ModalButton';
import { GetCSVComponent } from './GetCSVComponent';

interface Props {
	priceData: PriceData[];
}

interface State {
	// columns from the price data
	columns: Column[];
	buildingColumns: boolean;
}

class ExportCSV extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			columns: [],
			buildingColumns: false,
		}

		this.getColumnsFromPriceData = this.getColumnsFromPriceData.bind(this);
		this.toggleColumn = this.toggleColumn.bind(this);
	}

	private getColumnsFromPriceData() {
		this.setState({ buildingColumns: true })
		let _columns = ColumnGenerator(this.props.priceData);
		this.setState({ columns: _columns, buildingColumns: false });
	}

	private toggleColumn(updatedColumn: Column) {
		let updatedColumnArray = ReplaceColumn(updatedColumn, this.state.columns);
		this.setState({ columns: updatedColumnArray });
	}



	public render() {
		const { buildingColumns } = this.state;
		return(
			<ModalButton 
				actionOnOpen={this.getColumnsFromPriceData}
				actionOnClose={() => void 0}
				title="Export Selected Data as CSV"
				tooltipText="Export CSV"
				buttonColor="black"
				width="lg"
				button={<CloudDownload />}
			>
				{
					buildingColumns ?
					<div style={{display: 'flex'}}>
						<div style={{margin: 'auto'}}>
							<div>Building Columns...</div>
							<CircularProgress  />
						</div>
					</div>
					:
					<div>
						<ColumnEditor columns={this.state.columns} toggleColumnVisibility={this.toggleColumn} />
						<GetCSVComponent priceData={this.props.priceData} columns={this.state.columns} />
					</div>
				}
			</ModalButton>
		)
	}
}

export default ExportCSV;