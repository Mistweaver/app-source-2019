import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../../Store';
import { Grid } from '@material-ui/core';
import { SalesOffice } from '../../../../objects/salesoffice/SalesOffice';

interface EscrowProps {
	salesOffice: SalesOffice;
	buyer1: string;
	buyer2: string;
	mailingStreet: string;
	mailingCity: string;
	mailingState: string;
	mailingZip: string;
	mailingCountry: string;
	deliveryStreet: string;
	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	deliveryCountry: string;
}

function mapStatetoProps(store: StoreState) {
	return {
		salesOffice: store.agreementeditor.office,
		buyer1: store.agreementeditor.buyer1,
		buyer2: store.agreementeditor.buyer2,
		mailingStreet: store.agreementeditor.mailingStreet,
		mailingCity: store.agreementeditor.mailingCity,
		mailingState: store.agreementeditor.mailingState,
		mailingZip: store.agreementeditor.mailingZip,
		mailingCountry: store.agreementeditor.mailingCountry,
		deliveryStreet: store.agreementeditor.deliveryStreet,
		deliveryCity: store.agreementeditor.deliveryCity,
		deliveryState: store.agreementeditor.deliveryState,
		deliveryZip: store.agreementeditor.deliveryZip,
		deliveryCountry: store.agreementeditor.deliveryCountry,
	}
}

interface EscrowState {

}

class Escrow extends React.Component<EscrowProps, EscrowState> {
	constructor(props: EscrowProps) {
		super(props);
		this.state = {

		}
	}

	public render() {
		return(
			<div style={{padding: 15}}>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<div style={{borderRadius: 5}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', display: 'flex', alignContent: 'center'}}>
								<span style={{color: "#BAD2D7", fontSize: '14pt', fontWeight: 450}}>Addendum To Bill of Sale - Escrow Instructions</span>
							</div>

							<div style={{backgroundColor: "rgb(231, 231, 231)", padding: 5}}>
								
							</div>
						</div>
					</Grid>
					<Grid item xs={3}></Grid>
					<Grid item xs={3}></Grid>
					<Grid item xs={3}></Grid>
				</Grid>
			</div>
		)
	}
}

export default connect(mapStatetoProps, {})(Escrow);