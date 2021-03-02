import React from 'react';
import { Toolbar, Button, Grid, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import { ChangeOrder } from '../../../objects/changeorders/ChangeOrder';
import { getChangeOrderById, submitChangeOrder, unsubmitChangeOrder, deleteChangeOrder } from '../../../services/ChangeOrderServices';
import { ChangeOrderItem } from '../../../objects/changeorders/ChangeOrderItem';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { StoreState } from '../../Store';
import { PurchaseAgreement } from '../../../objects/purchaseagreement/PurchaseAgreement';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { connect } from 'react-redux';
import { loadAgreement, loadAgreementSalesOffice } from '../../actions/AgreementEditorActions';
import { loadChangeOrder, addChangeOrderItem } from '../../actions/ChangeOrderActions';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import ChangeOrderSaveComponent from './savecomponent/ChangeOrderSaveComponent';
import { calculateChangeOrderSubtotal, calculateChangeOrderTotal } from './ChangeOrderUtilities';
import { checkIfAdmin, checkIfDev } from '../../../auth/AccessControlFunctions';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import ChangeOrderLineItem from './ChangeOrderLineItem';
import CloseIcon from '@material-ui/icons/Close';
import ChangeOrderUpload from './upload/ChangeOrderUpload';
import AvalaraRequestComponent from '../taxes/AvalaraRequestComponent';
import TaxExemptButton from '../taxes/TaxExemptButton';
import CustomTaxComponent from '../taxes/CustomTaxComponent';
import { SUBMITTED, IN_PROGRESS } from '../../../data/staticdata';
import StandardButton from '../../../components/buttons/StandardButton';
import DeletionComponent from '../../../components/delete/DeletionComponent';
import { setChangeOrderTaxAmount } from '../../actions/ChangeOrderActions';
import DocumentStatus from '../../../components/documentstatus/DocumentStatus';
import DocumentFiles from '../../../components/files/DocumentFiles';
import TaxSummaryPDF from '../taxes/TaxSummaryPDF';

interface ChangeOrderEditorProps {
	objectId: string;
	edited: boolean;
	isDocumentRevised: boolean;

	//jpa auditing
	id: string;
	createdBy: string;
	creationTime: string;
	modifiedBy: string;
	modificationTime: string;
	deleted: boolean;

	// properties
	purchaseAgreementId: string;
	customerCode: string;
	items: ChangeOrderItem[];
	changeOrderNumber: number;
	date: string;
	subTotal: number;
	tax: number;
	taxType: string;
	total: number;
	taxBreakdown: AvalaraTaxResponse;
	status: string;
	// original agreement info
	buyerName: string;

	loadAgreement: (agreement: PurchaseAgreement) => void;
	loadChangeOrder: (changeOrder: ChangeOrder) => void;
	loadAgreementSalesOffice: (office: SalesOffice) => void;
	addChangeOrderItem: (items: ChangeOrderItem[], item: ChangeOrderItem) => void;
	setChangeOrderTaxAmount: (amount: number) => void;
	closeWindow: () => void;
}

function mapStateToProps(state: StoreState) {
	return {
		objectId: state.application.pathObjectId,
		edited: state.changeordereditor.edited,
		//jpa auditing
		id: state.changeordereditor.id,
		createdBy: state.changeordereditor.createdBy,
		creationTime: state.changeordereditor.creationTime,
		modifiedBy: state.changeordereditor.modifiedBy,
		modificationTime: state.changeordereditor.modificationTime,
		deleted: state.changeordereditor.deleted,

		// properties
		purchaseAgreementId: state.changeordereditor.purchaseAgreementId,
		customerCode: state.changeordereditor.customerCode,
		items: state.changeordereditor.items,
		changeOrderNumber: state.changeordereditor.changeOrderNumber,
		date: state.changeordereditor.date,
		subTotal: state.changeordereditor.subTotal,
		tax: state.changeordereditor.tax,
		taxType: state.changeordereditor.taxType,
		total: state.changeordereditor.total,
		taxBreakdown: state.changeordereditor.taxBreakdown,
		status: state.changeordereditor.status,
		buyerName: state.agreementeditor.buyer1
	}
}

interface ChangeOrderEditorState {
	changeType: string;
	changeCategory: string;
	changeName: string;
	changeAmount: string;

	originalPurchaseAgreement: PurchaseAgreement;

	capsLockEngaged: boolean;
	displaySignedChangeOrderModal: boolean;
	editorPage: number;
}

class ChangeOrderEditor extends React.Component<ChangeOrderEditorProps, ChangeOrderEditorState> {
	constructor(props: ChangeOrderEditorProps) {
		super(props);
		this.state = {
			changeType: "",
			changeCategory: "",
			changeName: "",
			changeAmount: "0",
			capsLockEngaged: false,
			originalPurchaseAgreement: new PurchaseAgreement(),
			displaySignedChangeOrderModal: false,
			editorPage: 0
		}

		this.addItem = this.addItem.bind(this);
		this.updateChangeName = this.updateChangeName.bind(this);
		this.updateChangeAmount = this.updateChangeAmount.bind(this);
		this.updateChangeType = this.updateChangeType.bind(this);
		this.selectChangeCategory = this.selectChangeCategory.bind(this);
		this.submit = this.submit.bind(this);
		this.unsubmit = this.unsubmit.bind(this);
		this.handleKeyStroke = this.handleKeyStroke.bind(this);
		this.capsLockCheck = this.capsLockCheck.bind(this);
		this.deleteThisChangeOrder = this.deleteThisChangeOrder.bind(this);
		this.loadOrder = this.loadOrder.bind(this);
		this.changePage = this.changePage.bind(this);

		this.openSignedChangeOrderModal = this.openSignedChangeOrderModal.bind(this);
		this.closeSignedChangeOrderModal = this.closeSignedChangeOrderModal.bind(this);
		this.updateCustomTaxAmount = this.updateCustomTaxAmount.bind(this);
		
	}

	componentDidMount() {
		this.loadOrder();
	}

	componentDidUpdate(prevProps: ChangeOrderEditorProps) {
		if(prevProps.objectId !== this.props.objectId) {
			this.loadOrder();
		} else if(prevProps.status !== this.props.status) {
			this.setState({ editorPage: 0 });
		}
	}


	private handleKeyStroke(event: any) {
		// Check for capslock since these users are an affront to human literacy
		if(event.getModifierState("CapsLock") && !this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: true });
		} else if(!event.getModifierState("CapsLock") && this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: false });
		}
	}

	private capsLockCheck(event: any) {
		// Check for capslock since these users are an affront to human literacy
		if(event.getModifierState("CapsLock") && !this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: true });
		} else if(!event.getModifierState("CapsLock") && this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: false });
		}
	}


	private loadOrder() {
		getChangeOrderById(this.props.objectId).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadChangeOrder(res.data.changeorder);
				this.props.loadAgreement(res.data.agreement);
				this.props.loadAgreementSalesOffice(res.data.salesoffice);
			} else {
				// idk do something here eventually
			}
		})
	}

	public addItem() {
		const { changeName, changeAmount, changeType, changeCategory } = this.state;
		if(changeCategory === "addendumAChange") {
			this.props.addChangeOrderItem(this.props.items, new ChangeOrderItem(changeName, parseFloat(changeAmount), changeCategory));
		} else {
			this.props.addChangeOrderItem(this.props.items, new ChangeOrderItem(changeName, parseFloat(changeAmount), changeType));
		}
		this.setState({ 
			changeAmount: "0",
			changeName: "",
			changeCategory: "",
			changeType: "",
		});
	}

	public updateChangeAmount(event: { target: { value: any}; }) {
		this.setState({changeAmount: event.target.value});
	}

	public updateChangeName(event: { target: { value: any}; }) {
		this.setState({changeName: event.target.value});
	}

	private updateChangeType(event: { target: { value: any}; }) {
		this.setState({ changeType: event.target.value, changeAmount: "0", changeName: "" });
	}

	private selectChangeCategory(event: { target: { value: any}; }) {
		this.setState({ changeCategory: event.target.value, changeType: "", changeAmount: "0", changeName: "" });
	}
	
	private submit() {
		console.log(this.props);
		submitChangeOrder(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadChangeOrder(res.data.object);
			}
		});
	}

	private unsubmit() {
		unsubmitChangeOrder(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadChangeOrder(res.data.object);
			}
		});
	}

	/** Delete Change Order * */
	private deleteThisChangeOrder() {
		deleteChangeOrder(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				// this.setState({ selectedChangeOrder: new ChangeOrder() });
				this.props.closeWindow();
			} else {
				console.log("Invalid response");
				// this.handleResponseErrors(res);
			}
		})
	}

	private updateCustomTaxAmount(event: { target: { value: string }; } ) {
		console.log(event.target.value);
		let discount = parseFloat(event.target.value);
		this.props.setChangeOrderTaxAmount(discount);
	}

	public openSignedChangeOrderModal() {
		this.setState({ displaySignedChangeOrderModal: true })
	}

	public closeSignedChangeOrderModal() {
		this.setState({ displaySignedChangeOrderModal: false})
	}

	/*private renderAvailableActions() {
		const { taxType, taxBreakdown, edited, status, isDocumentRevised } = this.props;
		let actions: any[] = [];
		
	}*/


	private renderSubmitButton() {
		const { taxType, taxBreakdown, edited, status, isDocumentRevised } = this.props;
		// do not render submit button if edited
		if(!edited) {
			// check for a valid tax state
			if(taxType === "CUSTOM" || taxType === "EXEMPT" || taxBreakdown.companyId !== -1) {
				// check if the agreement is in a valid state to be submitted
				if(status === IN_PROGRESS && !isDocumentRevised) {
					return <StandardButton onClick={this.submit}>Submit</StandardButton>
				} else {
					return <div></div>
				}
			} else {
				return(
					<div style={{ backgroundColor: 'rgb(231, 231, 231)', padding: 10,  margin: 5, borderBottom: '1px solid lightgrey', marginTop: 5, marginBottom: 5}}>
					In order to submit this change order, please calculate taxes, even if your subtotal is zero.
					</div>
				)
			}			
		} else {
			return<div></div>
		}
		
		
	}

	private changePage(_page: number) {
		this.setState({ editorPage: _page });
	}


	public render() {
		const { status, id, isDocumentRevised } = this.props;
		const { displaySignedChangeOrderModal, editorPage } = this.state;

		const { changeName, changeAmount, changeType, changeCategory } = this.state;
		let subTotal = calculateChangeOrderSubtotal(this.props.items);
		let total = calculateChangeOrderTotal(subTotal, this.props.tax);


		return(
			<>
				{
					displaySignedChangeOrderModal &&
					<Dialog
						open={displaySignedChangeOrderModal}
						onClose={this.closeSignedChangeOrderModal}
						aria-labelledby="form-dialog-title"
						maxWidth="md"            
						fullWidth={true}
					>
						<DialogTitle id="simple-dialog-title">Upload Signed Change Order</DialogTitle>
						<div style={{padding: 15}}>
							<ChangeOrderUpload
								changeOrderId={this.props.id}
								done={this.loadOrder}
							/>
						</div>
						<DialogActions style={{justifyContent: 'space-between'}}>
							<Button onClick={this.closeSignedChangeOrderModal} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
					
				}
				<div id="taskBar" style={{position: 'relative'}} >
					<Toolbar>
						<Typography variant="h6" style={{flex: 1}}>Change Order {this.props.changeOrderNumber} for {this.props.buyerName} - {new Date(this.props.creationTime).toLocaleDateString()}</Typography>
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
									{ checkIfDev() && <span>ID: {this.props.id}</span> }
									<span>Document Status</span>
								</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column'}}>
									<DocumentStatus status={status} />
									{this.renderSubmitButton()}
									{ status === SUBMITTED && !isDocumentRevised && checkIfAdmin() && <StandardButton onClick={this.unsubmit}>Unsubmit</StandardButton> }
									{
										status === SUBMITTED && !isDocumentRevised &&
										<StandardButton onClick={this.openSignedChangeOrderModal} style={{margin: 5}}>Upload Signed Change Order</StandardButton>
									}
								</div>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", marginBottom: 5}}>Available Actions</div>

								{
									this.props.isDocumentRevised ?
										<div style={{padding: 5}}>Document has been revised</div>
									:
										<div style={{display: 'flex', flexDirection: 'column'}}>
											<ChangeOrderSaveComponent />
											
											{
												checkIfAdmin() &&
												<DeletionComponent
													buttonString="Delete"
													objectId={id}
													deleteFunction={this.deleteThisChangeOrder}
												/>
											}
										</div>
								}
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Document Sections</div>
								<div className="buttonStandard" onClick={() => this.changePage(0)}>Editor</div>
								<div className="buttonStandard" onClick={() => this.changePage(1)}>Files</div>
								<div className="buttonStandard" onClick={() => this.changePage(2)}>Tax Summary</div>

							</div>
						</div>
					</Grid>
					{
						editorPage === 2 &&
						<Grid item xs={6}>
							<TaxSummaryPDF documentType="CO" objectId={this.props.objectId}/>
						</Grid>
					}
					{
						editorPage === 1 &&
						<DocumentFiles 
							documentId={this.props.objectId}
							documentType="CO"
							isDocumentRevised={this.props.isDocumentRevised}
							status={this.props.status}
						/>
					}
					{
						editorPage === 0 &&
						<>

						
							{
								status === IN_PROGRESS &&
							
								<Grid item xs={2}>
									<div style={{paddingTop: 15}}>
										<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Add Change</div>
										<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
											<select value={changeCategory} onChange={this.selectChangeCategory} style={{padding: 5, marginBottom: 10}}>
												<option value="">select change category</option>
												<option value="page1Change">Page 1 Invoice Change</option>
												<option value="addendumAChange">Addendum A Change</option>
												<option value="otherChange">Notes</option>
											</select>
											{
												changeCategory !== "" &&
												<>
													{
														changeCategory === "page1Change" &&
														<select value={changeType} onChange={this.updateChangeType} style={{padding: 5, marginBottom: 10}}>
															<option value="">select page 1 category</option>
															<option value="retailPrice">Retail Price</option>
															<option value="factoryDirectPrice">Factory Direct Price</option>
															<option value="featuredHomePromotionDiscount">Featured Home Promotion Discount</option>
															<option value="managerClearanceDiscount">Manager/Clearance Discount</option>
															<option value="preferredPaymentDiscount">Preferred Payment Discount</option>
															<option value="vipMultiUnitDiscount">VIP Multi Unit Discount</option>
															<option value="standardFreightCharge">Standard Freight Charge</option>
															<option value="factoryTrimOut">Factory Trim Out</option>
															<option value="purchaseOfAC">Purchase of AC</option>
															<option value="setupCharges">Setup Charges</option>
															<option value="extendedServiceContract">Extended Service Contract</option>
															<option value="documentFee">Document Fee</option>
															{/*}
															<option value="taxes">Taxes</option>
															<option value="downPayment">Down Payment</option>
															<option value="additionalPayment">Additional Payment</option>
															*/}
														</select>
													}
													{
														(changeCategory !== "page1Change" || changeType !== "") &&
														<>
															<textarea placeholder="Change description" rows={3} value={changeName} onChange={this.updateChangeName} style={{marginBottom: 10}} />
															{
																changeCategory !== "otherChange" &&
																<input placeholder="Change amount" value={changeAmount} onChange={this.updateChangeAmount} style={{marginBottom: 10}}/>
															}
															<Button variant="contained" color="primary" onClick={this.addItem}>Add to Change Order</Button>
														</>
													}
												</>
											}
										</div>
									</div>
								</Grid>
							}

							<Grid item xs={7}>
								<div style={{paddingTop: 15, paddingLeft: 15}}>
									<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Change Order</div>
									
									<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)", padding: 15}}>
										<div style={{display: 'flex'}}>
											<div style={{width: '15%', padding: 5, fontSize: '9pt'}}>Type</div>
											<div style={{width: '55%', padding: 5, fontSize: '9pt'}}>Details</div>
											<div style={{width: '15%', padding: 5, fontSize: '9pt'}}>Amount</div>
											<div style={{width: '15%', padding: 5, fontSize: '9pt'}}>Edit/Del</div>
										</div>
										
										{
											this.props.items.map((item, index) => (
												<ChangeOrderLineItem
													key={'changeOrderItem' + index}
													item={item}
													index={index}
													status={status}
												/>
											))
										}
										<div style={{display: 'flex'}}>
											<div style={{width: '70%', borderRight: '1px solid black', padding: 5, textAlign: 'right'}}>Sub Total</div>
											<div style={{width: '30%', padding: 5}}>{FormatNumberAsMoney(subTotal)}</div>
										</div>
										<div style={{display: 'flex', borderTop: '1px solid black'}}>
											<div style={{width: '70%', borderRight: '1px solid black', padding: 5}}>
												{
													status === IN_PROGRESS &&

													<div style={{display: 'flex'}}>
														<AvalaraRequestComponent orderType="SalesOrder" documentType="CO" />
														<TaxExemptButton documentType="CO" />
														<CustomTaxComponent documentType="CO" />
													</div>
												}
												{
													status === IN_PROGRESS && <span style={{fontSize: '10pt'}}>Note: calculate taxes, even if the subtotal is 0</span>
												}
											</div>
											<div style={{width: '30%', padding: 5}}>
												{
													this.props.taxType === "AVALARA" &&
													<span>{FormatNumberAsMoney(this.props.tax)}</span>

												}
												{ this.props.taxType === "EXEMPT" && "EXEMPT" }
												{
													this.props.taxType === "CUSTOM" &&
													<input 
														name="customTaxableAmount"
														type="number"
														step="0.01"
														placeholder="Enter custom tax amount"
														onChange={this.updateCustomTaxAmount}
														value={this.props.tax}
													/>
												}
												
											</div>
										</div>
										<div style={{display: 'flex', borderTop: '1px solid black'}}>
											<div style={{width: '70%', padding: 5, textAlign: 'right', borderRight: '1px solid black'}}>Total</div>
											<div style={{width: '30%', padding: 5}}>{FormatNumberAsMoney(total)}</div>
										</div>
									</div>
								</div>
							</Grid>
						</>
					}
				</Grid>
			</>
		)
	}
}

export default connect(mapStateToProps, { setChangeOrderTaxAmount, addChangeOrderItem, loadAgreement, loadAgreementSalesOffice, loadChangeOrder })(ChangeOrderEditor);