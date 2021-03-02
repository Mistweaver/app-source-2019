import { Factory } from "../objects/factory/Factory";
import { SalesOffice } from "../objects/salesoffice/SalesOffice";

export function sortSalesOffices(a: SalesOffice, b: SalesOffice) {
	if(a.officeName > b.officeName)
		return 1;
	if(a.officeName < b.officeName)
		return -1;
	return 0;
}

export function sortFactories(a: Factory, b: Factory) {
	if(a.uniqueName > b.uniqueName)
		return 1;
	if(a.uniqueName < b.uniqueName)
		return -1;
	return 0;
}
