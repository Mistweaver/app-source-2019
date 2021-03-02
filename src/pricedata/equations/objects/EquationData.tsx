export class EquationData {
	id: string;
	name: string;
	key: string;
	equation: string;
	notes: string;
	roundingPosition: number;
	roundingDirection: string;

	constructor() {
		this.id = "";
		this.name = "";
		this.key = "";
		this.equation = "";
		this.notes = "";
		this.roundingDirection = "UP"
		this.roundingPosition = .01;
	}
}