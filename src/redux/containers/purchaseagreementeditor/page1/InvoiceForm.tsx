import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { FormatNumberAsMoney } from "../../../../utilities/FormatNumberAsMoney";
import store, { StoreState } from "../../../Store";
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TaxBreakdownModal from "./TaxBreakdownModal";
import { calculateInvoiceValues } from "../../../../utilities/InvoiceFunctions";
import { AddendumAItem } from "../../../../objects/purchaseagreement/addendumA/AddendumAItem";
import { updateCustomTaxAmount, updateGenericInformation, updateNumberOfUnits, updateManagerClearanceDiscountAmount, addPreferredPaymentDiscount, removePreferredPaymentDiscount, addVIPDiscount, removeVIPDiscount, updateFreightCharge, updateFactoryTrimout, updateACPurchase, updateSetupCharges, updateLotExpense, updateExtendedServiceContractAmount, updateTaxes, updateDownPayment, updateAdditionalPayment } from '../../../actions/AgreementEditorActions';
import { AvalaraTaxResponse } from "../../../../objects/avalaraobjects/AvalaraTaxResponse";
import { SalesOffice } from "../../../../objects/salesoffice/SalesOffice";
import AvalaraRequestComponent from "../../taxes/AvalaraRequestComponent";
import TaxExemptButton from "../../taxes/TaxExemptButton";
import CustomTaxComponent from "../../taxes/CustomTaxComponent";
import { PENNSYLVANIA_CUSTOM_HUD_TAX_RATE, OHIO_CUSTOM_TAX_RATE, PENNSYLVANIA_CUSTOM_PM_TAX_RATE } from "../../taxes/TaxConstants";
import { calculateCustomTax } from "../../taxes/CustomTaxFunctions";
import { UPDATE_CUSTOM_TAX_AMOUNT, USE_CUSTOM_TAX_AMOUNT } from "../../../types/AgreementEditorTypes";
import { checkIfAdmin } from "../../../../auth/AccessControlFunctions";

interface InvoiceFormProps {
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
	openField1: string;
	openField1Amount: number;
	addendumAItems: AddendumAItem[];
	numberOfUnits: number;
	status: string;
	manufacturer: string;
	modelType: string;

	office: SalesOffice;

	// delivery address to validate for taxes
	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	deliveryCountry: string;
	deliveryStreet: string;

	id: string;

	updateGenericInformation: (targetedField: string, newValue: string) => void;
	updateNumberOfUnits: (numberOfUnits: number) => void;
	updateManagerClearanceDiscountAmount: (newAmount: number) => void;
	addPreferredPaymentDiscount: (newAmount: number) => void;
	removePreferredPaymentDiscount: () => void;
	addVIPDiscount: (newAmount: number) => void;
	removeVIPDiscount: () => void;
	updateFreightCharge: (newAmount: number) => void;
	updateFactoryTrimout: (newAmount: number) => void;
	updateACPurchase: (newAmount: number) => void;
	updateSetupCharges: (newAmount: number) => void;
	updateLotExpense: (newAmount: number) => void;
	updateExtendedServiceContractAmount: (newAmount: number) => void;
	updateTaxes:  (taxResponse: AvalaraTaxResponse, taxAmount: number) => void;
	updateDownPayment: (newAmount: number) => void;
	updateAdditionalPayment:  (newAmount: number) => void;
	updateCustomTaxAmount: (newAmount: number) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		status: state.agreementeditor.status,
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
		openField1: state.agreementeditor.openField1,
		openField1Amount: state.agreementeditor.openField1Amount,
		addendumAItems: state.agreementeditor.addendumAItems,
		numberOfUnits: state.agreementeditor.numberOfUnits,
		modelType: state.agreementeditor.modelType,

		office: state.agreementeditor.office,

		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryState: state.agreementeditor.deliveryState,
		deliveryZip: state.agreementeditor.deliveryZip,
		deliveryCountry: state.agreementeditor.deliveryCountry,
		deliveryStreet: state.agreementeditor.deliveryStreet,

		manufacturer: state.agreementeditor.manufacturer,
		id: state.agreementeditor.id
	}
}

