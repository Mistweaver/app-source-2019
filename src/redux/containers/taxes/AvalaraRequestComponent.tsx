import { StoreState } from "../../Store";
import { connect } from "react-redux";
import React from "react";
import { AvalaraTaxRequest } from "../../../objects/avalaraobjects/AvalaraTaxRequest";
import { AvalaraAddress } from "../../../objects/avalaraobjects/AvalaraAddress";
import { sendTransaction } from "../../../services/AvalaraServices";
import { AvalaraTaxResponse } from "../../../objects/avalaraobjects/AvalaraTaxResponse";
import { loadAgreement, updateTaxes, updateBooleanInformation, useAvalaraTaxes, useCustomTaxAmount, } from "../../actions/AgreementEditorActions";
import { calculateInvoiceValues } from "../../../utilities/InvoiceFunctions";
import { AddendumAItem } from "../../../objects/purchaseagreement/addendumA/AddendumAItem";
import { validateHTMLResponse } from "../../../services/HttpResponseChecker";
import { PurchaseAgreement } from "../../../objects/purchaseagreement/PurchaseAgreement";
import { SalesOffice } from "../../../objects/salesoffice/SalesOffice";
import { ChangeOrderItem } from "../../../objects/changeorders/ChangeOrderItem";
import { setAvalaraChangeOrderTaxes, loadChangeOrder,  } from '../../actions/ChangeOrderActions';
import { Logger, INFO, ERROR } from "../../../components/logger/Logger";
import { LinearProgress } from "@material-ui/core";
import { ChangeOrder } from "../../../objects/changeorders/ChangeOrder";

interface AvalaraRequestComponentProps {
	// Not from Redux
	orderType: string;
	documentType: string;

	// From Redux
	modelType: string;

	ccId: string;

	paDocumentCode: string;
	paCustomerCode: string;

	coDocumentCode: string;
	coCustomerCode: string;

	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	deliveryStreet: string;
	deliveryCountry: string;
	salesOffice: SalesOffice;
	factoryDirectPrice: number;
	factoryTotalCost: number;
	featuredHomePromoAmount: number;
	managerOrClearanceAmount: number;
	preferredPaymentAmount: number;
	vipMultiUnitDiscountAmount: number;
	standardFreightChargeAmount: number;
	factoryTrimOutAmount: number;
	purchaseOfACAmount: number;
	setupChargesAmount: number;
	documentOrHomePrepFeeAmount: number;
	extendedServiceContractAmount: number;
	lotExpense: number;
	addendumAItems: AddendumAItem[];
	numberOfUnits: number;
	taxExempt: boolean;
	customTaxAmount: boolean;

	// change order
	changeOrderItems: ChangeOrderItem[];
	changeOrderNumber: number;
	date: string;
	subTotal: number;
	tax: number;
	total: number;
	taxType: string;

	// relevant ids
	purchaseAgreementId: string;
	changeOrderId: string;
	changeOrderPurchaseAgreementId: string;

	// redux functions
	updateBooleanInformation: (targetedField: string, newValue: boolean) => void;
	updateTaxes: (response: AvalaraTaxResponse, taxAmount: number) => void;
	loadAgreement: (agreement: PurchaseAgreement) => void;
	loadChangeOrder: (changeOrder: ChangeOrder) => void;
	setAvalaraChangeOrderTaxes: (response: AvalaraTaxResponse) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		modelType: state.agreementeditor.modelType,

		paDocumentCode: state.agreementeditor.customerCode,
		paCustomerCode: state.agreementeditor.documentCode,

		coDocumentCode: state.changeordereditor.customerCode,
		coCustomerCode: state.changeordereditor.documentCode,

		ccId: state.agreementeditor.crmLeadId,

		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryState: state.agreementeditor.deliveryState,
		deliveryZip: state.agreementeditor.deliveryZip,
		deliveryStreet: state.agreementeditor.deliveryStreet,
		deliveryCountry: state.agreementeditor.deliveryCountry,

		salesOffice: state.agreementeditor.office,

