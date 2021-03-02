import { PurchaseAgreement } from "../../objects/purchaseagreement/PurchaseAgreement";
import { SalesOffice } from "../../objects/salesoffice/SalesOffice";
import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";
import { AddendumAItem } from "../../objects/purchaseagreement/addendumA/AddendumAItem";
import { ModelSelectionDataPackage } from "../actions/AgreementEditorActions";
import { ApplianceSheetItem } from "../../objects/purchaseagreement/appliancesheet/ApplianceSheetItem";

export const LOAD_AGREEMENT = "LOAD_AGREEMENT";
export const UPDATE_GENERIC_INFO = "UPDATE_GENERIC_INFO";
export const UPDATE_BOOLEAN_VALUE = "UPDATE_BOOLEAN_VALUE";
export const UPDATE_NUMERIC_VALUE = "UPDATE_NUMERIC_VALUE";

interface LoadAgreement {
	type: typeof LOAD_AGREEMENT;
	payload: PurchaseAgreement;
}

interface UpdateGenericInfoAction {
	type: typeof UPDATE_GENERIC_INFO;
	payload: {
		field: string;
		value: string;
	}
}

interface UpdateBooleanValueAction {
	type: typeof UPDATE_BOOLEAN_VALUE;
	payload: {
		field: string;
		value: boolean;
	}
}

interface UpdateNumericValueAction {
	type: typeof UPDATE_NUMERIC_VALUE;
	payload: {
		field: string;
		value: number;
	}
}

/*export const ADD_ADDENDUM_A_ITEM = "ADD_ADDENDUM_A_ITEM";
export const REMOVE_ADDENDUM_A_ITEM = "REMOVE_ADDENDUM_A_ITEM";
export const EDIT_ADDENDUM_A_ITEM = "EDIT_ADDENDUM_A_ITEM";
export const MOVE_ADDENDUM_A_ITEM_UP = "MOVE_ADDENDUM_A_ITEM_UP";
export const MOVE_ADDENDUM_A_ITEM_DOWN = "MOVE_ADDENDUM_A_ITEM_DOWN";*/

export const UPDATE_ADDENDUM_A = "UPDATE_ADDENDUM_A";

interface UpdateAddendumA {
	type: typeof UPDATE_ADDENDUM_A;
	payload: {
		addendumArray: AddendumAItem[];
	}
}

export const UPDATE_DELIVERY_STATE = "UPDATE_DELIVERY_STATE";
export const SELECT_MODEL = "SELECT_MODEL";
export const SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT = "SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT";

interface UpdateDeliveryStateAction {
	type: typeof UPDATE_DELIVERY_STATE;
	payload: {
		state: string;
		openField1: string;
		openField1Amount: number;
	}
}

interface SelectModel {
	type: typeof SELECT_MODEL;
	payload: ModelSelectionDataPackage
}

interface SelectNoticeOfConstructionAndFinalPayment {
	type: typeof SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT;
	payload: {
		option: string;
		optionText: string;
		documentOrHomePrepFee: string;
		balancePaidInFullDate: string;
	};
}

export const LOAD_AGREEMENT_SALES_OFFICE = "LOAD_AGREEMENT_SALES_OFFICE";

interface LoadAgreementSalesOffice {
	type: typeof LOAD_AGREEMENT_SALES_OFFICE;
	payload: SalesOffice;
}

export const UPDATE_MANAGER_CLEARANCE_DISCOUNT = "UPDATE_MANAGER_CLEARANCE_DISCOUNT";

interface UpdateManagerClearanceDiscount {
	type: typeof UPDATE_MANAGER_CLEARANCE_DISCOUNT;
	payload: {
		amount: number;
	}
}

export const ADD_PREFERRED_PAYMENT_DISCOUNT = "ADD_PREFERRED_PAYMENT_DISCOUNT";
interface AddPreferredPaymentDiscount {
	type: typeof ADD_PREFERRED_PAYMENT_DISCOUNT;
	payload: {
		amount: number;
	}
}
export const REMOVE_PREFERRED_PAYMENT_DISCOUNT = "REMOVE_PREFERRED_PAYMENT_DISCOUNT";
interface RemovePreferredPaymentDiscount {
	type: typeof REMOVE_PREFERRED_PAYMENT_DISCOUNT;
}

export const ADD_VIP_DISCOUNT = "ADD_VIP_DISCOUNT";
interface AddVIPDiscount {
	type: typeof ADD_VIP_DISCOUNT;
	payload: {
		amount: number;
	}
}

export const REMOVE_VIP_DISCOUNT = "REMOVE_VIP_DISCOUNT";
interface RemoveVIPDiscount {
	type: typeof REMOVE_VIP_DISCOUNT;
}

