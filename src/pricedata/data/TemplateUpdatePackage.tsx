import { PriceData } from "../objects/PriceData";

export class TemplateUpdatePackage {
	templateId: string;
	dataToUpdateFromTemplate: string[];
	copyVariables: boolean;
	copyEquations: boolean;

	constructor(_templateId: string, _data: PriceData[], copyVars: boolean, copyEqns: boolean) {

		let dataIdList: string[] = [];
		_data.forEach(data => {
			dataIdList.push(data.id);
		});

		this.dataToUpdateFromTemplate = dataIdList;
		this.templateId = _templateId;
		this.dataToUpdateFromTemplate = [];
		this.copyEquations = copyEqns;
		this.copyVariables = copyVars;
	}
}