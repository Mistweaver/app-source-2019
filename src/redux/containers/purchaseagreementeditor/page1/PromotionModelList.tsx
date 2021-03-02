import { PENDING } from "../../../../data/staticdata";
import { BasicEntity } from "../../../../objects/entity/BasicEntity";

export class PromotionModelList extends BasicEntity {
	locationId: string;
	promotionId: string;
	listState: string;
	modelIds: string[];

	constructor() {
		super();
		this.locationId = "";
		this.promotionId = "";
		this.listState = PENDING;
		this.modelIds = [];
	}
}