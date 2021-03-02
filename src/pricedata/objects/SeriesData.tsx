import { SalesOffice } from "../../objects/salesoffice/SalesOffice";
import { PriceData } from "./PriceData";

export class SeriesData {
	office: SalesOffice;
	seriesName: string;
	priceData: PriceData[];

	constructor() {
		this.office = new SalesOffice();
		this.priceData = [];
		this.seriesName = "";
	}
}