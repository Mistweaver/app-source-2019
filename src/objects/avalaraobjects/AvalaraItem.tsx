export class AvalaraItem {
	companyId: number;
	createdDate: string;
	createdUserId: number;
	description: string;
	id: number;
	itemCode: string;
	modifiedDate: string;
	modifiedUserId: number;
	taxCode: string;
	taxCodeId: number;

	constructor() {
		this.taxCode = "HUD";
		this.itemCode = "HUD";
		this.companyId = -1;
		this.createdDate = "";
		this.createdUserId = -1;
		this.description = "";
		this.id = -1;
		this.itemCode = "";
		this.modifiedDate = "";
		this.modifiedUserId = -1;
		this.taxCode = "";
		this.taxCodeId = -1;
	}
}