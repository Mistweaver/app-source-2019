import { AddendumAItem } from "../../../objects/purchaseagreement/addendumA/AddendumAItem";
import store from "../../Store";

export function calculateCustomTax(taxRate: number) { 
    /**
     * Get the data to calculate custom taxes for Pennsylvania and Ohio.
     */
    let factoryDirectPrice = store.getState().agreementeditor.factoryDirectPrice;
    let promotionDiscountPrice = store.getState().agreementeditor.featuredHomePromoAmount;
    let promoAmount = 0;
    if(promotionDiscountPrice !== 0) {
        promoAmount = Math.abs(promotionDiscountPrice) - Math.abs(factoryDirectPrice);
    }
    let preferredPaymentDiscountAmount = store.getState().agreementeditor.preferredPaymentAmount;
    let vipDiscountAmount = store.getState().agreementeditor.vipMultiUnitDiscountAmount;
    let items: AddendumAItem[] = store.getState().agreementeditor.addendumAItems;
    let addendumATotal = 0;
    if(items !== undefined) {
        items.forEach(item => {
            addendumATotal += item.cost;
        });
    }
    let managerOrClearanceAmount = store.getState().agreementeditor.managerOrClearanceAmount;
    let numberOfUnits = store.getState().agreementeditor.numberOfUnits;
    let subTotal2 = factoryDirectPrice + promoAmount + addendumATotal + managerOrClearanceAmount + preferredPaymentDiscountAmount + vipDiscountAmount;
    let freight = store.getState().agreementeditor.standardFreightChargeAmount;
    let ac = store.getState().agreementeditor.purchaseOfACAmount;

    console.log("freight: " + freight);
    console.log("ac: " + ac);
    console.log("delivery state: " + store.getState().agreementeditor.deliveryState);
    console.log("model type: " + store.getState().agreementeditor.modelType);
    console.log("tax rate: " + taxRate);

    /**
     * Handle Penn PM special case
     */
    if(store.getState().agreementeditor.deliveryState === "PA" && store.getState().agreementeditor.modelType === "PM") {
        subTotal2 = subTotal2 + freight + ac;
    }

    /**
     * Handle multiple units.
     */
    subTotal2 = subTotal2 * numberOfUnits;

    /**
     * Calculate the tax.
     */
    var customTaxAmount = parseFloat((subTotal2*taxRate).toFixed(2));
    console.log("calculated customTaxAmount: " + customTaxAmount);
 
    return customTaxAmount;
} 
