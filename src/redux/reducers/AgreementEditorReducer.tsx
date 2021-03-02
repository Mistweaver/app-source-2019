import { AgreementEditorActionTypes, LOAD_AGREEMENT, UPDATE_GENERIC_INFO, UPDATE_DELIVERY_STATE, SELECT_MODEL, SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT, UPDATE_BOOLEAN_VALUE, UPDATE_NUMERIC_VALUE, LOAD_AGREEMENT_SALES_OFFICE, /*ADD_ADDENDUM_A_ITEM, REMOVE_ADDENDUM_A_ITEM,*/ UPDATE_MANAGER_CLEARANCE_DISCOUNT, ADD_PREFERRED_PAYMENT_DISCOUNT, REMOVE_PREFERRED_PAYMENT_DISCOUNT, ADD_VIP_DISCOUNT, REMOVE_VIP_DISCOUNT, UPDATE_FREIGHT_CHARGE, UPDATE_FACTORY_TRIMOUT, UPDATE_AC_PURCHASE, UPDATE_SETUP_CHARGES, UPDATE_LOT_EXPENSE, UPDATE_EXTENDED_SERVICE_CONTRACT, UPDATE_TAXES, UPDATE_DOWN_PAYMENT, UPDATE_ADDITIONAL_PAYMENT, UPDATE_NUMBER_OF_UNITS, /*EDIT_ADDENDUM_A_ITEM,*/ UPDATE_ADDENDUM_A, USE_AVALARA_FOR_TAXES, USE_CUSTOM_TAX_AMOUNT, UPDATE_CUSTOM_TAX_AMOUNT, UPDATE_APPLIANCE_LIST } from "../types/AgreementEditorTypes";
import { INITIAL_AGREEMENT_EDITOR_STATE } from "./AgreementEditorInitialState";
import { loadAgreementIntoState } from "./LoadAgreementIntoState";
import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";

