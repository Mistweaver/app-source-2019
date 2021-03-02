import { AddendumAItem } from './AddendumAItem';

export class AddendumA {
	items: AddendumAItem[];
	notes: string;
	total: number;

	constructor() {
		// this.items = [new AddendumAItem("No options selected", 0, "")];
		this.items = [];
		this.notes = "";
		this.total = 0;
	}

}