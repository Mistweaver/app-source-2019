import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { StoreState } from '../../../Store';
import { AddendumAItem } from '../../../../objects/purchaseagreement/addendumA/AddendumAItem';
import { SalesOffice } from '../../../../objects/salesoffice/SalesOffice';
import { FormatNumberAsMoney } from '../../../../utilities/FormatNumberAsMoney';
import { calculateInvoiceValues } from '../../../../utilities/InvoiceFunctions';
import { ApplianceSheetItem } from '../../../../objects/purchaseagreement/appliancesheet/ApplianceSheetItem';

interface AgreementReviewProps {
	// buyer details
	buyer1: string;
	buyer2: string;
	phone: string;
	cell: string;
	emailAddress: string;
	emailAddress2: string;

	mailingStreet: string;
	mailingCity: string;
	mailingState: string;
	mailingZip: string;
	mailingCountry: string;

	year: string;
	dens: string;
	serialNumber: string;
	newModel: boolean;

	make: string,
	model: string,
	manufacturer: string,
	modelType: string,
	bedrooms: string,
	baths: string,
	floorSize: string,
	hitchSize: string,
	approximateSquareFeet: number,
	
	notes: string;
	windZone: number;

	// from agreement state
	contractRevisedFrom: string;
	contractRevisedFromDate: string;
	date: string

	// agreement financials
	deliveryState: string;
	deliveryStreet: string;
	deliveryCity: string;
	deliveryZip: string;

	salesPerson: string;
	purchaseAgreementLocationId: string;

	retailPrice: number;
	factoryDirectPrice: number;
	featuredHomePromo: string;
	featuredHomePromoAmount: number;
	managerOrClearanceDiscountSelection: string;
	managerOrClearanceAmount: number;
	preferredPaymentAmount: number;
	vipMultiUnitDiscountAmount: number;
	standardFreightChargeAmount: number;
	factoryTrimOutAmount: number;
	purchaseOfACAmount: number;
	setupChargesAmount: number;
	lotExpenseAmount: number;
	extendedServiceContractAmount: number;
	documentOrHomePrepFee: string;
	documentOrHomePrepFeeAmount: number;
	titleFeeAmount: number;
	useCustomTaxableAmount: boolean;
	customTaxableAmount: number;
	taxesAmount: number;
	downPayment: number;
	additionalPaymentAsAgreed: number;
	addendumAItems: AddendumAItem[];
	numberOfUnits: number;

	applianceList: ApplianceSheetItem[];

	office: SalesOffice;

	noticeOfConstructionAndFinalPayment: string;
	noticeOfConstructionAndFinalPaymentText: string;
	noticeOfCompletion: string;
	balancePaidInFullDate: string;

	status: string;
}

