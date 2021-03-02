export class UpdatePackage {
	id: string;
	name: string;
	seriesName: string;
	activeDate: string;
	expirationDate: string;

	constructor(_id: string, _name: string, _seriesName: string, _activeDate: string, _expirationDate: string) {
		this.id = _id;
		this.name = _name.trim();
		this.seriesName = _seriesName.trim();
		this.activeDate = _activeDate.trim();
		this.expirationDate = _expirationDate.trim();
	}
}