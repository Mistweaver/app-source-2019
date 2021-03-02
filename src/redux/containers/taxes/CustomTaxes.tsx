import { BasicEntity } from "../../../objects/entity/BasicEntity";

export class CustomTaxes extends BasicEntity {

    documentId: string;
    documentType: string;

    factoryInvoiceAmount: number;
    factoryFreightAmount: number;
    optionsAtCostAmount: number;
    allOtherFeesAmount: number;

    stateTaxRate: number;
    countyTaxRate: number;

    constructor() {
		super();
        this.documentId = "";
        this.documentType = "";
        this.factoryInvoiceAmount = 0.0;
        this.factoryFreightAmount = 0.0;
        this.optionsAtCostAmount = 0.0;
        this.allOtherFeesAmount = 0.0;
        this.stateTaxRate = 0.0;
        this.countyTaxRate = 0.0;
    }
}