		factoryDirectPrice: state.agreementeditor.factoryDirectPrice,
		factoryTotalCost: state.agreementeditor.factoryTotalCost,

		featuredHomePromoAmount: state.agreementeditor.featuredHomePromoAmount,
		managerOrClearanceAmount: state.agreementeditor.managerOrClearanceAmount,
		preferredPaymentAmount: state.agreementeditor.preferredPaymentAmount,
		vipMultiUnitDiscountAmount: state.agreementeditor.vipMultiUnitDiscountAmount,
		
		standardFreightChargeAmount: state.agreementeditor.standardFreightChargeAmount,
		factoryTrimOutAmount: state.agreementeditor.factoryTrimOutAmount,
		purchaseOfACAmount: state.agreementeditor.purchaseOfACAmount,
		setupChargesAmount: state.agreementeditor.setupChargesAmount,
		documentOrHomePrepFeeAmount: state.agreementeditor.documentOrHomePrepFeeAmount,
		extendedServiceContractAmount: state.agreementeditor.extendedServiceContractAmount,
		addendumAItems: state.agreementeditor.addendumAItems,
		taxExempt: state.agreementeditor.taxExempt,
		lotExpense: state.agreementeditor.lotExpenseAmount,
		numberOfUnits: state.agreementeditor.numberOfUnits,

		customTaxAmount: state.agreementeditor.useCustomTaxableAmount,

		purchaseAgreementId: state.agreementeditor.id,
		changeOrderId: state.changeordereditor.id,
		changeOrderPurchaseAgreementId: state.changeordereditor.purchaseAgreementId,
		changeOrderItems: state.changeordereditor.items,
		changeOrderNumber: state.changeordereditor.changeOrderNumber,
		date: state.changeordereditor.date,
		subTotal: state.changeordereditor.subTotal,
		tax: state.changeordereditor.tax,
		total: state.changeordereditor.total,
		taxType: state.changeordereditor.taxType

	}
}

interface AvalaraRequestComponentState {
	error: boolean;
	errorDetails: string;

	orderProcessing: boolean;
	orderSent: boolean;
	orderSuccessful: boolean;
}

class AvalaraRequestComponent extends React.Component<AvalaraRequestComponentProps, AvalaraRequestComponentState> {
	constructor(props: AvalaraRequestComponentProps) {
		super(props);
		this.state = {
			error: false,
			errorDetails: "",

			orderProcessing: false,
			orderSent: false,
			orderSuccessful: false,
		}
		this.send = this.send.bind(this);
	}

	private processChangeOrderItems(items: ChangeOrderItem[]) {
		let subTotal2 = 0;
		let freight = 0;
		let factoryTrimOut = 0;
		let ac = 0;
		let setup = 0;
		let docFees = 0;
		let warranty = 0;
		let lotExpense = 0;
	
		items.forEach(item => {

			switch(item.changeType) {
				case "addendumAChange":
					subTotal2 += item.cost;
					break;
				case "retailPrice":
					subTotal2 += item.cost;
					break;
				case "factoryDirectPrice":
					subTotal2 += item.cost;
					break;
				case "featuredHomePromotionDiscount":
					subTotal2 += item.cost;
					break;
				case "managerClearanceDiscount":
					subTotal2 += item.cost;
					break;
				case "preferredPaymentDiscount":
					subTotal2 += item.cost;
					break;
				case "vipMultiUnitDiscount":
					subTotal2 += item.cost;
					break;
				case "standardFreightCharge":
					freight += item.cost;
					break;
				case "factoryTrimOut":
					factoryTrimOut += item.cost;
					break;
				case "purchaseOfAC":
					ac += item.cost;
					break;
				case "setupCharges":
					setup += item.cost;
					break;
				case "extendedServiceContract":
					warranty += item.cost;
					break;
				case "documentOrHomePrepFeeAmount":
					docFees += item.cost;
					break;
				case "lotExpenseAmount":
					lotExpense += item.cost;
					break;
				default:
					break;
			}
		});
	
		return {
			"subTotal2": subTotal2,
			"standardFreightChargeAmount": freight,
			"factoryTrimOutAmount": factoryTrimOut,
			"purchaseOfACAmount": ac,
			"setupChargesAmount": setup,
			"documentOrHomePrepFeeAmount": docFees,
			"extendedServiceContractAmount": warranty,
			"lotExpense": lotExpense
		}
	}
	

