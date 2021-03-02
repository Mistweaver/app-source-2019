export class AvalaraLineItem {
	number: number;
	amount: number;
	taxCode: string;
	description: string;

	constructor(lineNumber: number, _amount: number, _taxCode: string, _description: string) {
		this.number = lineNumber;
		this.amount = _amount;
		this.taxCode = _taxCode;
		this.description = _description;
	}
}