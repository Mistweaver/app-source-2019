import { PurchaseAgreement } from "../../objects/purchaseagreement/PurchaseAgreement";
import { AgreementEditorActionTypes, LOAD_AGREEMENT, UPDATE_GENERIC_INFO, UPDATE_DELIVERY_STATE, SELECT_MODEL, UPDATE_BOOLEAN_VALUE, UPDATE_NUMERIC_VALUE, LOAD_AGREEMENT_SALES_OFFICE, UPDATE_MANAGER_CLEARANCE_DISCOUNT, ADD_PREFERRED_PAYMENT_DISCOUNT, REMOVE_PREFERRED_PAYMENT_DISCOUNT, ADD_VIP_DISCOUNT, REMOVE_VIP_DISCOUNT, UPDATE_FREIGHT_CHARGE, UPDATE_FACTORY_TRIMOUT, UPDATE_AC_PURCHASE, UPDATE_SETUP_CHARGES, UPDATE_LOT_EXPENSE, UPDATE_EXTENDED_SERVICE_CONTRACT, UPDATE_TAXES, UPDATE_DOWN_PAYMENT, UPDATE_ADDITIONAL_PAYMENT, UPDATE_NUMBER_OF_UNITS, UPDATE_ADDENDUM_A, USE_CUSTOM_TAX_AMOUNT, USE_AVALARA_FOR_TAXES, UPDATE_CUSTOM_TAX_AMOUNT, UPDATE_APPLIANCE_LIST } from "../types/AgreementEditorTypes";
import { AddendumAItem } from "../../objects/purchaseagreement/addendumA/AddendumAItem";
import { SalesOffice } from "../../objects/salesoffice/SalesOffice";
import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";
import { ApplianceSheetItem } from "../../objects/purchaseagreement/appliancesheet/ApplianceSheetItem";

export function loadAgreement(agreement: PurchaseAgreement): AgreementEditorActionTypes {
	return {
		type: LOAD_AGREEMENT,
		payload: agreement
	}
}

export function loadAgreementSalesOffice(office: SalesOffice): AgreementEditorActionTypes {
	return {
		type: LOAD_AGREEMENT_SALES_OFFICE,
		payload: office
	}
}

export function updateGenericInformation(targetedField: string, newValue: string): AgreementEditorActionTypes {
	return {
		type: UPDATE_GENERIC_INFO,
		payload: { field: targetedField, value: newValue}
	}
}

export function updateBooleanInformation(targetedField: string, newValue: boolean): AgreementEditorActionTypes {
	return {
		type: UPDATE_BOOLEAN_VALUE,
		payload: { field: targetedField, value: newValue}
	}
}

export function updateNumericInformation(targetedField: string, newValue: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_NUMERIC_VALUE,
		payload: { field: targetedField, value: newValue}
	}
}

export function updateDeliveryState(newState: string): AgreementEditorActionTypes {
	// put logic for Kentucky in here temporarily.  
	let openFieldString = "";
	let openFieldAmount = 0;

	// match the state request with the fees (only kentucky.  For all states this component needs to change drastically)
	switch(newState) {
		case "KY":
			openFieldString = "Kentucky On-Site Fee";
			openFieldAmount = 110;
			break;
		default:
			openFieldString = "";
			openFieldAmount = 0;
	}

	return {
		type: UPDATE_DELIVERY_STATE,
		payload: {
			state: newState,
			openField1: openFieldString,
			openField1Amount: openFieldAmount
		}
	}
}

export function addAddendumAItem(items: AddendumAItem[], newItem: AddendumAItem): AgreementEditorActionTypes {
	let newArray = items.slice();
	newArray.splice(0, 0, newItem);
	return {
		type: UPDATE_ADDENDUM_A,
		payload: {
			addendumArray: newArray
		}
	}
}

export function removeAddendumAItem(items: AddendumAItem[], index: number): AgreementEditorActionTypes {
	let newArray = items.slice();
	newArray.splice(index, 1);
	return {
		type: UPDATE_ADDENDUM_A,
		payload: {
			addendumArray: newArray
		}
	}
}

export function editAddendumAItem(items: AddendumAItem[], itemIndex: number, updatedItem: AddendumAItem): AgreementEditorActionTypes {
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
		type: UPDATE_ADDENDUM_A,
		payload: {
			addendumArray: newArray
		}
	}
}

export function moveAddendumAItemUp(items: AddendumAItem[], itemIndex: number): AgreementEditorActionTypes {
	const results= items.slice();
	const firstItem = items[itemIndex];
	results[itemIndex] = items[itemIndex - 1];
	results[itemIndex - 1] = firstItem;

	return {
		type: UPDATE_ADDENDUM_A,
		payload: {
			addendumArray: results
		}
	}
}

export function moveAddendumAItemDown(items: AddendumAItem[], itemIndex: number): AgreementEditorActionTypes {
	const results= items.slice();
	const firstItem = items[itemIndex];
	results[itemIndex] = items[itemIndex + 1];
	results[itemIndex + 1] = firstItem;

	return {
		type: UPDATE_ADDENDUM_A,
		payload: {
			addendumArray: results
		}
	}
}

