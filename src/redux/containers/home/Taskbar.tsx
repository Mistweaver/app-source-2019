import React from 'react';
import { StoreState } from "../../Store";
import { connect } from 'react-redux';
import { updatePath } from "../../actions/ApplicationActions";


interface TaskbarProps {
	path: string;
	objectId: string;
	updatePath: (newPath: string) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		path: state.application.path,
		objectId: state.application.pathObjectId
	}
}

interface TaskbarState {
}

class Taskbar extends React.Component<TaskbarProps, TaskbarState> {
	constructor(props: TaskbarProps) {
		super(props);
		this.state = {}

		this.updatePath = this.updatePath.bind(this);
	}

	private updatePath(newPath: string) {
		this.props.updatePath(newPath);
	}

	private renderTaskbarPath() {
		switch(this.props.path) {
			case "": return <span>Welcome!</span>
			case "/leads": return <span>/ All Agreements</span>
			case "/myleads": return <span>/ My Agreements</span>
			case "/myagreements": return <span>/ My Purchase Agreements</span>
			case "/myofficepricesheet": return <span>/ Office Price Sheet</span>
			case "/purchaseagreements": return <span>/ All Agreements</span>
			case "/locations": return <span>/ Location Manager</span>
			case "/stateforms": return <span>/ State and Vendor Form Manager</span>
			case "/promotions": return <span>/ Promotions Manager</span>
			case "/dev": return <span>/ Admins & Developers</span>
			case "/pricesheeteditor": return <span>/ Price Sheet Editor</span>
			case "/usersettings": return <span>/ User Portal</span>
			case "/admin": return <span>/ Admin Console</span>
			case "/accounting": return <span>/ Accounting</span>
			case "/inventory": return <span>/ Price Sheets and Inventory</span>
			case "/legacy" : return <span>/ Legacy Data</span>

			default: return <div></div>
		}
	}

	public render() {
		return(
			<div style={{color: '#79B1C6', paddingTop: 10, paddingLeft: 15}}>{this.renderTaskbarPath()}</div>
			
		)
	}
}

export default connect(mapStateToProps, { updatePath })(Taskbar);