import { Model } from "../models/Model";

export class InventoryDTO {
	inventoryId: string;
	locationId: string;
	models: Model[];

	constructor() {
		this.inventoryId = "";
		this.locationId = "";
		this.models = [];
	}
}