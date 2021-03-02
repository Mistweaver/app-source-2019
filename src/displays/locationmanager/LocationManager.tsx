import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { getAllSalesOffices } from '../../services/SalesOfficeServices';
import { sortSalesOffices } from '../../utilities/UtilityServices';
import LocationLeads from './LocationLeads';
import UserManager from './UserManager';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { getUserByEmail } from '../../services/UserServices';
import { getMicrosoftProfile } from '../../auth/AuthServices';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


interface LocationManagerState {
	salesOffices: SalesOffice[];
	selectedSalesOffice: SalesOffice;
	locationId: string;
	value: number;

}
class LocationManager extends React.Component<{}, LocationManagerState> {
	constructor(props: {})  {
		super(props);
		this.state = {
			salesOffices: [],
			selectedSalesOffice: new SalesOffice(),
			value: 0,
			locationId: "",
		}

		this.handleChange = this.handleChange.bind(this);
		this.changeTab = this.changeTab.bind(this);
		this.selectLocation = this.selectLocation.bind(this);
	}

	componentDidMount() {
		this.preloadUserSalesOffice();
		
	}

	private preloadUserSalesOffice() {
		// set the existing location Id to the current users location id
		getUserByEmail(getMicrosoftProfile().preferred_username).then(userRes => {
			if(validateHTMLResponse(userRes)) {
				// this.selectLocation(res.data.locationId);
				getAllSalesOffices().then(res => {
						if(validateHTMLResponse(res)) {
							let salesOffices: SalesOffice[] = res.data;
							let selectedOffice: SalesOffice = salesOffices.find(office => office.id === userRes.data.locationId) || new SalesOffice();
							this.setState({ salesOffices: [selectedOffice], locationId: selectedOffice.id, selectedSalesOffice: selectedOffice });
						}
				});
			}
		});
	}

	public selectLocation(event: any) {
		if(event.target.value === "") {
			this.setState({ locationId: "" });
		} else { 
			let selectedOffice: SalesOffice = this.state.salesOffices.find(office => office.id === event.target.value) || new SalesOffice();
			this.setState({ locationId: selectedOffice.id, selectedSalesOffice: selectedOffice });
		}
	}

	public handleChange(event: { target: { name: any; value: any; }; }) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({
			[name]: value,
		});
	}

	public changeTab(newValue: any) {
		this.setState({
			value: newValue
		});
	}

	public render() {
		const { selectedSalesOffice, salesOffices,  value, locationId } = this.state;
		salesOffices.sort(sortSalesOffices);
		return(
			<div style={{padding: 15}}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 10}}>
							<select defaultValue="" value={this.state.selectedSalesOffice.id} onChange={this.selectLocation} style={{backgroundColor: 'rgb(231, 231, 231)', padding: 10, width: '100%', height: '100%'}}>
								<option value="">select location</option>
								{
									salesOffices.map(location => (
										<option key={location.id} value={location.id}>{location.officeName + ' - ' + location.officeState}</option>
									))
								}
							</select>
						</div>
						{
							locationId !== "" &&
							<>
								<div style={{display: 'flex', flexDirection: 'column', padding: 10, backgroundColor: 'rgb(231, 231, 231)'}}>
									<div><b>{selectedSalesOffice.officeTitle}</b></div>
									<div style={{margin: 0}}>{selectedSalesOffice.officeAddress + ', ' + selectedSalesOffice.officeCity + ', ' + selectedSalesOffice.officeState + ', ' + selectedSalesOffice.officeZip}</div>
									<span style={{margin: 0}}>{selectedSalesOffice.officePhoneNumber}</span>
								</div>
								<Divider />
								<div style={{backgroundColor: 'rgb(231, 231, 231)'}}>
									<div className="actionList" onClick={() => this.changeTab(0)}>
										<span>Purchase Agreements</span>
										<ArrowRightIcon style={{color: "#D46938"}} />
									</div>
									<div className="actionList" onClick={() => this.changeTab(1)}>
										<span>Users</span>
										<ArrowRightIcon style={{color: "#D46938"}} />
									</div>
									
								</div>
							</>
						}
					</Grid>
					{
						locationId !== "" &&
						<Grid item xs={10}>
							{
								locationId !== "" &&
								<>
									{ value === 0 && <LocationLeads salesOffice={selectedSalesOffice} salesOffices={salesOffices} /> }
									{ value === 1 && <UserManager salesOffice={selectedSalesOffice} salesOffices={salesOffices}/> }
								</>
							}
						</Grid>
					}
				</Grid>
			</div>
		)
	}
}

export default LocationManager;