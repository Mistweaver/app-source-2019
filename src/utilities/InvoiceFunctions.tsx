import { AddendumAItem } from "../objects/purchaseagreement/addendumA/AddendumAItem";
import { PREFERRED_PAYMENT_DISCOUNT_AMOUNT, VIP_MULTI_UNIT_DISCOUNT_AMOUNT } from "../data/staticdata";
import store from '../redux/Store';
// import { Logger } from "../components/logger/Logger";

export class InvoicePackage {
	discountAmount: number;
	promoAmount: number;
	addendumATotal: number;
	preferredPaymentDiscount: number;
	preferredPaymentDiscountWithoutVIP: number;
	vipMultiUnitDiscount: number;
	subTotal2: number;
	total: number;
	unpaidBalance: number;

	constructor() {
		this.discountAmount = 0;
		this.promoAmount = 0;
		this.addendumATotal = 0;
		this.preferredPaymentDiscount = 0;
		this.preferredPaymentDiscountWithoutVIP = 0;
		this.vipMultiUnitDiscount = 0;
		this.subTotal2 = 0;
		this.total = 0;
		this.unpaidBalance = 0;
	}
}

export function calculateInvoiceValues() {
	let invoice = new InvoicePackage();

	// calculate the discount amount
	// 2021-02-22 - P. Spagnola
	// Added "toFixed(2)" rounding to ensure penny accuracy.
	let retailPrice = store.getState().agreementeditor.retailPrice;
	retailPrice = parseFloat(retailPrice.toFixed(2));
	let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;
	factoryDirectPrice = parseFloat(factoryDirectPrice.toFixed(2));
	invoice.discountAmount = (Math.abs(retailPrice) - Math.abs(factoryDirectPrice)) * (-1);
	//console.log(retailPrice);
	//console.log(factoryDirectPrice);
	//console.log(invoice.discountAmount);

	// if promotion exists, calculate the promotion discount
	let promotionDiscountPrice = store.getState().agreementeditor.featuredHomePromoAmount;
	let promoAmount = 0;
	if(promotionDiscountPrice !== 0) {
		promoAmount = Math.abs(promotionDiscountPrice) - Math.abs(factoryDirectPrice);
	}
	invoice.promoAmount = promoAmount;

	// calculate addendum A item totals
	let items: AddendumAItem[] = store.getState().agreementeditor.addendumAItems;
	let addendumATotal = 0;
	if(items !== undefined) {
		items.forEach(item => {
			addendumATotal += item.cost;
		});
	}
	invoice.addendumATotal = addendumATotal;

	// calculate vip multi unit discount
	let managerOrClearanceAmount = store.getState().agreementeditor.managerOrClearanceAmount;
	let vipMultiUnitDiscountAmount = (factoryDirectPrice + promoAmount + managerOrClearanceAmount) * (-VIP_MULTI_UNIT_DISCOUNT_AMOUNT);
	invoice.vipMultiUnitDiscount = vipMultiUnitDiscountAmount;

	// calculate preferred payment discount with vip multi unit discount
	let preferredPaymentDiscount = (factoryDirectPrice  + promoAmount  + managerOrClearanceAmount + vipMultiUnitDiscountAmount) * (-PREFERRED_PAYMENT_DISCOUNT_AMOUNT);
	invoice.preferredPaymentDiscount = preferredPaymentDiscount;
	
	// calculate preferred payment discount without the vip multi unit discount
	let preferredPaymentDiscountAmountWithoutVIP = (factoryDirectPrice  + promoAmount  + managerOrClearanceAmount) * (-PREFERRED_PAYMENT_DISCOUNT_AMOUNT);
	invoice.preferredPaymentDiscountWithoutVIP = preferredPaymentDiscountAmountWithoutVIP;

	// calculate subtotal 2
	// get these variables from props, don't use the ones above
	let preferredPaymentDiscountAmount = store.getState().agreementeditor.preferredPaymentAmount;
	let vipDiscountAmount = store.getState().agreementeditor.vipMultiUnitDiscountAmount;

	// console.log("factory direct price: " + factoryDirectPrice);
	// console.log("promo amount: " + promoAmount);
	// console.log("Addendum a " + addendumATotal);
	// console.log("manager or clearance amount: " + managerOrClearanceAmount);
	// console.log("preferred payment discount amount: " + preferredPaymentDiscountAmount);
	// console.log("vip discount amount: " + vipDiscountAmount);

	let subTotal2 = factoryDirectPrice + promoAmount + addendumATotal + managerOrClearanceAmount + preferredPaymentDiscountAmount + vipDiscountAmount;
	// console.log("Subtotal 2: " + subTotal2);
	// invoice.preferredPaymentDiscount = preferredPaymentDiscountAmount;
	// invoice.vipMultiUnitDiscount = vipDiscountAmount;
	invoice.subTotal2 = subTotal2;


	// calculate total
	let standardFreightChargeAmount = store.getState().agreementeditor.standardFreightChargeAmount;
	let factoryTrimOutAmount = store.getState().agreementeditor.factoryTrimOutAmount;
	let purchaseOfACAmount = store.getState().agreementeditor.purchaseOfACAmount;
	let setupChargesAmount = store.getState().agreementeditor.setupChargesAmount;
	let lotExpenseAmount = store.getState().agreementeditor.lotExpenseAmount;
	let extendedServiceContractAmount = store.getState().agreementeditor.extendedServiceContractAmount;
	let documentOrHomePrepFeeAmount = store.getState().agreementeditor.documentOrHomePrepFeeAmount;
	let titleFeeAmount = store.getState().agreementeditor.titleFeeAmount;
	let openField1Amount = store.getState().agreementeditor.openField1Amount;
	let numberOfUnits = store.getState().agreementeditor.numberOfUnits;
	let taxesAmount = store.getState().agreementeditor.taxesAmount;
	let customTaxesAmount = store.getState().agreementeditor.customTaxableAmount;

	let total = (
		/// factoryDirectPrice + addendumATotal + promoAmount + managerOrClearanceAmount + vipDiscountAmount + preferredPaymentDiscountAmount +
		subTotal2 +
		standardFreightChargeAmount +
		factoryTrimOutAmount +
		purchaseOfACAmount +
		setupChargesAmount +
		lotExpenseAmount +
		extendedServiceContractAmount +
		documentOrHomePrepFeeAmount +
		titleFeeAmount  + 
		openField1Amount
	) * numberOfUnits +
		taxesAmount +
		customTaxesAmount;

	invoice.total = total;

	// calculate unpaid balance
	let downPayment = store.getState().agreementeditor.downPayment;
	let additionalPaymentAsAgreed = store.getState().agreementeditor.additionalPaymentAsAgreed;
	let unpaidBalance = total + downPayment + additionalPaymentAsAgreed;
	
	invoice.unpaidBalance = unpaidBalance;

	// return the invoice
	return invoice;
}

