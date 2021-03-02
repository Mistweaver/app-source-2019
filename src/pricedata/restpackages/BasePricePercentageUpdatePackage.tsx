import { PriceData } from "../objects/PriceData";

export class UpdatePackage {
	priceDataIds: string[];
	percentageChange: string;
	constructor(_data: PriceData[], change: string) {

		let dataIdList: string[] = [];
		_data.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
		this.percentageChange = change;
	}
}