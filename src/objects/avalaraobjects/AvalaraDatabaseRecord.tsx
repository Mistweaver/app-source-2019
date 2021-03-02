import { BasicEntity } from "../entity/BasicEntity";

export class AvalaraDatabaseRecord extends BasicEntity {
	user: string;
	documentId: string;
	documentType: string;
	requestType: string;
	serializedResponse: string;

	constructor() {
		super();
		this.user = "";
		this.documentId = "";
		this.documentType = "";
		this.requestType = "";
		this.serializedResponse = "";
	}
}