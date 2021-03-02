export interface ColorInfoState {
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

	wallType: string;
	wallColor: string;
	kitchenSinkColor: string;
	ceilingType: string;
	ceilingColor: string;


	notes: string;
}

export class ColorSheet {
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
	kitchenSinkColor: string;

	ceilingType: string;
	ceilingColor: string;

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

	notes: string;

	constructor() {
		this.interiorType = "";
		this.interiorColorUniform = true;
		this.interiorColor = "";

		this.interiorKitchenColor = "";
		this.interiorBreakfastColor = "";
		this.interiorDiningColor = "";
		this.interiorUtilityColor = "";
		this.interiorLivingRoomColor = "";
		this.interiorFamilyRoomColor = "";
		this.interiorHallColor = "";
		this.interiorDenColor = "";
		this.interiorClosetColor = "";
		this.interiorMasterBedroomColor = "";
		this.interior2ndBedroomColor = "";
		this.interior3rdBedroomColor = "";
		this.interior4thBedroomColor = "";
		this.interior5thBedroomColor = "";
		this.interiorMasterBathColor = "";
		this.interiorGuestBathColor = "";
		this.interior3rdBathColor = "";

		this.accentWallColor = "";
		this.accentWallLocation = "";
		this.trayOrCofferColor = "";
		this.interiorTrimColor = "";
		this.interiorDoorColor = "";
		this.wainscotColor = "";
		this.kitchenSinkType = "";
		this.kitchenSinkColor = "";

		this.ceilingType = "";
		this.ceilingColor = "";

		this.counterKitchenColor = "";
		this.counterMasterBathColor = "";
		this.counterGuestBathColor = "";
		this.counter3rdBathColor = "";
		this.counterUtilityRoomColor = "";

		this.ceramicKitchenColor = "";
		this.ceramicMasterBathColor = "";
		this.ceramicGuestBathColor = "";
		this.ceramic3rdBathColor = "";
		this.ceramicUtilityRoomColor = "";

		this.ceramicEdgeKitchenColor = "";
		this.ceramicEdgeMasterBathColor = "";
		this.ceramicEdgeGuestBathColor = "";
		this.ceramicEdge3rdBathColor = "";
		this.ceramicEdgeUtilityRoomColor = "";

		this.mosaicInsertKitchenColor = "";
		this.mosaicInsertMasterBathColor = "";
		this.mosaicInsertGuestBathColor = "";
		this.mosaicInsert3rdBathColor = "";
		this.mosaicInsertUtilityRoomColor = "";

		this.cabinetType = "";
		this.cabinetStyle = "";

		this.cabinetColorKitchenColor = "";
		this.cabinetColorMasterBathColor = "";
		this.cabinetColorGuestBathColor = "";
		this.cabinetColor3rdBathColor = "";
		this.cabinetColorUtilityRoomColor = "";

		this.cabinetHardware = "";
		this.cabinetHardwareColor = "";

		this.carpetType = "";
		this.carpetColor = "";
		this.linoleumType = "";
		this.linoleumColor = "";
		this.woodLaminateType = "";
		this.woodLaminateColor = "";
		this.ceramicTileType = "";
		this.ceramicTileColor = "";

		this.decor = "";

		this.exteriorBody = "";
		this.exteriorBodyColor = "";

		this.exteriorShingles = "";
		this.exteriorShinglesColor = "";

		this.exteriorTrim = "";
		this.exteriorFasciaSoffit = "";
		this.exteriorAccent = "";
		this.exteriorShutters = "";
		this.exteriorRoofLoad = "";

		this.notes = "";
	}

