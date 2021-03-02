import { AvalaraTaxResponse } from "../../objects/avalaraobjects/AvalaraTaxResponse";
import { SalesOffice } from "../../objects/salesoffice/SalesOffice";

export const INITIAL_AGREEMENT_EDITOR_STATE = {
	// agreement state information
	submitted: false,
	locked: false,
	edited: false,

	// identification
	id: "",
	leadId: "",
	crmLeadId: "",
	locationId: "",
	
	customerCode: "",
	documentCode: "",
	
	//jpa auditing
	createdBy: "",
	creationTime:  "",
	modifiedBy:  "",
	modificationTime:  "",
	deleted: false,

	status: "",
	salesPersonId: "",
	salesPerson: "",

	// monthFinalized: 0,
	// yearFinalized: 0,

	date: "",
	contractRevisedFrom: "",
	contractRevisedFromDate: "",

	// buyer details
	buyer1: "",
	buyer2: "",
	phone: "",
	cell: "",
	emailAddress: "",
	emailAddress2: "",

	mailingStreet: "",
	mailingCity: "",
	mailingState: "",
	mailingZip: "",
	mailingCountry: "",

	year: "",
	dens: "",
	serialNumber: "",
	newModel: false,

	notes: "",

	// windzone
	windZone: 0,

	// Shipping Directions
	shippingContactName: "",
	shippingContactDayPhone: "",
	shippingContactEveningPhone: "",
	shippingContactMobilePhone: "",
	shippingDirections: "",
	shippingDirectionsMapFileUri: "",

	/*****Agreement cost and tax variables.  Anything calculated of importance that influences other agreement variables goes here **** */
	deliveryStreet: "",
	deliveryCity: "",
	deliveryState: "",
	deliveryZip: "",
	deliveryCountry: "US",
	addressValid: false,
	
	// make and model info
	modelSelectionDate: "",
	promotionSelectionHalf: "",
	make: "",
	model: "",
	manufacturer: "",
	modelType: "",
	bedrooms: "",
	baths: "",
	floorSize: "",
	hitchSize: "",
	approximateSquareFeet: 0,

	// invoice variables
	retailPrice: 0,
	factoryDirectDiscountAmount: 0,
	factoryDirectPrice: 0,
	factoryTotalCost: 0,
	numberOfUnits: 1,
	addendumAUpgrades: 0,
	featuredHomePromo: "",
	featuredHomePromoAmount: 0,
	managerOrClearanceDiscountSelection: "",
	managerOrClearanceAmount: 0,

	preferredPaymentAmount: 0,
	vipMultiUnitDiscountAmount: 0,
	subTotal2: 0,
	standardFreightChargeAmount: 0,
	factoryTrimOutAmount: 0,
	purchaseOfACAmount: 0,
	setupChargesAmount: 0,
	lotExpenseAmount: 0,

	openField1: "",
	openField1Amount: 0,
	extendedServiceContractAmount: 0,
	documentOrHomePrepFee: "",
	documentOrHomePrepFeeAmount: 0,
	titleFee: "",
	titleFeeAmount: 0,
	subTotal3: 0,
	taxesAmount: 0,
	useCustomTaxableAmount: false,
	customTaxableAmount: 0,
	disclaimer: "",
	total: 0,
	downPayment: 0,
	additionalPaymentAsAgreed: 0,
	unpaidBalance: 0,
	balancePaidInFullDate: "",

	// notice of construction & final payment
	noticeOfConstructionAndFinalPayment: "",
	noticeOfConstructionAndFinalPaymentText: "",
	noticeOfCompletion: "",

	// other
	taxBreakdown: new AvalaraTaxResponse(),
	lenderPaid: false,
	taxExempt: false,
	outOfState: false,

	// Accounting variables for Pennsylvania in-state taxes
	factoryInvoice: 0,
	factoryFreight: 0,

	// break down Addendum A here
	addendumAItems: [],
	addendumANotes: "",
	addendumATotal: 0,
	
	// appliances
	applianceList: [],

	// color selections
	interiorType: "",
	interiorColorUniform: true,
	interiorColor: "",

	interiorKitchenColor: "",
	interiorBreakfastColor: "",
	interiorDiningColor: "",
	interiorUtilityColor: "",
	interiorLivingRoomColor: "",
	interiorFamilyRoomColor: "",
	interiorHallColor: "",
	interiorDenColor: "",
	interiorClosetColor: "",
	interiorMasterBedroomColor: "",
	interior2ndBedroomColor: "",
	interior3rdBedroomColor: "",
	interior4thBedroomColor: "",
	interior5thBedroomColor: "",
	interiorMasterBathColor: "",
	interiorGuestBathColor: "",
	interior3rdBathColor: "",

	accentWallColor: "",
	accentWallLocation: "",
	trayOrCofferColor: "",
	interiorTrimColor: "",
	interiorDoorColor: "",
	wainscotColor: "",
	kitchenSinkType: "",
	kitchenSinkColor: "",
	counterKitchenColor: "",
	counterMasterBathColor: "",
	counterGuestBathColor: "",
	counter3rdBathColor: "",
	counterUtilityRoomColor: "",

	ceramicKitchenColor: "",
	ceramicMasterBathColor: "",
	ceramicGuestBathColor: "",
	ceramic3rdBathColor: "",
	ceramicUtilityRoomColor: "",

	ceramicEdgeKitchenColor: "",
	ceramicEdgeMasterBathColor: "",
	ceramicEdgeGuestBathColor: "",
	ceramicEdge3rdBathColor: "",
	ceramicEdgeUtilityRoomColor: "",

	mosaicInsertKitchenColor: "",
	mosaicInsertMasterBathColor: "",
	mosaicInsertGuestBathColor: "",
	mosaicInsert3rdBathColor: "",
	mosaicInsertUtilityRoomColor: "",

	cabinetType: "",
	cabinetStyle: "",

	cabinetColorKitchenColor: "",
	cabinetColorMasterBathColor: "",
	cabinetColorGuestBathColor: "",
	cabinetColor3rdBathColor: "",
	cabinetColorUtilityRoomColor: "",

	cabinetHardware: "",
	cabinetHardwareColor: "",

	carpetType: "",
	carpetColor: "",
	linoleumType: "",
	linoleumColor: "",
	woodLaminateType: "",
	woodLaminateColor: "",
	ceramicTileType: "",
	ceramicTileColor: "",

	decor: "",

	exteriorBody: "",
	exteriorBodyColor: "",

	exteriorShingles: "",
	exteriorShinglesColor: "",

	exteriorTrim: "",
	exteriorFasciaSoffit: "",
	exteriorAccent: "",
	exteriorShutters: "",
	colorSheetNotes: "",
	exteriorRoofLoad: "",

	// sales office
	office: new SalesOffice()
}