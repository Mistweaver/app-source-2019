import { BasicEntity } from "../entity/BasicEntity";

export class DeletedObject extends BasicEntity {
	objectId: string;
	objectType: string;
	object: string;
}