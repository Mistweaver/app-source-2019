import React from 'react';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import { updateGenericInformation, updateDeliveryState } from '../../../actions/AgreementEditorActions';
import { User } from '../../../../objects/user/User';
import { getUsersByLocation } from '../../../../services/UserServices';
import { validateHTMLResponse } from '../../../../services/HttpResponseChecker';
import { STATES } from '../../../../data/staticdata';

interface BuyerInfoProps {
	// buyer details
	buyer1: string;
	buyer2: string;
	phone: string;
	cell: string;
	emailAddress: string;
	emailAddress2: string;

	mailingStreet: string;
	mailingCity: string;
	mailingState: string;
	mailingZip: string;
	mailingCountry: string;

	year: string;
	dens: string;
	serialNumber: string;
	newModel: boolean;

	notes: string;
	windZone: number;
	
	updateGenericInformation: (targetedField: string, newValue: string) => void;
	updateDeliveryState: (stateSelected: string) => void;

	// from agreement state
	contractRevisedFrom: string;
	contractRevisedFromDate: string;
	date: string

	// agreement financials
	deliveryState: string;
	deliveryStreet: string;
	deliveryCity: string;
	deliveryZip: string;

	salesPerson: string;
	purchaseAgreementLocationId: string;
}

function mapStateToProps(state: StoreState) {
	return {
		purchaseAgreementLocationId: state.agreementeditor.locationId,
		buyer1: state.agreementeditor.buyer1,
		buyer2:  state.agreementeditor.buyer2,
		phone:  state.agreementeditor.phone,
		cell:  state.agreementeditor.cell,
		emailAddress:  state.agreementeditor.emailAddress,
		emailAddress2:  state.agreementeditor.emailAddress2,

		mailingStreet:  state.agreementeditor.mailingStreet,
		mailingCity:  state.agreementeditor.mailingCity,
		mailingState: state.agreementeditor.mailingState,
		mailingZip:  state.agreementeditor.mailingZip,
		mailingCountry:  state.agreementeditor.mailingCountry,

		year:  state.agreementeditor.year,
		dens:  state.agreementeditor.dens,
		serialNumber:  state.agreementeditor.serialNumber,
		newModel: state.agreementeditor.newModel,

		notes:  state.agreementeditor.notes,
		windZone: state.agreementeditor.windZone,

		contractRevisedFrom: state.agreementeditor.contractRevisedFrom,
		contractRevisedFromDate: state.agreementeditor.contractRevisedFromDate,
		date: state.agreementeditor.date,

		// agreement financials
		deliveryState: state.agreementeditor.deliveryState,
		deliveryStreet: state.agreementeditor.deliveryStreet,
		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryZip: state.agreementeditor.deliveryZip,

		salesPerson: state.agreementeditor.salesPerson
	}
}

interface BuyerInfoState {
	locationUsers: User[];
}

class BuyerInfo extends React.Component<BuyerInfoProps, BuyerInfoState> {
	constructor(props: BuyerInfoProps) {
		super(props);
		this.state = {
			locationUsers: []
		}
	}

