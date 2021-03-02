export class ModelDraftPackage {
	modelId: string;
	name: string;
	seriesName: string;
	basePrice: string;
	draftDate: string;
	useSeriesVars: boolean;
	locationIds: string[];

	constructor(_modelId: string, _name: string, _seriesName: string, _basePrice: string, _draftDate: string, _useSeriesVars: boolean, _locationIds: string[]) {
		this.modelId = _modelId;
		this.name = _name;
		this.seriesName = _seriesName;
		this.basePrice = _basePrice;
		this.draftDate = _draftDate;
		this.useSeriesVars = _useSeriesVars;
		this.locationIds = _locationIds;
	}
}