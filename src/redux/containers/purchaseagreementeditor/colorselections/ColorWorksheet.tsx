import React from 'react';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { TextField, Divider, Grid } from '@material-ui/core';
import { updateGenericInformation, updateBooleanInformation } from '../../../actions/AgreementEditorActions';
import StandardButton from '../../../../components/buttons/StandardButton';
import ColorOption from './ColorOption';

interface ColorWorksheetProps {
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

	modelType: string;

	updateGenericInformation: (targetedField: string, newValue: string) => void;
	updateBooleanInformation: (targetField: string, newValue: boolean) => void;

}

function mapStateToProps(state: StoreState) {
	return {
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
		kitchenSinkColor: state.agreementeditor.kitchenSinkColor,
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

		modelType: state.agreementeditor.modelType
	}
}

interface ColorWorksheetState {
	tab: number;
}

class ColorWorksheet extends React.Component<ColorWorksheetProps, ColorWorksheetState> {
	constructor(props: ColorWorksheetProps) {
		super(props);
		this.state = {
			tab: 0
		}
		this.handleSelection = this.handleSelection.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.setInteriorColorUniform = this.setInteriorColorUniform.bind(this);

		this.selectTab = this.selectTab.bind(this);
	}

	private handleInputChange(event: { target: { name: string, value: string }; }) {
		const { name, value } = event.target;
		this.props.updateGenericInformation(name, value);
	}

	private handleSelection(name: string, value: string) {
		//@ts-ignore
		if(this.props[name] === value) {
			this.props.updateGenericInformation(name, "");

		} else {
			this.props.updateGenericInformation(name, value);
		}
	}

	private selectTab(_tab: number) {
		this.setState({ tab: _tab });
	}

	private setInteriorColorUniform() {
		this.props.updateBooleanInformation("interiorColorUniform", !this.props.interiorColorUniform);
	}

