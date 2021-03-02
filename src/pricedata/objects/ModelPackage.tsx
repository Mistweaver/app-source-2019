import { Model } from "../../objects/models/Model";

export class ModelPackage {
	modelNumber: string;
	variants: Model[];

	constructor() {
		this.modelNumber = "";
		this.variants = [];
	}
}