	componentDidMount() {
		getUsersByLocation(this.props.purchaseAgreementLocationId).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					locationUsers: res.data._embedded.users
				});
			}
		});
	}

	private handleFormChange = (event: { target: { name: string, value: string }}) => {
		const { name, value } = event.target;
		this.props.updateGenericInformation(name, value);
	}

	private handleDeliveryStateChange = (event: { target: { name: string, value: string }}) => {
		const { value } = event.target;
		this.props.updateDeliveryState(value);
	}

	public render() {
		return (
			<>
				<div style={{display: 'flex'}}>
					<div className="input-box" style={{width: "33.333333%", margin: 0}}>
						<div className="label">BUYER 1</div>
						<input placeholder="BUYER 1" name="buyer1" onChange={this.handleFormChange} value={this.props.buyer1}/>
					</div>
					<div className="input-box" style={{width: "33.333333%", margin: 0}} >
						<div className="label">BUYER 2</div>
						<input placeholder="BUYER 2" name="buyer2" onChange={this.handleFormChange} value={this.props.buyer2}/>
					</div>
					<div className="input-box" style={{width: "15%", margin: 0}}>
						<div className="label">DATE</div>
						<input placeholder="DATE" name="date" onChange={this.handleFormChange} value={this.props.date}/>
					</div>
					<div className="input-box" style={{width: "18.333333%", margin: 0}} >
						<div className="label">THIS CONTRACT REVISED FROM</div>
						<div>{this.props.contractRevisedFromDate}</div>
					</div>
				</div>

				<div style={{display: 'flex'}}>
					<div className="input-box" style={{width: "33.333333%", margin: 0}} >
						<div className="label">MAILING ADDRESS</div>
						<input style={{}} placeholder="MAILING STREET" name="mailingStreet" onChange={this.handleFormChange} value={this.props.mailingStreet}/>
					</div>
					<div className="input-box" style={{width: "20%", margin: 0}} >
						<div className="label">MAILING CITY</div>
						<input style={{}} placeholder="MAILING CITY" name="mailingCity" onChange={this.handleFormChange} value={this.props.mailingCity}/>
					</div>
					<div className="input-box" style={{width: "10%", margin: 0}} >
						<div className="label">STATE</div>
						<select name="mailingState" onChange={this.handleFormChange} value={this.props.mailingState}>
							<option value="">select state</option>
							{
								STATES.map(state => (
									<option key={state.id} value={state.abbreviation}>{state.name}</option>
								))
							}
						</select>
					</div>
					<div className="input-box" style={{width: "10%", margin: 0}} >
						<div className="label">MAILING ZIP</div>
						<input style={{}} placeholder="MAILING ZIP" name="mailingZip" onChange={this.handleFormChange} value={this.props.mailingZip}/>

					</div>
					<div className="input-box" style={{width: "26.666666%", margin: 0}} >
						<div className="label">PHONE</div>
						<input style={{}} placeholder="PHONE" name="phone" onChange={this.handleFormChange} value={this.props.phone}/>
					</div>
				</div>

				<div style={{display: 'flex'}}>
					<div className="input-box" style={{width: "33.333333%", margin: 0}} >
						<div className="label">DELIVERY ADDRESS</div>
						<input style={{}} placeholder="DELIVERY STREET" name="deliveryStreet" onChange={this.handleFormChange} value={this.props.deliveryStreet} />
					</div>
					<div className="input-box" style={{width: "20%", margin: 0}} >
						<div className="label">DELIVERY CITY</div>
						<input style={{}} placeholder="DELIVERY CITY" name="deliveryCity" onChange={this.handleFormChange} value={this.props.deliveryCity}/>
					</div>
					<div className="input-box" style={{width: "10%", margin: 0}} >
						<div className="label">DELIVERY STATE</div>
						<select name="deliveryState" onChange={this.handleDeliveryStateChange} value={this.props.deliveryState} >
							<option value="">select state</option>
							{
								STATES.map(state => (
									<option key={state.id} value={state.abbreviation}>{state.name}</option>
								))
							}
						</select>
					</div>
					<div className="input-box" style={{width: "10%", margin: 0}} >
						<div className="label">DELIVERY ZIP</div>
						<input style={{}} placeholder="DELIVERY ZIP" name="deliveryZip" onChange={this.handleFormChange} value={this.props.deliveryZip}/>
					</div>
					<div className="input-box" style={{width: "26.666666%", margin: 0}} >
						<div className="label">CELL</div>
						<input style={{}} placeholder="CELL" name="cell" onChange={this.handleFormChange} value={this.props.cell}/>
					</div>
				</div>

				<div style={{display: 'flex'}}>
					<div className="input-box" style={{width: "33.333333%", margin: 0}}>
						<div className="label">SALES PERSON</div>
						<select style={{}} name="salesPerson" value={this.props.salesPerson} onChange={this.handleFormChange}>
							<option value=""></option>
							{
								this.state.locationUsers.map(user => (
									<option key={user.id} value={user.name + ' - ' + user.licenseNumber}>{user.name + ' - ' + user.licenseNumber}</option>
								))
							}
						</select>
					</div>
					
					<div className="input-box" style={{width: "33.333333%", margin: 0}} >
						<div className="label">EMAIL ADDRESS</div>
						<input style={{}} placeholder="EMAIL ADDRESS" name="emailAddress" onChange={this.handleFormChange}  value={this.props.emailAddress}/>
					</div>
					<div className="input-box" style={{width: "33.333333%", margin: 0}} >
						<div className="label">EMAIL ADDRESS 2</div>
						<input style={{}} placeholder="EMAIL ADDRESS" name="emailAddress2" onChange={this.handleFormChange}  value={this.props.emailAddress2}/>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, { updateGenericInformation, updateDeliveryState })(BuyerInfo);