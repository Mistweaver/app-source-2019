import { LOAD_SALES_OFFICES, ApplicationDataActionTypes } from "../types/ApplicationDataTypes";
import { SalesOffice } from "../../objects/salesoffice/SalesOffice";

export function loadSalesOffices(salesOffices: SalesOffice[]) : ApplicationDataActionTypes {
	return {
		type: LOAD_SALES_OFFICES,
		payload: salesOffices
	}
}