import { SalesOffice } from "../../../objects/salesoffice/SalesOffice";
import { PriceData } from "../../objects/PriceData";
import { VariableData } from "./VariableData";

export class VariableDataPackage {
	variable: VariableData;
	salesOffice: SalesOffice;
	priceData: PriceData;
}