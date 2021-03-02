import { PriceData } from "../../objects/PriceData";
import { EquationData } from "./EquationData";

export class EquationDataUpdatePackage {
	priceDataIds: string[];
	newData: EquationData;

	constructor(dataToUpdate: PriceData[], newEquationData: EquationData) {

		let dataIdList: string[] = [];
		dataToUpdate.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
		this.newData = newEquationData;
	}
}