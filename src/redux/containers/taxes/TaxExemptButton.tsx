import { StoreState } from "../../Store";
import { connect } from "react-redux";
import React from "react";
import { AvalaraTaxResponse } from "../../../objects/avalaraobjects/AvalaraTaxResponse";
import { loadAgreement, updateTaxes, updateBooleanInformation, useAvalaraTaxes, useCustomTaxAmount, } from "../../actions/AgreementEditorActions";
import { setChangeOrderTaxType } from '../../actions/ChangeOrderActions';


interface TaxExemptButtonProps {
	taxExempt: boolean;
	documentType: string;
	customTaxAmount: boolean;

	// change order settings
	taxType: string;

	// redux functions
	updateBooleanInformation: (targetedField: string, newValue: boolean) => void;
	updateTaxes: (response: AvalaraTaxResponse, taxAmount: number) => void;
	setChangeOrderTaxType: (type: string) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		taxExempt: state.agreementeditor.taxExempt,
		customTaxAmount: state.agreementeditor.useCustomTaxableAmount,
		taxType: state.changeordereditor.taxType
	}
}

interface TaxExemptButtonState {
	error: boolean;
	errorDetails: string;
}

class TaxExemptButton extends React.Component<TaxExemptButtonProps, TaxExemptButtonState> {
	constructor(props: TaxExemptButtonProps) {
		super(props);
		this.state = {
			error: false,
			errorDetails: ""
		}
		this.markTaxExempt = this.markTaxExempt.bind(this);
	}

	private markTaxExempt() {
		if(this.props.documentType === "PA") {
			if(this.props.taxExempt) {
				this.props.updateBooleanInformation("taxExempt", false);
			} else {
				this.props.updateBooleanInformation("taxExempt", true);
				this.props.updateTaxes(new AvalaraTaxResponse(), 0);
			}
		} else if (this.props.documentType === "CO") {
			if(this.props.taxType === "AVALARA" || this.props.taxType === "CUSTOM") {
				this.props.setChangeOrderTaxType("EXEMPT");
			} else if (this.props.taxType === "EXEMPT") {
				this.props.setChangeOrderTaxType("AVALARA");
			}
		}
	}

	public render() {
		return(
			<>
				{
					!this.props.customTaxAmount && 
					<>
						{
							(this.props.taxExempt || this.props.taxType === "EXEMPT") ?
							<button className="buttonMinimal" onClick={this.markTaxExempt}>Unexempt Taxes</button>
							:
							<button className="buttonMinimal" onClick={this.markTaxExempt}>Mark Tax Exempt</button>
						}		
					</>
				}
			</>
			
		)
	}
}

export default connect(mapStateToProps, { useAvalaraTaxes, setChangeOrderTaxType, useCustomTaxAmount, updateTaxes, loadAgreement, updateBooleanInformation })(TaxExemptButton);