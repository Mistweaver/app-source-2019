export class PriceSheetTable {
	rows: PriceSheetTableRow[];

	constructor() {
		this.rows = [];
	}
}

export class PriceSheetTableRow {
	cells: PriceSheetTableCell[];
}

export class PriceSheetTableCell {
	rowIndex: number;
	columnIndex: number;
	value: string;
	displayValue: string;

	toolTip: string;
    textColor: string;
    backgroundColor: string;
    formatType: string;
    roundingPosition: number;
}