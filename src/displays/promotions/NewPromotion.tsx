import React from 'react';
import { PromoListItem } from './PromoListItem';
import { Button, TextField, MenuItem, Grid, Tooltip } from '@material-ui/core';
import { addNewPromoMonth } from './PromoServices';
import { Promotion } from './Promotion';
import { getAllSalesOffices } from '../../services/SalesOfficeServices';
import DeleteIcon from '@material-ui/icons/Delete';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { ConvertMonthIntegerToString } from '../../utilities/ConvertMonthIntegerToString';
import { sortSalesOffices } from '../../utilities/UtilityServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { ModalButton } from '../../components/modal/ModalButton';

interface Props {
	reload: () => void;
}

interface State {
	saving: boolean;
	salesOffices: SalesOffice[];

	year: number;
	month: number;

	startDate: string;
	midMonthDate: string;
	endDate: string;

	promoList: PromoListItem[];

	newPromoName: string;
	newPromoLocation: string;
	newPromoLocationId: string;

}

class PromotionCreator extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			saving: false,
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
			salesOffices: [],

			startDate: "",
			midMonthDate: "",
			endDate: "",

			promoList: [], 

			newPromoName: "",
			newPromoLocation: "",
			newPromoLocationId: ""
		}

		this.addMonth = this.addMonth.bind(this);
		this.addPromoListItem = this.addPromoListItem.bind(this);
		this.deletePromoListItem = this.deletePromoListItem.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNumericChange = this.handleNumericChange.bind(this);
		this.selectLocation = this.selectLocation.bind(this);
	}

	componentDidMount() {
		getAllSalesOffices().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					salesOffices: res.data
				});
			}
		});
	}

	private handleChange(event: any) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({
			[name]: value
		});
	}

	private handleNumericChange(event: any) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({
			[name]: parseInt(value)
		});
	}

	private addPromoListItem() {
		const { newPromoLocation, newPromoLocationId, newPromoName } = this.state;
		let newPromoListItem = new PromoListItem();
		newPromoListItem.promoName = newPromoName;
		newPromoListItem.location = newPromoLocation;
		newPromoListItem.locationId = newPromoLocationId;
		let newList = this.state.promoList.concat(newPromoListItem);
		this.setState({
			promoList: newList,
			newPromoName: "",
			newPromoLocation: "",
			newPromoLocationId: "",
		});

	}

	private deletePromoListItem(index: number) {
		let copyList = this.state.promoList.concat();
		copyList.splice(index, 1);
		this.setState({
			promoList: copyList
		});
	}

	private selectLocation(event: any) {
		if(event.target.value === "DEFAULT") {
			this.setState({ newPromoLocationId: "DEFAULT", newPromoLocation: "Default" });
		} else { 
			let selectedOffice: SalesOffice = this.state.salesOffices.find(office => office.id === event.target.value) || new SalesOffice();
			this.setState({ newPromoLocationId: selectedOffice.id, newPromoLocation: selectedOffice.officeName });
		}
	}

	private addMonth() {
		let newPromotion = new Promotion();
		newPromotion.month = this.state.month;
		newPromotion.year = this.state.year;
		newPromotion.date = this.state.month.toString() + "/" + this.state.year.toString();
		newPromotion.startDate = this.state.startDate;
		newPromotion.midMonthDate = this.state.midMonthDate;
		newPromotion.endDate = this.state.endDate;
		
		newPromotion.promoList = this.state.promoList;

		addNewPromoMonth(newPromotion).then(res => {
			if(validateHTMLResponse(res)) {

			}
		})
	}
	
	public render() {
		const { month, year, salesOffices, newPromoName, newPromoLocationId, startDate, midMonthDate, endDate, promoList } = this.state;
		salesOffices.sort(sortSalesOffices);
		
		return(
			<>
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<div>Select Year</div>
							<input type="number" name="year" value={year} onChange={this.handleChange}  style={{marginTop: 5, marginBottom: 5, padding: 5}}  />
							<div>Select Month</div>
							<select name="month" value={month} onChange={this.handleChange}  style={{marginTop: 5, marginBottom: 5, padding: 5}} >
								<option value={0}>{ConvertMonthIntegerToString(0)}</option>
								<option value={1}>{ConvertMonthIntegerToString(1)}</option>
								<option value={2}>{ConvertMonthIntegerToString(2)}</option>
								<option value={3}>{ConvertMonthIntegerToString(3)}</option>
								<option value={4}>{ConvertMonthIntegerToString(4)}</option>
								<option value={5}>{ConvertMonthIntegerToString(5)}</option>
								<option value={6}>{ConvertMonthIntegerToString(6)}</option>
								<option value={7}>{ConvertMonthIntegerToString(7)}</option>
								<option value={8}>{ConvertMonthIntegerToString(8)}</option>
								<option value={9}>{ConvertMonthIntegerToString(9)}</option>
								<option value={10}>{ConvertMonthIntegerToString(10)}</option>
								<option value={11}>{ConvertMonthIntegerToString(11)}</option>
							</select>
									
							<div>Start Date</div>
							<input name="startDate" value={startDate} onChange={this.handleChange}  style={{marginTop: 5, marginBottom: 5, padding: 5}}  />
							<div>Mid Month Date (aka when the second half of the month begins</div>
							<input name="midMonthDate" value={midMonthDate} onChange={this.handleChange}  style={{marginTop: 5, marginBottom: 5, padding: 5}}  />
							<div>End Date</div>
							<input name="endDate" value={endDate} onChange={this.handleChange}  style={{marginTop: 5, marginBottom: 5, padding: 5}}  />
						</div>
					</Grid>
					<Grid item xs={7}>
						<div style={{display: 'flex', marginBottom: 10}}>
							<div>
								<div>Promotion Name</div>
								<input name="newPromoName" value={newPromoName} onChange={this.handleChange}  style={{marginTop: 5, marginBottom: 5, padding: 5}}  />
							</div>
							<div>	
								<div>Select Promotion Location</div>
								<select value={newPromoLocationId} onChange={this.selectLocation}  style={{marginTop: 5, marginBottom: 5, padding: 5}} >
									<option value="DEFAULT">Default</option>
									{
										salesOffices.map(location => (
											<option key={location.id} value={location.id}>{location.officeName}</option>
										))
									}
								</select>
							</div>
						</div>
						<Button variant="outlined" color="primary" onClick={this.addPromoListItem} style={{marginLeft: 5}}>Add Promotion Name</Button>
						<div style={{marginTop: 10, marginBottom: 10, fontWeight: 600}}>Existing Promotion Names</div>
						{
							promoList.map((promo, index) => (
								<div key={"promo" + index}style={{display: 'flex', justifyContent: 'space-between', marginBottom: 5, padding: 2, borderBottom: '1px solid black'}}>
									<div>{promo.promoName + " - " + promo.location}</div>
									<Tooltip title="Remove Promotion Name">
										<DeleteIcon style={{color: 'red', cursor: 'pointer'}} onClick={() => this.deletePromoListItem(index)}/>
									</Tooltip>
								</div>
							))
						}
					</Grid>
				</Grid>
				<div style={{padding: 10}}>
					<Button variant="contained" color="primary" onClick={this.addMonth}>Add Promotional Month</Button>
				</div>
			</>
		)
	}
}


interface NewPromotionProps {

}

export const NewPromotion = (props: NewPromotionProps) => {
	return(
		<ModalButton 
			actionOnOpen={() => void 0}
			actionOnClose={() => void 0}
			title={"Create New Promotion"}
			tooltipText="Create New Promotion"
			buttonColor="orange"
			width="md"
			button={<Button variant="contained" color="primary">Add New Month</Button>}
		>
			<PromotionCreator reload={() => void 0} />
		</ModalButton>
	)
}