import { PromoListItem } from "./PromoListItem";
import { BasicEntity } from "../../objects/entity/BasicEntity";

export class Promotion extends BasicEntity {
	date: string;
	month: number;
	year: number;

	startDate: string;
	midMonthDate: string;
	endDate: string;
	promoList: PromoListItem[];

	constructor() {
		super();
		let dateToday = new Date();
		this.date = dateToday.getMonth().toString() + "/" + dateToday.getFullYear().toString();
		this.month = dateToday.getMonth();
		this.year = dateToday.getFullYear();

		this.startDate = "";
		this.midMonthDate = "";
		this.endDate = "";
		
		this.promoList = [];
	}
}