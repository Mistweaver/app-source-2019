export interface Appliance {
	modelType?: string;
	key: string;
	name: string;
	type: string;
	options: string[];
	children: Appliance[];

	/*contructor() {
		this.modelType = "";
		this.key = "";
		this.name = "";
		this.type = "";
		this.options = [];
		this.children = [];
	}*/

}