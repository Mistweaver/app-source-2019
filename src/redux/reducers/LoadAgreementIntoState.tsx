import { PurchaseAgreement } from "../../objects/purchaseagreement/PurchaseAgreement";

export function loadAgreementIntoState(agreement: PurchaseAgreement) {
	// console.log("Loading agreement into state");
	// console.log(agreement);
	const state = {
		edited: false,

		id: agreement.id,
		leadId: agreement.leadId,
		crmLeadId: agreement.crmLeadId,
		locationId: agreement.locationId,
		customerCode: agreement.customerCode,
		documentCode: agreement.documentCode,

		//jpa auditing
		createdBy: agreement.createdBy,
		creationTime: agreement.creationTime,
		modifiedBy: agreement.modifiedBy,
		modificationTime: agreement.modificationTime,
		deleted: agreement.deleted,
		
		// agreement state information
		
		taxExempt: agreement.taxExempt,
		status: agreement.status,
		salesPersonId: agreement.salesPersonId,
		
		monthFinalized: agreement.monthFinalized,
		yearFinalized: agreement.yearFinalized,

		// buyer details
		buyer1: agreement.buyer1,
		buyer2: agreement.buyer2,
		date: agreement.date,
		contractRevisedFrom: agreement.contractRevisedFrom,
		contractRevisedFromDate: agreement.contractRevisedFromDate,

		phone: agreement.phone,
		cell: agreement.cell,
		emailAddress: agreement.emailAddress,
		emailAddress2: agreement.emailAddress2,

		mailingStreet: agreement.mailingStreet,
		mailingCity: agreement.mailingCity,
		mailingState: agreement.mailingState,
		mailingZip: agreement.mailingZip,
		mailingCountry: agreement.mailingCountry,

		deliveryStreet: agreement.deliveryStreet,
		deliveryCity: agreement.deliveryCity,
		deliveryState: agreement.deliveryState,
		deliveryZip: agreement.deliveryZip,
		deliveryCountry: agreement.deliveryCountry,

		salesPerson: agreement.salesPerson,
		modelSelectionDate: agreement.modelSelectionDate,
		promotionSelectionHalf: agreement.promotionSelectionHalf,
		make: agreement.make,
		model: agreement.model,
		modelType: agreement.modelType,
		manufacturer: agreement.manufacturer,
		year: agreement.year,
		bedrooms: agreement.bedrooms,
		baths: agreement.baths,
		dens: agreement.dens,

		serialNumber: agreement.serialNumber,
		newModel: agreement.newModel,
		floorSize: agreement.floorSize,
		hitchSize: agreement.hitchSize,
		approximateSquareFeet: agreement.approximateSquareFeet,

		// purchase agreement details,

		retailPrice: agreement.retailPrice,
		factoryDirectPrice: agreement.factoryDirectPrice,
		factoryTotalCost: agreement.factoryTotalCost,
		numberOfUnits: agreement.numberOfUnits,
		
		addendumAUpgrades: agreement.addendumAUpgrades,

		featuredHomePromo: agreement.featuredHomePromo,
		featuredHomePromoAmount: agreement.featuredHomePromoAmount,

		managerOrClearanceDiscountSelection: agreement.managerOrClearanceDiscountSelection,
		managerOrClearanceAmount: agreement.managerOrClearanceAmount,

		preferredPaymentAmount: agreement.preferredPaymentAmount,

		vipMultiUnitDiscountAmount: agreement.vipMultiUnitDiscountAmount,

		subTotal2: agreement.subTotal2,

		standardFreightChargeAmount: agreement.standardFreightChargeAmount,

		factoryTrimOutAmount: agreement.factoryTrimOutAmount,

		purchaseOfACAmount: agreement.purchaseOfACAmount,

		setupChargesAmount: agreement.setupChargesAmount,

		lotExpenseAmount: agreement.lotExpenseAmount,

		openField1: agreement.openField1,
		openField1Amount: agreement.openField1Amount,

		extendedServiceContractAmount: agreement.extendedServiceContractAmount,

		documentOrHomePrepFee: agreement.documentOrHomePrepFee,
		documentOrHomePrepFeeAmount: agreement.documentOrHomePrepFeeAmount,

		titleFee: agreement.titleFee,
		titleFeeAmount: agreement.titleFeeAmount,

		subTotal3: agreement.subTotal3,

		taxesAmount: agreement.taxesAmount,
		useCustomTaxableAmount: agreement.useCustomTaxableAmount,
		customTaxableAmount: agreement.customTaxableAmount,

		disclaimer: agreement.disclaimer,

		total: agreement.total,
		downPayment: agreement.downPayment,
		additionalPaymentAsAgreed: agreement.additionalPaymentAsAgreed,
		unpaidBalance: agreement.unpaidBalance,

		noticeOfConstructionAndFinalPayment: agreement.noticeOfConstructionAndFinalPayment,
		noticeOfConstructionAndFinalPaymentText: agreement.noticeOfConstructionAndFinalPaymentText,
		noticeOfCompletion: agreement.noticeOfCompletion,
		balancePaidInFullDate: agreement.balancePaidInFullDate,

		notes: agreement.notes,

		// tax breakdown
		taxBreakdown: agreement.taxBreakdown,

		// wind zone
		windZone: agreement.windZone,

		// Shipping Directions
		shippingContactName: agreement.shippingContactName,
		shippingContactDayPhone: agreement.shippingContactDayPhone,
		shippingContactEveningPhone: agreement.shippingContactEveningPhone,
		shippingContactMobilePhone: agreement.shippingContactMobilePhone,
		shippingDirections: agreement.shippingDirections,
		shippingDirectionsMapFileUri: agreement.shippingDirectionsMapFileUri,

		// Additional variables for Pennsylvania in-state taxes
		factoryInvoice: agreement.factoryInvoice,
		factoryFreight: agreement.factoryFreight,

		// break down Addendum A here
		addendumAItems: agreement.addendumA.items,
		addendumANotes: agreement.addendumA.notes,
		addendumATotal: agreement.addendumA.total,

		// appliance list
		applianceList: {},
		
		
		// color selections
		interiorType: agreement.colorSelections.interiorType,
		interiorColorUniform: agreement.colorSelections.interiorColorUniform,
		interiorColor: agreement.colorSelections.interiorColor,
		interiorKitchenColor: agreement.colorSelections.interiorKitchenColor,
		interiorBreakfastColor: agreement.colorSelections.interiorBreakfastColor,
		interiorDiningColor: agreement.colorSelections.interiorDiningColor,
		interiorUtilityColor: agreement.colorSelections.interiorUtilityColor,
		interiorLivingRoomColor: agreement.colorSelections.interiorLivingRoomColor,
		interiorFamilyRoomColor: agreement.colorSelections.interiorFamilyRoomColor,
		interiorHallColor: agreement.colorSelections.interiorHallColor,
		interiorDenColor: agreement.colorSelections.interiorDenColor,
		interiorClosetColor: agreement.colorSelections.interiorClosetColor,
		interiorMasterBedroomColor: agreement.colorSelections.interiorMasterBedroomColor,
		interior2ndBedroomColor: agreement.colorSelections.interior2ndBedroomColor,
		interior3rdBedroomColor: agreement.colorSelections.interior3rdBedroomColor,
		interior4thBedroomColor: agreement.colorSelections.interior4thBedroomColor,
		interior5thBedroomColor: agreement.colorSelections.interior5thBedroomColor,
		interiorMasterBathColor: agreement.colorSelections.interiorMasterBathColor,
		interiorGuestBathColor: agreement.colorSelections.interiorGuestBathColor,
		interior3rdBathColor: agreement.colorSelections.interior3rdBathColor,
		accentWallColor: agreement.colorSelections.accentWallColor,
		accentWallLocation: agreement.colorSelections.accentWallLocation,
		trayOrCofferColor: agreement.colorSelections.trayOrCofferColor,
		interiorTrimColor: agreement.colorSelections.interiorTrimColor,
		interiorDoorColor: agreement.colorSelections.interiorDoorColor,
		wainscotColor: agreement.colorSelections.wainscotColor,
		kitchenSinkType: agreement.colorSelections.kitchenSinkType,
		kitchenSinkColor: agreement.colorSelections.kitchenSinkColor,
		counterKitchenColor: agreement.colorSelections.counterKitchenColor,
		counterMasterBathColor: agreement.colorSelections.counterMasterBathColor,
		counterGuestBathColor: agreement.colorSelections.counterGuestBathColor,
		counter3rdBathColor: agreement.colorSelections.counter3rdBathColor,
		counterUtilityRoomColor: agreement.colorSelections.counterUtilityRoomColor,
		ceramicKitchenColor: agreement.colorSelections.ceramicKitchenColor,
		ceramicMasterBathColor: agreement.colorSelections.ceramicMasterBathColor,
		ceramicGuestBathColor: agreement.colorSelections.ceramicGuestBathColor,
		ceramic3rdBathColor: agreement.colorSelections.ceramic3rdBathColor,
		ceramicUtilityRoomColor: agreement.colorSelections.ceramicUtilityRoomColor,
		ceramicEdgeKitchenColor: agreement.colorSelections.ceramicEdgeKitchenColor,
		ceramicEdgeMasterBathColor: agreement.colorSelections.ceramicEdgeMasterBathColor,
		ceramicEdgeGuestBathColor: agreement.colorSelections.ceramicEdgeGuestBathColor,
		ceramicEdge3rdBathColor: agreement.colorSelections.ceramicEdge3rdBathColor,
		ceramicEdgeUtilityRoomColor: agreement.colorSelections.ceramicEdgeUtilityRoomColor,
		mosaicInsertKitchenColor: agreement.colorSelections.mosaicInsertKitchenColor,
		mosaicInsertMasterBathColor: agreement.colorSelections.mosaicInsertMasterBathColor,
		mosaicInsertGuestBathColor: agreement.colorSelections.mosaicInsertGuestBathColor,
		mosaicInsert3rdBathColor: agreement.colorSelections.mosaicInsert3rdBathColor,
		mosaicInsertUtilityRoomColor: agreement.colorSelections.mosaicInsertUtilityRoomColor,
		cabinetType: agreement.colorSelections.cabinetType,
		cabinetStyle: agreement.colorSelections.cabinetStyle,
		cabinetColorKitchenColor: agreement.colorSelections.cabinetColorKitchenColor,
		cabinetColorMasterBathColor: agreement.colorSelections.cabinetColorMasterBathColor,
		cabinetColorGuestBathColor: agreement.colorSelections.cabinetColorGuestBathColor,
		cabinetColor3rdBathColor: agreement.colorSelections.cabinetColor3rdBathColor,
		cabinetColorUtilityRoomColor: agreement.colorSelections.cabinetColorUtilityRoomColor,
		cabinetHardware: agreement.colorSelections.cabinetHardware,
		cabinetHardwareColor: agreement.colorSelections.cabinetHardwareColor,
		carpetType: agreement.colorSelections.carpetType,
		carpetColor: agreement.colorSelections.carpetColor,
		linoleumType: agreement.colorSelections.linoleumType,
		linoleumColor: agreement.colorSelections.linoleumColor,
		woodLaminateType: agreement.colorSelections.woodLaminateType,
		woodLaminateColor: agreement.colorSelections.woodLaminateColor,
		ceramicTileType: agreement.colorSelections.ceramicTileType,
		ceramicTileColor: agreement.colorSelections.ceramicTileColor,
		decor: agreement.colorSelections.decor,
		exteriorBody: agreement.colorSelections.exteriorBody,
		exteriorBodyColor: agreement.colorSelections.exteriorBodyColor,
		exteriorShingles: agreement.colorSelections.exteriorShingles,
		exteriorShinglesColor: agreement.colorSelections.exteriorShinglesColor,
		exteriorTrim: agreement.colorSelections.exteriorTrim,
		exteriorFasciaSoffit: agreement.colorSelections.exteriorFasciaSoffit,
		exteriorAccent: agreement.colorSelections.exteriorAccent,
		exteriorShutters: agreement.colorSelections.exteriorShutters,
		exteriorRoofLoad: agreement.colorSelections.exteriorRoofLoad,
		colorSheetNotes: agreement.colorSelections.notes,
	}
	/**
	 * This if statement checks if the applianceList exists.  When the purchase agreement is created on the server,
	 * it initializes the applianceSelection as an empty JSON object
	 *
	 */
	if(agreement.applianceSelections.applianceList !== undefined) {	
		state.applianceList = agreement.applianceSelections.applianceList
	}

	
	
	return state;

}