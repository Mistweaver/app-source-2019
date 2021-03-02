import { PriceData } from "../objects/PriceData";

export class DataIdListPackage {
	priceDataIds: string[];


	constructor(_data: PriceData[]) {

		let dataIdList: string[] = [];
		_data.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
	}
}