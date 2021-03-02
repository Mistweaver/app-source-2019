import { ApplianceSheetItem } from "./ApplianceSheetItem";

export class ApplianceSheet {
	applianceList: ApplianceSheetItem[];

	constructor() {
		this.applianceList = [];
	}

	addItem(newItem: ApplianceSheetItem) {
		this.applianceList.push(newItem);
	}
}