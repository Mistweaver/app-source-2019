
import { AddendumA } from './addendumA/AddendumA';
import { AvalaraTaxResponse } from '../avalaraobjects/AvalaraTaxResponse';
import { ApplianceSheet } from './appliancesheet/ApplianceSheet';
import { ColorSheet } from './colorselections/ColorSheet';
import { BasicEntity } from '../entity/BasicEntity';
import { IN_PROGRESS } from '../../data/staticdata';

/******
 * When adding/deleting a new field/property, this change must be reflected in the following files:
 * 		
 * 		/src/redux/Store.tsx
 * 		/src/redux/reducers/LoadAgreementIntoState.tsx
 * 		/src/redux/reducers/AgreementEditorInitialState.tsx
 * 		/src/redux/containers/purchaseagreementeditor/savecomponent/BuildPurchaseAgreementFromRedux.tsx
 * 		/src/redux/containers/purchaseagreementeditor/savecomponent/MapStateToSaveComponentProps.tsx
 * 		/src/redux/containers/purchaseagreementeditor/savecomponent/SaveComponentProps.tsx
 * 		
 * Change *may* also need to be made in
 * 		/src/redux/actions/AgreementEditorActions.tsx
 * 		/src/redux/types/AgreementEditorTypes.tsx
 * 		/src/redux/reducers/AgreementEditorReducer.tsx
 */
export class PurchaseAgreement extends BasicEntity {
	// identification
	leadId: string;
	crmLeadId: string;
	locationId: string;

	documentCode: string;
	customerCode: string;	// can edit

	// agreement state information
	// submitted: boolean;		
	// locked: boolean;
	// lenderPaid: boolean;
	taxExempt: boolean;
	// outOfState: boolean;
	status: string;

	// email key from client consultant
	salesPersonId: string;
	// form field on page 1
	salesPerson: string;

	monthFinalized: number;
	yearFinalized: number;

	// buyer details
	buyer1: string;					// can edit
	buyer2: string;					// can edit
	date: string;					
	contractRevisedFrom: string;
	contractRevisedFromDate: string;

	phone: string;					// can edit
	cell: string;					// can edit
	emailAddress: string;			// can edit
	emailAddress2: string;			// can edit

	mailingStreet: string;			// can edit
	mailingCity: string;			// can edit
	mailingState: string;			// can edit
	mailingZip: string;				// can edit
	mailingCountry: string;			// can edit

	deliveryStreet: string;			// can edit
	deliveryCity: string;			// can edit
	deliveryState: string;			// can edit
	deliveryZip: string;			// can edit
	deliveryCountry: string;		// can edit

	addressValid: boolean;

	modelSelectionDate: string;
	promotionSelectionHalf: string;
	make: string;					
	model: string;
	manufacturer: string;
	modelType: string;
	year: string;					// can edit
	bedrooms: string;				// can edit
	baths: string;					// can edit
	dens: string;					// can edit

	serialNumber: string;			// can edit
	newModel: boolean;				// can edit
	floorSize: string;				// can edit
	hitchSize: string;				// can edit
	approximateSquareFeet: number;	// can edit

	// purchase agreement details;

	retailPrice: number;			
    factoryDirectDiscountAmount: number;
	factoryDirectPrice: number;
	factoryTotalCost: number;
	
	numberOfUnits: number; 

    addendumAUpgrades: number;		

    featuredHomePromo: string;		// can edit
    featuredHomePromoAmount: number;// can edit

	managerOrClearanceDiscountSelection: string;	// can edit
    managerOrClearanceAmount: number;				// can edit

    preferredPaymentAmount: number;
    vipMultiUnitDiscountAmount: number;

    subTotal2: number;

    standardFreightChargeAmount: number;	// can edit

    factoryTrimOutAmount: number;			// can edit

    purchaseOfACAmount: number;				// can edit

	setupChargesAmount: number;				// can edit
	
	lotExpenseAmount: number;				// can edit

    openField1: string;						// can edit
    openField1Amount: number;				// can edit

    extendedServiceContractAmount: number;	// can edit

    documentOrHomePrepFee: string;			
    documentOrHomePrepFeeAmount: number;

    titleFee: string;						
    titleFeeAmount: number;

    subTotal3: number;

	taxesAmount: number;
	useCustomTaxableAmount: boolean;
	customTaxableAmount: number;

    disclaimer: string;

    total: number;
    downPayment: number;					// can edit
    additionalPaymentAsAgreed: number;		// can edit
    unpaidBalance: number;					

	noticeOfConstructionAndFinalPayment: string;
	noticeOfConstructionAndFinalPaymentText: string;
	noticeOfCompletion: string;
	balancePaidInFullDate: string;

