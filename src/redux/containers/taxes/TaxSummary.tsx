import React from 'react';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import { StoreState } from '../../Store';
import { connect } from 'react-redux';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { Grid } from '@material-ui/core';
import { ChangeOrderItem } from '../../../objects/changeorders/ChangeOrderItem';
import { calculateInvoiceValues } from '../../../utilities/InvoiceFunctions';
import { AddendumAItem } from '../../../objects/purchaseagreement/addendumA/AddendumAItem';
import { checkIfAdmin } from '../../../auth/AccessControlFunctions';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { FlexedRowInfo } from '../../../components/flexedrowdisplay/FlexedRowInfo';


interface TaxSummaryProps {
	taxBreakdown: AvalaraTaxResponse;
	documentType: string;
	purchaseAgreementId: string;
	buyer1: string;
	changeOrderId: string;
	clientConsultantId: string;
	deliveryState: string;

	modelType: string;
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

	// Accounting variables for Pennsylvania in-state taxes
	factoryInvoice: number;
	factoryFreight: number;

	office: SalesOffice;

	// change order
	changeOrderItems: ChangeOrderItem[];
	changeOrderNumber: number;
	changeOrderTaxBreakdown: AvalaraTaxResponse;
	date: string;
	subTotal: number;
	tax: number;
	total: number;
}

function mapStateToProps(state: StoreState) {
	return {
		taxBreakdown: state.agreementeditor.taxBreakdown,
		purchaseAgreementId: state.agreementeditor.id,
		buyer1: state.agreementeditor.buyer1,
		changeOrderId: state.changeordereditor.id,
		clientConsultantId: state.agreementeditor.crmLeadId,
		deliveryState: state.agreementeditor.deliveryState,


		modelType: state.agreementeditor.modelType,

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

		// Accounting variables for Pennsylvania in-state taxes
		factoryInvoice: state.agreementeditor.factoryInvoice,
		factoryFreight: state.agreementeditor.factoryFreight,

		office: state.agreementeditor.office,

		changeOrderPurchaseAgreementId: state.changeordereditor.purchaseAgreementId,
		changeOrderItems: state.changeordereditor.items,
		changeOrderNumber: state.changeordereditor.changeOrderNumber,
		changeOrderTaxBreakdown: state.changeordereditor.taxBreakdown,
		date: state.changeordereditor.date,
		subTotal: state.changeordereditor.subTotal,
		tax: state.changeordereditor.tax,
		total: state.changeordereditor.total
	}
}

