import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import React from 'react';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { PriceData } from '../../objects/PriceData';
import { DynamicColumn } from './DynamicColumn';

interface Props {
	data: PriceData;
	selectedData: PriceData[];
	columns: DynamicColumn[];

	addData: (data: PriceData) => void;
	removeData: (data: PriceData) => void;
	viewPriceData: (data: PriceData) => void;
}


const PriceDataRowComponent = (props: Props) => {
	const { data, selectedData } = props;
	let selected = false;
	var i = 0, len = props.selectedData.length;
	while(i < len) {
		if(selectedData[i].id === props.data.id) {
			selected = true;
			i = len;
		}
		i++;
	}

	let rowType = "priceRow";
	if(data.error) {
		rowType = "rowError";
	} else if(data.dataUpdated) {
		rowType = "rowWarning";
	}
	
	return(
		<tr key={data.id} className={rowType} onClick={() => props.viewPriceData(data)}>
			
				{ selected ? 
					<td onClick={() => props.removeData(data)}>
						<CheckBox fontSize="small" style={{color: 'green'}}/>
					</td>
					: 
					<td onClick={() => props.addData(data)}>
						<CheckBoxOutlineBlank fontSize="small"/> 
					</td>
				}
			
			<td>{data.name}</td>
			<td>{data.model ? data.model.modelNumber : "#ERR"}</td>
			<td>{data.model ? data.model.factoryId : "#ERR"}</td>
			<td>{data.model  ? data.model.type : "#ERR"}</td>
			<td>{data.model  ? data.model.width + "x" + data.model.length1 + ( data.model.length2 === 0 ? "" : "x" + data.model.length2) : "#ERR"}</td>

			<td>{new Date(data.creationTime).toLocaleDateString()}</td>
			<td>{data.activeDate}</td>
			<td>{data.expirationDate}</td>
			<td>{FormatNumberAsMoney(data.factoryDirectPrice)}</td>
			{
				props.columns.map(column => {
					let columnValue = "";

					if(column.isVariableColumn() && column.key !== "") {
						let index = data.variables.findIndex(selectedVar => selectedVar.key === column.key);
						if(index !== -1) {
							columnValue = data.variables[index].value.toString();
						}
					} else if(column.isEquationColumn() && column.key !== "") {
						let index = data.equations.findIndex(selectedEqn => selectedEqn.key === column.key);
						if(index !== -1) {
							columnValue = data.equations[index].equation.toString();
						}
					}
					return (<td>{columnValue}</td>)
				})
			}
		</tr>
	)
	
	
}

export default PriceDataRowComponent;
