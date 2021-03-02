import { ChangeOrder } from "../../../../objects/changeorders/ChangeOrder";
import { calculateChangeOrderSubtotal, calculateChangeOrderTotal } from "../ChangeOrderUtilities";
import store from '../../../Store';

export function buildChangeOrderFromState() {
	const state = store.getState();
	let changeOrder = new ChangeOrder();

	//jpa auditing
	changeOrder.id = state.changeordereditor.id;
	changeOrder.purchaseAgreementId = state.changeordereditor.purchaseAgreementId;
	changeOrder.leadId = state.changeordereditor.leadId;
	
	changeOrder.createdBy = state.changeordereditor.createdBy;
	changeOrder.creationTime = state.changeordereditor.creationTime;
	changeOrder.modifiedBy = state.changeordereditor.modifiedBy;
	changeOrder.modificationTime = state.changeordereditor.modificationTime;
	changeOrder.deleted = state.changeordereditor.deleted;

	// properties
	changeOrder.customerCode = state.changeordereditor.customerCode;
	changeOrder.documentCode = state.changeordereditor.documentCode;
	changeOrder.items = state.changeordereditor.items;
	changeOrder.changeOrderNumber = state.changeordereditor.changeOrderNumber;
	changeOrder.date = state.changeordereditor.date;
	changeOrder.subTotal = calculateChangeOrderSubtotal(state.changeordereditor.items);
	changeOrder.tax = state.changeordereditor.tax;
	changeOrder.taxType = state.changeordereditor.taxType;
	changeOrder.total = calculateChangeOrderTotal(changeOrder.subTotal, changeOrder.tax);
	changeOrder.taxBreakdown = state.changeordereditor.taxBreakdown;
	changeOrder.status = state.changeordereditor.status;

	return changeOrder;
}