	notes: string;

	// other form stuff 
	addendumA: AddendumA;					// can edit
	taxBreakdown: AvalaraTaxResponse;
	// appliance work sheet
	// color selections
	colorSelections: ColorSheet;			// can edit
	applianceSelections: ApplianceSheet;	// can edit
	// windzone
	windZone: number;						// can edit

	// Shipping Directions
    shippingContactName: string;			// can edit
    shippingContactDayPhone: string;		// can edit
    shippingContactEveningPhone: string;	// can edit
    shippingContactMobilePhone: string;		// can edit
	shippingDirections: string;				// can edit
	shippingDirectionsMapFileUri: string;	// can edit

	// Additional variables for Pennsylvania in-state taxes
	factoryInvoice: number;
	factoryFreight: number;

	
	constructor() {
		super();
		// identification
		this.leadId = "";
		this.crmLeadId = "";
		this.locationId = "";

		this.documentCode = "";
		this.customerCode = "ABC";
		
		// agreement state information
		this.taxExempt = false;
		this.status = IN_PROGRESS;
		this.salesPersonId = "";
		
		this.monthFinalized = -1;
		this.yearFinalized = -1;

		// buyer details
		this.buyer1 = "New Buyer";
		this.buyer2 = "";
		this.date = (new Date()).toLocaleDateString();
		this.contractRevisedFrom = "";
		this.contractRevisedFromDate = "";

		this.phone = "";
		this.cell = "";
		this.emailAddress = "";
		this.emailAddress2 = "";

		this.mailingStreet = "";
		this.mailingCity = "";
		this.mailingState = "";
		this.mailingZip = "";
		this.mailingCountry = "";

		this.deliveryStreet = "";
		this.deliveryCity = "";
		this.deliveryState = "";
		this.deliveryZip = "";
		this.deliveryCountry = "US";

		this.addressValid = false;

		this.salesPerson = "";
		
		this.modelSelectionDate = "";
		this.promotionSelectionHalf = "";
		this.make = "";
		this.model = "";
		this.year = "";
		this.bedrooms = "";
		this.baths = "";
		this.dens = "";

		this.serialNumber = "";
		this.newModel = true;
		this.floorSize = "";
		this.hitchSize = "";
		this.approximateSquareFeet = 0;

		// purchase agreement details;

		this.retailPrice = 0;
		this.factoryDirectDiscountAmount = 0;
		this.factoryDirectPrice = 0;
		this.factoryTotalCost = 0;

		this.numberOfUnits = 1;

		this.addendumAUpgrades = 0;

		this.featuredHomePromo = "";
		this.featuredHomePromoAmount = 0;

		this.managerOrClearanceDiscountSelection = "";
		this.managerOrClearanceAmount = 0;

		this.preferredPaymentAmount = 0;

		this.vipMultiUnitDiscountAmount = 0;

		this.subTotal2 = 0;

		this.standardFreightChargeAmount = 0;

		this.factoryTrimOutAmount = 0;

		this.purchaseOfACAmount = 0;

		this.setupChargesAmount = 0;

		this.lotExpenseAmount = 0;

		this.openField1 = "";
		this.openField1Amount = 0;

		this.extendedServiceContractAmount = 0;

		this.documentOrHomePrepFee = "";
		this.documentOrHomePrepFeeAmount = 395;

		this.titleFee = "";
		this.titleFeeAmount = 0;

		this.subTotal3 = 0;

		this.taxesAmount = 0;
		this.useCustomTaxableAmount = false;
		this.customTaxableAmount = 0;

		this.disclaimer = "";

		this.total = 0;
		this.downPayment = 0;
		this.additionalPaymentAsAgreed = 0;
		this.unpaidBalance = 0;

		this.noticeOfConstructionAndFinalPayment = "";
		this.noticeOfConstructionAndFinalPaymentText = "";
		this.noticeOfCompletion = "";
		this.balancePaidInFullDate = "";

		this.notes = "";

		// addendum A
		this.addendumA = new AddendumA();

		// tax breakdown
		this.taxBreakdown = new AvalaraTaxResponse();
	
		// color selections
		this.colorSelections = new ColorSheet();

		// appliance sheet
		this.applianceSelections = new ApplianceSheet();

		// wind zone
		this.windZone = 0;

		// Shipping Directions
		this.shippingContactName = "";
		this.shippingContactDayPhone = "";
		this.shippingContactEveningPhone = "";
		this.shippingContactMobilePhone = "";
		this.shippingDirections = "";
		this.shippingDirectionsMapFileUri = "";
	
		// Additional variables for Pennsylvania in-state taxes
		this.factoryInvoice = 0;
		this.factoryFreight = 0;
	}
}