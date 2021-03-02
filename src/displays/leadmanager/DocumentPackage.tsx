import { PurchaseAgreement } from "../../objects/purchaseagreement/PurchaseAgreement";
import { ChangeOrder } from "../../objects/changeorders/ChangeOrder";

export class DocumentPackage {
	agreement: PurchaseAgreement;
	changeOrders: ChangeOrder[];
	// this data is not saved to the database but instead constructed dynamically
	revised: boolean;
}