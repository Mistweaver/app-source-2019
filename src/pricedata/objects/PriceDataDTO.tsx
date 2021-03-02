import { Model } from "../../objects/models/Model";
import { PriceData } from "./PriceData";

export class PriceDataDTO {
	modelId: string;
	locationId: string;
	model: Model;
	priceData: PriceData;
	
	constructor() {
		this.modelId = "";
		this.locationId = "";
		this.model = new Model();
		this.priceData = new PriceData();
	}
}

