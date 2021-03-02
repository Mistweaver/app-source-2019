import React from 'react';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Tooltip, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { StoreState } from '../../Store';
import { loadSalesOffices } from '../../actions/ApplicationDataActions';
import { getAllSalesOffices } from '../../../services/SalesOfficeServices';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';

interface LocationDropdownProps {
	currentSelection: string;	// pass id of selected office
	allLocationsOption: boolean;
	salesOffices: SalesOffice[];
	loadSalesOffices: (salesOffices: SalesOffice[]) => void;
	selectLocation: (office: SalesOffice) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		salesOffices: state.applicationdata.salesOffices
	}
}

interface LocationDropdownState {
	loading: boolean;
	error: boolean;
	currentSelection: string;
}

class LocationDropdown extends React.Component<LocationDropdownProps, LocationDropdownState> {
	constructor(props: LocationDropdownProps) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			currentSelection: "-1"
		}

		this.handleLocationSelection = this.handleLocationSelection.bind(this);
		this.loadSalesOffices = this.loadSalesOffices.bind(this);
	}
	componentDidMount() {
		if(this.props.salesOffices.length === 0) {
			this.setState({ loading: true });
			this.loadSalesOffices();
		}
	}

	private loadSalesOffices() {
		getAllSalesOffices().then(res => {
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.setState({ error: false });
				this.props.loadSalesOffices(res.data);
			} else {
				this.setState({
					error: true
				});
			}
		});
	}

	private handleLocationSelection(event: any) {
		this.setState({ currentSelection: event.target.value });
		if(event.target.value !== "-1") {
			let selectedOffice: SalesOffice = this.props.salesOffices.find(office => office.id === event.target.value) || new SalesOffice();
			this.props.selectLocation(selectedOffice);
		}
	}

	private compareAlphabetical(salesOfficeA: SalesOffice, salesOfficeB: SalesOffice) {
		if(salesOfficeA.officeName.toLowerCase() > salesOfficeB.officeName.toLowerCase()) {
			return 1;
		} else if (salesOfficeA.officeName.toLowerCase() < salesOfficeB.officeName.toLowerCase()) {
			return -1;
		} else {
			return 0;
		}
	}


	public render() {
		this.props.salesOffices.sort(this.compareAlphabetical);

		return(
			<div>
				{
					this.state.loading ?
						<div style={{padding: 4, width: 200}}>
							<LinearProgress />
						</div>
					:
					<>
						{
							this.state.error ?
								<button className="buttonMinimal" onClick={this.loadSalesOffices}>Error - Click to Reload</button>
							:
							<>
								<select name="locationId" value={this.state.currentSelection} onChange={this.handleLocationSelection} style={{padding: 8, backgroundColor: 'rgb(231, 231, 231)'}}>
									<option value="-1">...select location</option>
									{
										this.props.salesOffices.map(location => (
											<option key={location.id} value={location.id}>{location.officeName + ' - ' + location.officeState}</option>
										))
									}
									{
										this.props.allLocationsOption &&
										<option value="">All Locations</option>
									}
								</select>
								{
									this.props.salesOffices.length === 0 &&
									<Tooltip title="Reload Offices" placement="right">
										<RefreshIcon className="buttonMinimal" style={{ verticalAlign: 'middle', padding: 5 }} onClick={this.loadSalesOffices} />
									</Tooltip>
								}
								
							</>
						}
					</>
				}
				
				
				
			</div>
		)
	}
	
}

export default connect(mapStateToProps, { loadSalesOffices })(LocationDropdown);