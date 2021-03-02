import { StoreState } from "../../../Store";
import React from "react";
import { Grid, Button } from "@material-ui/core";
import windZoneImage from '../../../../resources/windZoneMap.jpg';
import { updateNumericInformation } from '../../../actions/AgreementEditorActions';
import { connect } from "react-redux";

interface WindZoneSheetProps {
	windZone: number;
	updateNumericInformation: (field: string, value: number) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		windZone: state.agreementeditor.windZone
	}
}

const WindZoneSheet = (props: WindZoneSheetProps) => {
	return (
		<>
			<Grid item xs={3}>
				<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Select Wind Zone</div>
				<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
					<Button variant="contained" style={{marginBottom: 10}} color={props.windZone === 1 ? 'primary' : 'default'} onClick={() => props.updateNumericInformation("windZone", 1)}>Zone I</Button>
					<Button variant="contained" style={{marginBottom: 10}} color={props.windZone === 2 ? 'primary' : 'default'} onClick={() => props.updateNumericInformation("windZone", 2)}>Zone II</Button>
					<Button variant="contained" style={{marginBottom: 10}} color={props.windZone === 3 ? 'primary' : 'default'} onClick={() => props.updateNumericInformation("windZone", 3)}>Zone III</Button>
				</div>
			</Grid>
			<Grid item xs={7}>
				<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
					<img src={windZoneImage} style={{width: '55%'}} alt="Wind Zone Map" />
					<div style={{marginTop: 35, fontSize: '10pt', textAlign: 'left'}}>
						<p>
						Each manufactured home must be designed according to the federal Manufactured Home Construction and Safety Standards at 24 CFR 3280, commonly called the HUD Code. The HUD Code stipulates, at §3280.305(c)(1) and §3280.305(c)(2), that the home shall be designed and constructed to conform to one of three wind load zones. The appropriate wind zone used in design is dependent on where the home will be initially installed. Homes designed and constructed to a higher Wind Zone can be installed in a lower Wind Zone (a Wind Zone III home can be installed in a Wind Zone I or II location). However, a Wind Zone I home cannot be installed in either a Wind Zone II or III area.
						</p>
						<p>
						Wind loads (a lateral load) must be resisted by the home. The home must be capable of transferring these imposed lateral loads to the home’s stabilizing devices without exceeding the allowable stresses and other deflection requirements. Wind Zone I, Wind Zone II and Wind Zone III are identified on the basic wind zone map above. The manufactured home producer designs the home to resist the wind load, which is measured in pounds per square foot. Wind Zone I equates to a 70-mph fastest-mile wind speed. Wind Zone II equates to a 100-mph fastest-mile wind speed. Wind Zone III equates to a 110-mph fastest-mile wind speed.
						</p>
						<p>
							Source: <a href="https://www.manufacturedhousing.org/wind-map/" target="_blank" rel="noopener noreferrer">Manufactured Housing Institute</a>
						</p>
					</div>
				</div>
			</Grid>
		</>
	)
}

export default connect(mapStateToProps, {updateNumericInformation})(WindZoneSheet);