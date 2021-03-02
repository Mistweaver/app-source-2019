import { PriceData } from "../objects/PriceData";
import { BASE_COLUMNS } from "./BaseColumns";
import { Column } from "./Column";
/**
 * 	generates a list of columns from the variable
	for each data
		for each variable
			get all variables
			extract the variable name and key, set type to var
		get all equations
			extract the equation name and key, and set type to eqn

 * @param priceDataList 
 */
export function ColumnGenerator(priceDataList: PriceData[]) {
	let variables = new Map();
	let equations = new Map();
	// for each price data
	for(let i = 0; i < priceDataList.length; i++) {
		let data = priceDataList[i];

		for(let j = 0; j < data.variables.length; j++) {
			let variable = data.variables[j];
			if(!variables.has(variable.key)) {
				let column = new Column(variable.id, variable.key, variable.name, "VAR", false);
				variables.set(variable.key, column);
			}
		}

		for(let k = 0; k < data.equations.length; k++) {
			let equation = data.equations[k];
			if(!equations.has(equation.key)) {
				let column = new Column(equation.id, equation.key, equation.name, "EQN", false);
				equations.set(equation.key, column);
			}
		}
	}

	let columns: Column[] = [];

	for (const [key, value] of variables.entries()) {
		columns.push(value)
	}

	for (const [key, value] of equations.entries()) {
		columns.push(value)
	}

	// add the universal fields that exists on all price data
	columns = columns.concat(BASE_COLUMNS);
	// console.log(columns);

	return columns;
}