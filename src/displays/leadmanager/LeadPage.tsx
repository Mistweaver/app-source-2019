import React from 'react';
import { Grid, Button, Slide, Dialog, Toolbar, Typography } from '@material-ui/core';
import { getAllSalesOffices } from '../../services/SalesOfficeServices';
import { deleteLead, masterDeleteLead, getLeadContractsByLeadId } from '../../services/LeadServices';
import { createNewPurchaseAgreement, adminOverrideNewPurchaseAgreement } from '../../services/PurchaseAgreementService';
import { Lead } from '../../objects/lead/Lead';
import { PurchaseAgreement } from '../../objects/purchaseagreement/PurchaseAgreement';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { ChangeOrder } from '../../objects/changeorders/ChangeOrder';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { checkIfAdmin, checkIfDev } from '../../auth/AccessControlFunctions';
import InfoModal from './InfoModal';
import { deleteChangeOrder } from '../../services/ChangeOrderServices';
import ReassignLead from '../reassign/ReassignLead';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CloseIcon from '@material-ui/icons/Close';
import PurchaseAgreementEditor from '../../redux/containers/purchaseagreementeditor/PurchaseAgreementEditor';
import { updateObjectId } from '../../redux/actions/ApplicationActions';
import { connect } from 'react-redux';
import ChangeOrderEditor from '../../redux/containers/changeordereditor/ChangeOrderEditor';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DocumentChain } from './DocumentChain';
import { returnReadableState } from '../../data/staticdata';
import StandardButton from '../../components/buttons/StandardButton';
import DeletionComponent from '../../components/delete/DeletionComponent';

interface LeadPageProps {
	objectId: string;
	updateObjectId: (id: string) => void;
	closeWindow: () => void;
}

interface LeadPageState {
	lead: Lead;
	deals: DocumentChain[];
	salesOffices: SalesOffice[];

	showInfoModal: boolean;
	error: boolean;
	errorMessage: string;
	errorStatus: number;

	showReassignLeadModal: boolean;
	selectedAgreement: PurchaseAgreement;
	selectedChangeOrder: ChangeOrder;
	loadingLeadData: boolean;

	selectedDealRevisionState: boolean;
	isEditorDrawerOpen: boolean;
	selectedContractType: string;
}


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
	//@ts-ignore
	return <Slide direction="up" ref={ref} {...props} />;
});

const AGREEMENT_SELECTED = "AGREEMENT_SELECTED";
const CHANGE_ORDER_SELECTED = "CHANGE_ORDER_SELECTED";

class LeadPage extends React.Component<LeadPageProps, LeadPageState> {


	constructor(props: LeadPageProps) {
		super(props);
		this.state = {
			lead: new Lead(),
			deals: [],
			salesOffices: [],

			showInfoModal: false,
			error: false,
			errorMessage: "",
			errorStatus: 0,

			showReassignLeadModal: false,
			selectedAgreement: new PurchaseAgreement(),
			selectedChangeOrder: new ChangeOrder(),
			loadingLeadData: false,
			selectedDealRevisionState: false,
			isEditorDrawerOpen: false,
			selectedContractType: ""
		}

		this.deleteThisLead = this.deleteThisLead.bind(this);
		this.masterDeleteThisLead = this.masterDeleteThisLead.bind(this);
		this.startNewPurchaseAgreement = this.startNewPurchaseAgreement.bind(this);
	
		this.closeInfoModal = this.closeInfoModal.bind(this);
		this.deleteThisChangeOrder = this.deleteThisChangeOrder.bind(this);
		this.changeReassignmentModalDisplay = this.changeReassignmentModalDisplay.bind(this);
		this.loadLead = this.loadLead.bind(this);

		this.openEditorDrawer = this.openEditorDrawer.bind(this);
		this.closeEditorDrawer = this.closeEditorDrawer.bind(this);

		this.overrideNewPurchaseAgreement = this.overrideNewPurchaseAgreement.bind(this);
	}
	