const TaxSummary = (props: TaxSummaryProps) => {
	let rate = 0;
	let precision = 0;
	
	let taxBreakdown: AvalaraTaxResponse = new AvalaraTaxResponse();


	let documentId = "";
	if(props.documentType === "PA") {
		documentId = props.purchaseAgreementId;
		taxBreakdown = props.taxBreakdown;
		taxBreakdown.summary.forEach(line => {
			rate += line.rate;
			let decimalCount = countDecimals(line.rate);
			if( decimalCount > precision) {
				precision = decimalCount;
			}
		});
	} else if(props.documentType === "CO") {
		documentId = props.changeOrderId;
		taxBreakdown = props.changeOrderTaxBreakdown;
		taxBreakdown.summary.forEach(line => {
			rate += line.rate;
			let decimalCount = countDecimals(line.rate);
			if( decimalCount > precision) {
				precision = decimalCount;
			}
		});
	}

	function countDecimals(value: number) {
		if(Math.floor(value) === value) return 0;
    	return value.toString().split(".")[1].length || 0; 
	}

	function processChangeOrderItems(items: ChangeOrderItem[]) {
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
	if(props.documentType === "PA") {
		// calculate subTotal2
		subTotal2 = calculateInvoiceValues().subTotal2;
		standardFreightChargeAmount = props.standardFreightChargeAmount;
		factoryTrimOutAmount = props.factoryTrimOutAmount;
		purchaseOfACAmount = props.purchaseOfACAmount;
		setupChargesAmount = props.setupChargesAmount;
		documentOrHomePrepFeeAmount = props.documentOrHomePrepFeeAmount;
		extendedServiceContractAmount = props.extendedServiceContractAmount;
		lotExpenseAmount = props.lotExpense;

	} else if(props.documentType === "CO") {
		let changeOrderTotals = processChangeOrderItems(props.changeOrderItems);
		subTotal2 = changeOrderTotals.subTotal2;
		standardFreightChargeAmount = changeOrderTotals.standardFreightChargeAmount;
		factoryTrimOutAmount = changeOrderTotals.factoryTrimOutAmount;
		purchaseOfACAmount = changeOrderTotals.purchaseOfACAmount;
		setupChargesAmount = changeOrderTotals.setupChargesAmount;
		documentOrHomePrepFeeAmount = changeOrderTotals.documentOrHomePrepFeeAmount;
		extendedServiceContractAmount = changeOrderTotals.extendedServiceContractAmount;
		lotExpenseAmount = changeOrderTotals.lotExpense;
	}


	return(
		<>
			<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<span style={{fontSize: '14pt'}}>Tax Summary for {props.documentType + " #" + documentId}</span>
					{	
						taxBreakdown.addresses.map((address, index) => (
							<span key={address.line1 + index} style={{margin: 0}}>
								{ index === 0 ? "Address: " : "Address " + index + ": " }
								{address.line1 + ", " + address.city + ", " + address.region + ", " + address.postalCode + ", " + address.country}
							</span>
						))
					}
					<span>Date: {taxBreakdown.paymentDate}</span>
				</div>
			</div>
			{(props.office.officeState === 'PA' && props.deliveryState === 'PA') ? 
				<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
					<div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
						<FlexedRowInfo field="Factory Invoice: " bold={false} property={FormatNumberAsMoney(props.factoryInvoice)}/>
						<FlexedRowInfo field="Factory Freight: " bold={false} property={FormatNumberAsMoney(props.factoryFreight)}/>
						<FlexedRowInfo field="Taxable Amount (Invoice - Freight): " bold={false} property={FormatNumberAsMoney(props.factoryInvoice - props.factoryFreight)}/>
						<FlexedRowInfo field="Adjusted Taxable Amount (Taxable Amount * 60%): " bold={false} property={FormatNumberAsMoney((props.factoryInvoice - props.factoryFreight)*0.6)}/>
						<FlexedRowInfo field="Calculated Tax (Adjusted Taxable Amount * 6%): " bold={false} property={FormatNumberAsMoney(((props.factoryInvoice - props.factoryFreight)*0.6)*0.06)}/>
					</div>
				</div>
				:
				<>
				<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
					<div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
					
					<div style={{paddingBottom: 5, marginBottom: 5, borderBottom: '1px solid grey'}}>
						{
							subTotal2 !== 0 &&
							<FlexedRowInfo field={props.modelType} bold={false} property={ FormatNumberAsMoney(subTotal2).toString()}/>
						}
						{
							standardFreightChargeAmount !== 0 &&
							<FlexedRowInfo field="Freight" bold={false} property={ FormatNumberAsMoney(standardFreightChargeAmount).toString()}/>
						}
						{
							factoryTrimOutAmount !== 0 &&
							<FlexedRowInfo field="Factory Trim-Out" bold={false} property={ FormatNumberAsMoney(factoryTrimOutAmount).toString()}/>
						}
						{
							purchaseOfACAmount !== 0 &&
							<FlexedRowInfo field="AC" bold={false} property={ FormatNumberAsMoney(purchaseOfACAmount).toString()}/>
						}
						{
							setupChargesAmount !== 0 &&
							<FlexedRowInfo field="Set-Up" bold={false} property={ FormatNumberAsMoney(setupChargesAmount).toString()}/>
						}
						{
							extendedServiceContractAmount !== 0 &&
							<FlexedRowInfo field="Warranty" bold={false} property={ FormatNumberAsMoney(extendedServiceContractAmount).toString()}/>
						}
						{
							lotExpenseAmount !== 0 &&
							<FlexedRowInfo field="Lot Expense" bold={false} property={ FormatNumberAsMoney(lotExpenseAmount).toString()}/>
						}
						{
							documentOrHomePrepFeeAmount !== 0 &&
							<FlexedRowInfo field="Doc Fees" bold={false} property={ FormatNumberAsMoney(documentOrHomePrepFeeAmount).toString()}/>
						}
					</div>
					{
						props.numberOfUnits > 1 &&
						<div style={{paddingBottom: 5, marginBottom: 5, borderBottom: '1px solid grey'}}>
							<FlexedRowInfo field="Number of Units" bold={false} property={' x ' + props.numberOfUnits} />
						</div>
					}
					<div style={{paddingBottom: 5, marginBottom: 10}}>
						<FlexedRowInfo field="Line Item Total" bold={false} property={ FormatNumberAsMoney(taxBreakdown.totalAmount).toString()}/>
					</div>
					
					<div style={{paddingBottom: 5, marginBottom: 10, display: 'flex', flexDirection: 'column'}}>
						<span style={{borderBottom: '1px solid black', fontWeight: 550, marginBottom: 5}}>Summary of Taxable Line Items</span>
						<span style={{fontSize: '10pt' }}>*see details under line items tax detail</span>
					</div>
					<FlexedRowInfo field="Amount Taxable" bold={false} property={FormatNumberAsMoney(taxBreakdown.totalTaxable).toString()}/>
					{
						checkIfAdmin() &&
						<FlexedRowInfo field="Rate (Sum)" bold={false} property={rate.toFixed(precision).toString()}/>
					}
					<FlexedRowInfo field="Calculated Tax Amount Total" bold={false} property={FormatNumberAsMoney(taxBreakdown.totalTaxCalculated).toString()}/>
					<FlexedRowInfo field="Discount Amount" bold={false} property={FormatNumberAsMoney(taxBreakdown.totalDiscount).toString()}/>
					<FlexedRowInfo field="Amount Exempt from Tax" bold={false} property={FormatNumberAsMoney(taxBreakdown.totalExempt).toString()}/>
				</div>
				<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", marginTop: 10}}>Jurisdiction Totals</div>
				<Grid container spacing={1}>
					{
						taxBreakdown.summary.map((summaryItem, index) => (
							<Grid item xs={4} key={summaryItem.taxName + index}>
								<div style={{padding: 10, fontSize: '11pt', display: 'flex', flexDirection: 'column'}}>
									<span style={{borderBottom: '1px solid black', fontWeight: 500}}>{summaryItem.taxName}</span>
									<span><span style={{fontWeight: 500}}>Jurisdiction:  </span>
										{
											summaryItem.region.toString() + ", " +
											summaryItem.jurisName.toString() + ", " +
											summaryItem.jurisType.toString() + ", " +
											summaryItem.jurisCode.toString()
										}
									</span>
									<span><span style={{fontWeight: 500}}>Rate:  </span>{summaryItem.rate.toString()}</span>
									<span><span style={{fontWeight: 500}}>Taxable Amount:  </span>{FormatNumberAsMoney(summaryItem.taxable).toString()}</span>
									<span><span style={{fontWeight: 500}}>Tax:  </span>{FormatNumberAsMoney(summaryItem.taxCalculated).toString()}</span>
								</div>
							</Grid>
						))
					}
				</Grid>
				<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", marginTop: 10}}>Line Item Details</div>
				<Grid container spacing={1}>
					{
						taxBreakdown.lines.map((line, index) => (
							<Grid item xs={3} key={line.id + index} >
							<div style={{borderBottom: '1px solid grey', padding: 10, fontSize: '10pt'}} >
								<div style={{fontWeight: 550}}>{"Tax Code: " + line.description}</div>
								<div style={{display: 'flex', flexDirection: 'column'}}>
									<span>{"Taxable Amount: " + FormatNumberAsMoney(line.taxableAmount).toString()}</span>
									<span>{"Tax Calculated: " + FormatNumberAsMoney(line.taxCalculated).toString()}</span>
									{
										line.details.map((detail, index) => (
											<div key={detail.taxName + index} style={{marginTop: 15, display: 'flex', flexDirection: 'column'}}>
												<span>{detail.region.toString() + ", " +
														detail.jurisName.toString() + ", " +
														detail.jurisType.toString() + ", " +
														detail.jurisCode.toString()
													}
												</span>
												<span>{"Rate: " + detail.rate.toString()}</span>
												<span>{"Taxable Amount: " + FormatNumberAsMoney(detail.taxableAmount).toString()}</span>
												<span>{"Tax: " + FormatNumberAsMoney(detail.taxCalculated).toString()}</span>
											</div>
										))
									}
								</div>
							</div>
							</Grid>
						))
					}
				</Grid>
				
			</div>
				</>	
			}

			
		</>
	)
}

export default connect(mapStateToProps, {})(TaxSummary);