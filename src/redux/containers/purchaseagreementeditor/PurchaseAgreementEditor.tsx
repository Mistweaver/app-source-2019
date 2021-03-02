import React from 'react';
import { Card, CardContent, LinearProgress, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { StoreState } from '../../Store';
import { connect } from 'react-redux';
import { getPurchaseAgreementData, submitAgreement, unsubmitAgreement, createChangeOrder, deleteAgreement, masterDeleteAgreement, revisePurchaseAgreement } from '../../../services/PurchaseAgreementService';
import { PurchaseAgreement } from '../../../objects/purchaseagreement/PurchaseAgreement';
import { loadAgreement, loadAgreementSalesOffice } from '../../actions/AgreementEditorActions';
import AgreementSummary from './agreementsummary/AgreementSummary';
import Page1 from './page1/Page1';
import SaveComponent from './savecomponent/SaveComponent';
import AddendumAWorksheet from './addendumA/AddendumAWorksheet';
import ApplianceWorksheet from './applianceworksheet/ApplianceWorksheet';
import ColorWorksheet from './colorselections/ColorWorksheet';
import WindZoneSheet from './windzone/WindZoneSheet';
import AgreementStateForms from './files/AgreementStateForms';
import ShippingDirections from './shippingdirections/ShippingDirections';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { ChangeOrder } from '../../../objects/changeorders/ChangeOrder';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import Escrow from './escrow/Escrow';
import CloseIcon from '@material-ui/icons/Close';
import { IN_PROGRESS, SUBMITTED, EXECUTED, CLOSED } from '../../../data/staticdata';
import DocumentStatus from '../../../components/documentstatus/DocumentStatus';
import StandardButton from '../../../components/buttons/StandardButton';
import { checkIfAdmin, checkIfDev } from '../../../auth/AccessControlFunctions';
import DeletionComponent from '../../../components/delete/DeletionComponent';
import { buildAgreementFromRedux } from './savecomponent/BuildAgreementFromRedux';
import AddSignedAgreementModal from './files/AddSignedAgreementModal';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import TaxSummary from '../taxes/TaxSummary';
import DocumentFiles from '../../../components/files/DocumentFiles';
import TaxSummaryPDF from '../taxes/TaxSummaryPDF';
import { ClipboardComponent } from '../../../components/clipboard/ClipboardComponent';

interface PurchaseAgreementEditorProps {
	objectId: string;
	edited: boolean;
	isDocumentRevised: boolean;

	id: string;
	leadId: string;
	buyer1: string;
	status: string;

	modelType: string;

	taxExempt: boolean;
	taxBreakdown: AvalaraTaxResponse;
	useCustomTaxableAmount: boolean;

	salesOffice: SalesOffice;
	// updatePathWithObject: (newPath: string, objectId: string) => void;
	loadAgreement: (agreement: PurchaseAgreement) => void;
	loadAgreementSalesOffice: (office: SalesOffice) => void;

	closeWindow: () => void;
}

interface AgreementDataResponseObject {
	agreement: PurchaseAgreement;
	changeorders: ChangeOrder[];
	revisions: PurchaseAgreement[];
	office: SalesOffice;
}

function mapStateToProps(state: StoreState) {
	return {
		objectId: state.application.pathObjectId,
		edited: state.agreementeditor.edited,
		id: state.agreementeditor.id,
		leadId: state.agreementeditor.leadId,
		buyer1: state.agreementeditor.buyer1,
		status: state.agreementeditor.status,
		modelType: state.agreementeditor.modelType,

		salesOffice: state.agreementeditor.office,

		taxExempt: state.agreementeditor.taxExempt,
		taxBreakdown: state.agreementeditor.taxBreakdown,
		useCustomTaxableAmount: state.agreementeditor.useCustomTaxableAmount
	}
}
interface PurchaseAgreementEditorState {
	agreementPage: number;
	loadingAgreement: boolean;
	agreementLoadFailure: boolean;
	changeOrders: ChangeOrder[];
	revisedAgreements: PurchaseAgreement[];
	displaySignedAgreementModal: boolean;

	// error modal
	showInfoModal: boolean;
	error: boolean;
	errorMessage: string;
	errorStatus: number;
}

class PurchaseAgreementEditor extends React.Component<PurchaseAgreementEditorProps, PurchaseAgreementEditorState> {
	constructor(props: PurchaseAgreementEditorProps) {
		super(props);
		this.state = {
			agreementPage: 0,
			loadingAgreement: false,
			agreementLoadFailure: false,

			changeOrders: [],
			revisedAgreements: [],
			displaySignedAgreementModal: false,

			showInfoModal: false,
			error: false,
			errorMessage: "",
			errorStatus: 0,
		}

		this.changePage = this.changePage.bind(this);
		this.loadPurchaseAgreement = this.loadPurchaseAgreement.bind(this);
		this.submit = this.submit.bind(this);
		this.unsubmit = this.unsubmit.bind(this);
		this.deleteThisAgreement = this.deleteThisAgreement.bind(this);
		this.masterDeleteThisAgreement = this.masterDeleteThisAgreement.bind(this);

		this.reviseThisAgreement = this.reviseThisAgreement.bind(this);
		this.startNewChangeOrder = this.startNewChangeOrder.bind(this);

		this.openSignedAgreementModal = this.openSignedAgreementModal.bind(this);
		this.closeSignedAgreementModal = this.closeSignedAgreementModal.bind(this);

	}
	componentDidMount() {
		this.loadPurchaseAgreement();
	}

	componentDidUpdate(prevProps: PurchaseAgreementEditorProps) {
		if(prevProps.objectId !== this.props.objectId) {
			this.loadPurchaseAgreement();
		} else if(prevProps.status !== this.props.status) {
			this.setState({ agreementPage: 0 });
		}
	}

	/**
	 * Loads the purchase agreement, its change orders, its revisions, and the sales office data
	 */
	private loadPurchaseAgreement() {
		console.log("PA ID: " + this.props.objectId);
		this.setState({ loadingAgreement: true });
		getPurchaseAgreementData(this.props.objectId).then(res => {
			this.setState({ loadingAgreement: false });
			let responseObject: AgreementDataResponseObject = res.data;
			if(validateHTMLResponse(res)) {
				// load purchase agreement into Redux agreementeditor
				this.props.loadAgreement(responseObject.agreement);
				this.props.loadAgreementSalesOffice(responseObject.office);
				this.setState({
					changeOrders: responseObject.changeorders,
					revisedAgreements: responseObject.revisions,
				});
				// depending on the agreement state, rerender the current tab
				if(res.data.agreement.status !== IN_PROGRESS) {
					this.setState({ agreementPage: 0 });
				}

			} else {
				this.setState({ agreementLoadFailure: true, loadingAgreement: false });
			}
		});
	}

	private changePage(page: number) { 
		console.log("Changing page");
		console.log(page);
		this.setState({ agreementPage: page}); 
	}


	/**
	 * Checks a group of change orders to see if any are in progress or not and returns a boolean
	 * @param changeOrders 
	 */
	private isExistingChangeOrderInProgress(changeOrders: ChangeOrder[]) {
		let existingChangeOrder = false;
		for(let i = 0; i < changeOrders.length; i++) {
			let order = changeOrders[i];
			if(order.status === IN_PROGRESS || order.status === SUBMITTED) {
				existingChangeOrder = true;
			}
		}
		return existingChangeOrder;
	}


	/**
	 * Reads the state of the existing agreement.
	 * Change orders can only be created if all previous orders and the agreement are executed
	 * if the agreement is closed, then an admin can create a purchase agreement
	 */
	private renderNewChangeOrderOption() {
		const { status } = this.props;	// status of the PA
		const { changeOrders } = this.state;

		let changeOrderInProgress = this.isExistingChangeOrderInProgress(changeOrders);	// checks the status of the change orders

		if(!changeOrderInProgress) {
			if(status === EXECUTED || (checkIfAdmin() && status === CLOSED)) {	// checks the status of the purchase agreement
				return <StandardButton onClick={this.startNewChangeOrder}>Start New Change Order</StandardButton>
			}
		} else {
			return null;
		}
	}

	private submit() {
		submitAgreement(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadAgreement(res.data.object);
			}
		});
	}

	private unsubmit() {
		unsubmitAgreement(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadAgreement(res.data.object);
			}
		});
	}

	/** Create Change Order * */
	private startNewChangeOrder() { 
		createChangeOrder(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.closeWindow();
			} else {
				console.log("Invalid response");
				this.handleResponseErrors(res);
			}
		})
	}

	private handleResponseErrors(res: any) {
		if(res.status === 409) {
			this.setState({ error: true, errorMessage: res.data.message, errorStatus: res.status, showInfoModal: true });
		} else {
			this.setState({ error: true, errorMessage: "Unknown Error", errorStatus: res.status, showInfoModal: true });
		}
	}

	/** Delete Purchase Agreement * */
	private deleteThisAgreement() {
		deleteAgreement(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				// this.loadLead();
				this.props.closeWindow();
			} else {
				console.log("Invalid response");
				// this.handleResponseErrors(res);
			}
		});
	}

	/** Master Delete Purchase Agreement 
	 * This delete is only available to developers.  It will delete the purchase agreement even if there are documents linking to it
	 * Know the consequences before you use it
	*/
	private masterDeleteThisAgreement() {
		masterDeleteAgreement(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.closeWindow();
			} else {
				console.log("Invalid response");
				this.handleResponseErrors(res);
			}
		});
	}

	/** Revise Purchase Agreement * */
	private reviseThisAgreement() {
		revisePurchaseAgreement(buildAgreementFromRedux()).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.closeWindow();
			} else {
				console.log("Invalid response");
				this.handleResponseErrors(res);
			}
		})
	}

	public openSignedAgreementModal() {
		this.setState({ displaySignedAgreementModal: true })
	}

	public closeSignedAgreementModal() {
		this.setState({ displaySignedAgreementModal: false})
	}

	private renderSubmitButton() {
		const { taxExempt, taxBreakdown, useCustomTaxableAmount, status, edited } = this.props;
		// make sure taxes are complete before submission
		// console.log(useCustomTaxableAmount);
		// console.log(taxExempt);
		// console.log(taxBreakdown.companyId);
		if(useCustomTaxableAmount === false && taxExempt === false && taxBreakdown.companyId === -1) {
			return(
				<div style={{
					border: '1px solid red',
					color: 'red', 
					padding: '6px 16px',
					fontSize: '0.875rem',
					minWidth: '64px',
					boxSizing: 'border-box',
					fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
					fontWeight: 500,
					lineHeight: 1.75,
					borderRadius: '4px',
					letterSpacing: '0.02857em',
					textAlign: 'center'
				}}>
					Taxes Are Incomplete
				</div>
			)
		}

		if(status === IN_PROGRESS && !edited) {
			return <StandardButton onClick={this.submit}>Submit</StandardButton> 
		} else {
			return <div></div>;
		}
	}


	public render() {
		const { buyer1, status } = this.props;
		const { agreementPage, displaySignedAgreementModal, agreementLoadFailure, loadingAgreement, changeOrders, revisedAgreements } = this.state;
		return(
			<>
				<AddSignedAgreementModal 
					onClose={this.closeSignedAgreementModal} 
					open={displaySignedAgreementModal}
					agreementId={this.props.id}
				/>
				<div id="taskBar" style={{position: 'relative'}}>
					<Toolbar>
						<Typography variant="h6" style={{flex: 1}}>Purchase Agreement for {buyer1}</Typography>
						<Button color="inherit" onClick={this.props.closeWindow} aria-label="close">
							<CloseIcon />
						</Button>
					</Toolbar>
				</div>
				<Grid container spacing={0}>
					<Grid item xs={2}>
						<div style={{padding: 15}}>
							<div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(231, 231, 231)'}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", display: 'flex', flexDirection: 'column'}}>
									<ClipboardComponent value={this.props.id} />
								</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column'}}>
									<DocumentStatus status={status} />

									{this.renderSubmitButton()}
									{ status === SUBMITTED && <StandardButton onClick={this.unsubmit}>Unsubmit</StandardButton> }
									{
										status === SUBMITTED &&
										<StandardButton onClick={this.openSignedAgreementModal} style={{margin: 5}}>Add Signed Agreement</StandardButton>
									}
								</div>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", marginBottom: 5}}>Available Actions</div>
								{
									this.props.isDocumentRevised ?
										<div style={{padding: 5}}>Document has been revised</div>
									:
									<>
										<SaveComponent />
										{
											this.renderNewChangeOrderOption()
										}
										{
											(status === EXECUTED || status === CLOSED) &&
											<StandardButton onClick={this.reviseThisAgreement}>Revise This Agreement</StandardButton>
										}
										{
											checkIfAdmin() &&
											<DeletionComponent 
												buttonString="Delete"
												deleteFunction={this.deleteThisAgreement}
												objectId={this.props.id}
											/>
										}
										{
											checkIfDev() &&
											<DeletionComponent 
												buttonString="Master Delete"
												deleteFunction={this.masterDeleteThisAgreement}
												objectId={this.props.id}
											/>
										}
									</>
								}
								
								
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Document Sections</div>
								<div className="buttonStandard" onClick={() => this.changePage(0)}>Agreement Summary</div>
								<div className="buttonStandard" onClick={() => this.changePage(12)}>Tax Summary</div>
								<div className="buttonStandard" onClick={() => this.changePage(9)}>
									{ status === EXECUTED ? "Supplemental Files" : "Agreement Files" }
								</div>
								{
									status === IN_PROGRESS &&
									<>
										<div className="buttonStandard" onClick={() => this.changePage(1)}>Page 1</div>
										<div className="buttonStandard" onClick={() => this.changePage(2)}>Addendum A</div>
										<div className="buttonStandard" onClick={() => this.changePage(3)}>Appliance Worksheet</div>
										<div className="buttonStandard" onClick={() => this.changePage(4)}>Color Selections</div>
										{
											this.props.modelType !== "PM" && <div className="buttonStandard" onClick={() => this.changePage(5)}>Wind Zone</div>
										}
										<div className="buttonStandard" onClick={() => this.changePage(6)}>Shipping Directions</div>
										{
											this.props.salesOffice.officeState === "AZ" &&
											<div className="buttonStandard" onClick={() => this.changePage(7)}>Escrow</div>
										}
									</>
								}
								
								<div className="buttonStandard" onClick={() => this.changePage(8)}>State and Vendor Forms</div>
								{
									checkIfAdmin() &&
									<div className="buttonStandard" onClick={() => this.changePage(11)}>Taxes</div>
								}
								
							</div>
						</div>
					</Grid>
					{
						loadingAgreement === true ?
						<LinearProgress />
						:
						<>
							{
								agreementLoadFailure ?
								<div style={{padding: 15}}>
									<Card>
										<CardContent>
											Agreement Failed to Load
										</CardContent>
									</Card>
								</div>
								:
								<>
									
									{ agreementPage === 0 && <AgreementSummary 
										changeOrders={changeOrders}
										revisions={revisedAgreements} 
										loadAgreementFromDatabase={this.loadPurchaseAgreement}
										closeWindow={this.props.closeWindow}
									/> }
									{ agreementPage === 12 && 
										<Grid item xs={6}>
											{/* <TaxSummary  documentType="PA" /> */}
											<TaxSummaryPDF  documentType={"PA"} objectId={this.props.objectId} />
										</Grid>
									}
									{ agreementPage === 1 && <Page1 /> }
									{ agreementPage === 2 && <AddendumAWorksheet /> }
									{ agreementPage === 3 && <ApplianceWorksheet /> }
									{ agreementPage === 4 && <ColorWorksheet /> }
									{ agreementPage === 5 && <WindZoneSheet /> }
									{ agreementPage === 8 && <AgreementStateForms />}
									{ agreementPage === 9 && 
										<DocumentFiles 
											documentType="PA"
											documentId={this.props.objectId}
											status={this.props.status}
											isDocumentRevised={this.props.isDocumentRevised} 
										/> 
									}
									{ agreementPage === 6 && <ShippingDirections /> }
									{ agreementPage === 7 && <Escrow /> }
									{ agreementPage === 11 && <Grid item xs={10}><TaxSummary documentType="PA"/></Grid> }
								</>
							}
						</>
					}
				</Grid>
			</>
		)
	}
}

export default connect(mapStateToProps, { /*updatePathWithObject,*/ loadAgreement, loadAgreementSalesOffice })(PurchaseAgreementEditor);