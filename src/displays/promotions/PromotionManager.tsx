import React from 'react';
import { Card, CardContent, Grid, LinearProgress } from '@material-ui/core';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import CalendarMonth from './CalendarMonth';
import { getPromotionsByYear } from './PromoServices';
import { Promotion } from './Promotion';
import { NewPromotion } from './NewPromotion';

interface PromotionManagerState {
	promotions: Promotion[];
	currentMonth: number;
	selectedYear: number;
	loading: boolean;
}

class PromotionManager extends React.Component<{}, PromotionManagerState> {

	constructor(props: {}) {
		super(props);
		this.state = {
			promotions: [],
			currentMonth: new Date().getMonth(),
			selectedYear: new Date().getFullYear(),
			loading: true,
		}

		this.selectNewPromoYear = this.selectNewPromoYear.bind(this);
	}

	componentDidMount() {
		this.loadPromosForSelectedYear(new Date().getFullYear());
	}

	private selectNewPromoYear(event: { target: { value: string }; }) {
		this.setState({ selectedYear: parseInt(event.target.value) });
		this.loadPromosForSelectedYear(parseInt(event.target.value));
	}

	private loadPromosForSelectedYear(year: number) {
		this.setState({ loading: true });
		getPromotionsByYear(year).then(res => {
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.setState({
					promotions: res.data._embedded.promos
				});
			}
		})
	}





	public render() {
		const { promotions, selectedYear, loading } = this.state;

		let yearSelectionArray: number[] = [];
		for(var i = 2019; i <= (new Date().getFullYear() + 2); i++) {
			yearSelectionArray.push(i);
		}

		return(
			<>
				<div style={{padding: 10, backgroundColor: 'rgb(231, 231, 231)', borderRadius: 15, marginBottom: 15}}>
					<div style={{marginBottom: 5, fontSize: '17pt', fontWeight: 600}}>Promotions</div>
					<div style={{display: 'flex'}}>
						<select value={selectedYear} onChange={this.selectNewPromoYear} style={{padding: 10}}>
							{
								yearSelectionArray.map(year => (
									<option key={year} value={year}>{year}</option>
								))
							}
						</select>
						<NewPromotion />
					</div>
				</div>
				<Grid container spacing={2}>
					{
						loading === true &&
						<Grid item xs={12}>
							<div style={{padding: 10 }}>
								<LinearProgress />
							</div>
						</Grid>
					}
					{
						!loading && promotions.length === 0 &&
						<Grid item xs={3}>
							<Card>
								<CardContent>
									It doesn't look like there are any promotional months for this year so far
								</CardContent>
							</Card>
						</Grid>
					}
					{
						promotions.map(promotion => (
							<CalendarMonth key={promotion.id} promo={promotion} />
						))
					}
				</Grid>
			</>
		)
	}
}


export default PromotionManager;