import { Equation } from "../equations/objects/Equation";
import { Variable } from "../variables/objects/Variable";

export class PriceDataPacket {
	id: string;
	// pricedata
	modelId: string;
	locationId: string;
	status: string;		// incoming, active, retired

	activeDate: string;
	expirationDate: string;

	variables: Variable[];
	equations: Equation[];
	
	name: string;
	seriesName: string;

	// calculated variables
	basePrice: number;
	factoryTotalCost: number;
	subTotal: number;
	msrp: number;
	factoryDirectPrice: number;
	firstHalfAdvertisingPrice: number;
	secondHalfAdvertisingPrice: number;

	constructor() {
		this.status = ""
	}
}