interface InvoiceFormState {
	displayTaxBreakdown: boolean;
	addressComplete: boolean;
	addressValid: boolean;
	avalaraConnectionIssue: boolean;
	validatingAddress: boolean;
	missingAddressPiece: string;
	
}

class InvoiceForm extends React.Component<InvoiceFormProps, InvoiceFormState> {
	constructor(props: InvoiceFormProps) {
		super(props);
		this.state = { 
			displayTaxBreakdown: false,
			addressComplete: false,
			addressValid: false,

			validatingAddress: true,
			avalaraConnectionIssue: false,
			missingAddressPiece: "",
		}

		this.showTaxBreakdown = this.showTaxBreakdown.bind(this);
		this.changePreferredPaymentDiscount = this.changePreferredPaymentDiscount.bind(this);
		this.changeVIPDiscount = this.changeVIPDiscount.bind(this);
		this.updateACPurchase = this.updateACPurchase.bind(this);
		this.updateAdditionalPayment = this.updateAdditionalPayment.bind(this);
		this.updateDownPayment = this.updateDownPayment.bind(this);
		this.updateFreightCharge = this.updateFreightCharge.bind(this);
		this.updateManagerDiscount = this.updateManagerDiscount.bind(this);
		this.updateSetupCharges = this.updateSetupCharges.bind(this);
		this.updateTrimOut = this.updateTrimOut.bind(this);
		this.selectServiceContract = this.selectServiceContract.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.updateLotExpense = this.updateLotExpense.bind(this);
		this.addUnit = this.addUnit.bind(this);
		this.removeUnit = this.removeUnit.bind(this);
		this.updateCustomTaxAmount = this.updateCustomTaxAmount.bind(this);
	}

	componentDidMount() {}

	componentDidUpdate(prevProps: InvoiceFormProps) {
		// if either the retail price or the manager discount change, recalculate the preferred payment discount and the vip multi unit discount
		if(prevProps.retailPrice !== this.props.retailPrice || prevProps.managerOrClearanceAmount !== this.props.managerOrClearanceAmount) {
			let invoice = calculateInvoiceValues();

			
			if(this.props.vipMultiUnitDiscountAmount !== 0) {
				this.props.addVIPDiscount(invoice.vipMultiUnitDiscount);

				if(this.props.preferredPaymentAmount !== 0) {
					this.props.addPreferredPaymentDiscount(invoice.preferredPaymentDiscount);
				}
			} else {
				if(this.props.preferredPaymentAmount !== 0) {
					this.props.addPreferredPaymentDiscount(invoice.preferredPaymentDiscountWithoutVIP);
				}
			}
		}

		/**
		 * If custom tax amount changes for PA out of state or OH update it.
		 */
		if((this.props.deliveryState === "PA" && this.props.office.officeState !== "PA") || this.props.deliveryState === "OH") {
			/**
			 * Force use of custom tax.
			 */
			//console.log("use custom tax: " + store.getState().agreementeditor.useCustomTaxableAmount);
			if(store.getState().agreementeditor.useCustomTaxableAmount !== true) {
				store.dispatch({type: USE_CUSTOM_TAX_AMOUNT, payload: { useCustomTaxableAmount: true}});
			}

			/**
			 * Select custom tax rate for PA or OH
			 * Note: OH same for PM and HUD
			 */
			var customTaxRate: number = 0;
			if(this.props.deliveryState === "PA") {
				if(this.props.modelType === 'HUD' || this.props.modelType === 'PM-HUD') {
					customTaxRate = PENNSYLVANIA_CUSTOM_HUD_TAX_RATE;
				} else {
					customTaxRate = PENNSYLVANIA_CUSTOM_PM_TAX_RATE;
				}
				
			} else if(this.props.deliveryState === "OH") {
				customTaxRate = OHIO_CUSTOM_TAX_RATE;
			}

			/**
			 * Calculate the tax.
			 */
			var customTaxAmount = calculateCustomTax(customTaxRate);

			//console.log("previous props amount: " + prevProps.customTaxableAmount);
			//console.log("calculated amount: " + customTaxAmount);
			//console.log("stored amount: " + this.props.customTaxableAmount);
			if(prevProps.customTaxableAmount.toFixed(2) !== customTaxAmount.toFixed(2)) {
				//console.log("amounts different: ");
				store.dispatch({type: UPDATE_CUSTOM_TAX_AMOUNT, payload: { customTaxAmount: customTaxAmount}});
			}
		}
	}



