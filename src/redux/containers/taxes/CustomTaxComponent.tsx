import store, { StoreState } from "../../Store";
import { connect } from "react-redux";
import React from "react";
import { loadAgreement, updateTaxes, updateBooleanInformation, useAvalaraTaxes, useCustomTaxAmount, } from "../../actions/AgreementEditorActions";
import { checkIfAdmin } from "../../../auth/AccessControlFunctions";
import { setChangeOrderTaxType } from '../../actions/ChangeOrderActions';
import { UPDATE_CUSTOM_TAX_AMOUNT, USE_CUSTOM_TAX_AMOUNT } from "../../types/AgreementEditorTypes";
import { OHIO_CUSTOM_TAX_RATE, PENNSYLVANIA_CUSTOM_HUD_TAX_RATE, PENNSYLVANIA_CUSTOM_PM_TAX_RATE } from "./TaxConstants";
import { calculateCustomTax } from "./CustomTaxFunctions";

interface CustomTaxComponentProps {
	customTaxAmountUsed: boolean;
	customTaxAmount: number;
	documentType: string;
	taxExempt: boolean;
	taxType: string;
	deliveryState: string;
	modelType: string;
	officeState: string;

	useAvalaraTaxes: () => void;
	useCustomTaxAmount: () => void;
	setChangeOrderTaxType: (type: string) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		customTaxAmountUsed: state.agreementeditor.useCustomTaxableAmount,
		customTaxAmount: state.agreementeditor.customTaxableAmount,
		taxExempt: state.agreementeditor.taxExempt,
		taxType: state.changeordereditor.taxType,
		deliveryState: state.agreementeditor.deliveryState,
		modelType: state.agreementeditor.modelType,
		officeState: state.agreementeditor.office.officeState
	}
}

interface CustomTaxComponentState {
	error: boolean;
	errorDetails: string;
}

class CustomTaxComponent extends React.Component<CustomTaxComponentProps, CustomTaxComponentState> {
	constructor(props: CustomTaxComponentProps) {
		super(props);
		this.state = {
			error: false,
			errorDetails: ""
		}
		this.useAvalara = this.useAvalara.bind(this);
		this.useCustomTaxes = this.useCustomTaxes.bind(this);

		//console.log("in CustomTaxComponent...");
		//console.log("Delivery state: " + this.props.deliveryState);
		//console.log("customTaxAmount before: " + this.props.customTaxAmount);

		/**
		 * Calculate custom tax for Pennsylvania and Ohio.
		 */
		if((this.props.deliveryState === "PA" && this.props.officeState !== "PA") || this.props.deliveryState === "OH") {
			var customTaxRate: number = 0;

			/**
			 * Force use of custom tax.
			 */
			if(this.props.customTaxAmountUsed !== true) {
				store.dispatch({type: USE_CUSTOM_TAX_AMOUNT, payload: { useCustomTaxableAmount: true}});
			}

			/**
			 * Set tax rate based on state.
			 */
			if(this.props.deliveryState === "PA") {
				if(this.props.modelType === "HUD" || this.props.modelType === "PM-HUD") {
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
			var customTaxAmountPA = calculateCustomTax(customTaxRate);
			//console.log("customTaxAmountPA: " + customTaxAmountPA);
			//var customTaxAmountPARounded = customTaxAmountPA.toFixed(4);
			//console.log("customTaxAmountPARounded: " + customTaxAmountPARounded);

			/**
			 * Only update if the tax amount changes.
			 */
			if(customTaxAmountPA.toFixed(4) !== this.props.customTaxAmount.toFixed(4)) {
				//console.log("updating custom tax amount: " + customTaxAmountPA);
				store.dispatch({type: UPDATE_CUSTOM_TAX_AMOUNT, payload: { customTaxAmount: customTaxAmountPA}});
			}
		}
		
		//console.log("customTaxAmount after: " + this.props.customTaxAmount);

	}



	private useAvalara() {
		if(this.props.documentType === "PA") {
			this.props.useAvalaraTaxes();
		} else if(this.props.documentType === "CO") {
			this.props.setChangeOrderTaxType("AVALARA");
		}
	}

	private useCustomTaxes() {
		if(this.props.documentType === "PA") {
			this.props.useCustomTaxAmount();
		} else if(this.props.documentType === "CO") {
			this.props.setChangeOrderTaxType("CUSTOM");
		}
	}

	private renderPAButtons() {
		if(!this.props.taxExempt) {
			if( this.props.customTaxAmountUsed) {
				return <button className="buttonMinimal" onClick={this.useAvalara}>Use Avalara For Taxes</button> 
			} else {
				return <button className="buttonMinimal" onClick={this.useCustomTaxes}>Use Custom Tax Amount</button>
			}
		} else {
			return <div></div>
		}
	}

	private renderCOButtons() {
		const { taxType } = this.props;
		if(taxType === "CUSTOM") {
			return <button className="buttonMinimal" onClick={this.useAvalara}>Use Avalara For Taxes</button> 
		} else {
			return <button className="buttonMinimal" onClick={this.useCustomTaxes}>Use Custom Tax Amount</button>
		}
	}

	public render() {
		const { documentType } = this.props;
		return(
			<>
				{
				 checkIfAdmin() &&
				 <>
					{ documentType === "PA" && this.renderPAButtons() }
					{ documentType === "CO" && this.renderCOButtons() }

					
				</>
			}
			</>
		)
	}
}

export default connect(mapStateToProps, { useAvalaraTaxes, setChangeOrderTaxType, useCustomTaxAmount, updateTaxes, loadAgreement, updateBooleanInformation })(CustomTaxComponent);