/*export function calculateDiscountAmount() {
	// return the negative value of the discount
	let retailPrice = store.getState().agreementeditor.retailPrice;
	let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;
	return (Math.abs(retailPrice) - Math.abs(factoryDirectPrice)) * (-1);
}*/

/*export function calculatePromotionDiscountAmount() {
	// console.log("Calculating Promotion Discount Amount");
	// console.log("Inputs: " + factoryDirectPrice + " (factory direct price), " + promotionDiscount + " (promotion discount price)");
	let promotionDiscount = store.getState().agreementeditor.featuredHomePromoAmount;
	let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;

	if(promotionDiscount !== 0) {
		let promoAmount =  Math.abs(promotionDiscount) - Math.abs(factoryDirectPrice);
		return promoAmount;
	} else {
		return 0;
	}
}*/

// Accepts a list of Addendum A items and returns their total
/*export function calculateAddendumATotal() {
	// console.log("Calculating Addendum A Total");
	// console.log(items);
	let items: AddendumAItem[] = store.getState().agreementeditor.addendumAItems;
	let total = 0;
	if(items !== undefined) {
		items.forEach(item => {
			total += item.cost;
		});
	}
	
	return total;
}*/

// calculate preferred payment discount
/*export function calculatePreferredPaymentDiscount() {
	let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;
	let managerOrClearanceAmount = store.getState().agreementeditor.managerOrClearanceAmount;
	let vipMultiUnitDiscountAmount = store.getState().agreementeditor.vipMultiUnitDiscountAmount;

	let discount = (factoryDirectPrice  + calculatePromotionDiscountAmount()  + managerOrClearanceAmount + vipMultiUnitDiscountAmount) * (-PREFERRED_PAYMENT_DISCOUNT_AMOUNT);
	return discount;
}*/

