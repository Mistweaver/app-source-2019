import { PriceData } from "../../objects/PriceData";
import { VariableData } from "./VariableData";

export class VariableDataUpdatePackage {
	priceDataIds: string[];
	newData: VariableData;

	constructor(dataToUpdate: PriceData[], newVariableData: VariableData) {
		
		let dataIdList: string[] = [];
		dataToUpdate.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
		this.newData = newVariableData;
	}

}