	private changePreferredPaymentDiscount() {
		if(this.props.preferredPaymentAmount === 0) {
			// console.log("Preferred payment amount is 0");
			let invoice = calculateInvoiceValues();
			if(this.props.vipMultiUnitDiscountAmount === 0) {
				// console.log("Adding preferred payment without vip: " + invoice.preferredPaymentDiscountWithoutVIP);
				this.props.addPreferredPaymentDiscount(invoice.preferredPaymentDiscountWithoutVIP);
			} else {
				// console.log("Adding preferred payment with vip")
				// console.log("Adding preferred payment to agreement: " + invoice.preferredPaymentDiscount);
				this.props.addPreferredPaymentDiscount(invoice.preferredPaymentDiscount);
			}
		} else {
			// console.log("Removing Preferred payment discount");
			this.props.removePreferredPaymentDiscount();
		}
	}

	private changeVIPDiscount() {
		let invoice = calculateInvoiceValues();
		if(this.props.vipMultiUnitDiscountAmount === 0) {
			if(this.props.preferredPaymentAmount !== 0) {
				this.props.addPreferredPaymentDiscount(invoice.preferredPaymentDiscount);
			}
			this.props.addVIPDiscount(invoice.vipMultiUnitDiscount);
		} else {
			this.props.removeVIPDiscount();
			if(this.props.preferredPaymentAmount !== 0) {
				this.props.addPreferredPaymentDiscount(invoice.preferredPaymentDiscountWithoutVIP);
			}
		}
	}

	private handleFormChange(event: { target: { name: string, value: string }; } ) {
		const { name, value } = event.target;
		this.props.updateGenericInformation(name, value);
	}

	private updateManagerDiscount(event: { target: { value: string }; } ) {
		let discount = parseFloat(event.target.value);
		if(discount > 0) {
			discount = discount * -1;
		}
		this.props.updateManagerClearanceDiscountAmount(discount);
	}

	private updateCustomTaxAmount(event: { target: { value: string }; } ) {
		console.log(event.target.value);
		let discount = parseFloat(event.target.value);
		console.log(discount);
		this.props.updateCustomTaxAmount(discount);
	}

	private updateFreightCharge(event: { target: { value: string }; } ) {
		this.props.updateFreightCharge(parseFloat(event.target.value));
	}

	private updateTrimOut(event: { target: { value: string }; } ) {
		this.props.updateFactoryTrimout(parseFloat(event.target.value))
	}

	private updateACPurchase(event: { target: { value: string }; } ) {
		this.props.updateACPurchase(parseFloat(event.target.value))
	}

	private updateSetupCharges(event: { target: { value: string }; } ) {
		this.props.updateSetupCharges(parseFloat(event.target.value))
	}

	private updateLotExpense(event: { target: { value: string }; } ) {
		this.props.updateLotExpense(parseFloat(event.target.value))
	}

	private selectServiceContract(event: { target: { value: string }; } ) {
		this.props.updateExtendedServiceContractAmount(parseFloat(event.target.value))
	}

	private updateDownPayment(event: { target: { value: string }; } ) {
		let downPayment = parseFloat(event.target.value);
		if(downPayment > 0) {
			downPayment = downPayment * -1;
		}
		this.props.updateDownPayment(downPayment)
	}

	private updateAdditionalPayment(event: { target: { value: string }; } ) {
		let additionalPaymentAsAgreed = parseFloat(event.target.value);
		if(additionalPaymentAsAgreed > 0) {
			additionalPaymentAsAgreed = additionalPaymentAsAgreed * -1;
		}

		this.props.updateAdditionalPayment(additionalPaymentAsAgreed);
	}

	private showTaxBreakdown() {
		this.setState(prevState => ({
			displayTaxBreakdown: !prevState.displayTaxBreakdown
		}));
	}

	private addUnit() {
		this.props.updateNumberOfUnits(this.props.numberOfUnits + 1);
	}