// calculate vip multi unit discount
/*export function calculateVIPMultiUnitDiscount() {
	let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;
	let managerOrClearanceAmount = store.getState().agreementeditor.managerOrClearanceAmount;

	let discount = (factoryDirectPrice + calculatePromotionDiscountAmount() + managerOrClearanceAmount) * (-VIP_MULTI_UNIT_DISCOUNT_AMOUNT);
	return discount;
}*/


// calculate subtotal 2
/*export function calculateSubTotal2() {
	let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;
	let managerOrClearanceAmount = store.getState().agreementeditor.managerOrClearanceAmount;
	let preferredPaymentDiscountAmount = store.getState().agreementeditor.preferredPaymentAmount;
	let vipDiscountAmount = store.getState().agreementeditor.preferredPaymentAmount;

	let subTotal2 = factoryDirectPrice + calculatePromotionDiscountAmount() + calculateAddendumATotal() + managerOrClearanceAmount + preferredPaymentDiscountAmount + vipDiscountAmount;
	return subTotal2;
}*/

/*export function calculateTotal() {
	let total = (factoryDirectPrice + 
	calculateAddendumATotal() +
	calculatePromotionDiscountAmount() +
	managerOrClearanceAmount +
	vipDiscountAmount +
	preferredPaymentDiscountAmount +
	standardFreightChargeAmount +
	factoryTrimOutAmount +
	purchaseOfACAmount +
	setupChargesAmount +
	lotExpenseAmount +
	extendedServiceContractAmount +
	documentOrHomePrepFeeAmount +
	titleFeeAmount  + 
	openField1Amount) * numberOfUnits +
	taxesAmount +
	customTaxesAmount;

	return total;
	
}*/

/*export function calculateUnpaidBalance(
	factoryDirectPrice: number,
	featuredHomePromoAmount: number,
	addendumAItems: AddendumAItem[],
	managerOrClearanceAmount: number,
	preferredPaymentDiscountAmount: number,
	vipDiscountAmount: number,
	standardFreightChargeAmount: number,
	factoryTrimOutAmount: number,
	purchaseOfACAmount: number,
	setupChargesAmount: number,
	lotExpenseAmount: number,
	extendedServiceContractAmount: number,
	documentOrHomePrepFeeAmount: number,
	taxesAmount: number,
	customTaxesAmount: number,
	titleFeeAmount: number,
	openField1Amount: number,
	downPayment: number,
	additionalPaymentAsAgreed: number,
	numberOfUnits: number
) {
	let unpaidBalance = (factoryDirectPrice + 
	calculateAddendumATotal(addendumAItems) +
	calculatePromotionDiscountAmount(factoryDirectPrice, featuredHomePromoAmount) +
	managerOrClearanceAmount +
	vipDiscountAmount +
	preferredPaymentDiscountAmount +
	standardFreightChargeAmount +
	factoryTrimOutAmount +
	purchaseOfACAmount +
	setupChargesAmount +
	lotExpenseAmount +
	extendedServiceContractAmount +
	documentOrHomePrepFeeAmount +
	titleFeeAmount  + 
	openField1Amount) * numberOfUnits +
	taxesAmount +
	customTaxesAmount +
	downPayment +
	additionalPaymentAsAgreed;

	return unpaidBalance;
}*/