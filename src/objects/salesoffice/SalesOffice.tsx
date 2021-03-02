import { BasicEntity } from "../entity/BasicEntity";

export class SalesOffice extends BasicEntity {
	clientConsultantId: number;
	avalaraId: number;
	region: string;
	locationCode: string;
	officeName: string;
	officeTitle: string;
	officeAddress: string;
	officeCity: string;
	officeCounty: string;
	officeState: string;
	officeZip: string;
	officePhoneNumber: string;
	officeFaxNumber: string;
	manufacturerList: string[];
	factoryIDs: string[];
	licenseNumber: string;

	constructor() {
		super();
		this.id = "";
		this.clientConsultantId = 0;
		this.avalaraId = 0;
		this.region = "";
		this.locationCode = "";
		this.officeName = "New Office";
		this.officeTitle = "";
		this.officeAddress = "";
		this.officeCity = "";
		this.officeCounty = "";
		this.officeState = "";
		this.officeZip = "";
		this.officePhoneNumber = "";
		this.officeFaxNumber = "";
		this.licenseNumber = "";
		this.manufacturerList = [];
		this.factoryIDs = [];
	}

	addManufacturer(manufacturerName: string) {
		this.manufacturerList.push(manufacturerName);
	}

	removeManufacturer(index: number) {
		this.manufacturerList.splice(index, 1);
	}

	addFactory(factoryName: string) {
		this.factoryIDs.push(factoryName);
	}

	removeFactory(index: number) {
		this.factoryIDs.splice(index, 1);
	}

}