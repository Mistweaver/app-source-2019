import { ChangeOrder } from "../../objects/changeorders/ChangeOrder";
import { ChangeOrderEditorTypes, LOAD_CHANGE_ORDER, UPDATE_CHANGE_ORDER, SET_AVALARA_CHANGE_ORDER_TAXES, SET_CHANGE_ORDER_TAX_TYPE, SET_CHANGE_ORDER_TAX_AMOUNT } from "../types/ChangeOrderEditorTypes";
import { ChangeOrderItem } from "../../objects/changeorders/ChangeOrderItem";
import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";

export function loadChangeOrder(changeOrder: ChangeOrder): ChangeOrderEditorTypes {
	console.log("Loading change order");
	console.log(changeOrder)
	console.log(changeOrder.status);
	console.log(changeOrder.taxBreakdown);
	console.log(changeOrder.taxBreakdown.companyId);
	/*if(changeOrder.status === "") {
		console.log("Change order is blank");
	}*/
	if(changeOrder.taxBreakdown.companyId === undefined) {
		changeOrder.taxBreakdown = new AvalaraTaxResponse();
	}
	return {
		type: LOAD_CHANGE_ORDER,
		payload: changeOrder
	}
}


export function addChangeOrderItem(items: ChangeOrderItem[], newItem: ChangeOrderItem): ChangeOrderEditorTypes {
	let newArray = items.slice();
	newArray.splice(0, 0, newItem);
	return {
		type: UPDATE_CHANGE_ORDER,
		payload: {
			array: newArray
		}
	}
}

export function removeChangeOrderItem(items: ChangeOrderItem[], index: number): ChangeOrderEditorTypes {
	let newArray = items.slice();
	newArray.splice(index, 1);
	return {
		type: UPDATE_CHANGE_ORDER,
		payload: {
			array: newArray
		}
	}
}

export function editChangeOrderItem(items: ChangeOrderItem[], itemIndex: number, updatedItem: ChangeOrderItem): ChangeOrderEditorTypes {
	let newArray = items.map((item, index) => {
		if (index !== itemIndex) {
		  	// This isn't the item we care about - keep it as-is
		  	return item
		}
		// Otherwise, this is the one we want - return an updated value
		return {
		  	...item,
		  	...updatedItem
		}
	});
	return {
		type: UPDATE_CHANGE_ORDER,
		payload: {
			array: newArray
		}
	}
}

export function moveChangeOrderItemUp(items: ChangeOrderItem[], itemIndex: number): ChangeOrderEditorTypes {
	const results= items.slice();
	const firstItem = items[itemIndex];
	results[itemIndex] = items[itemIndex - 1];
	results[itemIndex - 1] = firstItem;

	return {
		type: UPDATE_CHANGE_ORDER,
		payload: {
			array: results
		}
	}
}

export function moveChangeOrderItemDown(items: ChangeOrderItem[], itemIndex: number): ChangeOrderEditorTypes {
	const results= items.slice();
	const firstItem = items[itemIndex];
	results[itemIndex] = items[itemIndex + 1];
	results[itemIndex + 1] = firstItem;

	return {
		type: UPDATE_CHANGE_ORDER,
		payload: {
			array: results
		}
	}
}


export function setAvalaraChangeOrderTaxes(taxResponse: AvalaraTaxResponse): ChangeOrderEditorTypes {
	return {
		type: SET_AVALARA_CHANGE_ORDER_TAXES,
		payload: taxResponse
	}
}

export function setChangeOrderTaxType(type: string): ChangeOrderEditorTypes {
	return {
		type: SET_CHANGE_ORDER_TAX_TYPE,
		payload: type
	}
}

export function setChangeOrderTaxAmount(amount: number): ChangeOrderEditorTypes {
	return {
		type: SET_CHANGE_ORDER_TAX_AMOUNT,
		payload: amount
	}
}