	mapFromState(inputState: ColorInfoState) {
		this.interiorType = inputState.interiorType;
		this.interiorColor = inputState.interiorColor;
		this.interiorColorUniform = inputState.interiorColorUniform;

		this.interiorKitchenColor = inputState.interiorKitchenColor;
		this.interiorBreakfastColor = inputState.interiorBreakfastColor;
		this.interiorDiningColor = inputState.interiorDiningColor;
		this.interiorUtilityColor = inputState.interiorUtilityColor;
		this.interiorLivingRoomColor = inputState.interiorLivingRoomColor;
		this.interiorFamilyRoomColor = inputState.interiorFamilyRoomColor;
		this.interiorHallColor = inputState.interiorHallColor;
		this.interiorDenColor = inputState.interiorDenColor;
		this.interiorClosetColor = inputState.interiorClosetColor;
		this.interiorMasterBedroomColor = inputState.interiorMasterBedroomColor;
		this.interior2ndBedroomColor = inputState.interior2ndBedroomColor;
		this.interior3rdBedroomColor = inputState.interior3rdBedroomColor;
		this.interior4thBedroomColor = inputState.interior4thBedroomColor;
		this.interior5thBedroomColor = inputState.interior5thBedroomColor;
		this.interiorMasterBathColor = inputState.interiorMasterBathColor;
		this.interiorGuestBathColor = inputState.interiorGuestBathColor;
		this.interior3rdBathColor = inputState.interior3rdBathColor;

		this.accentWallColor = inputState.accentWallColor;
		this.accentWallLocation = inputState.accentWallLocation;
		this.trayOrCofferColor = inputState.trayOrCofferColor;
		this.interiorTrimColor = inputState.interiorTrimColor;
		this.interiorDoorColor = inputState.interiorDoorColor;
		this.wainscotColor = inputState.wainscotColor;
		this.kitchenSinkType = inputState.kitchenSinkType;
		this.kitchenSinkColor = inputState.kitchenSinkColor;
	
		this.counterKitchenColor = inputState.counterKitchenColor;
		this.counterMasterBathColor = inputState.counterMasterBathColor;
		this.counterGuestBathColor = inputState.counterGuestBathColor;
		this.counter3rdBathColor = inputState.counter3rdBathColor;
		this.counterUtilityRoomColor = inputState.counterUtilityRoomColor;

		this.ceramicKitchenColor = inputState.ceramicKitchenColor;
		this.ceramicMasterBathColor = inputState.ceramicMasterBathColor;
		this.ceramicGuestBathColor = inputState.ceramicGuestBathColor;
		this.ceramic3rdBathColor = inputState.ceramic3rdBathColor;
		this.ceramicUtilityRoomColor = inputState.ceramicUtilityRoomColor;

		this.ceramicEdgeKitchenColor = inputState.ceramicEdgeKitchenColor;
		this.ceramicEdgeMasterBathColor = inputState.ceramicEdgeMasterBathColor;
		this.ceramicEdgeGuestBathColor = inputState.ceramicEdgeGuestBathColor;
		this.ceramicEdge3rdBathColor = inputState.ceramicEdge3rdBathColor;
		this.ceramicEdgeUtilityRoomColor = inputState.ceramicEdgeUtilityRoomColor;

		this.mosaicInsertKitchenColor = inputState.mosaicInsertKitchenColor;
		this.mosaicInsertMasterBathColor = inputState.mosaicInsertMasterBathColor;
		this.mosaicInsertGuestBathColor = inputState.mosaicInsertGuestBathColor;
		this.mosaicInsert3rdBathColor = inputState.mosaicInsert3rdBathColor;
		this.mosaicInsertUtilityRoomColor = inputState.mosaicInsertUtilityRoomColor;

		this.cabinetType = inputState.cabinetType;
		this.cabinetStyle = inputState.cabinetStyle;

		this.cabinetColorKitchenColor = inputState.cabinetColorKitchenColor;
		this.cabinetColorMasterBathColor = inputState.cabinetColorMasterBathColor;
		this.cabinetColorGuestBathColor = inputState.cabinetColorGuestBathColor;
		this.cabinetColor3rdBathColor = inputState.cabinetColor3rdBathColor;
		this.cabinetColorUtilityRoomColor = inputState.cabinetColorUtilityRoomColor;

		this.cabinetHardware = inputState.cabinetHardware;
		this.cabinetHardwareColor = inputState.cabinetHardwareColor;

		this.carpetType = inputState.carpetType;
		this.carpetColor = inputState.carpetColor;
		this.linoleumType = inputState.linoleumType;
		this.linoleumColor = inputState.linoleumColor;
		this.woodLaminateType = inputState.woodLaminateType;
		this.woodLaminateColor = inputState.woodLaminateColor;
		this.ceramicTileType = inputState.ceramicTileType;
		this.ceramicTileColor = inputState.ceramicTileColor;

		this.decor = inputState.decor;

		this.exteriorBody = inputState.exteriorBody;
		this.exteriorBodyColor = inputState.exteriorBodyColor;

		this.exteriorShingles = inputState.exteriorShingles;
		this.exteriorShinglesColor = inputState.exteriorShinglesColor;

		this.exteriorTrim = inputState.exteriorTrim;
		this.exteriorFasciaSoffit = inputState.exteriorFasciaSoffit;
		this.exteriorAccent = inputState.exteriorAccent;
		this.exteriorShutters = inputState.exteriorShutters;
		this.exteriorRoofLoad = inputState.exteriorRoofLoad;

		this.notes = inputState.notes;
	}
}