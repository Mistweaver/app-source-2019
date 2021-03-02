import { ChangeOrder } from "../../objects/changeorders/ChangeOrder";
import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";
import { ChangeOrderItem } from "../../objects/changeorders/ChangeOrderItem";

export const LOAD_CHANGE_ORDER = "LOAD_CHANGE_ORDER";

interface LoadChangeOrder {
	type: typeof LOAD_CHANGE_ORDER;
	payload: ChangeOrder;
}
export const UPDATE_CHANGE_ORDER_GENERIC_INFO = "UPDATE_GENERIC_INFO";
export const UPDATE_CHANGE_ORDER_BOOLEAN_VALUE = "UPDATE_BOOLEAN_VALUE";
export const UPDATE_CHANGE_ORDER_NUMERIC_VALUE = "UPDATE_NUMERIC_VALUE";

interface UpdateGenericInfoAction {
	type: typeof UPDATE_CHANGE_ORDER_GENERIC_INFO;
	payload: {
		field: string;
		value: string;
	}
}

interface UpdateBooleanValueAction {
	type: typeof UPDATE_CHANGE_ORDER_BOOLEAN_VALUE;
	payload: {
		field: string;
		value: boolean;
	}
}

interface UpdateNumericValueAction {
	type: typeof UPDATE_CHANGE_ORDER_NUMERIC_VALUE;
	payload: {
		field: string;
		value: number;
	}
}

export const UPDATE_CHANGE_ORDER = "UPDATE_CHANGE_ORDER";

interface UpdateChangeOrder {
	type: typeof UPDATE_CHANGE_ORDER;
	payload: {
		array: ChangeOrderItem[];
	}
}

export const SET_AVALARA_CHANGE_ORDER_TAXES = " SET_AVALARA_CHANGE_ORDER_TAXES";
interface SetAvalaraChangeOrderTaxes {
	type: typeof SET_AVALARA_CHANGE_ORDER_TAXES;
	payload: AvalaraTaxResponse;
}

export const SET_CHANGE_ORDER_TAX_TYPE = "SET_CHANGE_ORDER_TAX_TYPE";
interface SetChangeOrderTaxType {
	type: typeof SET_CHANGE_ORDER_TAX_TYPE;
	payload: string;
}

export const SET_CHANGE_ORDER_TAX_AMOUNT = "SET_CHANGE_ORDER_TAX_AMOUNT";
interface SetChangeOrderTaxAmount {
	type: typeof SET_CHANGE_ORDER_TAX_AMOUNT;
	payload: number;
}


export type ChangeOrderEditorTypes = SetChangeOrderTaxAmount | SetChangeOrderTaxType | SetAvalaraChangeOrderTaxes | UpdateBooleanValueAction | UpdateGenericInfoAction | UpdateNumericValueAction | UpdateChangeOrder | LoadChangeOrder;