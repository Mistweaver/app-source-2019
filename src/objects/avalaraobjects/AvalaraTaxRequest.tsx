// import { AvalaraLineItem } from './AvalaraLineItem';
import { AvalaraAddress } from './AvalaraAddress';

export class AvalaraTaxRequest {
	lines: any[];
	type: string;
	companyCode: string;
	code: string;
	date: string;
	customerCode: string;
	reportingLocationCode: string;
	addresses: {
		// singleLocation
		// shipTo
		// shipFrom
	}

	constructor() {
		this.companyCode = "ALTACIMACORP";
		this.date = (new Date()).toDateString();
		this.customerCode = "ABC";
		this.code = "";	// 50 character limit
		this.reportingLocationCode = "";
		this.lines = [];
		this.type = "";
		this.addresses = {}
	}

	public singleAddressSelection(address: AvalaraAddress) {
		this.addresses = {
			singleLocation: address
		}
	}

	public setFromAddressOnly(address: AvalaraAddress) {
		this.addresses = {
			shipFrom: address
		}
	}

	public multipleAddressSelection(fromAddress: AvalaraAddress, toAddress: AvalaraAddress) {
		this.addresses = {
			shipTo: toAddress,
			shipFrom: fromAddress
		}
	}
}