import { SalesOffice } from "../../objects/salesoffice/SalesOffice";

export const LOAD_SALES_OFFICES = "LOAD_SALES_OFFICES";

interface LoadSalesOffices {
	type: typeof LOAD_SALES_OFFICES;
	payload: SalesOffice[];
}

export type ApplicationDataActionTypes = LoadSalesOffices;