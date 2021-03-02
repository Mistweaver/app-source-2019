import React from 'react';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { RenderNoticeOfConstructionSelectionOptions, selectNoticeOfConstructionAndFinalPayment } from '../../../actions/ConstructionFinalPaymentActions';
import { updateGenericInformation } from '../../../actions/AgreementEditorActions';

interface NoticeOfConstructionProps {
	noticeOfConstructionAndFinalPayment: string;
	noticeOfConstructionAndFinalPaymentText: string;
	noticeOfCompletion: string;
	balancePaidInFullDate: string;
	selectNoticeOfConstructionAndFinalPayment: (selection: string, balancePaidInFullDate: string) => void;
	updateGenericInformation: (field: string, value: string) => void;
	notes: string;
}

function mapStateToProps(state: StoreState) {
	return {
		noticeOfCompletion: state.agreementeditor.noticeOfCompletion,
		noticeOfConstructionAndFinalPayment: state.agreementeditor.noticeOfConstructionAndFinalPayment,
		noticeOfConstructionAndFinalPaymentText: state.agreementeditor.noticeOfConstructionAndFinalPaymentText,
		balancePaidInFullDate: state.agreementeditor.balancePaidInFullDate,
		notes: state.agreementeditor.notes
	}
}

const NoticeOfConstruction = (props: NoticeOfConstructionProps) => {

	const selectNoticeOfConstruction = (event: { target: { value: string }}) => {
		const { value } = event.target;
		props.selectNoticeOfConstructionAndFinalPayment(value, props.balancePaidInFullDate);
	}

	const updateField = (event: { target: { name: string, value: string }}) => {
		const { name, value } = event.target;

		if(name === "notes" ) {
			//console.log("value name: " + name);
			//console.log("value length: " + value.length);
			/**
			 * Limit notes to 400 characters. So, it fits in prinout.
			 */
			if(value.length<400) {
				props.updateGenericInformation(name, value);
			}
		} else {
			props.updateGenericInformation(name, value);
		}
	}

	return <div style={{width: '45%'}}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<label style={{backgroundColor: 'black', color: 'white', textAlign: 'center', padding: 10}}>NOTICE OF CONSTRUCTION & FINAL PAYMENT</label>
					<div style={{padding: 20}}>
						{
							props.noticeOfConstructionAndFinalPayment !== "" &&
							<div>{props.noticeOfConstructionAndFinalPaymentText}</div>
						}
						<select style={{padding: 10, marginTop: 10}} onChange={selectNoticeOfConstruction} value={props.noticeOfConstructionAndFinalPayment}>
							{RenderNoticeOfConstructionSelectionOptions()}
						</select>
					</div>
					<label  style={{backgroundColor: 'black', color: 'white', textAlign: 'center', padding: 10}}>NOTICE OF COMPLETION</label>
					<div style={{padding: 20}}>
						<p>Buyer understand that the approximate completion month for home is:</p>
						<select style={{padding: 10}} value={props.noticeOfCompletion} onChange={updateField} name="noticeOfCompletion">
							<option value="">-</option>
							<option value="January">January</option>
							<option value="February">February</option>
							<option value="March">March</option>
							<option value="April">April</option>
							<option value="May">May</option>
							<option value="June">June</option>
							<option value="July">July</option>
							<option value="August">August</option>
							<option value="September">September</option>
							<option value="October">October</option>
							<option value="November">November</option>
							<option value="December">December</option>
						</select>
						<p style={{marginTop: 10}}>Buyer understands that in the event delivery of the home does not occur to property within 12 days after home is completed at the factory there will be a $20 per day storage charge that must be paid prior to shipment.  In the event there is an extended period of storage time needed buyer authorizes %%SALES_OFFICE_TITLE%% to re-locate the home to an off-site storage facility.  Buyer must insure the home and is responsible for any damage incurred as a result of extended storage.</p>
					</div>
					<label  style={{backgroundColor: 'black', color: 'white', textAlign: 'center', padding: 10}}>NOTICE OF FREIGHT</label>
					<div style={{padding: 20}}>
						<p>Buyer understands that unless otherwise stated, the quoted freight price is estimated for the current date and may not reflect fluctuating fuel surcharges, Department of Transportation highway construction re-routing, highway patrol escorts, or unique complicated placements based on terrain of delivery site.</p>
					</div>
					<label  style={{backgroundColor: 'black', color: 'white', textAlign: 'center', padding: 2}}>NOTATIONS & REMARKS</label>
					<div style={{padding: 20}}>
						<textarea style={{width: '100%', minHeight: '200px'}} onChange={updateField} name="notes" value={props.notes}>

						</textarea>
					</div>
				</div>
			</div>
}

export default connect(mapStateToProps, { selectNoticeOfConstructionAndFinalPayment, updateGenericInformation })(NoticeOfConstruction);