function mapStateToProps(state: StoreState) {
	return {
		purchaseAgreementLocationId: state.agreementeditor.locationId,
		buyer1: state.agreementeditor.buyer1,
		buyer2:  state.agreementeditor.buyer2,
		phone:  state.agreementeditor.phone,
		cell:  state.agreementeditor.cell,
		emailAddress:  state.agreementeditor.emailAddress,
		emailAddress2:  state.agreementeditor.emailAddress2,

		mailingStreet:  state.agreementeditor.mailingStreet,
		mailingCity:  state.agreementeditor.mailingCity,
		mailingState: state.agreementeditor.mailingState,
		mailingZip:  state.agreementeditor.mailingZip,
		mailingCountry:  state.agreementeditor.mailingCountry,

		year:  state.agreementeditor.year,
		dens:  state.agreementeditor.dens,
		serialNumber:  state.agreementeditor.serialNumber,
		newModel: state.agreementeditor.newModel,
		make: state.agreementeditor.make,
		model: state.agreementeditor.model,
		manufacturer: state.agreementeditor.manufacturer,
		modelType: state.agreementeditor.modelType,
		bedrooms: state.agreementeditor.bedrooms,
		baths: state.agreementeditor.baths,
		floorSize: state.agreementeditor.floorSize,
		hitchSize: state.agreementeditor.hitchSize,
		approximateSquareFeet: state.agreementeditor.approximateSquareFeet,
		notes:  state.agreementeditor.notes,
		windZone: state.agreementeditor.windZone,

		contractRevisedFrom: state.agreementeditor.contractRevisedFrom,
		contractRevisedFromDate: state.agreementeditor.contractRevisedFromDate,
		date: state.agreementeditor.date,

		// agreement financials
		deliveryState: state.agreementeditor.deliveryState,
		deliveryStreet: state.agreementeditor.deliveryStreet,
		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryZip: state.agreementeditor.deliveryZip,

		salesPerson: state.agreementeditor.salesPerson,
		retailPrice: state.agreementeditor.retailPrice,
		factoryDirectPrice: state.agreementeditor.factoryDirectPrice,
		featuredHomePromo: state.agreementeditor.featuredHomePromo,
		featuredHomePromoAmount: state.agreementeditor.featuredHomePromoAmount,
		managerOrClearanceDiscountSelection: state.agreementeditor.managerOrClearanceDiscountSelection,
		managerOrClearanceAmount: state.agreementeditor.managerOrClearanceAmount,
		preferredPaymentAmount: state.agreementeditor.preferredPaymentAmount,
		vipMultiUnitDiscountAmount: state.agreementeditor.vipMultiUnitDiscountAmount,
		standardFreightChargeAmount: state.agreementeditor.standardFreightChargeAmount,
		factoryTrimOutAmount: state.agreementeditor.factoryTrimOutAmount,
		purchaseOfACAmount: state.agreementeditor.purchaseOfACAmount,
		setupChargesAmount: state.agreementeditor.setupChargesAmount,
		lotExpenseAmount: state.agreementeditor.lotExpenseAmount,
		extendedServiceContractAmount: state.agreementeditor.extendedServiceContractAmount,
		documentOrHomePrepFee: state.agreementeditor.documentOrHomePrepFee,
		documentOrHomePrepFeeAmount: state.agreementeditor.documentOrHomePrepFeeAmount,
		titleFeeAmount: state.agreementeditor.titleFeeAmount,
		useCustomTaxableAmount: state.agreementeditor.useCustomTaxableAmount,
		customTaxableAmount: state.agreementeditor.customTaxableAmount,
		taxesAmount: state.agreementeditor.taxesAmount,
		downPayment: state.agreementeditor.downPayment,
		additionalPaymentAsAgreed: state.agreementeditor.additionalPaymentAsAgreed,
		addendumAItems: state.agreementeditor.addendumAItems,
		numberOfUnits: state.agreementeditor.numberOfUnits,

		office: state.agreementeditor.office,

		noticeOfCompletion: state.agreementeditor.noticeOfCompletion,
		noticeOfConstructionAndFinalPayment: state.agreementeditor.noticeOfConstructionAndFinalPayment,
		noticeOfConstructionAndFinalPaymentText: state.agreementeditor.noticeOfConstructionAndFinalPaymentText,
		balancePaidInFullDate: state.agreementeditor.balancePaidInFullDate,


		applianceList: state.agreementeditor.applianceList,

		status: state.agreementeditor.status
	}
}

interface AgreementReviewState {}

