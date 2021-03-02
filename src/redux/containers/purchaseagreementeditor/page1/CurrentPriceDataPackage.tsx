import { Promotion } from "../../../../displays/promotions/Promotion";
import { SalesOffice } from "../../../../objects/salesoffice/SalesOffice";
import { SeriesData } from "../../../../pricedata/objects/SeriesData";
import { PromotionModelList } from "./PromotionModelList";


export class CurrentPriceDataPackage {
	promotion: Promotion;
	currentPromotionHalf: number;
	promotionModelList: PromotionModelList;
	office: SalesOffice;
	priceDataList: SeriesData[];

	constructor() {
		this.promotion = new Promotion();
		this.currentPromotionHalf = 0;
		this.promotionModelList = new PromotionModelList();
		this.office = new SalesOffice();
		this.priceDataList = [];
	}
}