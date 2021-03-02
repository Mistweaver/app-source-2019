import React from 'react';
import BuyerInfo from './BuyerInfo';
import './Page1.css';
import ModelInfo from './ModelInfo';
import NoticeOfConstruction from './NoticeOfConstruction';
import InvoiceForm from './InvoiceForm';
import FormFooter from './FormFooter';
import { Grid } from '@material-ui/core';

const Page1 = () => {
	return(
		<Grid item xs={10}>
			<div style={{padding: 15}}>
				<div style={{backgroundColor: 'rgb(231, 231, 231)'}}>
					<BuyerInfo />
					<ModelInfo />
					<div style={{display: 'flex'}}>
						<NoticeOfConstruction />
						<InvoiceForm />
					</div>
					<FormFooter />
				</div>
			</div>
			
		</Grid>
	)
}

export default Page1;