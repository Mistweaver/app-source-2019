import store from '../../../Store';
import { PurchaseAgreement } from '../../../../objects/purchaseagreement/PurchaseAgreement';
import { AddendumA } from '../../../../objects/purchaseagreement/addendumA/AddendumA';
import { ColorSheet } from '../../../../objects/purchaseagreement/colorselections/ColorSheet';
import { calculateInvoiceValues } from '../../../../utilities/InvoiceFunctions';

export function buildAgreementFromRedux() {
	const state = store.getState();
	let purchaseAgreement = new PurchaseAgreement();
	let addendumA = new AddendumA();
	let colorSheet = new ColorSheet();

	let invoice = calculateInvoiceValues();

	// identification
	purchaseAgreement.id = state.agreementeditor.id;
	purchaseAgreement.leadId = state.agreementeditor.leadId;
	purchaseAgreement.crmLeadId = state.agreementeditor.crmLeadId;
	purchaseAgreement.locationId = state.agreementeditor.locationId;

	purchaseAgreement.customerCode = state.agreementeditor.customerCode;
	purchaseAgreement.documentCode = state.agreementeditor.documentCode;

	//jpa auditing
	purchaseAgreement.createdBy = state.agreementeditor.createdBy;
	purchaseAgreement.creationTime = state.agreementeditor.creationTime;
	// purchaseAgreement.modifiedBy = state.agreementeditor.modifiedBy;
	// purchaseAgreement.modificationTime = state.agreementeditor.modificationTime;
	purchaseAgreement.deleted = state.agreementeditor.deleted;
	
	purchaseAgreement.status = state.agreementeditor.status;
	purchaseAgreement.salesPersonId = state.agreementeditor.salesPersonId;
	purchaseAgreement.salesPerson = state.agreementeditor.salesPerson;

	// monthFinalized = number;
	// yearFinalized = number;

	purchaseAgreement.date = state.agreementeditor.date;
	purchaseAgreement.contractRevisedFrom = state.agreementeditor.contractRevisedFrom;
	purchaseAgreement.contractRevisedFromDate = state.agreementeditor.contractRevisedFromDate;

	// buyer details
	purchaseAgreement.buyer1 = state.agreementeditor.buyer1;
	purchaseAgreement.buyer2 = state.agreementeditor.buyer2;
	purchaseAgreement.phone = state.agreementeditor.phone;
	purchaseAgreement.cell = state.agreementeditor.cell;
	purchaseAgreement.emailAddress = state.agreementeditor.emailAddress;
	purchaseAgreement.emailAddress2 = state.agreementeditor.emailAddress2;

	purchaseAgreement.mailingStreet = state.agreementeditor.mailingStreet;
	purchaseAgreement.mailingCity = state.agreementeditor.mailingCity;
	purchaseAgreement.mailingState = state.agreementeditor.mailingState;
	purchaseAgreement.mailingZip = state.agreementeditor.mailingZip;
	purchaseAgreement.mailingCountry = state.agreementeditor.mailingCountry;

	purchaseAgreement.year = state.agreementeditor.year;
	purchaseAgreement.dens = state.agreementeditor.dens;
	purchaseAgreement.serialNumber = state.agreementeditor.serialNumber;
	purchaseAgreement.newModel = state.agreementeditor.newModel;

	purchaseAgreement.notes = state.agreementeditor.notes;

	// windzone
	purchaseAgreement.windZone = state.agreementeditor.windZone;

	// Shipping Directions
	purchaseAgreement.shippingContactName = state.agreementeditor.shippingContactName;
	purchaseAgreement.shippingContactDayPhone = state.agreementeditor.shippingContactDayPhone;
	purchaseAgreement.shippingContactEveningPhone = state.agreementeditor.shippingContactEveningPhone;
	purchaseAgreement.shippingContactMobilePhone = state.agreementeditor.shippingContactMobilePhone;
	purchaseAgreement.shippingDirections = state.agreementeditor.shippingDirections;
	purchaseAgreement.shippingDirectionsMapFileUri = state.agreementeditor.shippingDirectionsMapFileUri;




	/*****Agreement cost and tax variables.  Anything calculated of importance that influences other agreement variables goes here **** */
	purchaseAgreement.deliveryStreet = state.agreementeditor.deliveryStreet;
	purchaseAgreement.deliveryCity = state.agreementeditor.deliveryCity;
	purchaseAgreement.deliveryState = state.agreementeditor.deliveryState;
	purchaseAgreement.deliveryZip = state.agreementeditor.deliveryZip;
	purchaseAgreement.deliveryCountry = state.agreementeditor.deliveryCountry;
	purchaseAgreement.addressValid = state.agreementeditor.addressValid;
	
	// make and model info
	purchaseAgreement.modelSelectionDate = state.agreementeditor.modelSelectionDate;
	purchaseAgreement.promotionSelectionHalf = state.agreementeditor.promotionSelectionHalf;
	purchaseAgreement.make = state.agreementeditor.make;
	purchaseAgreement.model = state.agreementeditor.model;
	purchaseAgreement.manufacturer = state.agreementeditor.manufacturer;
	purchaseAgreement.modelType = state.agreementeditor.modelType;
	purchaseAgreement.bedrooms = state.agreementeditor.bedrooms;
	purchaseAgreement.baths = state.agreementeditor.baths;
	purchaseAgreement.floorSize = state.agreementeditor.floorSize;
	purchaseAgreement.hitchSize = state.agreementeditor.hitchSize;
	purchaseAgreement.approximateSquareFeet = state.agreementeditor.approximateSquareFeet;

	// invoice variables
	purchaseAgreement.retailPrice = state.agreementeditor.retailPrice;
	purchaseAgreement.factoryDirectDiscountAmount = invoice.discountAmount;
	purchaseAgreement.factoryDirectPrice = state.agreementeditor.factoryDirectPrice;
	purchaseAgreement.factoryTotalCost = state.agreementeditor.factoryTotalCost;
	
	purchaseAgreement.numberOfUnits = state.agreementeditor.numberOfUnits;
	purchaseAgreement.addendumAUpgrades = invoice.addendumATotal;
	purchaseAgreement.featuredHomePromo = state.agreementeditor.featuredHomePromo;
	purchaseAgreement.featuredHomePromoAmount = state.agreementeditor.featuredHomePromoAmount;
	purchaseAgreement.managerOrClearanceDiscountSelection = state.agreementeditor.managerOrClearanceDiscountSelection;
	purchaseAgreement.managerOrClearanceAmount = state.agreementeditor.managerOrClearanceAmount;

	purchaseAgreement.preferredPaymentAmount = state.agreementeditor.preferredPaymentAmount;
	purchaseAgreement.vipMultiUnitDiscountAmount = state.agreementeditor.vipMultiUnitDiscountAmount;
	purchaseAgreement.subTotal2 = invoice.subTotal2;
	purchaseAgreement.standardFreightChargeAmount = state.agreementeditor.standardFreightChargeAmount;
	purchaseAgreement.factoryTrimOutAmount = state.agreementeditor.factoryTrimOutAmount;
	purchaseAgreement.purchaseOfACAmount = state.agreementeditor.purchaseOfACAmount;
	purchaseAgreement.setupChargesAmount = state.agreementeditor.setupChargesAmount;
	purchaseAgreement.lotExpenseAmount = state.agreementeditor.lotExpenseAmount;

	purchaseAgreement.openField1 = state.agreementeditor.openField1;
	purchaseAgreement.openField1Amount = state.agreementeditor.openField1Amount;
	purchaseAgreement.extendedServiceContractAmount = state.agreementeditor.extendedServiceContractAmount;
	purchaseAgreement.documentOrHomePrepFee = state.agreementeditor.documentOrHomePrepFee;
	purchaseAgreement.documentOrHomePrepFeeAmount = state.agreementeditor.documentOrHomePrepFeeAmount;
	purchaseAgreement.titleFee = state.agreementeditor.titleFee;
	purchaseAgreement.titleFeeAmount = state.agreementeditor.titleFeeAmount;
	// purchaseAgreement.subTotal3 = state.agreementeditor.subTotal3;
	purchaseAgreement.taxesAmount = state.agreementeditor.taxesAmount;
	purchaseAgreement.useCustomTaxableAmount = state.agreementeditor.useCustomTaxableAmount;
	purchaseAgreement.customTaxableAmount = state.agreementeditor.customTaxableAmount;
	purchaseAgreement.disclaimer = state.agreementeditor.disclaimer;
	purchaseAgreement.total = invoice.total;
	purchaseAgreement.downPayment = state.agreementeditor.downPayment;
	purchaseAgreement.additionalPaymentAsAgreed = state.agreementeditor.additionalPaymentAsAgreed;
	purchaseAgreement.unpaidBalance = invoice.unpaidBalance;
	purchaseAgreement.balancePaidInFullDate = state.agreementeditor.balancePaidInFullDate;

	// Accounting variables for Pennsylvania in-state taxes
	purchaseAgreement.factoryInvoice = state.agreementeditor.factoryInvoice;
	purchaseAgreement.factoryFreight = state.agreementeditor.factoryFreight;

	// notice of construction & final payment
	purchaseAgreement.noticeOfConstructionAndFinalPayment = state.agreementeditor.noticeOfConstructionAndFinalPayment;
	purchaseAgreement.noticeOfConstructionAndFinalPaymentText = state.agreementeditor.noticeOfConstructionAndFinalPaymentText;
	purchaseAgreement.noticeOfCompletion = state.agreementeditor.noticeOfCompletion;

	// other
	purchaseAgreement.taxBreakdown = state.agreementeditor.taxBreakdown;
	purchaseAgreement.taxExempt = state.agreementeditor.taxExempt;

	// break down Addendum A here
	addendumA.items  = state.agreementeditor.addendumAItems;
	addendumA.notes = state.agreementeditor.addendumANotes;
	addendumA.total = invoice.addendumATotal;
	purchaseAgreement.addendumA = addendumA;


	// appliance work sheet
	// only add the ones to the appliance list that exist
	// applianceSheet.applianceList = state.agreementeditor.applianceList;
	/// let applianceList: ApplianceSheetItem[] = [];

	/*keyLabels.forEach(keyLabel => {
		//@ts-ignore
		// if(props[keyLabel.key] !== "" && props[keyLabel.key] !== "No") {
		if(store.getState().agreementeditor[keyLabel.key] !== "" && props[keyLabel.key] !== "No") {
			let newItem = new ApplianceSheetItem();
			newItem.itemName = keyLabel.label
			//@ts-ignore
			// newItem.itemValue = props[keyLabel.key];
			newItem.itemValue = store.getState().agreementeditor[keyLabel.key];
			applianceList.push(newItem);
		}
	});*/

	purchaseAgreement.applianceSelections.applianceList = state.agreementeditor.applianceList;

	// color selections
	colorSheet.interiorType = state.agreementeditor.interiorType;
	colorSheet.interiorColorUniform = state.agreementeditor.interiorColorUniform;
	colorSheet.interiorColor = state.agreementeditor.interiorColor;
	colorSheet.interiorKitchenColor = state.agreementeditor.interiorKitchenColor;
	colorSheet.interiorBreakfastColor = state.agreementeditor.interiorBreakfastColor;
	colorSheet.interiorDiningColor = state.agreementeditor.interiorDiningColor;
	colorSheet.interiorUtilityColor = state.agreementeditor.interiorUtilityColor;
	colorSheet.interiorLivingRoomColor = state.agreementeditor.interiorLivingRoomColor;
	colorSheet.interiorFamilyRoomColor = state.agreementeditor.interiorFamilyRoomColor;
	colorSheet.interiorHallColor = state.agreementeditor.interiorHallColor;
	colorSheet.interiorDenColor = state.agreementeditor.interiorDenColor;
	colorSheet.interiorClosetColor = state.agreementeditor.interiorClosetColor;
	colorSheet.interiorMasterBedroomColor = state.agreementeditor.interiorMasterBedroomColor;
	colorSheet.interior2ndBedroomColor = state.agreementeditor.interior2ndBedroomColor;
	colorSheet.interior3rdBedroomColor = state.agreementeditor.interior3rdBedroomColor;
	colorSheet.interior4thBedroomColor = state.agreementeditor.interior4thBedroomColor;
	colorSheet.interior5thBedroomColor = state.agreementeditor.interior5thBedroomColor;
	colorSheet.interiorMasterBathColor = state.agreementeditor.interiorMasterBathColor;
	colorSheet.interiorGuestBathColor = state.agreementeditor.interiorGuestBathColor;
	colorSheet.interior3rdBathColor = state.agreementeditor.interior3rdBathColor;
	colorSheet.accentWallColor = state.agreementeditor.accentWallColor;
	colorSheet.accentWallLocation = state.agreementeditor.accentWallLocation;
	colorSheet.trayOrCofferColor = state.agreementeditor.trayOrCofferColor;
	colorSheet.interiorTrimColor = state.agreementeditor.interiorTrimColor;
	colorSheet.interiorDoorColor = state.agreementeditor.interiorDoorColor;
	colorSheet.wainscotColor = state.agreementeditor.wainscotColor;
	colorSheet.kitchenSinkType = state.agreementeditor.kitchenSinkType;
	colorSheet.counterKitchenColor = state.agreementeditor.counterKitchenColor;
	colorSheet.counterMasterBathColor = state.agreementeditor.counterMasterBathColor;
	colorSheet.counterGuestBathColor = state.agreementeditor.counterGuestBathColor;
	colorSheet.counter3rdBathColor = state.agreementeditor.counter3rdBathColor;
	colorSheet.counterUtilityRoomColor = state.agreementeditor.counterUtilityRoomColor;
	colorSheet.ceramicKitchenColor = state.agreementeditor.ceramicKitchenColor;
	colorSheet.ceramicMasterBathColor = state.agreementeditor.ceramicMasterBathColor;
	colorSheet.ceramicGuestBathColor = state.agreementeditor.ceramicGuestBathColor;
	colorSheet.ceramic3rdBathColor = state.agreementeditor.ceramic3rdBathColor;
	colorSheet.ceramicUtilityRoomColor = state.agreementeditor.ceramicUtilityRoomColor;
	colorSheet.ceramicEdgeKitchenColor = state.agreementeditor.ceramicEdgeKitchenColor;
	colorSheet.ceramicEdgeMasterBathColor = state.agreementeditor.ceramicEdgeMasterBathColor;
	colorSheet.ceramicEdgeGuestBathColor = state.agreementeditor.ceramicEdgeGuestBathColor;
	colorSheet.ceramicEdge3rdBathColor = state.agreementeditor.ceramicEdge3rdBathColor;
	colorSheet.ceramicEdgeUtilityRoomColor = state.agreementeditor.ceramicEdgeUtilityRoomColor;
	colorSheet.mosaicInsertKitchenColor = state.agreementeditor.mosaicInsertKitchenColor;
	colorSheet.mosaicInsertMasterBathColor = state.agreementeditor.mosaicInsertMasterBathColor;
	colorSheet.mosaicInsertGuestBathColor = state.agreementeditor.mosaicInsertGuestBathColor;
	colorSheet.mosaicInsert3rdBathColor = state.agreementeditor.mosaicInsert3rdBathColor;
	colorSheet.mosaicInsertUtilityRoomColor = state.agreementeditor.mosaicInsertUtilityRoomColor;
	colorSheet.cabinetType = state.agreementeditor.cabinetType;
	colorSheet.cabinetStyle = state.agreementeditor.cabinetStyle;
	colorSheet.cabinetColorKitchenColor = state.agreementeditor.cabinetColorKitchenColor;
	colorSheet.cabinetColorMasterBathColor = state.agreementeditor.cabinetColorMasterBathColor;
	colorSheet.cabinetColorGuestBathColor = state.agreementeditor.cabinetColorGuestBathColor;
	colorSheet.cabinetColor3rdBathColor = state.agreementeditor.cabinetColor3rdBathColor;
	colorSheet.cabinetColorUtilityRoomColor = state.agreementeditor.cabinetColorUtilityRoomColor;
	colorSheet.cabinetHardware = state.agreementeditor.cabinetHardware;
	colorSheet.cabinetHardwareColor = state.agreementeditor.cabinetHardwareColor;
	colorSheet.carpetType = state.agreementeditor.carpetType;
	colorSheet.carpetColor = state.agreementeditor.carpetColor;
	colorSheet.linoleumType = state.agreementeditor.linoleumType;
	colorSheet.linoleumColor = state.agreementeditor.linoleumColor;
	colorSheet.woodLaminateType = state.agreementeditor.woodLaminateType;
	colorSheet.woodLaminateColor = state.agreementeditor.woodLaminateColor;
	colorSheet.ceramicTileType = state.agreementeditor.ceramicTileType;
	colorSheet.ceramicTileColor = state.agreementeditor.ceramicTileColor;
	colorSheet.decor = state.agreementeditor.decor;
	colorSheet.exteriorBody = state.agreementeditor.exteriorBody;
	colorSheet.exteriorBodyColor = state.agreementeditor.exteriorBodyColor;
	colorSheet.exteriorShingles = state.agreementeditor.exteriorShingles;
	colorSheet.exteriorShinglesColor = state.agreementeditor.exteriorShinglesColor;
	colorSheet.exteriorTrim = state.agreementeditor.exteriorTrim;
	colorSheet.exteriorFasciaSoffit = state.agreementeditor.exteriorFasciaSoffit;
	colorSheet.exteriorAccent = state.agreementeditor.exteriorAccent;
	colorSheet.exteriorShutters = state.agreementeditor.exteriorShutters;
	colorSheet.exteriorRoofLoad = state.agreementeditor.exteriorRoofLoad;
	colorSheet.notes = state.agreementeditor.colorSheetNotes;

	purchaseAgreement.colorSelections = colorSheet;

	return purchaseAgreement;
}