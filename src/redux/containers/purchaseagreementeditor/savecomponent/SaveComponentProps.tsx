import { AvalaraTaxResponse } from "../../../../objects/avalaraobjects/AvalaraTaxResponse";

import { AddendumAItem } from "../../../../objects/purchaseagreement/addendumA/AddendumAItem";
import { ApplianceSheetItem } from "../../../../objects/purchaseagreement/appliancesheet/ApplianceSheetItem";

import { PurchaseAgreement } from "../../../../objects/purchaseagreement/PurchaseAgreement";
import { SalesOffice } from "../../../../objects/salesoffice/SalesOffice";

export interface SaveComponentProps {
	// redux functions
	loadAgreement: (agreement: PurchaseAgreement) => void;
	loadAgreementSalesOffice: (office: SalesOffice) => void;

	// agreement state information
	edited: boolean;

	// identification
	id: string;
	leadId: string;
	crmLeadId: string;
	locationId: string;

	customerCode: string;
	documentCode: string;

	//jpa auditing
	createdBy: string;
	creationTime: string;
	modifiedBy: string;
	modificationTime: string;
	deleted: boolean;
	
	status: string;
	salesPersonId: string;
	salesPerson: string;

	// monthFinalized: number;
	// yearFinalized: number;

	date: string;
	contractRevisedFrom: string;
	contractRevisedFromDate: string;

	// buyer details
	buyer1: string;
	buyer2: string;
	phone: string;
	cell: string;
	emailAddress: string;
	emailAddress2: string;

	mailingStreet: string;
	mailingCity: string;
	mailingState: string;
	mailingZip: string;
	mailingCountry: string;

	year: string;
	dens: string;
	serialNumber: string;
	newModel: boolean;

	notes: string;

	// windzone
	windZone: number;

	// Shipping Directions
	shippingContactName: string;
	shippingContactDayPhone: string;
	shippingContactEveningPhone: string;
	shippingContactMobilePhone: string;
	shippingDirections: string;
	shippingDirectionsMapFileUri: string;




	/*****Agreement cost and tax variables.  Anything calculated of importance that influences other agreement variables goes here **** */
	deliveryStreet: string;
	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	deliveryCountry: string;
	addressValid: boolean;
	
	// make and model info
	modelSelectionDate: string;
	promotionSelectionHalf: string;
	make: string;
	model: string;
	manufacturer: string;
	modelType: string;
	bedrooms: string;
	baths: string;
	floorSize: string;
	hitchSize: string;
	approximateSquareFeet: number;

	// invoice variables
	retailPrice: number;
	factoryDirectPrice: number;
	factoryTotalCost: number;
	numberOfUnits: number;
	featuredHomePromo: string;
	featuredHomePromoAmount: number;
	managerOrClearanceDiscountSelection: string;
	managerOrClearanceAmount: number;

	preferredPaymentAmount: number;
	vipMultiUnitDiscountAmount: number;
	standardFreightChargeAmount: number;
	factoryTrimOutAmount: number;
	purchaseOfACAmount: number;
	setupChargesAmount: number;
	lotExpenseAmount: number;

	openField1: string;
	openField1Amount: number;
	extendedServiceContractAmount: number;
	documentOrHomePrepFee: string;
	documentOrHomePrepFeeAmount: number;
	titleFee: string;
	titleFeeAmount: number;
	// subTotal3: number;
	taxesAmount: number;
	useCustomTaxableAmount: boolean;
	customTaxableAmount: number;
	disclaimer: string;
	// total: number;
	downPayment: number;
	additionalPaymentAsAgreed: number;
	// unpaidBalance: number;
	balancePaidInFullDate: string;

	// notice of construction & final payment
	noticeOfConstructionAndFinalPayment: string;
	noticeOfConstructionAndFinalPaymentText: string;
	noticeOfCompletion: string;

	// other
	taxBreakdown: AvalaraTaxResponse;
	lenderPaid: boolean;
	taxExempt: boolean;
	outOfState: boolean;

	// Accounting variables for Pennsylvania in-state taxes
	factoryInvoice: number;
	factoryFreight: number;

	// break down Addendum A here
	addendumAItems: AddendumAItem[];
	addendumANotes: string;
	// addendumATotal: number;

	// appliance work sheet
	applianceList: ApplianceSheetItem[];

	// color selections
	interiorType: string;
	interiorColorUniform: boolean;
	interiorColor: string;
	interiorKitchenColor: string;
	interiorBreakfastColor: string;
	interiorDiningColor: string;
	interiorUtilityColor: string;
	interiorLivingRoomColor: string;
	interiorFamilyRoomColor: string;
	interiorHallColor: string;
	interiorDenColor: string;
	interiorClosetColor: string;
	interiorMasterBedroomColor: string;
	interior2ndBedroomColor: string;
	interior3rdBedroomColor: string;
	interior4thBedroomColor: string;
	interior5thBedroomColor: string;
	interiorMasterBathColor: string;
	interiorGuestBathColor: string;
	interior3rdBathColor: string;
	accentWallColor: string;
	accentWallLocation: string;
	trayOrCofferColor: string;
	interiorTrimColor: string;
	interiorDoorColor: string;
	wainscotColor: string;
	kitchenSinkType: string;
	counterKitchenColor: string;
	counterMasterBathColor: string;
	counterGuestBathColor: string;
	counter3rdBathColor: string;
	counterUtilityRoomColor: string;
	ceramicKitchenColor: string;
	ceramicMasterBathColor: string;
	ceramicGuestBathColor: string;
	ceramic3rdBathColor: string;
	ceramicUtilityRoomColor: string;
	ceramicEdgeKitchenColor: string;
	ceramicEdgeMasterBathColor: string;
	ceramicEdgeGuestBathColor: string;
	ceramicEdge3rdBathColor: string;
	ceramicEdgeUtilityRoomColor: string;
	mosaicInsertKitchenColor: string;
	mosaicInsertMasterBathColor: string;
	mosaicInsertGuestBathColor: string;
	mosaicInsert3rdBathColor: string;
	mosaicInsertUtilityRoomColor: string;
	cabinetType: string;
	cabinetStyle: string;
	cabinetColorKitchenColor: string;
	cabinetColorMasterBathColor: string;
	cabinetColorGuestBathColor: string;
	cabinetColor3rdBathColor: string;
	cabinetColorUtilityRoomColor: string;
	cabinetHardware: string;
	cabinetHardwareColor: string;
	carpetType: string;
	carpetColor: string;
	linoleumType: string;
	linoleumColor: string;
	woodLaminateType: string;
	woodLaminateColor: string;
	ceramicTileType: string;
	ceramicTileColor: string;
	decor: string;
	exteriorBody: string;
	exteriorBodyColor: string;
	exteriorShingles: string;
	exteriorShinglesColor: string;
	exteriorTrim: string;
	exteriorFasciaSoffit: string;
	exteriorAccent: string;
	exteriorShutters: string;
	exteriorRoofLoad: string;
	colorSheetNotes: string;

	// sales office information
	office: SalesOffice;
}