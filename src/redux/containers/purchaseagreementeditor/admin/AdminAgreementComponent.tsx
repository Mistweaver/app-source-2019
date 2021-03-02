import React from 'react';
import { Grid } from '@material-ui/core';
import TaxPage from '../../taxes/TaxPage';

interface AdminAgreementComponentProps {

}

interface AdminAgreementComponentState {
	isTaxPageDisplayed: boolean;
}

class AdminAgreementComponent extends React.Component<AdminAgreementComponentProps, AdminAgreementComponentState> {
	constructor(props: AdminAgreementComponentProps) {
		super(props);
		this.state = {
			isTaxPageDisplayed: false
		}

		this.showTaxes = this.showTaxes.bind(this);
	}

	private showTaxes() {
		this.setState({ isTaxPageDisplayed: true });
	}

	public render() {
		const { isTaxPageDisplayed } = this.state;
		return(
			<div style={{padding: 15}}>
				<Grid container spacing={2}>
					<Grid item xs={1}>
						<button className="buttonMinimalBlue" onClick={this.showTaxes}>Taxes</button>
					</Grid>
					<Grid item xs={11}>
						{/* { isTaxPageDisplayed && <TaxPage documentType="PA" /> */}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default AdminAgreementComponent;