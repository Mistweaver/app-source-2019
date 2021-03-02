import { BasicEntity } from "../entity/BasicEntity";

export class Factory extends BasicEntity {
    manufacturerName: string;
    displayName: string;
    uniqueName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    faxNumber: string;
    printableEntityName: string;
    printableEntityAddress: string;
    printableEntityCity: string;
    addendumENewModelParagraph: string;
    addendumEShowModelParagraph: string;

	constructor() {
		super();
        this.id = "";
        
        this.manufacturerName = "";
        this.displayName = "";
        this.uniqueName = "New Factory";
        this.street = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.phoneNumber = "";
        this.faxNumber = "";
        this.printableEntityName = "";
        this.printableEntityAddress = "";
        this.printableEntityCity = "";
        this.addendumENewModelParagraph = "";
        this.addendumEShowModelParagraph = "";
	}

}