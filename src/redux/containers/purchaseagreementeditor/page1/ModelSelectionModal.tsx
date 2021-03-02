import React from 'react';
import { Dialog, Button, DialogTitle, CircularProgress } from '@material-ui/core';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { selectModel, ModelSelectionDataPackage } from '../../../actions/AgreementEditorActions';
import { validateHTMLResponse } from '../../../../services/HttpResponseChecker';
import { CurrentPriceDataPackage } from './CurrentPriceDataPackage';
import { getCurrentPriceData } from '../../../../pricedata/data/PriceDataServices';
import SeriesDisplayComponent from './SeriesDisplayComponent';
import { PriceData } from '../../../../pricedata/objects/PriceData';
import { Close } from '@material-ui/icons';
import { checkIfDev } from '../../../../auth/AccessControlFunctions';

interface ModelSelectionModalProps {
	selectModel: (dataPackage: ModelSelectionDataPackage) => void;
	locationId: string;
}

function mapStateToProps(state: StoreState) {
	return {
		locationId: state.agreementeditor.locationId
	}
}

interface ModelSelectionModalState {
	renderModal: boolean;
	error: boolean;
	errorMessage: string;

	currentData: CurrentPriceDataPackage;
	loading: boolean;

}

// sets the state of the month so when you select the promo model, it knows which value to pull from the price sheet 
// const FIRST_HALF_PROMOTION_VALUES = "FIRST_HALF_PROMOTION_VALUES";
// const SECOND_HALF_PROMOTION_VALUES = "SECOND_HALF_PROMOTION_VALUES";

class ModelSelectionModal extends React.Component<ModelSelectionModalProps, ModelSelectionModalState> {

	constructor(props: ModelSelectionModalProps) {
		super(props);
		this.state = {
			renderModal: false,
			error: false,
			errorMessage: "", 
			loading: false,
			currentData: new CurrentPriceDataPackage()
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.selectPriceData = this.selectPriceData.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps: ModelSelectionModalProps) {
		if(prevProps.locationId !== this.props.locationId) {
			this.loadData();
		}
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private loadData() {
		this.setState({ loading: true });
		getCurrentPriceData(this.props.locationId).then(res => {
			this.setState({ loading: false });
			console.log(res);
			if(validateHTMLResponse(res)) {
				this.setState({ currentData: res.data });
			} else {
				this.setState({
					error: true,
					errorMessage: res.data
				})
			}

		})
	}


	private selectPriceData(data: PriceData, promotion: boolean) {

		const { currentData } = this.state;
		let modelSelectionDataPackage = new ModelSelectionDataPackage();

		modelSelectionDataPackage.make = data.name;
		modelSelectionDataPackage.model = data.model.modelNumber;
		modelSelectionDataPackage.manufacturer = data.model.factoryId;
		modelSelectionDataPackage.modelType = data.model.type;
		modelSelectionDataPackage.bedrooms = data.model.numberOfBedrooms.toString();
		modelSelectionDataPackage.baths = data.model.numberOfBathrooms.toString();
		modelSelectionDataPackage.floorSize = data.model.width + " x " + data.model.length1 + (data.model.length2 === 0 ? "" : data.model.length2);
		modelSelectionDataPackage.hitchSize = (data.model.length1 + 4).toString();
		modelSelectionDataPackage.approximateSquareFeet = data.model.estimatedSquareFeet;
		modelSelectionDataPackage.retailPrice = data.msrp;
		modelSelectionDataPackage.factoryDirectPrice = data.factoryDirectPrice;
		modelSelectionDataPackage.factoryTotalCost = data.factoryTotalCost;
		modelSelectionDataPackage.promotionDiscountPrice = 0;


		if(promotion) {
			modelSelectionDataPackage.promotionName = this.state.currentData.promotion.promoList[0].promoName;

			if(currentData.currentPromotionHalf === 1) {
				modelSelectionDataPackage.promotionSelectionHalf = "firstHalf";
				modelSelectionDataPackage.promotionDiscountPrice = data.firstHalfAdvertisingPrice;
			} else if(currentData.currentPromotionHalf === 2) {
				modelSelectionDataPackage.promotionDiscountPrice = data.secondHalfAdvertisingPrice;
				modelSelectionDataPackage.promotionSelectionHalf = "secondHalf";
			}
		}
		
		modelSelectionDataPackage.modelSelectionDate = new Date().toLocaleDateString();

		this.props.selectModel(modelSelectionDataPackage);
		this.closeModal();

	}

	public render() {
		const { renderModal, loading, errorMessage, error, currentData  } = this.state;
		return(
			<div style={{margin: 'auto'}}>
				<Button variant="contained" color="primary" onClick={this.showModal}>
					Select Model
				</Button>					
				<Dialog
					open={renderModal}
					aria-labelledby="form-dialog-title"
					maxWidth="lg"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<div>Select Model</div>
						<div>
							<Close style={{color: 'red', marginLeft: 25, cursor: 'pointer'}} onClick={this.closeModal}/>		
							<span>Close</span>
						</div>
						</div>
						
					</DialogTitle>
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
											// promotions={[]}
											selectData={this.selectPriceData}
										/>
									))
								}
								</tbody>
							</table>
						}
					</div>
				</Dialog>
			</div>
		)
	}
}

export default connect(mapStateToProps, { selectModel })(ModelSelectionModal);