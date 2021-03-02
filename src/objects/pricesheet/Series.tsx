import { PriceSheetTable } from "./PriceSheetTable";

// import { ModelProperty } from './ModelProperty';

export class Series {
	seriesName: string;
	type: string;
	manufacturer: string;
	tableData: PriceSheetTable;
	
	modelNameIndex: number;
    modelNoIndex: number;
    sizeIndex: number;
    bedAndBathIndex: number;
    sqftIndex: number;
    basePriceIndex: number;
    msrpIndex: number;
    factoryDirectDiscountIndex: number;
    factoryDirectSaleIndex: number;
	pricePerSqFtIndex: number;

	factoryCostIndex: number;

	firstHalfDiscountIndex: number;
	secondHalfDiscountIndex: number;
	
	constructor() {
		this.seriesName = "";
		this.type = "";
		this.manufacturer = "";
		this.tableData = new PriceSheetTable();

		this.modelNameIndex = 0;
		this.modelNoIndex = 1;
		this.sizeIndex = 2;
		this.bedAndBathIndex = 3;
		this.sqftIndex = 4;
		this.basePriceIndex = 5;
		this.msrpIndex = 6;
		this.factoryDirectDiscountIndex = 7;
		this.factoryDirectSaleIndex = 8;
		this.pricePerSqFtIndex = 9;

		this.factoryCostIndex = 10;

		this.firstHalfDiscountIndex = 11;
		this.secondHalfDiscountIndex = 12;
		
	}
	
}