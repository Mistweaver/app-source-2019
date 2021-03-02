import { StoreState } from "../../../Store";

export function mapStateToSaveComponentProps(state: StoreState) {
	return {
		edited: state.agreementeditor.edited,

		// identification
		id: state.agreementeditor.id,
		leadId: state.agreementeditor.leadId,
		crmLeadId: state.agreementeditor.crmLeadId,
		locationId: state.agreementeditor.locationId,

		customerCode: state.agreementeditor.customerCode,
		documentCode: state.agreementeditor.documentCode,

		//jpa auditing
		createdBy: state.agreementeditor.createdBy,
		creationTime: state.agreementeditor.creationTime,
		modifiedBy: state.agreementeditor.modifiedBy,
		modificationTime: state.agreementeditor.modificationTime,
		deleted: state.agreementeditor.deleted,
		
		status: state.agreementeditor.status,
		salesPersonId: state.agreementeditor.salesPersonId,
		salesPerson: state.agreementeditor.salesPerson,

		// monthFinalized: number;
		// yearFinalized: number;

		date: state.agreementeditor.date,
		contractRevisedFrom: state.agreementeditor.contractRevisedFrom,
		contractRevisedFromDate: state.agreementeditor.contractRevisedFromDate,

		// buyer details
		buyer1: state.agreementeditor.buyer1,
		buyer2: state.agreementeditor.buyer2,
		phone: state.agreementeditor.phone,
		cell: state.agreementeditor.cell,
		emailAddress: state.agreementeditor.emailAddress,
		emailAddress2: state.agreementeditor.emailAddress2,

		mailingStreet: state.agreementeditor.mailingStreet,
		mailingCity: state.agreementeditor.mailingCity,
		mailingState: state.agreementeditor.mailingState,
		mailingZip: state.agreementeditor.mailingZip,
		mailingCountry: state.agreementeditor.mailingCountry,

		year: state.agreementeditor.year,
		dens: state.agreementeditor.dens,
		serialNumber: state.agreementeditor.serialNumber,
		newModel: state.agreementeditor.newModel,

		notes: state.agreementeditor.notes,

		// windzone
		windZone: state.agreementeditor.windZone,

		// Shipping Directions
		shippingContactName: state.agreementeditor.shippingContactName,
		shippingContactDayPhone: state.agreementeditor.shippingContactDayPhone,
		shippingContactEveningPhone: state.agreementeditor.shippingContactEveningPhone,
		shippingContactMobilePhone: state.agreementeditor.shippingContactMobilePhone,
		shippingDirections: state.agreementeditor.shippingDirections,
		shippingDirectionsMapFileUri: state.agreementeditor.shippingDirectionsMapFileUri,




		/*****Agreement cost and tax variables.  Anything calculated of importance that influences other agreement variables goes here **** */
		deliveryStreet: state.agreementeditor.deliveryStreet,
		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryState: state.agreementeditor.deliveryState,
		deliveryZip: state.agreementeditor.deliveryZip,
		deliveryCountry: state.agreementeditor.deliveryCountry,
		addressValid: state.agreementeditor.addressValid,

		// make and model info
		modelSelectionDate: state.agreementeditor.modelSelectionDate,
		promotionSelectionHalf: state.agreementeditor.promotionSelectionHalf,
		make: state.agreementeditor.make,
		model: state.agreementeditor.model,
		manufacturer: state.agreementeditor.manufacturer,
		modelType: state.agreementeditor.modelType,
		bedrooms: state.agreementeditor.bedrooms,
		baths: state.agreementeditor.baths,
		floorSize: state.agreementeditor.floorSize,
		hitchSize: state.agreementeditor.hitchSize,
		approximateSquareFeet: state.agreementeditor.approximateSquareFeet,

		// invoice variables
		retailPrice: state.agreementeditor.retailPrice,
		factoryDirectPrice: state.agreementeditor.factoryDirectPrice,
		factoryDirectDiscountAmount: state.agreementeditor.factoryDirectPrice - state.agreementeditor.retailPrice,
		
		factoryTotalCost: state.agreementeditor.factoryTotalCost,
		
		numberOfUnits: state.agreementeditor.numberOfUnits,

		featuredHomePromo: state.agreementeditor.featuredHomePromo,
		featuredHomePromoAmount: state.agreementeditor.featuredHomePromoAmount,
		managerOrClearanceDiscountSelection: state.agreementeditor.managerOrClearanceDiscountSelection,
		managerOrClearanceAmount: state.agreementeditor.managerOrClearanceAmount,

		preferredPaymentAmount: state.agreementeditor.preferredPaymentAmount,
		vipMultiUnitDiscountAmount: state.agreementeditor.vipMultiUnitDiscountAmount,
		// subTotal2: state.agreementeditor.subTotal2,
		standardFreightChargeAmount: state.agreementeditor.standardFreightChargeAmount,
		factoryTrimOutAmount: state.agreementeditor.factoryTrimOutAmount,
		purchaseOfACAmount: state.agreementeditor.purchaseOfACAmount,
		setupChargesAmount: state.agreementeditor.setupChargesAmount,
		lotExpenseAmount: state.agreementeditor.lotExpenseAmount,

		openField1: state.agreementeditor.openField1,
		openField1Amount: state.agreementeditor.openField1Amount,
		extendedServiceContractAmount: state.agreementeditor.extendedServiceContractAmount,
		documentOrHomePrepFee: state.agreementeditor.documentOrHomePrepFee,
		documentOrHomePrepFeeAmount: state.agreementeditor.documentOrHomePrepFeeAmount,
		titleFee: state.agreementeditor.titleFee,
		titleFeeAmount: state.agreementeditor.titleFeeAmount,
		// subTotal3: state.agreementeditor.subTotal3,
		taxesAmount: state.agreementeditor.taxesAmount,
		useCustomTaxableAmount: state.agreementeditor.useCustomTaxableAmount,
		customTaxableAmount: state.agreementeditor.customTaxableAmount,
		disclaimer: state.agreementeditor.disclaimer,
		// total: state.agreementeditor.total,
		downPayment: state.agreementeditor.downPayment,
		additionalPaymentAsAgreed: state.agreementeditor.additionalPaymentAsAgreed,
		// unpaidBalance: state.agreementeditor.unpaidBalance,
		balancePaidInFullDate: state.agreementeditor.balancePaidInFullDate,

		// notice of construction & final payment
		noticeOfConstructionAndFinalPayment: state.agreementeditor.noticeOfConstructionAndFinalPayment,
		noticeOfConstructionAndFinalPaymentText: state.agreementeditor.noticeOfConstructionAndFinalPaymentText,
		noticeOfCompletion: state.agreementeditor.noticeOfCompletion,

		// other
		taxBreakdown: state.agreementeditor.taxBreakdown,
		lenderPaid: state.agreementeditor.lenderPaid,
		taxExempt: state.agreementeditor.taxExempt,
		outOfState: state.agreementeditor.outOfState,

		// Accounting variables for Pennsylvania in-state taxes
		factoryInvoice: state.agreementeditor.factoryInvoice,
		factoryFreight: state.agreementeditor.factoryFreight,

		// break down Addendum A here
		addendumAItems: state.agreementeditor.addendumAItems,
		addendumANotes: state.agreementeditor.addendumANotes,
		// addendumATotal: state.agreementeditor.addendumATotal,

		// appliance work sheet
		applianceList: state.agreementeditor.applianceList,


		// color selections
		interiorType: state.agreementeditor.interiorType,
		interiorColorUniform: state.agreementeditor.interiorColorUniform,
		interiorColor: state.agreementeditor.interiorColor,
		interiorKitchenColor: state.agreementeditor.interiorKitchenColor,
		interiorBreakfastColor: state.agreementeditor.interiorBreakfastColor,
		interiorDiningColor: state.agreementeditor.interiorDiningColor,
		interiorUtilityColor: state.agreementeditor.interiorUtilityColor,
		interiorLivingRoomColor: state.agreementeditor.interiorLivingRoomColor,
		interiorFamilyRoomColor: state.agreementeditor.interiorFamilyRoomColor,
		interiorHallColor: state.agreementeditor.interiorHallColor,
		interiorDenColor: state.agreementeditor.interiorDenColor,
		interiorClosetColor: state.agreementeditor.interiorClosetColor,
		interiorMasterBedroomColor: state.agreementeditor.interiorMasterBedroomColor,
		interior2ndBedroomColor: state.agreementeditor.interior2ndBedroomColor,
		interior3rdBedroomColor: state.agreementeditor.interior3rdBedroomColor,
		interior4thBedroomColor: state.agreementeditor.interior4thBedroomColor,
		interior5thBedroomColor: state.agreementeditor.interior5thBedroomColor,
		interiorMasterBathColor: state.agreementeditor.interiorMasterBathColor,
		interiorGuestBathColor: state.agreementeditor.interiorGuestBathColor,
		interior3rdBathColor: state.agreementeditor.interior3rdBathColor,
		accentWallColor: state.agreementeditor.accentWallColor,
		accentWallLocation: state.agreementeditor.accentWallLocation,
		trayOrCofferColor: state.agreementeditor.trayOrCofferColor,
		interiorTrimColor: state.agreementeditor.interiorTrimColor,
		interiorDoorColor: state.agreementeditor.interiorDoorColor,
		wainscotColor: state.agreementeditor.wainscotColor,
		kitchenSinkType: state.agreementeditor.kitchenSinkType,
		counterKitchenColor: state.agreementeditor.counterKitchenColor,
		counterMasterBathColor: state.agreementeditor.counterMasterBathColor,
		counterGuestBathColor: state.agreementeditor.counterGuestBathColor,
		counter3rdBathColor: state.agreementeditor.counter3rdBathColor,
		counterUtilityRoomColor: state.agreementeditor.counterUtilityRoomColor,
		ceramicKitchenColor: state.agreementeditor.ceramicKitchenColor,
		ceramicMasterBathColor: state.agreementeditor.ceramicMasterBathColor,
		ceramicGuestBathColor: state.agreementeditor.ceramicGuestBathColor,
		ceramic3rdBathColor: state.agreementeditor.ceramic3rdBathColor,
		ceramicUtilityRoomColor: state.agreementeditor.ceramicUtilityRoomColor,
		ceramicEdgeKitchenColor: state.agreementeditor.ceramicEdgeKitchenColor,
		ceramicEdgeMasterBathColor: state.agreementeditor.ceramicEdgeMasterBathColor,
		ceramicEdgeGuestBathColor: state.agreementeditor.ceramicEdgeGuestBathColor,
		ceramicEdge3rdBathColor: state.agreementeditor.ceramicEdge3rdBathColor,
		ceramicEdgeUtilityRoomColor: state.agreementeditor.ceramicEdgeUtilityRoomColor,
		mosaicInsertKitchenColor: state.agreementeditor.mosaicInsertKitchenColor,
		mosaicInsertMasterBathColor: state.agreementeditor.mosaicInsertMasterBathColor,
		mosaicInsertGuestBathColor: state.agreementeditor.mosaicInsertGuestBathColor,
		mosaicInsert3rdBathColor: state.agreementeditor.mosaicInsert3rdBathColor,
		mosaicInsertUtilityRoomColor: state.agreementeditor.mosaicInsertUtilityRoomColor,
		cabinetType: state.agreementeditor.cabinetType,
		cabinetStyle: state.agreementeditor.cabinetStyle,
		cabinetColorKitchenColor: state.agreementeditor.cabinetColorKitchenColor,
		cabinetColorMasterBathColor: state.agreementeditor.cabinetColorMasterBathColor,
		cabinetColorGuestBathColor: state.agreementeditor.cabinetColorGuestBathColor,
		cabinetColor3rdBathColor: state.agreementeditor.cabinetColor3rdBathColor,
		cabinetColorUtilityRoomColor: state.agreementeditor.cabinetColorUtilityRoomColor,
		cabinetHardware: state.agreementeditor.cabinetHardware,
		cabinetHardwareColor: state.agreementeditor.cabinetHardwareColor,
		carpetType: state.agreementeditor.carpetType,
		carpetColor: state.agreementeditor.carpetColor,
		linoleumType: state.agreementeditor.linoleumType,
		linoleumColor: state.agreementeditor.linoleumColor,
		woodLaminateType: state.agreementeditor.woodLaminateType,
		woodLaminateColor: state.agreementeditor.woodLaminateColor,
		ceramicTileType: state.agreementeditor.ceramicTileType,
		ceramicTileColor: state.agreementeditor.ceramicTileColor,
		decor: state.agreementeditor.decor,
		exteriorBody: state.agreementeditor.exteriorBody,
		exteriorBodyColor: state.agreementeditor.exteriorBodyColor,
		exteriorShingles: state.agreementeditor.exteriorShingles,
		exteriorShinglesColor: state.agreementeditor.exteriorShinglesColor,
		exteriorTrim: state.agreementeditor.exteriorTrim,
		exteriorFasciaSoffit: state.agreementeditor.exteriorFasciaSoffit,
		exteriorAccent: state.agreementeditor.exteriorAccent,
		exteriorShutters: state.agreementeditor.exteriorShutters,
		exteriorRoofLoad: state.agreementeditor.exteriorRoofLoad,
		colorSheetNotes: state.agreementeditor.colorSheetNotes,

		// sales office information
		office: state.agreementeditor.office
	}
}
