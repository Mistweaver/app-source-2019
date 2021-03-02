import { ChangeOrderEditorTypes, LOAD_CHANGE_ORDER, UPDATE_CHANGE_ORDER_GENERIC_INFO, UPDATE_CHANGE_ORDER_BOOLEAN_VALUE, UPDATE_CHANGE_ORDER_NUMERIC_VALUE, UPDATE_CHANGE_ORDER, SET_AVALARA_CHANGE_ORDER_TAXES, SET_CHANGE_ORDER_TAX_AMOUNT, SET_CHANGE_ORDER_TAX_TYPE } from "../types/ChangeOrderEditorTypes";
import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";

function changeordereditor(
	state = {
		//jpa auditing
		id: "",
		createdBy: "",
		creationTime: "",
		modifiedBy: "",
		modificationTime: "",
		deleted: false,

		// properties
		purchaseAgreementId: "",
		customerCode: "",
		documentCode: "",
		items: [],
		changeOrderNumber: 0,
		date: "",
		subTotal: 0,
		tax: 0,
		total: 0,
		taxType: "AVALARA",
		taxBreakdown: new AvalaraTaxResponse(),
		locked: false,
		submitted: false,
		status: "",
		edited: false,
		leadId: ""
	},
	action: ChangeOrderEditorTypes
) {
	// console.log("Change Order Editor Reducer");
	// console.log(action.type);
	switch(action.type) {
		
		case LOAD_CHANGE_ORDER:
			console.log("Redux loading change order");
			console.log(action.payload);
			return Object.assign({}, state, {
				id: action.payload.id,
				createdBy: action.payload.createdBy,
				creationTime: action.payload.creationTime,
				modifiedBy: action.payload.modifiedBy,
				modificationTime: action.payload.modificationTime,
				deleted: action.payload.deleted,

				purchaseAgreementId: action.payload.purchaseAgreementId,
				customerCode: action.payload.customerCode,
				items: action.payload.items,
				changeOrderNumber: action.payload.changeOrderNumber,
				date: action.payload.date,
				subTotal: action.payload.subTotal,
				tax: action.payload.tax,
				total: action.payload.total,
				taxBreakdown: action.payload.taxBreakdown,
				status: action.payload.status,
				edited: false,
				leadId: action.payload.leadId
			});
		case UPDATE_CHANGE_ORDER:
			return Object.assign({}, state,  {
				...state,
				edited: true,
				items: action.payload.array,
				tax: 0
			});
		
		case UPDATE_CHANGE_ORDER_GENERIC_INFO:
			return Object.assign({}, state, {
				[action.payload.field]: action.payload.value,
				edited: true
			});
		case UPDATE_CHANGE_ORDER_BOOLEAN_VALUE:
			return Object.assign({}, state, {
				[action.payload.field]: action.payload.value,
				edited: true
			});
		case UPDATE_CHANGE_ORDER_NUMERIC_VALUE:
			return Object.assign({}, state, {
				[action.payload.field]: action.payload.value,
				edited: true
			});
		case SET_AVALARA_CHANGE_ORDER_TAXES:
			return Object.assign({}, state, {
				edited: true,
				taxBreakdown: action.payload,
				tax: action.payload.totalTaxCalculated
			});
		case SET_CHANGE_ORDER_TAX_AMOUNT:
			return Object.assign({}, state, {
				edited: true,
				tax: action.payload
			});
		case SET_CHANGE_ORDER_TAX_TYPE:
			switch(action.payload) {
				case "CUSTOM":
					return Object.assign({}, state, {
						edited: true,
						taxType: action.payload,
						tax: 0
					});
				case "EXEMPT":
					return Object.assign({}, state, {
						edited: true,
						taxType: action.payload,
						tax: 0
					});
				case "AVALARA":
					return Object.assign({}, state, {
						edited: true,
						taxType: action.payload,
						tax: 0,
						taxBreakdown: new AvalaraTaxResponse()
					});
				default:
					return state;
			}
		default:
			return state;
	}
}

export default changeordereditor;