	componentDidMount() {
		console.log("LEAD PAGE MOUNTED");
		// load all sales offices
		getAllSalesOffices().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ salesOffices: res.data });
			}
		});
		console.log("CALLING LOAD LEAD");
		// load the lead
		this.loadLead();
	}

	componentDidUpdate(prevProps: LeadPageProps) {
		if(prevProps.objectId !== this.props.objectId) {
			this.loadLead();
		}
	}

	private loadLead() {
		
		if(this.props.objectId !== "") {
			this.setState({ loadingLeadData: true });
			getLeadContractsByLeadId(this.props.objectId).then(res => {
				this.setState({ loadingLeadData: false });
				if(validateHTMLResponse(res)) {
					this.setState({
						lead: res.data.lead,
						deals: res.data.deals
					});
				}
			}).catch(err => {
				console.log(err);
			});
		} else {
		}
	}


	/** Delete Lead * */
	private deleteThisLead() {
		deleteLead(this.state.lead.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.closeWindow();
			} else {
				this.handleResponseErrors(res);
			}
		});
	}

	/** Master Delete Lead */
	private masterDeleteThisLead() {
		masterDeleteLead(this.state.lead.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.closeWindow();
			} else {
				this.handleResponseErrors(res);
			}
		});
	}

	/** Create New Purchase Agreement * */
	private startNewPurchaseAgreement() {
		const { salesOffices, lead  } = this.state;
		let leadSalesOffice: SalesOffice = salesOffices.find(office => office.clientConsultantId === parseInt(lead.locationId)) || new SalesOffice();
		// createNewPurchaseAgreement(this.state.lead.id, leadSalesOffice.id).then(res => {
		createNewPurchaseAgreement(this.state.lead, leadSalesOffice.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.loadLead();
			} else {
				console.log("Invalid response");
				this.handleResponseErrors(res);
			}
		});
	}

	/** Admin override for new purchase agreement */
	private overrideNewPurchaseAgreement() {
		const { salesOffices, lead  } = this.state;
		let leadSalesOffice: SalesOffice = salesOffices.find(office => office.clientConsultantId === parseInt(lead.locationId)) || new SalesOffice();
		// createNewPurchaseAgreement(this.state.lead.id, leadSalesOffice.id).then(res => {
		adminOverrideNewPurchaseAgreement(this.state.lead, leadSalesOffice.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.loadLead();
			} else {
				console.log("Invalid response");
				this.handleResponseErrors(res);
			}
		});
	}

	/** Reassign Purchase Agreement * */
	private changeReassignmentModalDisplay() {
		this.setState(prevState => ({
			showReassignLeadModal: !prevState.showReassignLeadModal
		}))
	}

	/** Delete Change Order * */
	private deleteThisChangeOrder(id: string) {
		deleteChangeOrder(id).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ selectedChangeOrder: new ChangeOrder() });
				this.loadLead();
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

	private closeInfoModal() {
		this.setState({ showInfoModal: false });
	}
	
	private selectAgreement(agreement: PurchaseAgreement, revisionState: boolean) {
		this.props.updateObjectId(agreement.id);
		this.setState({ selectedAgreement: agreement, isEditorDrawerOpen: true, selectedContractType: AGREEMENT_SELECTED, selectedDealRevisionState: revisionState });
		// this.loadAgreementChangeOrders(agreement.id);
	}

	private selectChangeOrder(changeOrder: ChangeOrder, revisionState: boolean) {
		this.props.updateObjectId(changeOrder.id);
		this.setState({ selectedChangeOrder: changeOrder, isEditorDrawerOpen: true, selectedContractType: CHANGE_ORDER_SELECTED, selectedDealRevisionState: revisionState });
	}

	private openEditorDrawer() {
		this.setState({ isEditorDrawerOpen: true });
	}

	private closeEditorDrawer() {
		this.loadLead();
		this.setState({ isEditorDrawerOpen: false });
	}


	public render() {
		const { lead, showInfoModal, loadingLeadData, salesOffices, deals, selectedDealRevisionState} = this.state;

		let officeName;
		let leadSalesOffice: SalesOffice = salesOffices.find(office => office.clientConsultantId === parseInt(lead.locationId)) || new SalesOffice();
		if(lead.locationId === "1") {
			officeName = "default";
		} else {
			officeName = leadSalesOffice.officeName;
		}

		return(
			<div>
				<div id="taskBar" style={{position: 'relative'}} >
					<Toolbar>
						<Typography variant="h6" style={{flex: 1}}>Agreement Manager</Typography>
						<Button color="inherit" onClick={this.props.closeWindow} aria-label="close">
							<CloseIcon />
						</Button>
					</Toolbar>
				</div>
				<div style={{padding: 15}}>
					<Grid container spacing={2}>
						<Grid item xs={2}>
							<div style={{borderRadius: 5, padding: 5}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', display: 'flex', alignContent: 'center'}}>
									<AccountCircleIcon style={{marginRight: 10, color: '#D56B3B'}}/>
									<span style={{color: "#BAD2D7"}}>
										{lead.firstName + ' '}
										{
											(lead.otherName !== null && lead.otherName !== "") &&
											<span>{' "' +lead.otherName + '" '}</span>
										}
										{lead.lastName}
									</span>
								</div>

								<div style={{backgroundColor: "rgb(231, 231, 231)", padding: 5}}>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
										<span style={{fontWeight: 650, fontSize: '10pt'}}>Location</span>
										<span>{officeName}</span>
									</div>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
										<span style={{fontWeight: 650, fontSize: '10pt'}}>Email</span>
										<span>{lead.emailAddress}</span>
									</div>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
										<span style={{fontWeight: 650, fontSize: '10pt'}}>Phone</span>
										<span>{lead.phone}</span>
									</div>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
										<span style={{fontWeight: 650, fontSize: '10pt'}}>Created On</span>
										<span>{new Date(lead.creationTime).toLocaleString()}</span>
									</div>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
										<span style={{fontWeight: 650, fontSize: '10pt'}}>Sales Agent</span>
										<span>{lead.userId}</span>
									</div>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
										<span style={{fontWeight: 650, fontSize: '10pt'}}>Client Consultant ID:</span>
										<span>{lead.leadId}</span>
									</div>
									{
										checkIfDev() &&
										<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
											<span style={{fontWeight: 650, fontSize: '10pt'}}>Database ID:</span>
											<span>{lead.id}</span>
										</div>
									}
								</div>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Available Actions</div>
								<div style={{display: 'flex', flexDirection: 'column', /*backgroundColor: "rgb(231, 231, 231)"*/}}>
									{
										deals.length === 0 &&
										<StandardButton onClick={this.startNewPurchaseAgreement}>Start New Agreement</StandardButton>
									}
									{
										checkIfAdmin() && 
										<StandardButton onClick={this.changeReassignmentModalDisplay}>Reassign Lead</StandardButton>
									}
									{
										checkIfAdmin() &&
										<>
											<StandardButton onClick={this.overrideNewPurchaseAgreement}>New Agreement (Admin)</StandardButton>
											<DeletionComponent
												buttonString="Delete Lead"
												deleteFunction={this.deleteThisLead}
												objectId={this.state.lead.id}
											/>
											<DeletionComponent
												buttonString="Master Lead Delete"
												deleteFunction={this.masterDeleteThisLead}
												objectId={this.state.lead.id}
											/>
										</>
									}
								</div>
							</div>
						</Grid>
						<Grid item xs={7}>
							
							{
								deals.reverse().map((deal, index) => (
									<div key={"deal" + index} style={{borderRadius: 5, padding: 5}}>
										<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Deal {new Date(deal.documents[0].agreement.creationTime).toLocaleDateString()}</div>
										<div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(231, 231, 231)', fontSize: '10pt'}}>
											<div style={{display: 'flex', padding: 5}}>
												<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
													<span style={{fontWeight: 650}}>Contract Type</span>
												</div>
												<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
													<span style={{fontWeight: 650}}>Date</span>
												</div>
												<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
													<span style={{fontWeight: 650}}>Last Modified</span>
												</div>
												<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
													<span style={{fontWeight: 650}}>Delivery State</span>
												</div>
												<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
													<span style={{fontWeight: 650}}>Status</span>
												</div>
											</div>
											{
												deal.documents.map(chain => (
													<>
														{
															chain.agreement.contractRevisedFrom !== "" &&
															<div style={{padding: 5, fontWeight: 550, borderBottom: '1px solid lightgrey'}}>
																Agreement Revised {new Date(chain.agreement.creationTime).toLocaleDateString()}
															</div>
														}
														<div key={chain.agreement.id} className="contractRow" onClick={() => this.selectAgreement(chain.agreement, chain.revised)} style={{cursor: 'pointer', display: 'flex', borderBottom: '1px solid lightgrey', padding: 5}} >
															<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																<span>Purchase Agreement</span>
															</div>
															<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																<span>{new Date(chain.agreement.creationTime).toLocaleDateString()}</span>
															</div>
															<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																<span>{new Date(chain.agreement.modificationTime).toLocaleString()}</span>
															</div>
															<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																<span>{chain.agreement.deliveryState}</span>
															</div>
															<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																<span>{returnReadableState(chain.agreement.status)}</span>
															</div>
														</div>
														{
															chain.changeOrders.map(order => (
																<div key={order.id} className="contractRow" onClick={() => this.selectChangeOrder(order, chain.revised)} style={{cursor: 'pointer', display: 'flex', borderBottom: '1px solid lightgrey', padding: 5}} >
																	<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																		<span>Change Order {order.changeOrderNumber}</span>
																	</div>
																	<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																		<span>{new Date(order.creationTime).toLocaleDateString()}</span>
																	</div>
																	<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																		<span>{new Date(order.modificationTime).toLocaleString()}</span>
																	</div>
																	<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																		<span></span>
																	</div>
																	<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
																		<span>{returnReadableState(order.status)}</span>
																	</div>
																</div>
															))
														}
														
													</>
												))
											}
										</div>
									</div>
								))
							}
							{	loadingLeadData === false && deals.length === 0 &&
								<div style={{textAlign: 'center'}}>
									<h4>There are no purchase agreements for this lead currently</h4>
								</div>
							}
							
						</Grid>
						<InfoModal 
							open={showInfoModal}
							onClose={this.closeInfoModal}
							error={this.state.error}
							errorMessage={this.state.errorMessage}
							errorStatus={this.state.errorStatus}

						/>
						<ReassignLead 
							open={this.state.showReassignLeadModal}
							onClose={this.changeReassignmentModalDisplay}
							reloadLead={this.loadLead}
							locationId={this.state.lead.locationId}
							leadId={this.state.lead.id}
							salesOffices={this.state.salesOffices}
						/>
						<Dialog
							open={this.state.isEditorDrawerOpen}
							onClose={this.closeEditorDrawer}
							aria-labelledby="form-dialog-title"
							fullScreen
							TransitionComponent={Transition}
							disableEscapeKeyDown={false}
							PaperProps={{
								style: {
									backgroundColor: '#282c34',
									boxShadow: 'none'
								}
							}}
						>
							{
								this.state.selectedContractType === AGREEMENT_SELECTED &&
								<PurchaseAgreementEditor 
									closeWindow={this.closeEditorDrawer}
									isDocumentRevised={selectedDealRevisionState}
								/>
							}
							{
								this.state.selectedContractType === CHANGE_ORDER_SELECTED &&
								<ChangeOrderEditor 
									closeWindow={this.closeEditorDrawer}
									isDocumentRevised={selectedDealRevisionState}
								/>
							}
						</Dialog>
					</Grid>
				</div>
			</div>
		)
	}
}

export default connect(null, { updateObjectId })(LeadPage);