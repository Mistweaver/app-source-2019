import React from 'react';
import { Grid } from '@material-ui/core';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { loadAgreement, loadAgreementSalesOffice } from '../../../actions/AgreementEditorActions';
import { PurchaseAgreement } from '../../../../objects/purchaseagreement/PurchaseAgreement';
import { SalesOffice } from '../../../../objects/salesoffice/SalesOffice';
import { ChangeOrder } from '../../../../objects/changeorders/ChangeOrder';
import AgreementReview from './AgreementReview';

class AgreementSummaryProps {
	agreementId: string;
	status: string;
	// changeAgreementLockStatus: () => void;
	// changeAgreementSubmissionStatus: () => void;

	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	deliveryCountry: string;
	deliveryStreet: string;

	loadAgreement: (agreement: PurchaseAgreement) => void;
	loadAgreementFromDatabase: () => void;
	loadAgreementSalesOffice: (office: SalesOffice) => void;
	// updatePathWithObject: (newPath: string, objectId: string) => void;

	customerCode: string;

	// props not from redux.  passed from the PurchaseAgreementEditor.tsx
	changeOrders: ChangeOrder[];
	revisions: PurchaseAgreement[];

	closeWindow: () => void;

	id: string;

	
}

function mapStateToProps(state: StoreState) {
	return {
		agreementId: state.agreementeditor.id,
		status: state.agreementeditor.status,

		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryState: state.agreementeditor.deliveryState,
		deliveryZip: state.agreementeditor.deliveryZip,
		deliveryCountry: state.agreementeditor.deliveryCountry,
		deliveryStreet: state.agreementeditor.deliveryStreet,

		customerCode: state.agreementeditor.customerCode,

		id: state.agreementeditor.id
	}
}

class AgreementSummaryState {
	loading: boolean;
	validatingAddress: boolean;
	showAvalaraResponseMessages: boolean;
	avalaraConnectionIssue: boolean;
	missingAddressPiece: string;

	
}

class AgreementSummary extends React.Component<AgreementSummaryProps, AgreementSummaryState> {
	constructor(props: AgreementSummaryProps) {
		super(props);
		this.state = {
			loading: false,
			validatingAddress: true,
			showAvalaraResponseMessages: false,
			avalaraConnectionIssue: false,
			missingAddressPiece: "",
		}
		this.showAvalaraMessages = this.showAvalaraMessages.bind(this);
	}

	componentDidMount() {}

	//componentDidUpdate(prevProps: AgreementSummaryProps) {
		//if(prevProps !== this.props) {}
	//}

	private showAvalaraMessages() {
		this.setState(prevState => ({ showAvalaraResponseMessages: !prevState.showAvalaraResponseMessages }));
	}

	public render() {
		const { changeOrders, revisions } = this.props;
		return(
			<>
				<Grid item xs={7}>
					<AgreementReview />
				</Grid>
				<Grid item xs={3}>
					{
						changeOrders.length !== 0 &&
						<>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Change Orders</div>
							<div style={{padding: 15, display: 'flex', backgroundColor: "rgb(231, 231, 231)", fontSize: '10pt'}}>
								<div style={{width: "33.333%", display: 'flex' }}>
									<span style={{fontWeight: 650}}>Date</span>
								</div>
								<div style={{width: "33.333%", display: 'flex', flexDirection: 'column'}}>
									<span style={{fontWeight: 650}}>Last Modified</span>
								</div>
								<div style={{width: "33.333%", display: 'flex', flexDirection: 'column'}}>
									<span style={{fontWeight: 650}}>Status</span>
								</div>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "white"}}>
								{
									changeOrders.map(changeOrder => (
										<div key={changeOrder.id} className="contractRow" style={{cursor: 'pointer', display: 'flex', borderBottom: '1px solid lightgrey', padding: 5}} >
											<div style={{width: "33.333%", display: 'flex', flexDirection: 'column'}}>
												<span>{new Date(changeOrder.creationTime).toLocaleDateString()}</span>
											</div>
											<div style={{width: "33.333%", display: 'flex', flexDirection: 'column'}}>
												<span>{new Date(changeOrder.modificationTime).toLocaleDateString()}</span>
											</div>
											<div style={{width: "33.333%", display: 'flex', flexDirection: 'column'}}>
												<span>{changeOrder.status}</span>
											</div>
										</div>
									))
								}
							</div>
							
						</>
					}
					{
						revisions.length !== 0 &&
						
						<>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Revisions</div>
							<div style={{padding: 15, display: 'flex', backgroundColor: "rgb(231, 231, 231)", fontSize: '10pt'}}>
								<div style={{width: "25%", display: 'flex'}}>
									<span style={{fontWeight: 650}}>Date</span>
								</div>
								<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
									<span style={{fontWeight: 650}}>Last Modified</span>
								</div>
								<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
									<span style={{fontWeight: 650}}>Delivery State</span>
								</div>
								<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
									<span style={{fontWeight: 650}}>Status</span>
								</div>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "white"}}>
								{
									revisions.map(agreement =>(
										<div key={agreement.id} className="contractRow" style={{display: 'flex', borderBottom: '1px solid lightgrey', padding: 5}} >
											
											<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
												<span>{new Date(agreement.creationTime).toLocaleDateString()}</span>
											</div>
											<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
												<span>{new Date(agreement.modificationTime).toLocaleDateString()}</span>
											</div>
											<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
												<span>{agreement.deliveryState}</span>
											</div>
											<div style={{width: "25%", display: 'flex', flexDirection: 'column'}}>
												<span>{agreement.status}</span>
											</div>
										</div>
									))
								}
							</div>
						</>
						
					}
				</Grid>
			
			</>
		)
	}
}

export default connect(mapStateToProps, { loadAgreement, loadAgreementSalesOffice/*, updatePathWithObject */})(AgreementSummary);