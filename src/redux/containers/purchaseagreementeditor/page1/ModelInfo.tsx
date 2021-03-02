import React from 'react';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { updateGenericInformation } from '../../../actions/AgreementEditorActions';
import ModelSelectionModal from './ModelSelectionModal';

interface ModelInfoProps {
	make: string,
	model: string,
	manufacturer: string,
	modelType: string,
	bedrooms: string,
	baths: string,
	floorSize: string,
	hitchSize: string,
	approximateSquareFeet: number,

	dens: string,
	year: string,
	serialNumber: string,
	newModel: boolean

	updateGenericInformation: (targetedField: string, newValue: string) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		make: state.agreementeditor.make,
		model: state.agreementeditor.model,
		manufacturer: state.agreementeditor.manufacturer,
		modelType: state.agreementeditor.modelType,
		bedrooms: state.agreementeditor.bedrooms,
		baths: state.agreementeditor.baths,
		floorSize: state.agreementeditor.floorSize,
		hitchSize: state.agreementeditor.hitchSize,
		approximateSquareFeet: state.agreementeditor.approximateSquareFeet,

		dens: state.agreementeditor.dens,
		year: state.agreementeditor.year,
		serialNumber: state.agreementeditor.serialNumber,
		newModel: state.agreementeditor.newModel
	}
}

interface ModelInfoState {
	// displayModelSelectionModal: boolean;
}

class ModelInfo extends React.Component<ModelInfoProps, ModelInfoState> {
	constructor(props: ModelInfoProps) {
		super(props);
		this.state = {
			// displayModelSelectionModal: false
		}

		// this.openModelSelectionModal = this.openModelSelectionModal.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
	}
	
	
	private handleFormChange(event: { target: { name: string, value: string }; }) {
		const { name, value } = event.target;
		this.props.updateGenericInformation(name, value);
	}

	/*private openModelSelectionModal() {
		this.setState(prevState => ({ displayModelSelectionModal: !prevState.displayModelSelectionModal}));
	}
*/
	public render() {
		const { model, make, year, bedrooms, baths, dens, serialNumber, newModel, floorSize, hitchSize, approximateSquareFeet, manufacturer } = this.props;
		// const { displayModelSelectionModal } = this.state;
		return (
			<>
				<div style={{display: 'flex'}}>
					<div className="input-box" style={{width: "15%", margin: 0, display: 'flex'}}>
						<ModelSelectionModal />
					</div>
					<div className="input-box" style={{width: "35%", margin: 0, display: 'flex'}}>
						<div className="label">MAKE AND MODEL</div>
						<div>{make + ' ' + model  + ' - ' + manufacturer }</div>
					</div>
					<div className="input-box" style={{width: "12.5%", margin: 0}}>
						<div className="label">YEAR</div>
						<input name="year" onChange={this.handleFormChange} value={year} />
					</div>
					<div className="input-box" style={{width: "12.5%", margin: 0}}>
						<div className="label">BEDROOMS</div>
						<input name="bedrooms" onChange={this.handleFormChange} value={bedrooms} />
					</div>
					<div className="input-box" style={{width: "12.5%", margin: 0}}>
						<div className="label">BATHS</div>
						<input name="baths" onChange={this.handleFormChange} value={baths} />
					</div>

					<div className="input-box" style={{width: "12.5%", margin: 0}}>
						<div className="label">DENS</div>
						<input name="dens" value={dens} onChange={this.handleFormChange} />
					</div>
				</div>

				<div style={{display: 'flex', width: "100%"}}>
					<div className="input-box" style={{width: "30%", margin: 0}}>
						<div className="label">SERIAL NUMBER</div>
						<input placeholder="#" name="serialNumber" value={serialNumber} onChange={this.handleFormChange}/>
					</div>
					<div style={{display: 'flex', width: '20%', margin: 0}}>
						<select style={{width: '100%', backgroundColor: 'transparent'}} onChange={this.handleFormChange} name="newModel" value={newModel.toString()}>
							<option value={"true"}>New</option>
							<option value={"false"}>Used</option>
						</select>
					</div>

					<div className="input-box" style={{width: "16.666666666%", margin: 0}}>
						<div className="label">FLOOR SIZE (ft)</div>
						<input name="floorSize" onChange={this.handleFormChange} value={floorSize} />
					</div>
					<div className="input-box" style={{width: "16.666666666%", margin: 0}}>
						<div className="label">HITCH SIZE (ft)</div>
						<input name="hitchSize" onChange={this.handleFormChange} value={hitchSize} />
					</div>
					<div className="input-box" style={{width: "16.666666666%", margin: 0}}>
						<div className="label">APPROX. SQ FT</div>
						<input name="approximateSquareFeet" onChange={this.handleFormChange} value={approximateSquareFeet} />
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, { updateGenericInformation })(ModelInfo);