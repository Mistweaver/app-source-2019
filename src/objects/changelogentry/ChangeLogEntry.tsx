import { BasicEntity } from "../entity/BasicEntity";

export class ChangeLogEntry extends BasicEntity {
	description: string;
	userId: string;
	locationId: string;

	constructor() {
		super();
		this.userId = "";
		this.description = "";
		this.locationId = "";
	}
}