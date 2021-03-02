import React from 'react';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { ApplianceData } from './ApplianceData';
import { ApplianceSheetItem } from '../../../../objects/purchaseagreement/appliancesheet/ApplianceSheetItem';
import ApplianceDisplay from './ApplianceDisplay';
import { updateAppliance, removeAppliance } from '../../../actions/AgreementEditorActions';

interface ApplianceWorksheetProps {
	applianceList: ApplianceSheetItem[];
	modelType: string;
	updateAppliance: (appliances: ApplianceSheetItem[], appliance: ApplianceSheetItem) => void;
	removeAppliance: (newApplianceList: ApplianceSheetItem[]) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		applianceList: state.agreementeditor.applianceList,
		modelType: state.agreementeditor.modelType
	}
}

interface ApplianceWorksheetState {}

class ApplianceWorksheet extends React.Component<ApplianceWorksheetProps, ApplianceWorksheetState> {
	constructor(props: ApplianceWorksheetProps) {
		super(props);
		this.state = {}
	}


	private renderAppliances() {
		let applianceList: any[] = [];
		let modelType = "";

		if(this.props.modelType === "PM-HUD" || this.props.modelType === "HUD") {
			modelType = "HUD";
		} else {
			modelType = "PM"
		}
		
		ApplianceData.forEach((data, index) => {
			if(data.modelType === modelType || data.modelType === "") {
				applianceList.push(
					<Grid key={"appliance" + index + data.key} item xs={3}>
						<ApplianceDisplay 
							appliance={data}
							applianceList={this.props.applianceList}
							modelType={this.props.modelType}
							updateAppliance={this.props.updateAppliance}
							removeAppliance={this.props.removeAppliance}
						/>
					</Grid>
				)
			}	
		})
		return applianceList;
	}

	public render() {
		return(
			<Grid item xs={10}>
				<div style={{padding: 15}}>
					<Grid container spacing={1}>
						{this.renderAppliances()}
					</Grid>
				</div>
			</Grid>
		)
	}
}

export default connect(mapStateToProps, { updateAppliance, removeAppliance })(ApplianceWorksheet);