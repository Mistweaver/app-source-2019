import { SalesOffice } from "../../../objects/salesoffice/SalesOffice";
import { PriceData } from "../../objects/PriceData";

export class PriceDataWithOfficePackage {
	office: SalesOffice;
	data: PriceData;

	constructor() {
		this.office = new SalesOffice();
		this.data = new PriceData();
	}
}