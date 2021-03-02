export class AvalaraAddress {
	line1: string;
	city: string;
	region: string;
	country: string;
	postalCode: string;

	constructor(line1: string, city: string, region: string, country: string, postalCode: string) {
		this.line1 = line1;
		this.city = city;
		this.region = region;
		this.country = country;
		this.postalCode = postalCode;
	}
}