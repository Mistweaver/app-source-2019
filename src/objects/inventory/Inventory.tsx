import { BasicEntity } from "../entity/BasicEntity";

export class Inventory extends BasicEntity {
	locationId: string;
	modelIds: String[];

	constructor() {
		super();
		this.locationId = "";
		this.modelIds = [];
	}
}