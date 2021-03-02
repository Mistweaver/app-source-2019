import React from 'react';
import { Grid, Dialog, Slide } from '@material-ui/core';
import { AvalaraItem } from '../../../objects/avalaraobjects/AvalaraItem';
import { AvalaraCompanyLocation } from '../../../objects/avalaraobjects/AvalaraCompanyLocation';
import { AvalaraTaxRequest } from '../../../objects/avalaraobjects/AvalaraTaxRequest';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import AvalaraRequestComponent from './AvalaraRequestComponent';
import { loadAgreement, loadAgreementSalesOffice, updateGenericInformation } from '../../actions/AgreementEditorActions';
import { loadChangeOrder } from '../../actions/ChangeOrderActions';
import { PurchaseAgreement } from '../../../objects/purchaseagreement/PurchaseAgreement';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import TaxExemptButton from './TaxExemptButton';
import CustomTaxComponent from './CustomTaxComponent';
import { getPurchaseAgreementData } from '../../../services/PurchaseAgreementService';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { getChangeOrderById } from '../../../services/ChangeOrderServices';
import { ChangeOrder } from '../../../objects/changeorders/ChangeOrder';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import PurchaseAgreementEditor from '../purchaseagreementeditor/PurchaseAgreementEditor';
import ChangeOrderEditor from '../changeordereditor/ChangeOrderEditor';
import { CLOSED } from '../../../data/staticdata';
import { generateRetrieveSummaryDocument } from './GenerateRetrieveSummaryDocument';
import { CustomTaxes } from './CustomTaxes';
import { createNewCustomTaxes, getCustomTaxesByDocumentIdAndDocumentType, updateCustomTaxes } from '../../../services/CustomTaxesServices';
import { connect } from 'react-redux';
import store, { StoreState } from '../../Store';
import { UPDATE_PATH_OBJECT_ID } from '../../types/ApplicationTypes';

interface TaxPageProps {
	objectId: string;
	documentType: string;

	loadAgreement: (agreement: PurchaseAgreement) => void;
 	loadAgreementSalesOffice: (office: SalesOffice) => void;
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
	//@ts-ignore
	return <Slide direction="up" ref={ref} {...props} />;
});

function mapStateToProps(state: StoreState) {
	return {}
}

interface TaxPageState {
	item: AvalaraItem;
	amount: number;
	companyLocations: AvalaraCompanyLocation[];
	taxRequest: AvalaraTaxRequest;
	taxResponse: AvalaraTaxResponse;
	// requestType: string;
	addressIncomplete: boolean;
	loading: boolean;
	isEditorDrawerOpen: boolean;
	status: string;
	fileData: any;

	agreement: PurchaseAgreement;
	office: SalesOffice;
	changeOrder: ChangeOrder;
	customTaxes: CustomTaxes;

	objectId: string;
	documentType: string;

}


