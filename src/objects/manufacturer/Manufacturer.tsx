import { BasicEntity } from '../entity/BasicEntity';

export class Manufacturer extends BasicEntity {
	key: string;
	legalName: string;
	address: string;
	state: string;
	zip: string;
	city: string;

	constructor() {
		super();
		this.key = "";
		this.legalName = "";
		this.address = "";
		this.state = "";
		this.zip = "";
		this.city = "";
	}
}