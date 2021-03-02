export class NewDataForModelPackage {
	locationId: string;
	name: string;
	seriesName: string;
	draftDate: string;
	basePrice: number;
	existingDataId: string;
	templateId: string;
	modelId: string;
	
	constructor(_modelId: string) {
		this.modelId = _modelId;
		this.locationId = "";
		this.name = "";
		this.seriesName = "";
		this.draftDate = "";
		this.basePrice = 0;
		this.existingDataId = "";
		this.templateId = "";
	}
}