	private send() {
		this.setState({ orderProcessing: true });

		// var otherFees = 0;
		

		let taxRequest = new AvalaraTaxRequest();
		taxRequest.type = this.props.orderType;

		// check the model type for PM-HUD
		let modelType = "";
		console.log(this.props.modelType);
		if(this.props.modelType === "PM-HUD" || this.props.modelType === "HUD") {
			modelType = "HUD";
		} else if(this.props.modelType === "PM") {
			modelType = "PM";	// needs to be a silent failure on the else case
		} else {
			this.setState({
				error: true,
				errorDetails: "Selected model is missing the associated modelType.  Contact an admin."
			});
			return;
		}

		// check the model type for PM-HUD
		if(modelType === "PM-HUD" || modelType === "HUD") {
			modelType = "HUD";
		} else if(modelType === "PM") {
			modelType = "PM";	// needs to be a silent failure on the else case
		} else {
			this.setState({ error: true, errorDetails: "Selected model is missing the associated modelType.  Contact an admin." });
			return;
		}
		
		console.log(modelType);





		// local tax variables
		let subTotal2 = 0;
		let standardFreightChargeAmount = 0;
		let factoryTrimOutAmount = 0;
		let purchaseOfACAmount = 0;
		let setupChargesAmount = 0;
		let documentOrHomePrepFeeAmount = 0;
		let extendedServiceContractAmount = 0;
		let lotExpenseAmount = 0;

		/**
		 * Depending on the document type, set the previous variables equal to either the purchase agreement data
		 * or the calculated change order totals
		 */
		if(this.props.documentType === "PA") {
			// calculate subTotal2
			let invoice = calculateInvoiceValues();
			subTotal2 = invoice.subTotal2;

			standardFreightChargeAmount = this.props.standardFreightChargeAmount;
			factoryTrimOutAmount = this.props.factoryTrimOutAmount;
			purchaseOfACAmount = this.props.purchaseOfACAmount;
			setupChargesAmount = this.props.setupChargesAmount;
			documentOrHomePrepFeeAmount = this.props.documentOrHomePrepFeeAmount;
			extendedServiceContractAmount = this.props.extendedServiceContractAmount;
			lotExpenseAmount = this.props.lotExpense;

		} else if(this.props.documentType === "CO") {
			let changeOrderTotals = this.processChangeOrderItems(this.props.changeOrderItems);
			subTotal2 = changeOrderTotals.subTotal2;
			standardFreightChargeAmount = changeOrderTotals.standardFreightChargeAmount;
			factoryTrimOutAmount = changeOrderTotals.factoryTrimOutAmount;
			purchaseOfACAmount = changeOrderTotals.purchaseOfACAmount;
			setupChargesAmount = changeOrderTotals.setupChargesAmount;
			documentOrHomePrepFeeAmount = changeOrderTotals.documentOrHomePrepFeeAmount;
			extendedServiceContractAmount = changeOrderTotals.extendedServiceContractAmount;
			lotExpenseAmount = changeOrderTotals.lotExpense;
		}

		// console.log("Avalara request debug");
		// console.log(subTotal2);
		// console.log(standardFreightChargeAmount);
		// console.log(factoryTrimOutAmount);
		// console.log(purchaseOfACAmount);
		// console.log(setupChargesAmount);
		// console.log(documentOrHomePrepFeeAmount);
		// console.log(extendedServiceContractAmount);
		// console.log(lotExpenseAmount);
		

		if(this.props.deliveryState === "FL") {
			if(this.props.documentType === "CO") {
				taxRequest.lines = [
					{ 
						amount: (subTotal2 +
								standardFreightChargeAmount +
								factoryTrimOutAmount +
								purchaseOfACAmount +
								setupChargesAmount +
								documentOrHomePrepFeeAmount +
								extendedServiceContractAmount +
								lotExpenseAmount) * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "ON030000",
						description: modelType
					}
				]
			} else {
				taxRequest.lines = [
					{ 
						amount: (subTotal2 +
								standardFreightChargeAmount +
								factoryTrimOutAmount +
								purchaseOfACAmount +
								setupChargesAmount +
								documentOrHomePrepFeeAmount +
								extendedServiceContractAmount +
								lotExpenseAmount) * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: modelType,
						description: modelType
					}
				]
			}
			
		} else if(this.props.deliveryState === "TN") {
			taxRequest.lines = [
				{ 
					amount: (subTotal2 +
							standardFreightChargeAmount +
							factoryTrimOutAmount +
							purchaseOfACAmount +
							setupChargesAmount +
							documentOrHomePrepFeeAmount +
							extendedServiceContractAmount +
							lotExpenseAmount) * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: modelType,
					description: modelType
				}
			]
		} else if(this.props.salesOffice.officeState === "TN" && this.props.documentType === "CO") {
			taxRequest.lines = [
				{ 
					amount: (subTotal2 +
							standardFreightChargeAmount +
							factoryTrimOutAmount +
							purchaseOfACAmount +
							setupChargesAmount +
							documentOrHomePrepFeeAmount +
							extendedServiceContractAmount +
							lotExpenseAmount) * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: "ON030000",
					description: modelType
				}
			]
		} else if(this.props.deliveryState === "MS") {
			/**
			 * Mississippi will need all of its options summed into HUD for the state 3% tax rate, with the new option
			 * of 'dozier work/grading (fi contracted) to be taxed at a different 7% rate.  Dozier work/grading is
			 * being filed under 'Lot Expense'
			 */
			taxRequest.lines = [
				{ 
					amount: (subTotal2 +
							standardFreightChargeAmount +
							factoryTrimOutAmount +
							purchaseOfACAmount +
							setupChargesAmount +
							documentOrHomePrepFeeAmount +
							extendedServiceContractAmount) * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: modelType,
					description: modelType
				},
				{
					amount: lotExpenseAmount * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: "SC156210",
					description: "Lot Expense"
				}
			];
		} else if(this.props.deliveryState === "NC" && this.props.modelType === "PM") {
			/**
				// PM sold in state and shipping in state 
					// subtotal2 + doc fees + freight
			**/
			taxRequest.lines = [
				{ 
					amount: (subTotal2 + standardFreightChargeAmount + documentOrHomePrepFeeAmount) * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: modelType,
					description: modelType
				}
			];
		} else if(this.props.deliveryState === "CA" && this.props.modelType === "PM") {
			/**
				// PM sold in state and shipping in state 
					// subtotal2 + doc fees
			**/
			taxRequest.lines = [
				{ 
					amount: (subTotal2 + documentOrHomePrepFeeAmount) * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: modelType,
					description: modelType
				}
			];
		} else if((this.props.deliveryState === "PA" || this.props.deliveryState === "OH") && this.props.modelType === "HUD" && this.props.documentType === "PA") {
			// do this for Ohio tooo
			/***
			 * We pay sales tax on the factory invoice cost. (factoryTotalCostIndex)
			 * 
			 * Taxes are NOT applied to the overall total
			 * 
			 * If we sell a HUD in PA to another state,
			 * we rebate them a percentage aka out-of-state-credit
			 * 
			 */
			taxRequest.lines = [
				{ 
					amount: this.props.factoryTotalCost,
					quantity: this.props.numberOfUnits,
					taxCode: modelType,
					description: modelType
				}
			];
		} else if (this.props.salesOffice.officeState === "TX") {
			
			taxRequest.lines = [
				{ 
					amount: (subTotal2) * this.props.numberOfUnits,
					quantity: this.props.numberOfUnits,
					taxCode: modelType,
					description: modelType
				}
			];
		} else {
			taxRequest.lines = [];
			if(subTotal2 !== 0) {
				taxRequest.lines.push(
					{ 
						amount: subTotal2 * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: modelType,
						description: modelType
					}
				)
			}
			if(standardFreightChargeAmount !== 0) {
				taxRequest.lines.push(
					{ 
						amount: standardFreightChargeAmount * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "FR020100",
						description: "Freight"
					}
				)
			}
			if(factoryTrimOutAmount !== 0) {
				taxRequest.lines.push(
					{ 
						amount: factoryTrimOutAmount  * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "SC150200",
						description: "FTO"
					}
				)
			}
			if(purchaseOfACAmount !== 0) {
				taxRequest.lines.push(
					{ 
						amount: purchaseOfACAmount  * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "P0000000",
						description: "AC "
					}	
				)
			}
			if(setupChargesAmount !== 0) {
				taxRequest.lines.push(
					{ 
						amount: setupChargesAmount  * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "SC150205",
						description: "Set-Up"
					}
				)
			}
			if(documentOrHomePrepFeeAmount !== 0) {
				taxRequest.lines.push(
					{ 
						amount: documentOrHomePrepFeeAmount * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "OH010000",
						description: "Doc fees"
					}	
				)
			}
			if(extendedServiceContractAmount !== 0) {
				taxRequest.lines.push(
					{ 
						amount: extendedServiceContractAmount * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "SW019478",
						description: "Warranty"
					}
				)
			}
			if(lotExpenseAmount !== 0) {
				taxRequest.lines.push(
					{
						amount: lotExpenseAmount * this.props.numberOfUnits,
						quantity: this.props.numberOfUnits,
						taxCode: "SC156210",
						description: "Lot Expense"
					}
				)
			}
		}

		/*** TEMP FIX FOR EMPTY REQUEST ERRORS */
		if(taxRequest.lines.length === 0) {
			taxRequest.lines.push(
				{ 
					amount: 0,
					taxCode: modelType,
					description: modelType
				}
			)
		}

		// if delivery state is PA or OH, and the sales office is NOT PA or OH, then 
		// set the taxes to zero

		// Apply other fees
		// case "TN"
			/**
			 * 	We charge a local and single article fee, built into avalara
			 * 
			 */


		// case "TX":
			// Park models we send the data to avalara
				// only send subtotal 2 for the amount
			// HUD
				// inventory tax - each location (i.e. county) has it's own tax rate
				// take that rate and multiply it by subtotal 2
				// return that value
		// break;	

		let toAddress = new AvalaraAddress(
			this.props.deliveryStreet,
			this.props.deliveryCity,
			this.props.deliveryState,
			this.props.deliveryCountry,
			this.props.deliveryZip
		);

		let fromAddress = new AvalaraAddress(
			this.props.salesOffice.officeAddress,
			this.props.salesOffice.officeCity,
			this.props.salesOffice.officeState,
			'US',
			this.props.salesOffice.officeZip
		);

		if(this.props.salesOffice.officeState === "TX" && this.props.modelType !== "PM") {
			taxRequest.multipleAddressSelection(fromAddress, toAddress);
		} else if(this.props.salesOffice.officeState === "TX" && this.props.modelType === "PM") {
			taxRequest.multipleAddressSelection(fromAddress, fromAddress);
			// just send the from address, so make a new function to do that
		} else if (this.props.salesOffice.officeState === "AZ" && this.props.modelType === "PM") {
			taxRequest.setFromAddressOnly(fromAddress);
		} else {
			taxRequest.singleAddressSelection(toAddress);
		}
		
		// set document code and customer code from the props
		if(this.props.documentType === "PA") {
			if(this.props.paDocumentCode === "") {
				taxRequest.code = this.props.ccId;
			} else {
				taxRequest.code = this.props.paDocumentCode;
			}

			if(this.props.paCustomerCode === "") {
				taxRequest.customerCode = this.props.salesOffice.locationCode + "-";
			} else {
				taxRequest.customerCode = this.props.paCustomerCode;
			}

		} else if(this.props.documentType === "CO") {
			if(this.props.coDocumentCode === "") {
				taxRequest.code = this.props.ccId;
			} else {
				taxRequest.code = this.props.coDocumentCode;
			}

			if(this.props.coCustomerCode === "") {
				taxRequest.customerCode = this.props.salesOffice.locationCode + "-";
			} else {
				taxRequest.customerCode = this.props.coCustomerCode;
			}
		}


		// set location code for reporting
		taxRequest.reportingLocationCode = this.props.salesOffice.locationCode;
		
		if(this.props.documentType === "PA") {
			console.log(taxRequest);
			//For texas HUD models, we do not send it to avalara
			sendTransaction(this.props.purchaseAgreementId, this.props.documentType, taxRequest).then(res => {

				this.setState({ orderProcessing: false, orderSent: true });

				if(validateHTMLResponse(res)) {
					this.setState({ orderSuccessful: true, error: false, errorDetails: "" });
					Logger(this.constructor.name, "Avalara Response", res, INFO);
					// if sales order, update tax stuff
					if(taxRequest.type === "SalesInvoice") {
						// if sales invoice, the agreement should be saved on the server, and the component merely needs to reload the agreement from the response
						this.props.loadAgreement(res.data.object);
					} else {
						if(this.props.deliveryState === "PA" && this.props.modelType === "HUD") {
							// let paTaxes = subTotal2 * 0.0277;
							this.props.updateTaxes(res.data.object, 0);
						} else {
							this.props.updateTaxes(res.data.object, res.data.object.totalTaxCalculated);
						}
					}
				} else {
					Logger(this.constructor.name, "Avalara Response", res, ERROR);
					this.flagError(res);
				}
			}).catch(err => {
				this.flagError(err);
			});;
		} else if(this.props.documentType === "CO") {
			sendTransaction(this.props.changeOrderId, this.props.documentType, taxRequest).then(res => {
				this.setState({ orderProcessing: false });
				if(validateHTMLResponse(res)) {
					this.setState({ orderSuccessful: true, error: false, errorDetails: "" });
					if(taxRequest.type === "SalesInvoice") {
						// if sales invoice, the change order should be saved on the server, and the component merely needs to reload the order from the response
						this.props.loadChangeOrder(res.data.object);
					} else {
						// if sales order, update tax stuff
						this.props.setAvalaraChangeOrderTaxes(res.data.object);
					}
				} else {
					this.flagError(res);
				}
			}).catch(err => {
				this.flagError(err);
			});
		}
	}