class TaxPage extends React.Component<TaxPageProps, TaxPageState> {
	constructor(props: TaxPageProps) {
		super(props);
		this.state = {
			item: new AvalaraItem(),
			amount: 0,
			companyLocations: [],
			//companyItems: [],
			taxRequest: new AvalaraTaxRequest(),
			taxResponse: new AvalaraTaxResponse(),
			// requestType: "SalesOrder",
			addressIncomplete: true,
			loading: false,
			isEditorDrawerOpen: false,
			status: "",
			fileData: "",
			agreement: new PurchaseAgreement(),
			office: new SalesOffice(),
			changeOrder: new ChangeOrder(),
			customTaxes: new CustomTaxes(),
			objectId: this.props.objectId,
			documentType: this.props.documentType,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleDocumentCodeChange = this.handleDocumentCodeChange.bind(this);
		this.handleCustomerCodeChange = this.handleCustomerCodeChange.bind(this);
		this.handleInvoiceAmountChange = this.handleInvoiceAmountChange.bind(this);
		this.handleFactoryFreightAmountChange = this.handleFactoryFreightAmountChange.bind(this);
		this.handleOptionsAtCostAmountChange = this.handleOptionsAtCostAmountChange.bind(this);
		this.handleAllOtherFeesAmountChange = this.handleAllOtherFeesAmountChange.bind(this);
		this.handleStateTaxRateChange = this.handleStateTaxRateChange.bind(this);
		this.handleCountyTaxRateChange = this.handleCountyTaxRateChange.bind(this);
		this.openEditorDrawer = this.openEditorDrawer.bind(this);
		this.closeEditorDrawer = this.closeEditorDrawer.bind(this);
		this.saveCustomTaxes = this.saveCustomTaxes.bind(this);
	}

	componentDidMount() {
		this.loadDocument();
	}


	private loadDocument() {
		//console.log("Loading documents for taxes");
		//console.log("object ID: " + this.props.objectId);
		//console.log("doc type: " + this.props.documentType);
		this.setState({ loading: true });
		//console.log(this.props.documentType);
		if(this.props.documentType === "PA") {
			//console.log("Loading purchase agreement...");
			getPurchaseAgreementData(this.props.objectId).then(res => {
				if(validateHTMLResponse(res)) {
					this.setState({ loading: false });
					console.log("res.data.agreement:");
					console.log(res.data.agreement);
					// load purchase agreement into Redux agreementeditor
					store.dispatch({ type: UPDATE_PATH_OBJECT_ID, payload: {path: "/accounting", objectId: this.props.objectId}});
					this.props.loadAgreement(res.data.agreement);
					this.props.loadAgreementSalesOffice(res.data.office);
					this.setState({agreement: res.data.agreement});
					this.setState({office: res.data.office});

					this.setState({ loading: true });
					getCustomTaxesByDocumentIdAndDocumentType(this.props.documentType, this.props.objectId).then(res => {
						if(validateHTMLResponse(res)) {
							//console.log(res);
							this.setState({ loading: false });
							if(res.data.customTaxes[0] === undefined) {								
								let customTaxes = this.state.customTaxes;
								customTaxes.documentId = this.props.objectId;
								customTaxes.documentType = this.props.documentType;
								this.setState({ customTaxes: customTaxes});
							} else {
								let customTaxes = res.data.customTaxes[0];
								this.setState({ customTaxes: customTaxes});
							}
						}
					});
				}
			});
		} else if(this.props.documentType === "CO") {
			//console.log("Loading change order...");
			getChangeOrderById(this.props.objectId).then(res => {
				if(validateHTMLResponse(res)) {
					this.setState({ loading: false });
					//console.log(res.data);
					this.setState({changeOrder: res.data.changeorder});
					this.setState({agreement: res.data.agreement});
					//this.setState({office: res.data.office});
				} 
			});
		} else {
			// unknown document type
			console.log("ERROR: unknown document type!");
		}

		this.generateDownloadPdfDocument();
			
	}

	componentDidUpdate(prevProps: TaxPageProps) {
		if(prevProps !== this.props) {
			// this.checkAddress();
			//console.log(this.props.documentType);
		}
	}


	public handleChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		console.log("event: " + name + ":" + value);

	}

