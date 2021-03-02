import { BasicEntity } from "../entity/BasicEntity";

export class User extends BasicEntity {
	name: string;
	email: string;
	licenseNumber: string;
	location: string;
	locationId: string;
	profilePictureUrl: string;

	constructor() {
		super();
		this.name = "";
		this.email = "";
		this.location = "";
		this.locationId = "";
		this.licenseNumber = "";
		this.profilePictureUrl = "";
	}
}