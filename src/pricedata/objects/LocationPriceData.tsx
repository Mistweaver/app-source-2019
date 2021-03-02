import { SalesOffice } from "../../objects/salesoffice/SalesOffice";
import { SeriesData } from "./SeriesData";

export class LocationPriceData {
	location: SalesOffice;
	activeData: SeriesData[];
	pendingData: SeriesData[];
	drafts: SeriesData[];

	constructor() {
		this.location = new SalesOffice();
		this.activeData = [];
		this.pendingData = [];
		this.drafts = [];
	}
}