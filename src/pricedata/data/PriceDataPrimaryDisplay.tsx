import React from 'react';
import { CircularProgress } from '@material-ui/core';
import LocationDropdown from '../../redux/containers/locationdropdown/LocationDropdown';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { getPriceDataForLocation } from './PriceDataServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { LocationPriceData } from '../objects/LocationPriceData';
import { SeriesData } from '../objects/SeriesData';
import DataEditor from './DataEditor';
import { ACTIVE, PENDING, DRAFT } from '../../data/staticdata';

interface Props {}

interface State {
	salesOffice: SalesOffice;

	loadingPriceData: boolean;

	activeData: SeriesData[];
	pendingData: SeriesData[];
	drafts: SeriesData[];

	activeDataSize: number;
	pendingDataSize: number;
	draftSize: number;

	// are you viewing active, pending, or drafts?
	dataView: string;
	
	// selectedActiveData: PriceData[];
	// selectedPendingData: PriceData[];
	// selectedDrafts: PriceData[];

	error: boolean;
	errorMessage: string;

}

class PriceDataPrimaryDisplay extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			salesOffice: new SalesOffice(),
			loadingPriceData: false,

			activeData: [],
			pendingData: [],
			drafts: [],

			activeDataSize: 0,
			pendingDataSize: 0,
			draftSize: 0,

			dataView: ACTIVE,
			error: false,
			errorMessage: "",
		}

		this.selectSalesOffice = this.selectSalesOffice.bind(this);
		// this.selectPriceData = this.selectPriceData.bind(this);
		this.showActiveData = this.showActiveData.bind(this);
		this.showPendingData = this.showPendingData.bind(this);
		this.showDraftData = this.showDraftData.bind(this);

		this.reload = this.reload.bind(this);

	}

	private selectSalesOffice(office: SalesOffice) {
		this.setState({ salesOffice: office});
		this.loadLocationData(office.id);
	}

	private loadLocationData(locationId: string) {
		this.setState({ loadingPriceData: true });
		getPriceDataForLocation(locationId).then(res => {
			this.setState({ loadingPriceData: false });
			console.log(res);
			if(validateHTMLResponse(res)) {
				
				let _activeDataSize = 0;
				let _pendingDataSize = 0;
				let _draftDataSize = 0;

				if(locationId === "") {
					let _activeData: SeriesData[] = [];
					let _pendingData: SeriesData[] = [];
					let _drafts: SeriesData[] = [];
					
		
					let responseData: LocationPriceData[] = res.data;
					responseData.forEach(locationData => {
						locationData.activeData.forEach(series => { 
							_activeData.push(series); 
							series.priceData.forEach(data => { _activeDataSize++; })
						
						});
						locationData.pendingData.forEach(series => { 
							_pendingData.push(series); 
							series.priceData.forEach(data => { _pendingDataSize++; })
						
						});
						locationData.drafts.forEach(series => { 
							_drafts.push(series); 
							series.priceData.forEach(data => { _draftDataSize++; })
						});
					});
					this.setState({ 
						activeData: _activeData,
						pendingData: _pendingData,
						drafts: _drafts,
						activeDataSize: _activeDataSize,
						pendingDataSize: _pendingDataSize,
						draftSize: _draftDataSize
					});
				} else {
					let responseData: LocationPriceData = res.data;
					responseData.activeData.forEach(series => { 
						series.priceData.forEach(data => { _activeDataSize++; })
					
					});
					responseData.pendingData.forEach(series => { 
						series.priceData.forEach(data => { _pendingDataSize++; })
					
					});
					responseData.drafts.forEach(series => { 
						series.priceData.forEach(data => { _draftDataSize++; })
					});
					this.setState({ 
						activeData: responseData.activeData,
						pendingData: responseData.pendingData,
						drafts:responseData.drafts,
						activeDataSize: _activeDataSize,
						pendingDataSize: _pendingDataSize,
						draftSize: _draftDataSize
					});
				}

				

				

			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		}).catch(err => {
			this.setState({ loadingPriceData: false, error: true, errorMessage: err });
		});
	}

	private reload() {
		this.loadLocationData(this.state.salesOffice.id);
	}

	private showActiveData() { this.setState({ dataView: ACTIVE }); }
	private showPendingData() { this.setState({ dataView: PENDING }); }
	private showDraftData() { this.setState({ dataView: DRAFT }); }

	public render() {
		const { activeData, pendingData, drafts, loadingPriceData, dataView, salesOffice, activeDataSize, pendingDataSize, draftSize } = this.state;
		return(
			<>
				<div style={{display: 'flex'}}>
					<div style={{
						padding: '5px 20px',
						backgroundColor: 'rgb(231, 231, 231)',
						borderTopLeftRadius: 12,
						borderTopRightRadius: 12,
					}}>					
						<LocationDropdown currentSelection={salesOffice.id} allLocationsOption={true} selectLocation={this.selectSalesOffice} />
					</div>
					<div onClick={this.showActiveData} className={dataView === ACTIVE ? "draftTabActive" : "draftTab" } >
						<div style={{margin: 'auto'}}>Active ({activeDataSize})</div>
					</div>
					<div onClick={this.showPendingData} className={dataView === PENDING ? "draftTabActive" : "draftTab" } >
						<div style={{margin: 'auto'}}>Pending ({pendingDataSize})</div>
					</div>
					<div onClick={this.showDraftData} className={dataView === DRAFT ? "draftTabActive" : "draftTab" }>
						<div style={{margin: 'auto'}}>Drafts ({draftSize})</div>
					</div>
				</div>
				
				{
					loadingPriceData ?
					<div style={{padding: 25, backgroundColor: 'rgb(231, 231, 231)', textAlign: 'center'}}>
						<div style={{marginBottom: 10}}>Loading {salesOffice.id === "" ? "All Location" : salesOffice.officeName} Data...</div>
						<CircularProgress style={{marginRight: 10, width: 24, height: 24}} />
					</div>
					:
					<div>
						{/* ACTIVE DATA */}
						<DataEditor
							locationQueryId={salesOffice.id}
							render={dataView === ACTIVE ? true : false}
							dataType={ACTIVE}
							data={activeData}
							reload={this.reload}
						/>
						{/* PENDING DATA */}
						<DataEditor
							locationQueryId={salesOffice.id}
							render={dataView === PENDING ? true : false}
							dataType={PENDING}
							data={pendingData}
							reload={this.reload}

						/>
						{/* DRAFTS */}
						<DataEditor
							locationQueryId={salesOffice.id}
							render={dataView === DRAFT ? true : false}
							dataType={DRAFT}
							data={drafts}
							reload={this.reload}
						/>
					</div>
				}
				
			</>
		)
	}
}

export default PriceDataPrimaryDisplay;