function agreementeditor(
	state = INITIAL_AGREEMENT_EDITOR_STATE,
	action: AgreementEditorActionTypes
) {
	// console.log(action);
	switch(action.type) {
		case LOAD_AGREEMENT:
			return Object.assign({}, state, loadAgreementIntoState(action.payload));
		case LOAD_AGREEMENT_SALES_OFFICE:
			return Object.assign({}, state, {
				office: action.payload
			});
		case UPDATE_GENERIC_INFO:
			// console.log(action.payload);
			return Object.assign({}, state, {
				[action.payload.field]: action.payload.value,
				edited: true
			});
		case UPDATE_BOOLEAN_VALUE:
			return Object.assign({}, state, {
				[action.payload.field]: action.payload.value,
				edited: true
			});
		case UPDATE_NUMERIC_VALUE:
			return Object.assign({}, state, {
				[action.payload.field]: action.payload.value,
				edited: true
			});
		case UPDATE_DELIVERY_STATE:
			// console.log("Updating delivery state");
			// console.log(action.payload);
			return Object.assign({}, state, {
				deliveryState: action.payload.state,
				edited: true,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse(),
				openField1: action.payload.openField1,
				openField1Amount: action.payload.openField1Amount
			});
		case SELECT_MODEL:
			return Object.assign({}, state, {
				make: action.payload.make,
				model: action.payload.model,
				manufacturer: action.payload.manufacturer,
				modelType: action.payload.modelType,
				bedrooms: action.payload.bedrooms,
				baths: action.payload.baths,
				floorSize: action.payload.floorSize,
				hitchSize: action.payload.hitchSize,
				approximateSquareFeet: action.payload.approximateSquareFeet,

				retailPrice: action.payload.retailPrice,
				factoryDirectPrice: action.payload.factoryDirectPrice,
				factoryTotalCost: action.payload.factoryTotalCost,
				featuredHomePromo: action.payload.promotionName,
				featuredHomePromoAmount: action.payload.promotionDiscountPrice,
				modelSelectionDate: action.payload.modelSelectionDate,
				promotionSelectionHalf: action.payload.promotionSelectionHalf,
				edited: true,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT:
			return Object.assign({}, state, {
				noticeOfConstructionAndFinalPayment: action.payload.option,
				noticeOfConstructionAndFinalPaymentText: action.payload.optionText,
				documentOrHomePrepFee: action.payload.documentOrHomePrepFee,
				balancePaidInFullDate: action.payload.balancePaidInFullDate,
				edited: true
			});
		
		case UPDATE_ADDENDUM_A:
			return Object.assign({}, state, {
				edited: true,
				addendumAItems: action.payload.addendumArray,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		/* Addendum A functions */
		/*case ADD_ADDENDUM_A_ITEM:
			return Object.assign({}, state,  {
				...state,
				edited: true,
				addendumAItems: [...state.addendumAItems, action.payload],
				taxesAmount: 0
			});
		case REMOVE_ADDENDUM_A_ITEM:
			return Object.assign({}, state,  {
				...state,
				edited: true,
				addendumAItems: [
					...state.addendumAItems.slice(0, action.payload.index),
					...state.addendumAItems.slice(action.payload.index + 1)
				],
				taxesAmount: 0
			});
		case EDIT_ADDENDUM_A_ITEM:
			return Object.assign({}, state, {
				...state, 
				edited: true,
				addendumAItems: [
					...state.addendumAItems.slice(0, action.payload.index),
						action.payload.addendumAItem,
					...state.addendumAItems.slice(action.payload.index + 1)
				],
				addendumAItems: state.addendumAItems.map((item, index) => {
					if(index !== action.payload.index) { return item; }
					return action.payload.addendumAItem
				}),
				taxesAmount: 0
			});*/


		case UPDATE_MANAGER_CLEARANCE_DISCOUNT:
			return Object.assign({}, state, {
				edited: true,
				managerOrClearanceAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case ADD_PREFERRED_PAYMENT_DISCOUNT:
			return Object.assign({}, state, {
				edited: true,
				preferredPaymentAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case REMOVE_PREFERRED_PAYMENT_DISCOUNT:
			return Object.assign({}, state, {
				edited: true,
				preferredPaymentAmount: 0,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case ADD_VIP_DISCOUNT:
			return Object.assign({}, state, {
				edited: true,
				vipMultiUnitDiscountAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case REMOVE_VIP_DISCOUNT:
			return Object.assign({}, state, {
				edited: true,
				vipMultiUnitDiscountAmount: 0,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_FREIGHT_CHARGE:
			return Object.assign({}, state, {
				edited: true,
				standardFreightChargeAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_FACTORY_TRIMOUT:
			return Object.assign({}, state, {
				edited: true,
				factoryTrimOutAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_AC_PURCHASE:
			return Object.assign({}, state, {
				edited: true,
				purchaseOfACAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_SETUP_CHARGES:
			return Object.assign({}, state, {
				edited: true,
				setupChargesAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_LOT_EXPENSE:
			return Object.assign({}, state, {
				edited: true,
				lotExpenseAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_EXTENDED_SERVICE_CONTRACT:
			return Object.assign({}, state, {
				edited: true,
				extendedServiceContractAmount: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_TAXES:
			return Object.assign({}, state, {
				edited: true,
				taxBreakdown: action.payload.taxResponse,
				taxesAmount: action.payload.taxAmount  
			});
		case UPDATE_CUSTOM_TAX_AMOUNT:
			return Object.assign({}, state, {
				edited: true,
				customTaxableAmount: action.payload.customTaxAmount
			});
		case USE_AVALARA_FOR_TAXES:
			return Object.assign({}, state, {
				useCustomTaxableAmount: false,
				customTaxableAmount: 0,
				edited: true,
				taxBreakdown: new AvalaraTaxResponse(),
				taxesAmount: 0
			});
		case USE_CUSTOM_TAX_AMOUNT:
			return Object.assign({}, state, {
				useCustomTaxableAmount: true,
				customTaxableAmount: 0,
				edited: true,
				taxBreakdown: new AvalaraTaxResponse(),
				taxesAmount: 0
			});
		case UPDATE_DOWN_PAYMENT:
			return Object.assign({}, state, {
				edited: true,
				downPayment: action.payload.amount,
			});
		case UPDATE_ADDITIONAL_PAYMENT:
			return Object.assign({}, state, {
				edited: true,
				additionalPaymentAsAgreed: action.payload.amount,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});
		case UPDATE_NUMBER_OF_UNITS:
			return Object.assign({}, state, {
				edited: true,
				numberOfUnits: action.payload.numberOfUnits,
				taxesAmount: 0,
				taxBreakdown: new AvalaraTaxResponse()
			});

		case UPDATE_APPLIANCE_LIST:
			return Object.assign({}, state, {
				edited: true,
				applianceList: action.payload.applianceList
			});
		default:
			return state;
	}
}

export default agreementeditor;