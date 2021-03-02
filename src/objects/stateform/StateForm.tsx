import { BasicEntity } from "../entity/BasicEntity";

export class StateForm extends BasicEntity {
	state: string;
	url: string;
	modelType: string;
	linkDescription: string;
}