import { BasicEntity } from "../entity/BasicEntity";

export class Model extends BasicEntity {
	factoryId: string;
	modelNumber: string;
	type: string;

	retired: boolean;

	width: number;
	length1: number;
	length2: number;
	numberOfBathrooms: number;
	numberOfBedrooms: number;
	numberOfDens: number;
	extraFeatures: string;
	notes: string;
	estimatedSquareFeet: number;

	imageUrl: string;
	blueprintUrl: string;

	constructor() {
		super();
		this.factoryId = "";
		this.modelNumber = "";
		this.type = "";

		this.retired = false;

		this.width = 0;
		this.length1 = 0;
		this.length2 = 0;
		this.numberOfBathrooms = 0;
		this.numberOfBedrooms = 0;
		this.numberOfDens = 0;
		this.extraFeatures = "";
		this.notes =  "";
		this.estimatedSquareFeet = 0;

		this.imageUrl = "";
		this.blueprintUrl = "";

	}
}