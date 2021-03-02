import React from 'react';
import { connect } from 'react-redux';
import './SaveComponent.css';
import { SaveComponentProps } from './SaveComponentProps';
import { mapStateToSaveComponentProps } from './MapStateToSaveComponentProps';
import { editPurchaseAgreement, getPurchaseAgreementById } from '../../../../services/PurchaseAgreementService';
import { loadAgreement, loadAgreementSalesOffice } from '../../../actions/AgreementEditorActions';
import { validateHTMLResponse } from '../../../../services/HttpResponseChecker';
import { checkIfAdmin } from '../../../../auth/AccessControlFunctions';
import { buildAgreementFromRedux } from './BuildAgreementFromRedux';
import { IN_PROGRESS } from '../../../../data/staticdata';
import StandardButton from '../../../../components/buttons/StandardButton';
import CriticalButton from '../../../../components/buttons/CriticalButton';

/*Save Component
 * 
 * Takes in the agreement editor state.  When an edit is made, it presents the opportunity to save the agreement.
 * If lead is changed 
 * 
 */

interface SaveComponentState {
	submitted: boolean;
	error: boolean;
}

class SaveComponent extends React.Component<SaveComponentProps, SaveComponentState> {
	constructor(props: SaveComponentProps) {
		super(props);
		this.state = {
			submitted: false,
			error: false
		}

		this.save = this.save.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	private save() {
		// rebuild PA Object from agreementeditor Redux state
		let purchaseAgreement = buildAgreementFromRedux();
		editPurchaseAgreement(purchaseAgreement).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadAgreement(res.data.object);
			} else {

			}
		}).catch(err => {
			console.log(err);
		});
	}

	private cancel() {
		getPurchaseAgreementById(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				// console.log(res);
				// load purchase agreement into Redux agreementeditor
				this.props.loadAgreement(res.data);
			}
		});
	}


	public render() {
		const { edited, status } = this.props;
		return(
			<>
				{
					(status === IN_PROGRESS || checkIfAdmin()) && edited === true &&
					<>
						<StandardButton onClick={this.save}>Save Edits</StandardButton>
						<CriticalButton onClick={this.cancel}>Cancel</CriticalButton>
					</>
				}
			</>
			
		)
	}
}

export default connect(mapStateToSaveComponentProps, { loadAgreement, loadAgreementSalesOffice })(SaveComponent);