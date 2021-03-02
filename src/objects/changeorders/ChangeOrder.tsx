import { ChangeOrderItem } from './ChangeOrderItem';
import { BasicEntity } from '../entity/BasicEntity';
import { AvalaraTaxResponse } from '../avalaraobjects/AvalaraTaxResponse';

export class ChangeOrder extends BasicEntity {
	purchaseAgreementId: string;
	customerCode: string;
	documentCode: string;
	items: ChangeOrderItem[];
	changeOrderNumber: number;
	date: string;
	subTotal: number;
	tax: number;
	total: number;
	taxBreakdown: AvalaraTaxResponse;
	taxType: string;
	status: string;

	leadId: string;
	
	constructor() {
		super();
		this.purchaseAgreementId = "";
		this.customerCode = "";
		this.items = [];
		this.date = (new Date()).toLocaleDateString();
		this.changeOrderNumber = 0;
		this.subTotal = 0;
		this.tax = 0;
		this.total = 0;
		this.taxBreakdown = new AvalaraTaxResponse();
		this.taxType = "AVALARA";	// CUSTOM, EXEMPT, AVALARA
		this.status = "";
		this.leadId = "";
	}
}