import React from "react";
import { SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT, AgreementEditorActionTypes } from "../types/AgreementEditorTypes";

export function selectNoticeOfConstructionAndFinalPayment(selection: string, currentBalancePaidInFullDate: string): AgreementEditorActionTypes {
	let optionText = "";
	let invoiceValue = "";
	if(currentBalancePaidInFullDate === "Per Lender Requirements") {
		// console.log("Resetting current balance paid in full date");
		currentBalancePaidInFullDate = "";
	}

	switch(selection) {
		case "Cash/Custom/Build":
			optionText = "This is a cash transaction.  Buyer authorizes %%SALES_OFFICE_TITLE%% to place home into the construction process.  By placing home in the construction process, buyer understands that all down payments are non-refundable.  Buyer agrees that the final payment must be paid as indicated under Notations & Remarks.  X________ X________ ";
			invoiceValue = "Document Fee";
			break;
		case "Cash/Custom/Contingent":
			optionText = "This is a cash transaction. Purchase Agreement is contingent as indicated under Notation & Remarks. Buyer agrees to and understands that all down payments %%DOWN_PAYMENT_HANDLING%%.  X________  X________";
			invoiceValue = "Document Fee";
			break;
		case "Cash/Stock": 
			optionText = "This is a cash transaction for the purchase of a stock unit.  Buyer authorizes %%SALES_OFFICE_TITLE%% to take this home off the market for sale and understand that the unpaid balance must be paid prior to delivery and by the agreed upon date listed under Notations & Remarks.   X________ X________";
			invoiceValue = "Document Fee";
			break;
		case "Finance/Custom/Build":
			optionText = "Buyer intends to finance this purchase and through buyer's lender will provide a loan approval letter to %%SALES_OFFICE_TITLE%%.  Buyer authorizes %%SALES_OFFICE_TITLE%% to place home into the construction process.  By placing home in the construction process, buyer understands that all down payments are non-refundable.  Buyer agrees to and understands that final payment must be made by lender prior to or upon delivery of home.  X________  X________";
			invoiceValue = "Home Preparation Fee";
			currentBalancePaidInFullDate = "Per Lender Requirements";
			break;
		case "Finance/Custom/Contingent":
			optionText = "Buyer intends to finance this purchase and through buyer's lender will provide a loan approval letter to %%SALES_OFFICE_TITLE%%.  Purchase Agreement is contingent as indicated under Notation & Remarks.  Buyer agrees to and understands that all down payments %%DOWN_PAYMENT_HANDLING%%.  X________ X________";
			invoiceValue = "Home Preparation Fee";
			currentBalancePaidInFullDate = "Per Lender Requirements";
			break;
		case "Finance/Stock/Deliver":
			optionText = "Buyer intends to finance this purchase for a stock unit and through the buyer's lender will provide a loan approval letter to %%SALES_OFFICE_TITLE%%.  Buyer authorizes %%SALES_OFFICE_TITLE%% to take this home off the market for sale and understands that final payment must be made by lender prior to or upon delivery of home.  X________ X________";
			invoiceValue = "Home Preparation Fee";
			currentBalancePaidInFullDate = "Per Lender Requirements";
			break;
		case "Finance/Stock/Contingent":
			optionText = "Buyer intends to finance this purchase for a stock unit and through buyer's lender will provide a loan approval letter to %%SALES_OFFICE_TITLE%%. Purchase Agreement is contingent as indicated under Notations & Remarks. Buyer agrees to and understands that all down payments %%DOWN_PAYMENT_HANDLING%%.  X________ X________";
			invoiceValue = "Home Preparation Fee";
			currentBalancePaidInFullDate = "Per Lender Requirements";
			break;
		default:
			break;
	}

	// console.log(currentBalancePaidInFullDate);

	return {
		type: SELECT_NOTICE_OF_CONSTRUCTION_AND_FINAL_PAYMENT,
		payload: {
			option: selection,
			optionText: optionText,
			documentOrHomePrepFee: invoiceValue,
			balancePaidInFullDate: currentBalancePaidInFullDate
		}
	}
}

export function RenderNoticeOfConstructionSelectionOptions() {
	return <>
		<option value="0">-</option>
		<option value="Cash/Custom/Build">Cash/Custom/Build</option>
		<option value="Cash/Custom/Contingent">Cash/Custom/Contingent</option>
		<option value="Cash/Stock">Cash/Stock</option>
		<option value="Finance/Custom/Build">Finance/Custom/Build</option>
		<option value="Finance/Custom/Contingent">Finance/Custom/Contingent</option>
		<option value="Finance/Stock/Deliver">Finance/Stock/Deliver</option>
		<option value="Finance/Stock/Contingent">Finance/Stock/Contingent</option>
	</>
}