export const UPDATE_FREIGHT_CHARGE = "UPDATE_FREIGHT_CHARGE";
interface UpdateFreightCharge {
	type: typeof UPDATE_FREIGHT_CHARGE;
	payload: { amount: number; }
}

export const UPDATE_FACTORY_TRIMOUT = "UPDATE_FACTORY_TRIMOUT";
interface UpdateFactoryTrimout {
	type: typeof UPDATE_FACTORY_TRIMOUT;
	payload: { amount: number; }
}

export const UPDATE_AC_PURCHASE = "UPDATE_AC_PURCHASE";
interface UpdateACPurchase {
	type: typeof UPDATE_AC_PURCHASE;
	payload: { amount: number; }
}

export const UPDATE_SETUP_CHARGES = "UPDATE_SETUP_CHARGES";
interface UpdateSetupCharges {
	type: typeof UPDATE_SETUP_CHARGES;
	payload: { amount: number; }
}

export const UPDATE_LOT_EXPENSE = "UPDATE_LOT_EXPENSE";
interface UpdateLotExpense {
	type: typeof UPDATE_LOT_EXPENSE;
	payload: { amount: number; }
}

export const UPDATE_EXTENDED_SERVICE_CONTRACT = "UPDATE_EXTENDED_SERVICE_CONTRACT";
interface UpdateExtendServiceContract {
	type: typeof UPDATE_EXTENDED_SERVICE_CONTRACT;
	payload: { amount: number; }
}

export const UPDATE_TAXES = "UPDATE_TAXES";
interface UpdateTaxes {
	type: typeof UPDATE_TAXES;
	payload:  {
		taxResponse: AvalaraTaxResponse,
		taxAmount: number
	}
}

export const UPDATE_CUSTOM_TAX_AMOUNT = "UPDATE_CUSTOM_TAX_AMOUNT";
interface UpdateCustomTaxAmount {
	type: typeof UPDATE_CUSTOM_TAX_AMOUNT;
	payload: {
		customTaxAmount: number;
	}
}

export const USE_CUSTOM_TAX_AMOUNT = "USE_CUSTOM_TAX_AMOUNT";
interface UseCustomTaxes {
	type: typeof USE_CUSTOM_TAX_AMOUNT;
}

export const USE_AVALARA_FOR_TAXES = "USE_AVALARA_FOR_TAXES";
interface UseAvalaraTaxes {
	type: typeof USE_AVALARA_FOR_TAXES;
}

export const UPDATE_DOWN_PAYMENT = "UPDATE_DOWN_PAYMENT";
interface UpdateDownPayment {
	type: typeof UPDATE_DOWN_PAYMENT;
	payload: { amount: number; }
}

export const UPDATE_ADDITIONAL_PAYMENT = "UPDATE_ADDITIONAL_PAYMENT";
interface UpdateAdditionalPayment {
	type: typeof UPDATE_ADDITIONAL_PAYMENT;
	payload: { amount: number; }
}

export const UPDATE_NUMBER_OF_UNITS = "UPDATE_NUMBER_OF_UNITS";
interface UpdateNumberOfUnits {
	type: typeof UPDATE_NUMBER_OF_UNITS;
	payload: { numberOfUnits: number };
}

export const UPDATE_APPLIANCE_LIST = "UPDATE_APPLIANCE_LIST";

interface UpdateApplianceList {
	type: typeof UPDATE_APPLIANCE_LIST;
	payload: { applianceList: ApplianceSheetItem[] }
}



export type AgreementEditorActionTypes = UpdateApplianceList | UpdateCustomTaxAmount | UseCustomTaxes | UseAvalaraTaxes | LoadAgreement | UpdateAddendumA | /*EditAddendumAItem | MoveAddendumAItemDown | MoveAddendumAItemUp |*/ UpdateNumberOfUnits | LoadAgreementSalesOffice | UpdateBooleanValueAction | UpdateNumericValueAction | /*AddAddendumAItem | RemoveAddendumAItem |*/ UpdateGenericInfoAction | SelectNoticeOfConstructionAndFinalPayment | SelectModel | UpdateDeliveryStateAction | SelectNoticeOfConstructionAndFinalPayment |  UpdateManagerClearanceDiscount | SelectModel | /*AddAddendumAItem | RemoveAddendumAItem |*/ AddPreferredPaymentDiscount | RemovePreferredPaymentDiscount | AddVIPDiscount | RemoveVIPDiscount | UpdateFreightCharge | UpdateFactoryTrimout | UpdateSetupCharges | UpdateLotExpense | UpdateACPurchase | UpdateAdditionalPayment | UpdateDownPayment | UpdateTaxes | UpdateExtendServiceContract;
