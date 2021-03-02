import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../Store';
import MyLeads from '../../../displays/myleads/MyLeads';
import MyAgreements from '../../../displays/mypurchaseagreements/MyAgreements';
import OfficePriceSheet from '../../../displays/myofficepricesheet/OfficePriceSheet';
import AllLeads from '../../../displays/all_leads/AllLeads';
import AllAgreements from '../../../displays/allagreements/AllAgreements';
import StateFormManager from '../../../displays/stateformmanager/StateFormManager';
import PromotionManager from '../../../displays/promotions/PromotionManager';
import DeveloperConsole from '../../../displays/developer/DeveloperConsole';
import UserSettings from '../../../displays/userportal/UserSettings';
import LocationManager from '../../../displays/locationmanager/LocationManager';
import AdminConsole from '../../../displays/adminconsole/AdminConsole';
import Taskbar from './Taskbar';
import LegacyData from '../../../pricedata/dev/LegacyData';
import { PricesAndInventory } from '../../../pricedata/PricesAndInventory';

interface ApplicationRouterProps {
	path: string;
}

function mapStateToProps(state: StoreState) {
	return {
		path: state.application.path
	}
}

class ApplicationRouter extends React.Component<ApplicationRouterProps, {}> {

	componentDidUpdate(prevProps: ApplicationRouterProps) {
		if(prevProps !== this.props) {
			this.renderRoute();
		}
	}

	// Application router matches the existing path and renders the appropriate component
	private renderRoute() {
		// console.log("Rendering route");
		const { path } = this.props;
		switch(path) {
			case "": return <div style={{padding: 15, color: '#79B1C6'}}>Hello!</div>
			case "/leads": return <AllLeads />
			case "/myleads": return <MyLeads />
			case "/myagreements": return <MyAgreements />
			case "/myofficepricesheet": return <OfficePriceSheet />
			case "/purchaseagreements": return <AllAgreements />
			case "/locations": return <LocationManager />
			case "/stateforms": return <StateFormManager />
			case "/promotions": return <PromotionManager />
			case "/dev": return <DeveloperConsole />
			case "/usersettings": return <UserSettings />
			case "/admin": return <AdminConsole />
			case "/inventory": return <PricesAndInventory />
			case "/legacy": return <LegacyData />
			default: return <div></div>
		}
	}


	public render() {
		return(
			<div style={{overflow: 'auto', width: '100%'}}>
				<Taskbar />
				{this.renderRoute()}
			</div>
		)
	}
}

export default connect(mapStateToProps, {})(ApplicationRouter);