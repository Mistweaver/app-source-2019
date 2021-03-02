export class BasicEntity {
	id: string;
	createdBy: string;
	creationTime: string;
	modifiedBy: string;
	modificationTime: string;
	deleted: boolean;

	constructor() {
		this.id = "";
	}
}