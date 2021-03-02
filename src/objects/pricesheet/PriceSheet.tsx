import { Series } from './Series';import { BasicEntity } from '../entity/BasicEntity';
;

export class PriceSheet extends BasicEntity {
	locationId: string;
	month: number;
	year: number;
	seriesList: Series[];
	

	constructor() {
		super();
		this.locationId = "";
		this.month = new Date().getMonth();
		this.year = new Date().getFullYear();
		this.seriesList = [];
	}
}