	private removeUnit() {
		if(this.props.numberOfUnits > 1) {
			this.props.updateNumberOfUnits(this.props.numberOfUnits - 1);
		}
	}

	public render() {
		// const { addressValid, addressComplete } = this.state;
		let invoice = calculateInvoiceValues();
		// console.log("INVOICE");
		// console.log(invoice);

		return(
			<>
				<TaxBreakdownModal open={this.state.displayTaxBreakdown} documentType="PA" objectId={this.props.id} onClose={this.showTaxBreakdown}/>
				<div style={{width: '55%', border: '2px solid black', display: 'flex', flexDirection: 'column'}}>
					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Retail Price:</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(this.props.retailPrice)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + FormatNumberAsMoney(this.props.retailPrice * this.props.numberOfUnits) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Factory Direct Discount:</Typography>
						</div>
						<div style={{width: '40%', padding: 5, color: 'red', display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">({FormatNumberAsMoney(invoice.discountAmount)})</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.discountAmount  * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, textAlign: 'right'}}>
							<Typography variant="body1">Sub Total 1:</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(this.props.factoryDirectPrice)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.factoryDirectPrice * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Addendum "A" Upgrades:</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(invoice.addendumATotal)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.addendumATotal * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>
					{
						this.props.featuredHomePromo !== "" && this.props.featuredHomePromoAmount !== 0 &&
						<div style={{display: 'flex', borderBottom: '1px solid black'}}>
							<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
								<Typography variant="body1">{this.props.featuredHomePromo}</Typography>
							</div>
							<div style={{width: '40%', padding: 5, color: 'red', display: 'flex', justifyContent: 'space-between'}}>
								<Typography variant="body1">({ FormatNumberAsMoney(invoice.promoAmount) })</Typography>
								{
									this.props.numberOfUnits > 1 &&
									<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.promoAmount * this.props.numberOfUnits )) + ")"}</Typography>
								}
							</div>
						</div>
					}
					

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, display: 'flex'}}>
							<select value={this.props.managerOrClearanceDiscountSelection} name="managerOrClearanceDiscountSelection" onChange={this.handleFormChange}>
								<option value="">select manager/clearance discount</option>
								<option value="Manager Discount">Manager Discount</option>
								<option value="Clearance Discount">Clearance Discount</option>
								<option value="Wholesale Discount">Wholesale Discount</option>
							</select>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<input 
								name="managerOrClearanceAmount"
								type="number"
								step="0.01"
								placeholder="Enter discount amount"
								onChange={this.updateManagerDiscount}
								value={this.props.managerOrClearanceAmount}
							/>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.managerOrClearanceAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, display: 'flex'}}>
							{
								this.props.preferredPaymentAmount === 0 ?
									<>
										<Typography variant="body1">Add Preferred Payment Discount</Typography>
										<AddBoxIcon 
											style={{color: 'green', marginLeft: 10, cursor: 'pointer'}}
											onClick={this.changePreferredPaymentDiscount}
										/>
									</>
								:
									<>
										<Typography variant="body1">Remove Preferred Payment Discount</Typography>
										<RemoveCircleIcon 
											style={{color: 'red', marginLeft: 10, cursor: 'pointer'}}
											onClick={this.changePreferredPaymentDiscount}
										/>
									</>
							}
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(this.props.preferredPaymentAmount)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.preferredPaymentAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, display: 'flex'}}>
							{
								this.props.vipMultiUnitDiscountAmount === 0 ?
									<>
										<Typography variant="body1">Add VIP Multi Unit Discount</Typography>
										<AddBoxIcon 
											style={{color: 'green', marginLeft: 10, cursor: 'pointer'}}
											onClick={this.changeVIPDiscount}
										/>
									</>
								:
									<>
										<Typography variant="body1">Remove VIP Multi Unit Discount</Typography>
										<RemoveCircleIcon 
											style={{color: 'red', marginLeft: 10, cursor: 'pointer'}}
											onClick={this.changeVIPDiscount}
										/>
									</>
							}
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(this.props.vipMultiUnitDiscountAmount)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.vipMultiUnitDiscountAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, textAlign: 'right'}}>
							<Typography variant="body1">Sub Total 2:</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(invoice.subTotal2)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(invoice.subTotal2 * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>


					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Standard Freight Charge</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<input 
								name="standardFreightChargeAmount"
								type="number"
								step="0.01"
								placeholder="Enter freight amount"
								onChange={this.updateFreightCharge}
								value={this.props.standardFreightChargeAmount}
							/>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.standardFreightChargeAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Factory Trim Out</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<input
								name="factoryTrimOut"
								type="number"
								step="0.01"
								onChange={this.updateTrimOut}
								value={this.props.factoryTrimOutAmount}
							/>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.factoryTrimOutAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Purchase of AC</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<input name="purchaseOfACAmount"  type="number" step="0.01" onChange={this.updateACPurchase} value={this.props.purchaseOfACAmount} />
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.purchaseOfACAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Setup Charges</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<input name="setupChargesAmount"  type="number" step="0.01" onChange={this.updateSetupCharges} value={this.props.setupChargesAmount} />
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.setupChargesAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Lot Expense</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<input name="lotExpenseAmount"  type="number" step="0.01" onChange={this.updateLotExpense} value={this.props.lotExpenseAmount} />
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.lotExpenseAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>

					{
						(this.props.office.officeState !== "FL") &&
						<div style={{display: 'flex', borderBottom: '1px solid black'}}>
							<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
								<Typography variant="body1">Extended Service Contract</Typography>
							</div>
							<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
								<select onChange={this.selectServiceContract} value={this.props.extendedServiceContractAmount}>
									<option value="0">none</option>
									<option value="995">{FormatNumberAsMoney(995)}</option>
									<option value="1395">{FormatNumberAsMoney(1395)}</option>
									<option value="1995">{FormatNumberAsMoney(1995)}</option>
								</select>
								{
									this.props.numberOfUnits > 1 &&
									<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.extendedServiceContractAmount * this.props.numberOfUnits )) + ")"}</Typography>
								}
							</div>
						</div>
					}

					

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">{this.props.documentOrHomePrepFee}</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
							<Typography variant="body1">{FormatNumberAsMoney(this.props.documentOrHomePrepFeeAmount)}</Typography>
							{
								this.props.numberOfUnits > 1 &&
								<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.documentOrHomePrepFeeAmount * this.props.numberOfUnits )) + ")"}</Typography>
							}
						</div>
					</div>
					{	(this.props.deliveryState === "OH" || this.props.deliveryState === "TN") &&
						<div style={{display: 'flex', borderBottom: '1px solid black'}}>
							<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
								<Typography variant="body1">Title Fee</Typography>
							</div>
							<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
								<Typography variant="body1">{FormatNumberAsMoney(this.props.titleFeeAmount)}</Typography>
								{
									this.props.numberOfUnits > 1 &&
									<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.titleFeeAmount * this.props.numberOfUnits )) + ")"}</Typography>
								}
							</div>
						</div>
					}

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Number of Units:</Typography>
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex'}}>
							<RemoveCircleIcon 
								style={{color: this.props.numberOfUnits > 1 ? 'red' : 'grey' , marginRight: 10, cursor: 'pointer'}}
								onClick={this.removeUnit}
							/>
							<Typography variant="body1">{this.props.numberOfUnits}</Typography>
							<AddBoxIcon 
								style={{color: 'green', marginLeft: 10, cursor: 'pointer'}}
								onClick={this.addUnit}
							/>
						</div>
					</div>

					

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, display: 'flex', verticalAlign: 'middle' }}>
							{
								//status === IN_PROGRESS &&
								((this.props.deliveryState === "OH" && (this.props.modelType === 'HUD' || this.props.modelType === 'PM-HUD')) ||
								(this.props.deliveryState === "PA" && this.props.office.officeState !== "PA" && (this.props.modelType === 'HUD' || this.props.modelType === 'PM-HUD'))) ?
								
								<Typography variant="body1">
									Out of State Surcharge
								</Typography>
								:
								<>
									<AvalaraRequestComponent orderType="SalesOrder" documentType="PA" />
									<TaxExemptButton documentType="PA" />
									<CustomTaxComponent documentType="PA" />
								</>

							}
						</div>
						<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>

							{
								((this.props.deliveryState === "OH") ||
								(this.props.deliveryState === "PA" && this.props.office.officeState !== "PA")) && !checkIfAdmin() ?
									<>
										{
											this.props.customTaxableAmount === 0 ?
												<Typography variant="body1">
													Call Accounting
												</Typography>
												:
												<span>{FormatNumberAsMoney(this.props.customTaxableAmount)}</span>
												
										}
									</>
									
								:
								<>
									<Typography variant="body1">
										{
											this.props.useCustomTaxableAmount ?
											<input 
												name="customTaxableAmount"
												type="number"
												step="0.01"
												placeholder="Enter custom tax amount"
												onChange={this.updateCustomTaxAmount}
												value={this.props.customTaxableAmount}
											/>
											:
											<span>{FormatNumberAsMoney(this.props.taxesAmount)}</span>
										}
									</Typography>
									<button className="buttonMinimal" style={{marginLeft: 10}} onClick={this.showTaxBreakdown}>Details</button>
								</>
							}
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						{
							((this.props.deliveryState === "OH" && (this.props.modelType === 'HUD' || this.props.modelType === 'PM-HUD')) ||
							(this.props.deliveryState === "PA" && this.props.office.officeState !== "PA" && (this.props.modelType === 'HUD' || this.props.modelType === 'PM-HUD'))) ?
							
							<div style={{width: '100%', padding: 5}}>
								<Typography variant="body1"><b>&nbsp;</b></Typography>
							</div>
						:
							<div style={{width: '100%', padding: 5}}>
								<Typography variant="body1"><b>*Note: Taxes may change based on final delivery address</b></Typography>
							</div>
						}
					</div>
					
					{
						this.props.openField1Amount !== 0 &&
						<div style={{display: 'flex', borderBottom: '1px solid black'}}>
							<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
								<Typography variant="body1">{this.props.openField1}</Typography>
							</div>
							<div style={{width: '40%', padding: 5, display: 'flex', justifyContent: 'space-between'}}>
								<Typography variant="body1">{FormatNumberAsMoney(this.props.openField1Amount)}</Typography>
								{
									this.props.numberOfUnits > 1 &&
									<Typography variant="body1">{"( x " + this.props.numberOfUnits + " = " + (FormatNumberAsMoney(this.props.openField1Amount * this.props.numberOfUnits )) + ")"}</Typography>
								}
							</div>
						</div>
					}
					
					

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, textAlign: 'right'}}>
							<Typography variant="body1">Total</Typography>
						</div>
						<div style={{width: '40%', padding: 5}}>
							<Typography variant="body1">{FormatNumberAsMoney(invoice.total)}</Typography>
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Down Payment</Typography>
						</div>
						<div style={{width: '40%', padding: 5}}>
							<input style={{color: '#c41b1b'}} name="downPayment"  type="number" step="0.01" onChange={this.updateDownPayment} value={this.props.downPayment} />
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
							<Typography variant="body1">Additional Payment as Agreed</Typography>
						</div>
						<div style={{width: '40%', padding: 5}}>
							<input style={{color: '#c41b1b'}} name="additionalPaymentAsAgreed"  type="number" step="0.01"  onChange={this.updateAdditionalPayment} value={this.props.additionalPaymentAsAgreed} />
						</div>
					</div>

					<div style={{display: 'flex', borderBottom: '1px solid black'}}>
						<div style={{width: '60%', borderRight: '1px solid black', padding: 5, textAlign: 'right'}}>
							<Typography variant="body1">Unpaid Balance</Typography>
						</div>
						<div style={{width: '40%', padding: 5}}>
							<Typography variant="body1">{FormatNumberAsMoney(invoice.unpaidBalance)}</Typography>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, { updateCustomTaxAmount, updateGenericInformation, updateNumberOfUnits, updateManagerClearanceDiscountAmount, addPreferredPaymentDiscount, removePreferredPaymentDiscount, addVIPDiscount, removeVIPDiscount, updateFreightCharge, updateFactoryTrimout, updateACPurchase, updateSetupCharges, updateLotExpense, updateExtendedServiceContractAmount, updateTaxes, updateDownPayment, updateAdditionalPayment })(InvoiceForm);