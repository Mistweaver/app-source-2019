export class AvalaraCompanyLocation {
	addressCategoryId: string;
	addressTypeId: string;
	city: string;
	companyId: number;
	country: string;
	createdDate: string;
	createdUserId: number;
	description: string;
	effectiveDate: string;
	endDate: string;
	id: number;
	isDefault: boolean;
	isRegistered: boolean;
	lastTransactionDate: string;
	line1: string;
	line2: string;
	line3: string;
	locationCode: string;
	modifiedDate: string;
	modifiedUserId: number;
	postalCode: string;
	region: string;
	registeredDate: string;

	constructor() {
		this.addressCategoryId = "";
		this.addressTypeId = "";
		this.city = "";
		this.companyId = -1;
		this.country = "";
		this.createdDate = "";
		this.createdUserId = -1;
		this.description = "";
		this.effectiveDate = "";
		this.endDate = "";
		this.id = -1;
		this.isDefault = false;
		this.isRegistered = false;
		this.lastTransactionDate = "";
		this.line1 = "";
		this.line2 = "";
		this.line3 = "";
		this.locationCode = "";
		this.modifiedDate = "";
		this.modifiedUserId = -1;
		this.postalCode = "";
		this.region = "";
		this.registeredDate = "";
	}
}