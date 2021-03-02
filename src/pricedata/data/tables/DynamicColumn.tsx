export class DynamicColumn {
	columnType: string;
	key: string;

	constructor() {
		this.columnType = "";
		this.key = "";
	}

	public isVariableColumn() {
		return this.columnType === "VAR";
	}

	public isEquationColumn() {
		return this.columnType === "EQN";
	}
}