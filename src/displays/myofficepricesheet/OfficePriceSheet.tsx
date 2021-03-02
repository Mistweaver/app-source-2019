import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { User } from '../../objects/user/User';
import { ConvertMonthIntegerToString } from '../../utilities/ConvertMonthIntegerToString';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { CurrentPriceDataPackage } from '../../redux/containers/purchaseagreementeditor/page1/CurrentPriceDataPackage';
import { getCurrentPriceData } from '../../pricedata/data/PriceDataServices';
import { checkIfDev } from '../../auth/AccessControlFunctions';
import SeriesDisplayComponent from '../../redux/containers/purchaseagreementeditor/page1/SeriesDisplayComponent';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/Store';
import LocationDropdown from '../../redux/containers/locationdropdown/LocationDropdown';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';

interface Props {
	user: User;
}

function mapStateToProps(store: StoreState) {
	return {
		user: store.application.user
	}
}

interface OfficePriceSheetState {
	// microsoftProfile: MicrosoftToken;
	promotionState: string;

	currentData: CurrentPriceDataPackage;

	// if developer
	locationId: string;

	loading: boolean;
	error: boolean;
	errorMessage: string;
}

class OfficePriceSheet extends React.Component<Props, OfficePriceSheetState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			// microsoftProfile: getMicrosoftProfile(),
			promotionState: "",
			error: false,
			errorMessage: "", 
			loading: false,
			currentData: new CurrentPriceDataPackage(),
			locationId: ""

		}

		this.loadDataForLocation = this.loadDataForLocation.bind(this);
	}

	componentDidMount() {
		this.setState({ locationId: this.props.user.locationId });
		this.loadData();
	}

	componentDidUpdate(prevProps: Props) {
		if(prevProps.user.id !== this.props.user.id) {
			this.setState({ locationId: this.props.user.locationId });
			this.loadData();
		}
	}

	private loadData() {
		this.setState({ loading: true, error: false, errorMessage: "" });
		if(this.props.user.locationId !== "") {
			getCurrentPriceData(this.props.user.locationId).then(res => {
				this.setState({ loading: false });
				// console.log(res);
				if(validateHTMLResponse(res)) {
					this.setState({ currentData: res.data });
				} else {
					this.setState({
						error: true,
						errorMessage: res.data,
						currentData: new CurrentPriceDataPackage()
					})
				}
	
			});
		}
		
	}

	private loadDataForLocation(office: SalesOffice) {
		this.setState({ loading: true, error: false, errorMessage: "" });
		getCurrentPriceData(office.id).then(res => {
			this.setState({ loading: false });
			// console.log(res);
			if(validateHTMLResponse(res)) {
				this.setState({ currentData: res.data });
			} else {
				this.setState({
					error: true,
					errorMessage: res.data,
					currentData: new CurrentPriceDataPackage()
				})
			}

		});
	}

	public render() {
		const { loading, errorMessage, error, currentData  } = this.state;
		//console.log(currentData);
		/*
		 * Sort the series data by model.estimatedSquareFeet (lower to higher)
		 */
		//currentData.priceDataList[0].priceData[0].model.estimatedSquareFeet
		for(var i=0; i<currentData.priceDataList.length; i++) {
			currentData.priceDataList[i].priceData.sort(function (a, b) { return (a.model.estimatedSquareFeet > b.model.estimatedSquareFeet) ? 1 : -1;});
		}

		let today = new Date();

		return(
			<div style={{padding: 15}}>
				<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 20}}>
					{
						checkIfDev && 
						<LocationDropdown allLocationsOption={false} selectLocation={this.loadDataForLocation} currentSelection={this.state.locationId} />
					}
					<div style={{marginTop: 15}} >
						<div style={{fontSize: '18pt'}}>{this.state.currentData.office.officeName} Pricing for { ConvertMonthIntegerToString(today.getMonth()) + ' ' + today.getDate() + ', ' + today.getFullYear()}</div>
					</div>
				</div>
				<div style={{height: '70vh', overflowY: 'auto', backgroundColor: "rgb(231, 231, 231)"}}>
					{
						error &&
						<div>
							Error: {errorMessage}
						</div>
					}
					{
						loading ?
						<div style={{padding: 20}}>
							<CircularProgress />
							<div>Loading Price Data...</div>
						</div>
						:
						<table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
							<thead>
								<tr style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}></th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Name</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Model No.</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Type</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Size</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Bed/Bath</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Sq. Ft.</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>MSRP</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Discount</th>
									<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Sale Price</th>
									{
										checkIfDev() &&
										<>
											<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>active</th>
											<th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>exp</th>
										</>
									}
								</tr>
							</thead>
							<tbody>
							{
								currentData.priceDataList.map((series, index) => (
									<SeriesDisplayComponent 
										key={series.seriesName + index}
										series={series.priceData}
										seriesName={series.seriesName}
										promotions={currentData.promotionModelList ? currentData.promotionModelList.modelIds : [] }
										promoMonthHalf={currentData.currentPromotionHalf}
										selectData={() => void(0)}
									/>
								))
							}
							</tbody>
						</table>
					}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, {})(OfficePriceSheet);