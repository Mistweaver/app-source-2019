import { Lead } from "../../objects/lead/Lead";
import { PurchaseAgreement } from "../../objects/purchaseagreement/PurchaseAgreement";
import { ChangeOrder } from "../../objects/changeorders/ChangeOrder";

export class MasterLeadObject {
	lead: Lead;
	agreements: PurchaseAgreement[];
	changeorders: ChangeOrder[];
}