	public handleDocumentCodeChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		console.log("event: " + name + ":" + value);
		let agreement = this.state.agreement;
		agreement.documentCode = value;
		this.setState({agreement: agreement});
	}

	public handleCustomerCodeChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		console.log("event: " + name + ":" + value);
		let agreement = this.state.agreement;
		agreement.customerCode = value;
		this.setState({agreement: agreement});
	}

	public handleInvoiceAmountChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;

		let customTaxes = this.state.customTaxes;
		customTaxes.factoryInvoiceAmount = parseFloat(value);
		this.setState({ customTaxes: customTaxes });
	}

	public handleFactoryFreightAmountChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;

		let customTaxes = this.state.customTaxes;
		customTaxes.factoryFreightAmount = parseFloat(value);
		this.setState({ customTaxes: customTaxes });
	}

	public handleOptionsAtCostAmountChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;

		let customTaxes = this.state.customTaxes;
		customTaxes.optionsAtCostAmount = parseFloat(value);
		this.setState({ customTaxes: customTaxes });
	}

	public handleAllOtherFeesAmountChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;

		let customTaxes = this.state.customTaxes;
		customTaxes.allOtherFeesAmount = parseFloat(value);
		this.setState({ customTaxes: customTaxes });
	}

	public handleStateTaxRateChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;

		let customTaxes = this.state.customTaxes;
		customTaxes.stateTaxRate = parseFloat(value);
		this.setState({ customTaxes: customTaxes });
	}

	public handleCountyTaxRateChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;

		let customTaxes = this.state.customTaxes;
		customTaxes.countyTaxRate = parseFloat(value);
		this.setState({ customTaxes: customTaxes });
	}
	
	private saveCustomTaxes() {

		if(this.state.customTaxes.id === "") {
			/*
			 * Create the CustomTaxes object in the database.
			 */
			createNewCustomTaxes(this.state.customTaxes).then(res => {
				//console.log(res);
				this.loadDocument();
			});
		} else {
			/*
			 * Update the CustomTaxes object in the database.
			 */
			//console.log("Updating custom tax object: " + this.state.customTaxes.id);
			updateCustomTaxes(this.state.customTaxes).then(res => {
				//console.log(res);
				this.loadDocument();
			});
		}

	}

	private openEditorDrawer() {
		this.setState({ isEditorDrawerOpen: true });
	}

	private closeEditorDrawer() {
		// this.loadLead();
		this.setState({ isEditorDrawerOpen: false });
	}


	generateDownloadPdfDocument() {
		
		generateRetrieveSummaryDocument(this.props.documentType, this.props.objectId).then(res => {
				
			if(validateHTMLResponse(res)) {
				var blob = new Blob([res.data], {type:"application/pdf"});
				
				const image = new Image();
				image.src = URL.createObjectURL(blob);
				this.setState({ fileData: image.src});
				
			} else {
				console.log(res.status);
				var html = `
				<style>
					body { 
						background: gray; 
						color: light-gray;
						text-align: center;
					}
				</style>
				<h1> ERROR: ` + res.status + ` 
				<h2>Agreement: ` + this.props.objectId +`,  Cannot be displayed!</h>`;
	
				blob = new Blob([html], {type: 'text/html'});

				const image = new Image();
				image.src = URL.createObjectURL(blob);
				this.setState({ fileData: image.src});
			}

		});
	}
	


	public render() {
		const { office, status, fileData } = this.state;
		const { customerCode, documentCode, buyer1, deliveryState, deliveryCity, deliveryStreet, deliveryZip, crmLeadId } = this.state.agreement;
		const { factoryInvoiceAmount, factoryFreightAmount, optionsAtCostAmount, allOtherFeesAmount, stateTaxRate, countyTaxRate } = this.state.customTaxes;

		return(
			<>
				<Grid container spacing={2}>
					<Grid item xs={2}>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Document Information</div>
					
						<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)", padding: 10}}>
							<span>{buyer1}</span>
							<span>{deliveryStreet + ", " + deliveryCity + ", " + deliveryState + ", " + deliveryZip }</span>
							<span>CCID: {crmLeadId}</span>
							<button className="buttonMinimal" onClick={this.openEditorDrawer}>View Original Document</button>
						</div>

						{
							status !== CLOSED ?
							<>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Available Actions</div>
								<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<AvalaraRequestComponent orderType="SalesOrder" documentType={this.props.documentType}/>
									<TaxExemptButton documentType={this.props.documentType} />
									<CustomTaxComponent documentType={this.props.documentType} />
								</div>
								<div style={{padding: 10, marginTop: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Prepare Sales Invoice</div>
								<div style={{display: 'flex', padding: 10, flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<p style={{margin: 0}}>Document Code</p>
									<input name="documentCode" value={documentCode} onChange={this.handleDocumentCodeChange} />
									<p style={{marginBottom: 0}}>Customer Code</p>
									<input name="customerCode" value={customerCode} onChange={this.handleCustomerCodeChange} style={{marginBottom: 5}} />
									<AvalaraRequestComponent orderType="SalesInvoice" documentType={this.props.documentType}/>

								</div>
							</>
							:
							<>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Document is Closed </div>
								<div style={{display: 'flex', padding: 10, flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<p style={{margin: 0}}>Document Code: </p>
									<p style={{marginBottom: 0}}>Customer Code: </p>
								</div>
							</>
						}
						
						{
							(office.officeState === 'PA' && deliveryState === 'PA') && 
							<>
								<div style={{padding: 10, marginTop: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Pennsylvania In-State Values</div>
								<div style={{display: 'flex', padding: 10, flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<p style={{margin: 0}}>Invoice Amount</p>
									<input name="factoryInvoiceAmount"  value={factoryInvoiceAmount} onChange={this.handleInvoiceAmountChange} />
									<p style={{marginBottom: 0}}>Freight</p>
									<input name="factoryFreightAmount"  value={factoryFreightAmount} onChange={this.handleFactoryFreightAmountChange} style={{marginBottom: 5}} />
									<button className="buttonMinimal" onClick={this.saveCustomTaxes} >Save</button>
								</div>
							</>
							
						}

						{
							(deliveryState === 'OH') && 
							<>
								<div style={{padding: 10, marginTop: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Ohio Tax Values</div>
								<div style={{display: 'flex', padding: 10, flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<p style={{margin: 0}}>Invoice Amount</p>
									<input name="factoryInvoiceAmount"  value={factoryInvoiceAmount} onChange={this.handleInvoiceAmountChange} style={{marginBottom: 5}}/>
									{/* <p style={{margin: 0}}>Freight</p>
									<input name="factoryFreightAmount"  value={factoryFreightAmount} onChange={this.handleFactoryFreightAmountChange} style={{marginBottom: 5}} /> */}
									<p style={{margin: 0}}>Options @ Cost</p>
									<input name="optionsAtCostAmount"  value={optionsAtCostAmount} onChange={this.handleOptionsAtCostAmountChange} style={{marginBottom: 5}} />
									<p style={{margin: 0}}>All Other Fees</p>
									<input name="allOtherFeesAmount"  value={allOtherFeesAmount} onChange={this.handleAllOtherFeesAmountChange} style={{marginBottom: 5}} />
									<p style={{margin: 0}}>State Tax Rate</p>
									<input name="stateTaxRate"  value={stateTaxRate} onChange={this.handleStateTaxRateChange} style={{marginBottom: 5}} />
									<p style={{margin: 0}}>County Tax Rate</p>
									<input name="countyTaxRate"  value={countyTaxRate} onChange={this.handleCountyTaxRateChange} style={{marginBottom: 5}} />
									<button className="buttonMinimal" onClick={this.saveCustomTaxes}>Save</button>
								</div>
							</>
							
						}

					</Grid>
					{/*
					<Grid item xs={2}>
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Request History</div>
						<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						</div>
					</Grid>*/}
					<Grid item xs={6}>
						{/* <TaxSummary  documentType={this.props.documentType}/> */}
						<iframe src={fileData} title="pdfDoc" style={{width: '100%', height: 750, overflow: 'auto'}} frameBorder="0"></iframe>
					</Grid>
				</Grid>

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
						this.props.documentType === "PA" &&
						<PurchaseAgreementEditor
							closeWindow={this.closeEditorDrawer}
							isDocumentRevised={false}
						/>
					}
					{
						this.props.documentType === "CO" &&
						<ChangeOrderEditor
							closeWindow={this.closeEditorDrawer}
							isDocumentRevised={false}
						/>
					}
				</Dialog>
			</>
		)
	}
}

export default connect(mapStateToProps, { loadAgreement, loadAgreementSalesOffice, updateGenericInformation, loadChangeOrder })(TaxPage);
//export default TaxPage;