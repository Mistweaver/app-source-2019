export class ChangeOrderItem {
	changeName: string;
	changeType: string;
	cost: number;

	constructor(name: string, cost: number, type: string) {
		this.cost = cost;
		this.changeName = name;
		this.changeType = type;
	}
}