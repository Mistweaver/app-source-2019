import React from 'react';
import { Model } from '../../objects/models/Model';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { FormatNumberAsMoney } from '../../utilities/FormatNumberAsMoney';
import DeleteModelComponent from './DeleteModelComponent';
import { EditModelDisplay } from './editmodel/EditModelDisplay';
import { getModelPriceData } from './ModelServices';
import NewDataForModelComponent from './newdraftcomponents/NewDataForModelComponent';
import { PriceDataWithOfficePackage } from './objects/PriceDataWithOfficePackage';

interface Props {
	model: Model;
	viewModel: (model: Model) => void;
}
interface State {
	modelPriceData: PriceDataWithOfficePackage[];
}

class ModelPriceDataComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			modelPriceData: []
		}

		this.getDataForSelectedModel = this.getDataForSelectedModel.bind(this);

	}

	componentDidMount() { this.getDataForSelectedModel(); }
	componentDidUpdate(prevProps: Props) {
		if(prevProps.model.id !== this.props.model.id) {
			this.getDataForSelectedModel();
		}
	}

	private getDataForSelectedModel() {
		if(this.props.model.id !== "") {
			getModelPriceData(this.props.model.id).then(res => {
				if(validateHTMLResponse(res)) {
					this.setState({ modelPriceData: res.data });
				}
			});
		}
	}

	public render(){
		const { model } = this.props;
		const { modelPriceData } = this.state;

		if(model.id === "") {
			return null;
		} else {
			return(
				<div style={{backgroundColor: "rgb(231, 231, 231)"}}>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", display: 'flex'}}>
						<div style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 15}}>Model {this.props.model.modelNumber}</div>
						<EditModelDisplay 
							model={this.props.model}
							reload={() => this.props.viewModel(this.props.model)}
						/>
						<DeleteModelComponent 
							model={this.props.model}
							reload={() => this.props.viewModel(new Model())}
						/>
					</div>
					<div style={{backgroundColor: "rgb(231, 231, 231)", padding: 5}}>
						<div>{model.type + " made by " + this.props.model.factoryId}</div>
						<div>{model.numberOfBedrooms.toString() + " bed " + model.numberOfBathrooms.toString() + " bathrooms" }</div>
						<div>{model.numberOfDens !== 0 && model.numberOfDens.toString() + " dens"}</div>
						<div>{model.width.toString() + " ft. wide by " + model.length1.toString() + " ft. "}{model.length2 !== 0 && "( " + model.length2.toString() + " ft. )"}  long</div>
						<div>{model.estimatedSquareFeet.toString() + " sq. ft."}</div>
						<div>Extra Features: {model.extraFeatures}</div>
						<div>Notes: {model.notes}</div>
					</div>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", display: 'flex'}}>
						<div style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 15}}>Existing Price Data</div>
						<NewDataForModelComponent 
							model={model}
							reload={this.getDataForSelectedModel}
							existingPriceData={this.state.modelPriceData}
						/>
					</div>
					<div style={{padding: 5}}>
						<table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
							<thead>
								<tr>
									<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Model No.</th>
									<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Name</th>
									<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Location</th>
									<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Series</th>
									<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Status</th>
									<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0}}>Price</th>
								</tr>
							</thead>
							<tbody>
							{
								modelPriceData.map(priceData => (
									<tr key={priceData.data.id} className="leadRow">
										<td>{priceData.data.model.modelNumber}</td>
										<td>{priceData.data.name}</td>
										<td>{priceData.office.officeName}</td>
										<td>{priceData.data.seriesName}</td>
										<td>{priceData.data.status}</td>
										<td>{FormatNumberAsMoney(priceData.data.factoryDirectPrice)}</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			)
		}
	}
}

export default ModelPriceDataComponent;