	public render() {
		const { tab } = this.state;
		return(
			<>
				<Grid item xs={2}>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", borderBottom: '2px solid rgb(231, 231, 231)'}}>Select a Section</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(0)}>Interior</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(1)}>Accent Wall</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(2)}>Interior Trim</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(3)}>Interior Door</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(4)}>Kitchen Sink</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(5)}>Counter Tops</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(6)}>Ceramic Tile Backsplash</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(7)}>Ceramic Edge</div>
					{
						this.props.modelType !== "PM" &&
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(8)}>Mosaic Insert</div>
					}
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(9)}>Cabinets</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(10)}>Floors</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(11)}>Decor</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(12)}>Exterior</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", cursor: 'pointer'}} onClick={() => this.selectTab(13)}>Notes</div>

					
				</Grid>
				<Grid item xs={8}>
					{
						tab === 0 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Interior</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								{
									this.props.modelType !== "PM" ?
									<div style={{display: 'flex', marginBottom: 10}}>
										<ColorOption selectOption={this.handleSelection} optionName="interiorType" option="Tape & Texture" currentSelectionState={this.props.interiorType} />
										<ColorOption selectOption={this.handleSelection} optionName="interiorType" option="Vinyl" currentSelectionState={this.props.interiorType} />
										<ColorOption selectOption={this.handleSelection} optionName="interiorType" option="Combination Drywall/Vinyl" currentSelectionState={this.props.interiorType} />
									</div>
									:
									<TextField label="Interior Type" name="interiorType" value={this.props.interiorType} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								}
								
								{
									this.props.interiorColorUniform === true ?
										<>
											<TextField label="Interior Color" name="interiorColor" value={this.props.interiorColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
											<Divider style={{margin: 10 }}/>
										</>
									:
										<div style={{display: 'flex', marginTop: 10}}>
											<div>
												<TextField label="Master Bedroom Color" name="interiorMasterBedroomColor" value={this.props.interiorMasterBedroomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
												<TextField label="Kitchen Color" name="interiorKitchenColor" value={this.props.interiorKitchenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
												<TextField label="Living Room Color" name="interiorLivingRoomColor" value={this.props.interiorLivingRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
												<TextField label="Closet Color" name="interiorClosetColor" value={this.props.interiorClosetColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />								
												<TextField label={this.props.modelType === "PM" ? "Bath Color" : "Master Bath Color"} name="interiorMasterBathColor" value={this.props.interiorMasterBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
											</div>
											{
												this.props.modelType !== "PM" &&
												<>
													<div>
														<TextField label="2nd Bedroom Color" name="interior2ndBedroomColor" value={this.props.interior2ndBedroomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="3rd Bedroom Color" name="interior3rdBedroomColor" value={this.props.interior3rdBedroomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="4th Bedroom Color" name="interior4thBedroomColor" value={this.props.interior4thBedroomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
													</div>
													<div>
														<TextField label="5th Bedroom Color" name="interior5thBedroomColor" value={this.props.interior5thBedroomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="Breakfast Room Color" name="interiorBreakfastColor" value={this.props.interiorBreakfastColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="Dining Room Color" name="interiorDiningColor" value={this.props.interiorDiningColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
													</div>
													<div>
														<TextField label="Utility Room Color" name="interiorUtilityColor" value={this.props.interiorUtilityColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="3rd Bath Color" name="interior3rdBathColor" value={this.props.interior3rdBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="Family Room Color" name="interiorFamilyRoomColor" value={this.props.interiorFamilyRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
													</div>
													<div>
														<TextField label="Guest Bath Color" name="interiorGuestBathColor" value={this.props.interiorGuestBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="Hall Color" name="interiorHallColor" value={this.props.interiorHallColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
														<TextField label="Den Color" name="interiorDenColor" value={this.props.interiorDenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
													</div>
												</>
											}
										</div>
								}
								<div style={{marginTop: 10}}>
								{
									(this.props.interiorColorUniform === true && this.props.modelType !== "PM") ?
									<StandardButton onClick={this.setInteriorColorUniform}>Customize Room Color</StandardButton>
									:
									<StandardButton onClick={this.setInteriorColorUniform}>Make All Rooms Same Color</StandardButton>
								}
								</div>
							</div>
						</div>
					}
					{
						tab === 1 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Accent Wall</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>	
								<div style={{display: 'flex'}}>
									<TextField label="Color" name="accentWallColor" value={this.props.accentWallColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									<TextField label="Location" name="accentWallLocation" value={this.props.accentWallLocation} onChange={this.handleInputChange} variant="outlined" />
								</div>
							</div>
							{
								this.props.modelType !== "PM" &&
								<>
									<div style={{marginBottom: 10}}>
										<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Tray or Coffer</div>
										<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>	
											<TextField label="Color" name="trayOrCofferColor" value={this.props.trayOrCofferColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										</div>
									</div>

									<div style={{marginBottom: 10}}>
										<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Wainscot</div>
										<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>	
											<TextField label="Color" name="wainscotColor" value={this.props.wainscotColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										</div>
									</div>
								</>
							}
						</div>
					}
					{
						tab === 2 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Interior Trim</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Color" name="interiorTrimColor" value={this.props.interiorTrimColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
							</div>
						</div>
					}

					{
						tab === 3 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Interior Door</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Color" name="interiorDoorColor" value={this.props.interiorDoorColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
							</div>
						</div>
					}

					{
						tab === 4 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Kitchen Sink</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<div style={{display: 'flex', marginBottom: 10}}>
									<ColorOption selectOption={this.handleSelection} optionName="kitchenSinkType" option="Std" currentSelectionState={this.props.kitchenSinkType} />
									<ColorOption selectOption={this.handleSelection} optionName="kitchenSinkType" option="Upgrade" currentSelectionState={this.props.kitchenSinkType} />
								</div>
								<TextField label="Kitchen Sink Color" name="kitchenSinkColor" value={this.props.kitchenSinkColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
							</div>
						</div>
					}

					{
						tab === 5 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Counter Tops</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Kitchen Color" name="counterKitchenColor" value={this.props.counterKitchenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label={this.props.modelType === "PM" ? "Bath Color" : "Master Bath Color"} name="counterMasterBathColor" value={this.props.counterMasterBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								{
									this.props.modelType !== "PM" &&
									<>
										<TextField label="Guest Bath Color" name="counterGuestBathColor" value={this.props.counterGuestBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										<TextField label="3rd Bath Color" name="counter3rdBathColor" value={this.props.counter3rdBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										<TextField label="Utility Room Color" name="counterUtilityRoomColor" value={this.props.counterUtilityRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									</>
								}
							</div>
						</div>
					}

					{
						tab === 6 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Ceramic Tile Backsplash</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Kitchen Color" name="ceramicKitchenColor" value={this.props.ceramicKitchenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label={this.props.modelType === "PM" ? "Bath Color" : "Master Bath Color"} name="ceramicMasterBathColor" value={this.props.ceramicMasterBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />

								{
									this.props.modelType !== "PM" &&
									<>
										<TextField label="Guest Bath Color" name="ceramicGuestBathColor" value={this.props.ceramicGuestBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										<TextField label="3rd Bath Color" name="ceramic3rdBathColor" value={this.props.ceramic3rdBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										<TextField label="Utility Room Color" name="ceramicUtilityRoomColor" value={this.props.ceramicUtilityRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									</>
								}

							</div>
						</div>
					}

					{
						tab === 7 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Ceramic Edge</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Kitchen Color" name="ceramicEdgeKitchenColor" value={this.props.ceramicEdgeKitchenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label={this.props.modelType === "PM" ? "Bath Color" : "Master Bath Color"} name="ceramicEdgeMasterBathColor" value={this.props.ceramicEdgeMasterBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />

								{
									this.props.modelType !== "PM" &&
									<>
										<TextField label="Guest Bath Color" name="ceramicEdgeGuestBathColor" value={this.props.ceramicEdgeGuestBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										<TextField label="3rd Bath Color" name="ceramicEdge3rdBathColor" value={this.props.ceramicEdge3rdBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										<TextField label="Utility Room Color" name="ceramicEdgeUtilityRoomColor" value={this.props.ceramicEdgeUtilityRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									</>
								}

							</div>
						</div>
					}

					{
						tab === 8 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Mosaic Insert</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Kitchen Color" name="mosaicInsertKitchenColor" value={this.props.mosaicInsertKitchenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label="Master Bath Color" name="mosaicInsertMasterBathColor" value={this.props.mosaicInsertMasterBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label="Guest Bath Color" name="mosaicInsertGuestBathColor" value={this.props.mosaicInsertGuestBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label="3rd Bath Color" name="mosaicInsert3rdBathColor" value={this.props.mosaicInsert3rdBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								<TextField label="Utility Room Color" name="mosaicInsertUtilityRoomColor" value={this.props.mosaicInsertUtilityRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
							

							</div>
						</div>
					}

					{
						tab === 9 &&
						<>
							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Cabinet Type</div>
								<div style={{padding: 15, display: 'flex', backgroundColor: "rgb(231, 231, 231)"}}>
									<ColorOption selectOption={this.handleSelection} optionName="cabinetType" option="Std" currentSelectionState={this.props.cabinetType} />
									<ColorOption selectOption={this.handleSelection} optionName="cabinetType" option="Upgrade" currentSelectionState={this.props.cabinetType} />
								</div>
							</div>

							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Cabinet Style</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<TextField label="Cabinet Style" name="cabinetStyle" value={this.props.cabinetStyle} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>

							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Cabinet Color</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<TextField label="Kitchen Color" name="cabinetColorKitchenColor" value={this.props.cabinetColorKitchenColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									<TextField label={this.props.modelType === "PM" ? "Bath Color" : "Master Bath Color"} name="cabinetColorMasterBathColor" value={this.props.cabinetColorMasterBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />

									{
										this.props.modelType !== "PM" &&
										<>
											<TextField label="Guest Bath Color" name="cabinetColorGuestBathColor" value={this.props.cabinetColorGuestBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
											<TextField label="3rd Bath Color" name="cabinetColor3rdBathColor" value={this.props.cabinetColor3rdBathColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
											<TextField label="Utility Room Color" name="cabinetColorUtilityRoomColor" value={this.props.cabinetColorUtilityRoomColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										</>
									}

								</div>
							</div>
							{
								this.props.modelType !== "PM" &&
								<div style={{marginBottom: 10}}>
									<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Cabinet Hardware</div>
									<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
										<div style={{display: 'flex'}}>
											<ColorOption selectOption={this.handleSelection} optionName="cabinetHardware" option="Knobs" currentSelectionState={this.props.cabinetHardware} />
											<ColorOption selectOption={this.handleSelection} optionName="cabinetHardware" option="Pulls" currentSelectionState={this.props.cabinetHardware} />
											<ColorOption selectOption={this.handleSelection} optionName="cabinetHardware" option="None" currentSelectionState={this.props.cabinetHardware} />
										</div>
										<div style={{marginTop: 15, paddingBottom: 10 }}>
											<TextField label="Cabinet Hardware Color" name="cabinetHardwareColor" value={this.props.cabinetHardwareColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
										</div>
									</div>
								</div>
							}
						</>
					}
					{
						tab === 10 &&
						<>
							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Carpet</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<div style={{display: 'flex'}}>
										<ColorOption selectOption={this.handleSelection} optionName="carpetType" option="Std" currentSelectionState={this.props.carpetType} />
										<ColorOption selectOption={this.handleSelection} optionName="carpetType" option="Upgrade" currentSelectionState={this.props.carpetType} />
										<ColorOption selectOption={this.handleSelection} optionName="carpetType" option="Omit" currentSelectionState={this.props.carpetType} />
									</div>
									<TextField label="Carpet Color" name="carpetColor" value={this.props.carpetColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>
							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Linoleum</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<div style={{display: 'flex'}}>
										<ColorOption selectOption={this.handleSelection} optionName="linoleumType" option="Std" currentSelectionState={this.props.linoleumType} />
										<ColorOption selectOption={this.handleSelection} optionName="linoleumType" option="Upgrade" currentSelectionState={this.props.linoleumType} />
										<ColorOption selectOption={this.handleSelection} optionName="linoleumType" option="Omit" currentSelectionState={this.props.linoleumType} />
									</div>
									<TextField label="Linoleum Color" name="linoleumColor" value={this.props.linoleumColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>
							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Wood Laminate</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<div style={{display: 'flex'}}>

										<ColorOption selectOption={this.handleSelection} optionName="woodLaminateType" option="Std" currentSelectionState={this.props.woodLaminateType} />
										<ColorOption selectOption={this.handleSelection} optionName="woodLaminateType" option="Upgrade" currentSelectionState={this.props.woodLaminateType} />
										<ColorOption selectOption={this.handleSelection} optionName="woodLaminateType" option="Omit" currentSelectionState={this.props.woodLaminateType} />
									</div>
									<TextField label="Wood Laminate Color" name="woodLaminateColor" value={this.props.woodLaminateColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>

							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Ceramic Tile</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<div style={{display: 'flex'}}>
										<ColorOption selectOption={this.handleSelection} optionName="ceramicTileType" option="Std" currentSelectionState={this.props.ceramicTileType} />
										<ColorOption selectOption={this.handleSelection} optionName="ceramicTileType" option="Upgrade" currentSelectionState={this.props.ceramicTileType} />
										<ColorOption selectOption={this.handleSelection} optionName="ceramicTileType" option="Omit" currentSelectionState={this.props.ceramicTileType} />
									</div>
									<TextField label="Ceramic Tile Color" name="ceramicTileColor" value={this.props.ceramicTileColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>
						</>
					}
					{
						tab === 11 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Decor</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField label="Color" name="decor" value={this.props.decor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
							</div>
						</div>
					}
					{
						tab === 12 &&
						<>
							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Body Type</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<div style={{display: 'flex'}}>
										<ColorOption selectOption={this.handleSelection} optionName="exteriorBody" option="Std" currentSelectionState={this.props.exteriorBody} />
										<ColorOption selectOption={this.handleSelection} optionName="exteriorBody" option="Upgrade" currentSelectionState={this.props.exteriorBody} />
									</div>
									<TextField label="Exterior Body Color" name="exteriorBodyColor" value={this.props.exteriorBodyColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>

							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Shingles Type</div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<div style={{display: 'flex'}}>
										<ColorOption selectOption={this.handleSelection} optionName="exteriorShingles" option="Std" currentSelectionState={this.props.exteriorShingles} />
										<ColorOption selectOption={this.handleSelection} optionName="exteriorShingles" option="Upgrade" currentSelectionState={this.props.exteriorShingles} />
									</div>
									<TextField label="Exterior Shingles Color" name="exteriorShinglesColor" value={this.props.exteriorShinglesColor} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>

							<div style={{marginBottom: 10}}>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}></div>
								<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
									<TextField label="Trim Color" name="exteriorTrim" value={this.props.exteriorTrim} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									<TextField label="Fascia/Soffit Color" name="exteriorFasciaSoffit" value={this.props.exteriorFasciaSoffit} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									<TextField label="Accent Color" name="exteriorAccent" value={this.props.exteriorAccent} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									<TextField label="Shutter Color" name="exteriorShutters" value={this.props.exteriorShutters} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
									<TextField label="Roof Load" name="exteriorRoofLoad" value={this.props.exteriorRoofLoad} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10}} />
								</div>
							</div>
						</>
					}
					{
						tab === 13 &&
						<div style={{marginBottom: 10}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Notes</div>
							<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
								<TextField
									id="outlined-name"
									label="Notes"
									name="colorSheetNotes"
									value={this.props.colorSheetNotes}
									onChange={this.handleInputChange}
									multiline
									fullWidth
									rows={5}
									variant="outlined"
									style={{marginRight: 10}}
								/>
							</div>
						</div>
					}
				</Grid>
			</>
			
		)
	}
}

export default connect(mapStateToProps, { updateGenericInformation, updateBooleanInformation })(ColorWorksheet);