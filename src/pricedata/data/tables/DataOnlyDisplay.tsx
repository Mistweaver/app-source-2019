import React from 'react';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { EquationData } from '../../equations/objects/EquationData';
import { PriceData } from '../../objects/PriceData';
import { VariableData } from '../../variables/objects/VariableData';

interface Props {
	seriesData: PriceData[];
	seriesName: string;
	viewData: (data: PriceData) => void;

	selectedVariableFilters: VariableData[];
	selectedEquationFilters: EquationData[];
}

/*interface RowProps {
	data: PriceData;
	viewData: (data: PriceData) => void;
	selectedVariableFilters: VariableData[];
	selectedEquationFilters: EquationData[];
}*/


/*const Row = (props: RowProps) => {
	console.log(props.data);
	console.log(props.data.model.modelNumber);
	let rowColor = "";
	if(props.data.error) {
		rowColor = "#ff5e5e";
	} else if(props.data.dataUpdated) {
		rowColor = "#ffd359";
	}
	const { data } = props;
	return(
		<tr className="leadRow" onClick={() => props.viewData(data)} style={{backgroundColor: rowColor}}>
			<td>{data.name}</td>
			<td>{data.model ? data.model.modelNumber : "#ERR"}</td>
			<td>{data.model  ? data.model.type : "#ERR"}</td>
			<td>{new Date(data.creationTime).toLocaleDateString()}</td>
			<td>{data.activeDate}</td>
			<td>{data.expirationDate}</td>
			<td>{FormatNumberAsMoney(data.factoryDirectPrice)}</td>
		</tr>
	)
}*/

const DataOnlyDisplay = (props: Props) => {
	return(
		<div style={{display: 'flex', flexDirection: 'column', marginBottom: 15, backgroundColor: 'rgb(231, 231, 231)'}}>
				<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5, display: 'flex'}}>
					{props.seriesName}
				</div>
				<table style={{width: '100%', fontSize: '10pt', borderSpacing: 0, padding: 5}}>
					<thead>
						<tr style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>
							<th>Name</th>
							<th>Model No.</th>
							<th>Type</th>
							<th>Created On</th>
							<th>Draft Date</th>
							<th>Exp Date</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{
							props.seriesData.map(data => {
								let rowColor = "";
								if(data.error) {
									rowColor = "#ff5e5e";
								} else if(data.dataUpdated) {
									rowColor = "#ffd359";
								}

								return(
									<tr className="leadRow" onClick={() => props.viewData(data)} style={{backgroundColor: rowColor}}>
										<td>{data.name}</td>
										<td>{data.model ? data.model.modelNumber : "#ERR"}</td>
										<td>{data.model  ? data.model.type : "#ERR"}</td>
										<td>{new Date(data.creationTime).toLocaleDateString()}</td>
										<td>{data.activeDate}</td>
										<td>{data.expirationDate}</td>
										<td>{FormatNumberAsMoney(data.factoryDirectPrice)}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
	)
}

export default DataOnlyDisplay;