	private flagError(err: any) {
		Logger(this.constructor.name, "Avalara Response", err, ERROR);
		this.setState({
			error: true,
			errorDetails: "Err: " + err
		});
	}


	private renderActions() {
		const { orderType, taxType } = this.props;
		if((!this.props.customTaxAmount && !this.props.taxExempt) || taxType === "AVALARA") {
			return <button className="buttonMinimal"  onClick={this.send}>
				{ orderType === "SalesOrder" && "Calculate Tax" }
				{ orderType === "SalesInvoice" && "Send Sales Invoice" }
			</button>
		} else {
			return <div>Unknown document type</div>
		}
	}

	public render() {
		
		const { orderProcessing, orderSuccessful, error, errorDetails } = this.state;
		return(
			<>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					{
						orderProcessing ?
						<LinearProgress />
						:
						<>
							{this.renderActions()}
						</>	
					}
				</div>
				{ orderSuccessful && <div style={{color: 'green', padding: 5}}>Request Successful</div> }
				{ error && <div style={{padding: 5}}><span style={{color: 'red', padding: 5}}>Error: </span>{errorDetails}</div> }
			</>
		)
	}
}

export default connect(mapStateToProps, { useAvalaraTaxes, setAvalaraChangeOrderTaxes, useCustomTaxAmount, updateTaxes, loadAgreement, loadChangeOrder, updateBooleanInformation })(AvalaraRequestComponent);