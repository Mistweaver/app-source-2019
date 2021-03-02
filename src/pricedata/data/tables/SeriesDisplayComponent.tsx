import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import React from 'react';
import { checkIfDev } from '../../../auth/AccessControlFunctions';
import { PriceData } from '../../objects/PriceData';
import { DynamicColumn } from './DynamicColumn';
import PriceDataRowComponent from './PriceDataRowComponent';

interface Props {
	series: PriceData[];
	seriesName: string;
	selectedData: PriceData[];
	columns: DynamicColumn[];

	viewData: (data: PriceData) => void;
	addData: (data: PriceData) => void;
	removeData: (data: PriceData) => void;
	addSeries: (data: PriceData[]) => void;
	removeSeries: (data: PriceData[]) => void;
}

interface State {
	allDataSelected: boolean;
}

class SeriesDisplayComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			allDataSelected: false
		}

		this.handleAllDataSelection = this.handleAllDataSelection.bind(this);
	}

	private handleAllDataSelection() {
		const { allDataSelected } = this.state;
		if(allDataSelected) {
			this.setState({ allDataSelected: false });
			this.props.removeSeries(this.props.series);

		} else {
			this.setState({ allDataSelected: true });
			this.props.addSeries(this.props.series);
		}
	}

	public render() {
		const { series, seriesName } = this.props;
		const { allDataSelected } = this.state;
		return(
			<>
					<tr style={{backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>
						<td onClick={() => this.handleAllDataSelection()}>
							{ allDataSelected ? <CheckBox fontSize="small" style={{color: 'green', margin: 'auto'}} /> : <CheckBoxOutlineBlank fontSize="small" style={{margin: 'auto'}}/> }
						</td>
						<td colSpan={checkIfDev() ? 11 : 9}>{seriesName}</td>
					</tr>
					{
						series.map(priceData => (
							<PriceDataRowComponent 
								key={priceData.id}
								data={priceData}
								selectedData={this.props.selectedData}
								addData={this.props.addData}
								removeData={this.props.removeData}
								viewPriceData={this.props.viewData}
								columns={this.props.columns}
							/>
						))
					}
			</>
				
		)
	}
}

export default SeriesDisplayComponent;