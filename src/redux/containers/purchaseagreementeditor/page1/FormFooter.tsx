import React from "react";
import { StoreState } from "../../../Store";
import { updateGenericInformation } from '../../../actions/AgreementEditorActions';
import { connect } from "react-redux";

interface FormFooterProps {
	balancePaidInFullDate: string;
	updateGenericInformation: (targetedField: string, newValue: string) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		balancePaidInFullDate: state.agreementeditor.balancePaidInFullDate
	}
}

const FormFooter = (props: FormFooterProps) => {
	const handleFormChange = (event: { target: { name: string, value: string }}) => {
		const { name, value } = event.target;
		props.updateGenericInformation(name, value);
	} 

	return <div style={{ border: '2px solid black'}}>	
			<div style={{borderBottom: '1px solid black', padding: 10}}>*NO VERBAL PROMISES. Changes may only be made via signed change order request and may incur extra charges.</div>
			<div style={{borderBottom: '1px solid black', padding: 10}}>Buyer understands that if not paid 7 business days prior to completion, balance must be paid in certified funds.</div>
			<div style={{borderBottom: '1px solid black', padding: 10}}>
				<b>
					{
						props.balancePaidInFullDate === "Per Lender Requirements" ?
						<>
							<span style={{marginRight: 10}}>Buyer agrees that the unpaid balance due will be paid in full on or before:</span>
							<span style={{color: 'darkred'}}>{props.balancePaidInFullDate}</span>
						</>
						:
						<>
							<span style={{marginRight: 10}}>Buyer agrees that the unpaid balance due will be paid in full on or before:</span>
							<input name="balancePaidInFullDate" onChange={handleFormChange} value={props.balancePaidInFullDate} />
						
						</>
					}
				</b>
			</div>



					{/*<div style={{borderBottom: '1px solid black', height: 150, padding: 10,}}></div>*/}
			<div style={{borderBottom: '1px solid black', padding: 10}}>Please read your deposit disclosure carefully for termination of Purchase Agreement by any party.  All sales are subject to fees for cancellation.  </div>
			<div style={{borderBottom: '1px solid black', padding: 10}}>Unless otherwise stated, if for any reason buyer is not ready to authorize construction of the above home, the amount of this purchase agreement is subject to an increase.  If the cost of the home increases between the date of this agreement and the date buyer authorizes construction, buyer agrees that the purchase agreement amount will be adjusted to cover the increases incurred during such time.</div>
			<div style={{backgroundColor: 'black', color: 'white', margin: 0, textAlign: 'center', padding: 2}}>
				THIS AGREEMENT ALONG WITH ADDENDUMS CONTAIN THE ENTIRE UNDERSTANDING BETWEEN DEALER AND BUYER AND NO OTHER REPRESENTATION OR INDUCEMENT, VERBAL OR WRITTEN, HAS BEEN MADE WHICH IS NOT CONTAINED IN THIS PURCHASE AGREEMENT.
			</div>
		</div>
}

export default connect(mapStateToProps, { updateGenericInformation })(FormFooter);