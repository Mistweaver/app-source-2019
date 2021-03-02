export class AddendumAItem {
	itemName: string;
	cost: number;
	itemLabel: string;

	constructor(name: string, cost: number, label: string) {
		this.cost = cost;
		this.itemName = name;
		this.itemLabel = label;
	}
}