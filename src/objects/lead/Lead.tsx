import { BasicEntity } from "../entity/BasicEntity";

export class Lead extends BasicEntity {
	id: string;
	leadId: string;
	firstName: string;
	lastName: string;
	otherName: string;
	emailAddress: string;
	phone: string;

	status: string;

	userId: string;
	leadSourceId: string;
	leadStatusId: string;

	locationId: string;
	deliveryStreet: string;
	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	deliveryCountry: string;
	homeSite: string;
	cashBuyer: string;
	floorPlanId: string;
	bedroomId: string;
	modelOfInterest: string;
	extra: string;
	numSales: string;

	constructor() {
		super();
		this.id = "";
	}
}