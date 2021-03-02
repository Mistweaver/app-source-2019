import { AvalaraAddress } from './AvalaraAddress';

export class AvalaraTaxResponse {
	id: number;
	code: string;
	companyId: number;
	date: string;
	paymentDate: string;
	status: string;
	type: string;
	customerVendorCode: string;
	customerCode: string;
	reconciled: boolean;
	totalAmount: number;
	totalExempt: number;
	totalDiscount: number;
	totalTax: number;
	totalTaxable: number;
	totalTaxCalculated: number;
	adjustmentReason: string;
	locked: boolean;
	version: number;
	exhangeRateEffectiveDate: string;
	exhangeRate: number;
	modifiedDate: string;
	modifiedUserId: number;
	taxDate: string;
	summary: TaxResponseSummary[];
	addresses: AvalaraAddress[];
	lines: TaxResponseLineItem[];

	constructor() {
		this.id = -1;
		this.code = "";
		this.companyId = -1;
		this.date = "";
		this.paymentDate = "";
		this.status = "";
		this.type = "";
		this.customerVendorCode = "";
		this.customerCode = "";
		this.reconciled = false;
		this.totalAmount = 0;
		this.totalExempt = 0;
		this.totalDiscount = 0;
		this.totalTax = 0;
		this.totalTaxable = 0;
		this.totalTaxCalculated = 0;
		this.adjustmentReason = "";
		this.locked = false;
		this.version = 0;
		this.exhangeRateEffectiveDate = "";
		this.exhangeRate = 0;
		this.modifiedDate = "";
		this.modifiedUserId = 0;
		this.taxDate = "";
		this.summary = [];
		this.addresses = [];
		this.lines = [];
	}
}

export class TaxResponseSummary {
	country: string;
	region: string;
	jurisType: string;
	jurisCode: string;
	jurisName: string;
	taxAuthorityType: number;
	stateAssignedNo: string;
	taxType: string;
	taxSubType: string;
	taxName: string;
	rateType: string;
	taxable: number;
	rate: number;
	tax: number;
	taxCalculated: number;
	nonTaxable: number;
	exemption: number;
}

export class TaxResponseLineItem {
	constInsuranceFreight: number;
	description: string;
	details: TaxResponseLineItemDetail[];
	discountAmount: number;
	exemptAmount: number;
	exemptCertId: number;
	hsCode: string;
	id: number;
	isItemTaxable: boolean;
	lineAmount: number;
	lineNumber: string;
	nonPassthroughDetails: any[];
	quantity: number;
	reportingDate: string;
	tax: number;
	taxCalculated: number;
	taxCode: string;
	taxCodeId: number;
	taxDate: string;
	taxIncluded: boolean;
	taxableAmount: number;
	transactionId: number;
	vatCode: string;
	vatNumberTypeId: number;
}

export class TaxResponseLineItemDetail {
	country: string;
	exemptAmount: number;
	id: number;
	isNonPassThru: boolean;
	jurisCode: string;
	jurisName: string;
	jurisType: string;
	jurisdictionType: string;
	nonTaxableAmount: number;
	rate: number;
	rateType: string;
	rateTypeCode: string;
	region: string;
	stateAssignedNo: string;
	tax: number;
	taxAuthorityTypeId: number;
	taxCalculated: number;
	taxName: string;
	taxSubTypeId: string;
	taxType: string;
	taxableAmount: number;
	transactionId: number;
	transactionLineId: number;
}