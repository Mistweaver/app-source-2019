import React from 'react';
import { Grid } from '@material-ui/core';
import { Promotion } from './Promotion';
import DayOfTheWeek from './DayOfTheWeek';
import { ConvertMonthIntegerToString } from '../../utilities/ConvertMonthIntegerToString';
import { FlexedRowInfo } from '../../components/flexedrowdisplay/FlexedRowInfo';
import { EditPromotionMonth } from './EditPromotionMonth';

interface Props {
	promo: Promotion;
}

class CalendarMonth extends React.Component<Props, {}> {
	
	public render() {
		const { promo } = this.props;
		// create date object for the month
		// let month = new Date(promo.month + 1 + "/1/" + promo.year);
		// console.log(month);
		// get the number of days in the month
		// let numberOfDays = new Date(promo.year, promo.month + 1, 0).getDate();
		// console.log("Number of Days in Month:" + numberOfDays);
		// get the day of the week of the first of the month
		// let firstOfTheMonthDay = month.getDay();
		// console.log("First day of the month is: " + firstOfTheMonthDay);



		// let calendarDays: any[] = [];
		// add the number of blank days before the first of the month
		/*for(var i = 0; i < firstOfTheMonthDay; i++) {
			calendarDays.push(
				<DayOfTheWeek key={promo.month + "minus" + (firstOfTheMonthDay - i)} innerText="" />
			)
		}/

		for(var j = 1; j <= numberOfDays; j++) {
			// calendarDays.push(i);
			/*let dateString = 
			switch(j) {
				case promo.firstHalfStartDate: {
					calendarDays.push(
						<DayOfTheWeek key={j} innerText={(j).toString()} color="red" />
					);
					break;
				}
				case promo.firstHalfEndDate: {
					calendarDays.push(
						<DayOfTheWeek key={j} innerText={(j).toString()} color="red" />
					);
					break;
				}
				case promo.secondHalfStartDate: {
					calendarDays.push(
						<DayOfTheWeek key={j} innerText={(j).toString()} color="green" />
					);
					break;
				}
				case promo.secondHalfEndDate: {
					calendarDays.push(
						<DayOfTheWeek key={j} innerText={(j).toString()} color="green" />
					);
					break;
				}
				default: {
					calendarDays.push(
						<DayOfTheWeek key={j} innerText={(j).toString()} />
					);
					break;
				}
			}
		}*/

		return(
			<Grid item xs={3}>
				<div style={{backgroundColor: 'rgb(231, 231, 231)', borderRadius: 15}}>
					<div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '5px solid #73B2C9', padding: 10}}>
						<div style={{fontSize: '14pt', fontWeight: 600, marginTop: 'auto', marginBottom: 'auto'}}>
							{ ConvertMonthIntegerToString(promo.month) + ' ' + promo.year}
						</div>
						<EditPromotionMonth promo={this.props.promo} />
					</div>


				
					
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						borderBottom: '2px solid lightgrey'
					}}>
						<DayOfTheWeek innerText="Su" />
						<DayOfTheWeek innerText="M" />
						<DayOfTheWeek innerText="Tu" />
						<DayOfTheWeek innerText="W" />
						<DayOfTheWeek innerText="Th" />
						<DayOfTheWeek innerText="F" />
						<DayOfTheWeek innerText="Sa" />
					</div>
					{/*
					<div style={{
						display: 'flex', 
						flexWrap: 'wrap'
					}}>
						{calendarDays}
					</div>*/}
					<div style={{padding: 10}}>
						<FlexedRowInfo field="Start Date" property={this.props.promo.startDate} bold={true} />
						<FlexedRowInfo field="Mid Month" property={this.props.promo.midMonthDate} bold={true} />
						<FlexedRowInfo field="End Date" property={this.props.promo.endDate} bold={true} />
					</div>
					<div style={{padding: 10}}>
						<div>Promotion Name:</div>
						{
							promo.promoList.map((promoNames, index) => (
								<p
									key={promoNames.promoName + index}
									style={{margin: 0, fontSize: 11}}
								>
									<FlexedRowInfo field={promoNames.promoName} property={promoNames.location} bold={false} />
								</p>
							))
						}
					</div>
				</div>
			</Grid>
		)
	}
}

export default CalendarMonth;