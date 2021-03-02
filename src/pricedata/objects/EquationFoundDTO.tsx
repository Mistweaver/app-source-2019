import { SalesOffice } from "../../objects/salesoffice/SalesOffice";
import { EquationData } from "../equations/objects/EquationData";
import { PriceData } from "./PriceData";

export class EquationFoundDTO {
	equation: EquationData;
	priceData: PriceData;
	salesOffice: SalesOffice;
}