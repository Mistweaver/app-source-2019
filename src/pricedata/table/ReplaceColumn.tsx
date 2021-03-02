import { Column } from './Column';
/**
 * Function takes a column with updated properties and (if applicable) replaces a column
 * with an identical ID in a list of columns
 * 
 * @param replacementColumn Column with updated data (visibility, header, etc)
 * @param columns Array of available columns
 */
export function ReplaceColumn(replacementColumn: Column, columns: Column[]) {
	const index = columns.findIndex(column => column.id === replacementColumn.id);
	if(index !== -1) {
		columns.splice(index, 1, replacementColumn);
		return columns;
	} else {
		return columns;
	}
}