export class ModelSelectionDataPackage {
	make: string;
	model: string;
	manufacturer: string;
	modelType: string;
	bedrooms: string;
	baths: string;
	floorSize: string;
	hitchSize: string;
	approximateSquareFeet: number;
	retailPrice: number;
	factoryDirectPrice: number;
	factoryTotalCost: number;
	promotionName: string;
	promotionDiscountPrice: number;
	modelSelectionDate: string;
	promotionSelectionHalf: string;
}

export function selectModel(dataPackage: ModelSelectionDataPackage): AgreementEditorActionTypes {
	return {
		type: SELECT_MODEL,
		payload: dataPackage
	}
}

export function updateManagerClearanceDiscountAmount(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_MANAGER_CLEARANCE_DISCOUNT,
		payload: {
			amount: newAmount
		}
	}
}

export function addPreferredPaymentDiscount(newAmount: number): AgreementEditorActionTypes {
	return {
		type: ADD_PREFERRED_PAYMENT_DISCOUNT,
		payload: {
			amount: newAmount
		}
	}
}

export function removePreferredPaymentDiscount(): AgreementEditorActionTypes {
	return {
		type: REMOVE_PREFERRED_PAYMENT_DISCOUNT,
	}
}

export function addVIPDiscount(newAmount: number): AgreementEditorActionTypes {
	return {
		type: ADD_VIP_DISCOUNT,
		payload: {
			amount: newAmount
		}
	}
}

export function removeVIPDiscount(): AgreementEditorActionTypes {
	return {
		type: REMOVE_VIP_DISCOUNT
	}
}

export function updateFreightCharge(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_FREIGHT_CHARGE,
		payload: {
			amount: newAmount
		}
	}
}

export function updateFactoryTrimout(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_FACTORY_TRIMOUT,
		payload: {
			amount: newAmount
		}
	}
}

export function updateACPurchase(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_AC_PURCHASE,
		payload: {
			amount: newAmount
		}
	}
}

export function updateSetupCharges(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_SETUP_CHARGES,
		payload: {
			amount: newAmount
		}
	}
}

export function updateLotExpense(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_LOT_EXPENSE,
		payload: {
			amount: newAmount
		}
	}
}

export function updateExtendedServiceContractAmount(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_EXTENDED_SERVICE_CONTRACT,
		payload: {
			amount: newAmount
		}
	}
}

export function updateTaxes(taxResponse: AvalaraTaxResponse, amount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_TAXES,
		payload: {
			taxResponse: taxResponse,
			taxAmount: amount
		}
	}
}

export function updateCustomTaxAmount(amount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_CUSTOM_TAX_AMOUNT,
		payload: {
			customTaxAmount: amount
		}
	}
}

export function useCustomTaxAmount(): AgreementEditorActionTypes {
	return {
		type: USE_CUSTOM_TAX_AMOUNT
	}
}

export function useAvalaraTaxes(): AgreementEditorActionTypes {
	return {
		type: USE_AVALARA_FOR_TAXES
	}
}

export function updateDownPayment(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_DOWN_PAYMENT,
		payload: {
			amount: newAmount
		}
	}
}

export function updateAdditionalPayment(newAmount: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_ADDITIONAL_PAYMENT,
		payload: {
			amount: newAmount
		}
	}
}

export function updateNumberOfUnits(numberOfUnits: number): AgreementEditorActionTypes {
	return {
		type: UPDATE_NUMBER_OF_UNITS,
		payload: {
			numberOfUnits: numberOfUnits
		}
	}
}

export function updateAppliance(appliances: ApplianceSheetItem[], newItem: ApplianceSheetItem): AgreementEditorActionTypes {
	// check that appliance does not already exist
	let foundApplianceIndex = appliances.findIndex(appliance => appliance.itemName === newItem.itemName);
	if(foundApplianceIndex !== -1) {
		// appliance already present in list
		let newArray = appliances.map((item, index) => {
			if (index !== foundApplianceIndex) {
				  // This isn't the item we care about - keep it as-is
				  return item
			}
			// Otherwise, this is the one we want - return an updated value
			return {
				  ...item,
				  ...newItem
			}
		});
		return {
			type: UPDATE_APPLIANCE_LIST,
			payload: {
				applianceList: newArray
			}
		}
	} else {
		// otherwise add the new appliance
		let newArray = appliances.slice();
		newArray.splice(0, 0, newItem);
		return {
			type: UPDATE_APPLIANCE_LIST,
			payload: {
				applianceList: newArray
			}
		}
	}
	
}

export function removeAppliance(newApplianceArray: ApplianceSheetItem[]): AgreementEditorActionTypes {
	return {
		type: UPDATE_APPLIANCE_LIST,
		payload: {
			applianceList: newApplianceArray
		}
	}
}