class AgreementReview extends React.Component<AgreementReviewProps, AgreementReviewState> {
	public render() {
		console.log(this.props.applianceList);

		let invoice = calculateInvoiceValues();

		return(
			<div style={{padding: 10}}>
				
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Buyer Info</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							<span>{this.props.buyer1} {this.props.buyer2 !== "" && " and " + this.props.buyer2}</span>
							{this.props.phone !== "" && <span>{this.props.phone} </span>}
							{this.props.cell !== "" && <span>{this.props.cell} </span>}
							{this.props.emailAddress !== "" && <span>{this.props.emailAddress} </span>}
							{this.props.emailAddress2 !== "" && <span>{this.props.emailAddress2} </span>}
							<span>
								{"Mailing Address: " + this.props.mailingStreet + ", " + this.props.mailingCity + ", " + this.props.mailingState + ", " + this.props.mailingZip  + ", " + this.props.mailingCountry}
							</span>
							<span>
								{"Delivery Address: " + this.props.deliveryStreet + ", " + this.props.deliveryCity + ", " + this.props.deliveryState + ", " + this.props.deliveryZip  + ", US"}
							</span>
						</div>
						
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Model Info</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							<span style={{marginBottom: 0 }}>
								{this.props.year + ' ' + this.props.make + ' ' + this.props.model  + ' - ' + this.props.manufacturer}
								{this.props.serialNumber !== "" && " serial no. " + this.props.serialNumber}
							</span>
							<span style={{ margin: 0 }}>
								{this.props.bedrooms !== "" && this.props.bedrooms + " beds"}
								{this.props.baths !== "" && ", " + this.props.baths + " baths"}
								{this.props.dens !== "" && ", " + this.props.dens + " dens "}
							</span>
							<span style={{ marginTop: 0 }}>
								{this.props.approximateSquareFeet.toString() + " sq ft. ( floor size: " + this.props.floorSize + ", hitch size: " + this.props.hitchSize + ")"}
							</span>
						</div>
								
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Agreement Details</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							<span>{this.props.noticeOfConstructionAndFinalPayment}</span>
							<span>Approximate completion is {this.props.noticeOfCompletion}</span>
							<span>Balance will be paid in full on {this.props.balancePaidInFullDate}</span>
						</div>

						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Agreement Notes</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							<span>{this.props.notes}</span>
						</div>

						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Appliance Sheet</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							{
								this.props.applianceList.map((appliance, index) => (
								<span key={"item" + index + appliance.itemName}>{appliance.itemName + " : " + appliance.itemValue}</span>
								))
							}
						</div>

						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Color Selections</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						</div>

						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Wind Zone Map</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						</div>

						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Shipping Directions</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						</div>

					</Grid>
					<Grid item xs={7}>			
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Invoice Details</div>
							<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<div style={{display: 'flex', flexDirection: 'column', fontSize: '10pt'}}>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>Retail Price:</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.retailPrice)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + FormatNumberAsMoney(this.props.retailPrice * this.props.numberOfUnits) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>Factory Direct Discount:</div>
										<div style={{width: '45%', padding: 5, color: 'red', textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(invoice.discountAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.discountAmount  * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '75%', padding: 5, textAlign: 'right'}}>
											<span>Sub Total 1:</span>
										</div>
										<div style={{width: '25%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.factoryDirectPrice)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.factoryDirectPrice * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Addendum "A" Upgrades:</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(invoice.addendumATotal)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.addendumATotal * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									{
										this.props.featuredHomePromo !== "" && this.props.featuredHomePromoAmount !== 0 &&
										<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
											<div style={{width: '55%', padding: 5}}>
												<span>{this.props.featuredHomePromo}</span>
											</div>
											<div style={{width: '45%', padding: 5, color: 'red', textAlign: 'right'}}>
												<span>({ FormatNumberAsMoney(invoice.promoAmount) })</span>
												{
													this.props.numberOfUnits > 1 &&
													<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.promoAmount * this.props.numberOfUnits )) + ")"}</span>
												}
											</div>
										</div>
									}
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5, display: 'flex'}}>
											<span>({ this.props.managerOrClearanceDiscountSelection })</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>({ FormatNumberAsMoney(this.props.managerOrClearanceAmount) })</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.managerOrClearanceAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									{
										this.props.preferredPaymentAmount !== 0 &&
											<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
												<div style={{width: '55%', padding: 5, display: 'flex'}}>
													<span>Preferred Payment Discount</span>													
												</div>
												<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
													<span>{FormatNumberAsMoney(this.props.preferredPaymentAmount)}</span>
													{
														this.props.numberOfUnits > 1 &&
														<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.preferredPaymentAmount * this.props.numberOfUnits )) + ")"}</span>
													}
												</div>
											</div>
									}
									{
										this.props.vipMultiUnitDiscountAmount !== 0 &&
											<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
												<div style={{width: '55%', padding: 5, display: 'flex'}}>
													<span>VIP Multi Unit Discount</span>	
												</div>
												<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
													<span>{FormatNumberAsMoney(this.props.vipMultiUnitDiscountAmount)}</span>
													{
														this.props.numberOfUnits > 1 &&
														<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.vipMultiUnitDiscountAmount * this.props.numberOfUnits )) + ")"}</span>
													}
												</div>
											</div>
									}
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '75%', padding: 5, textAlign: 'right'}}>
											<span>Sub Total 2:</span>
										</div>
										<div style={{width: '25%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(invoice.subTotal2)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.subTotal2 * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Standard Freight Charge</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.standardFreightChargeAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.standardFreightChargeAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Factory Trim Out</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.factoryTrimOutAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.factoryTrimOutAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Purchase of AC</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.purchaseOfACAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.purchaseOfACAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Setup Charges</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.setupChargesAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.setupChargesAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Lot Expense</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.lotExpenseAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.lotExpenseAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									{
										(this.props.office.officeState !== "FL") &&
										<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
											<div style={{width: '55%', padding: 5}}>
												<span>Extended Service Contract</span>
											</div>
											<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
												<span>{FormatNumberAsMoney(this.props.extendedServiceContractAmount)}</span>
												{
													this.props.numberOfUnits > 1 &&
													<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.extendedServiceContractAmount * this.props.numberOfUnits )) + ")"}</span>
												}
											</div>
										</div>
									}
									<Divider />
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>{this.props.documentOrHomePrepFee}</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.documentOrHomePrepFeeAmount)}</span>
											{
												this.props.numberOfUnits > 1 &&
												<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.documentOrHomePrepFeeAmount * this.props.numberOfUnits )) + ")"}</span>
											}
										</div>
									</div>
									<Divider />
									{	(this.props.deliveryState === "OH" || this.props.deliveryState === "TN") &&
										<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
											<div style={{width: '55%', padding: 5}}>
												<span>Title Fee</span>
											</div>
											<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
												<span>{FormatNumberAsMoney(this.props.titleFeeAmount)}</span>
												{
													this.props.numberOfUnits > 1 &&
													<span>{" ( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.titleFeeAmount * this.props.numberOfUnits )) + ")"}</span>
												}
											</div>
										</div>
									}
									<Divider />
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Number of Units:</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>x{this.props.numberOfUnits}</span>
										</div>
									</div>
									<Divider />
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '55%', padding: 5}}>
											<span>Taxes</span>
										</div>
										<div style={{width: '45%', padding: 5, textAlign: 'right'}}>
											<span>
												{
													this.props.useCustomTaxableAmount ?
													<span>{FormatNumberAsMoney(this.props.customTaxableAmount)}</span>
													:
													<span>{FormatNumberAsMoney(this.props.taxesAmount)}</span>
												}
											</span>
										</div>
									</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>*Note: Taxes may change based on final delivery address</div>
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '75%', padding: 5, textAlign: 'right'}}>
											<span>Total</span>
										</div>
										<div style={{width: '25%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(invoice.total)}</span>
										</div>
									</div>
									<Divider />
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '75%', padding: 5}}>
											<span>Down Payment</span>
										</div>
										<div style={{width: '25%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.downPayment)}</span>
										</div>
									</div>
									<Divider />
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '75%', padding: 5}}>
											<span>Additional Payment as Agreed</span>
										</div>
										<div style={{width: '25%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(this.props.additionalPaymentAsAgreed)}</span>
										</div>
									</div>
									<Divider />
									<div style={{display: 'flex', borderBottom: '1px solid grey'}}>
										<div style={{width: '75%', padding: 5, textAlign: 'right'}}>
											<span>Unpaid Balance</span>
										</div>
										<div style={{width: '25%', padding: 5, textAlign: 'right'}}>
											<span>{FormatNumberAsMoney(invoice.unpaidBalance)}</span>
										</div>
									</div>
									<Divider />
								</div>
							</div>
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", fontWeight: 500}}>Addendum A</div>
						<div style={{padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							
						</div>
					</Grid>
				</Grid>			
			</div>
		)
	}
}

export default connect(mapStateToProps, {})(AgreementReview);