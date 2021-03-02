import React from 'react';
import { Grid, Card, CardContent, AppBar, Toolbar, Typography } from '@material-ui/core';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import { StoreState } from '../../Store';
import { connect } from 'react-redux';
import { FlexedRowInfo } from '../../../components/flexedrowdisplay/FlexedRowInfo';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';


interface TaxBreakdownProps {
	taxBreakdown: AvalaraTaxResponse;
}

function mapStateToProps(state: StoreState) {
	return {
		taxBreakdown: state.agreementeditor.taxBreakdown
	}
}

const TaxBreakdown = (props: TaxBreakdownProps) => {
		return(
			<div style={{marginTop: 10}}>
				<Card style={{marginBottom: 10}} >
					<AppBar style={{position: 'relative'}} >
						<Toolbar>
							<Typography variant="h6" style={{flex: 1}}>Tax Breakdown</Typography>
						</Toolbar>
					</AppBar>
					<CardContent>
						<p style={{margin: 0}}><b>Date:</b> {props.taxBreakdown.paymentDate}</p>
						{	
							props.taxBreakdown.addresses.map((address, index) => (
								<p key={address.line1 + index} style={{margin: 0}}>
									{
										index === 0 ?
										<b>{"Address: "}</b>
										:
										<b>{"Address " + index + ": "}</b>
									}
									
									{address.line1 + ", " + address.city + ", " + address.region + ", " + address.postalCode + ", " + address.country}
								</p>
							))
						}
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={4}>
										<p style={{borderBottom: '1px solid black'}}>Summary</p>
										<FlexedRowInfo field="Total Amount" bold={true} property={ FormatNumberAsMoney(props.taxBreakdown.totalAmount).toString()}/>
										<FlexedRowInfo field="Total Amount Taxable" bold={true} property={FormatNumberAsMoney(props.taxBreakdown.totalTaxable).toString()}/>
										<FlexedRowInfo field="Total Tax" bold={true} property={FormatNumberAsMoney(props.taxBreakdown.totalTax).toString()}/>
										<FlexedRowInfo field="Total Tax Calculated" bold={true} property={FormatNumberAsMoney(props.taxBreakdown.totalTaxCalculated).toString()}/>
										<FlexedRowInfo field="Total Discount" bold={true} property={FormatNumberAsMoney(props.taxBreakdown.totalDiscount).toString()}/>
										<FlexedRowInfo field="Total Exempt" bold={true} property={FormatNumberAsMoney(props.taxBreakdown.totalExempt).toString()}/>
									</Grid>
									{
										props.taxBreakdown.summary.map((summaryItem, index) => (
											<Grid item key={summaryItem.taxName + index} xs={4}>
												<p style={{borderBottom: '1px solid black'}}>{summaryItem.taxName}</p>
												<FlexedRowInfo field="Jurisdiction Type:" bold={true} property={summaryItem.jurisType.toString()}/>
												<FlexedRowInfo field="Jurisdiction Name:" bold={true} property={summaryItem.jurisName.toString()}/>
												<FlexedRowInfo field="Jurisdiction Code:" bold={true} property={summaryItem.jurisCode.toString()}/>
												<FlexedRowInfo field="Region:" bold={true} property={summaryItem.region.toString()}/>
												<FlexedRowInfo field="Rate Type:" bold={true} property={summaryItem.rateType.toString()}/>
												<FlexedRowInfo field="Rate:" bold={true} property={summaryItem.rate.toString()}/>
												<FlexedRowInfo field="Taxable:" bold={true} property={FormatNumberAsMoney(summaryItem.taxable).toString()}/>
												<FlexedRowInfo field="Tax:" bold={true} property={FormatNumberAsMoney(summaryItem.tax).toString()}/>
												<FlexedRowInfo field="Tax Calculated:" bold={true} property={FormatNumberAsMoney(summaryItem.taxCalculated).toString()}/>
												<FlexedRowInfo field="Tax Authority Type:" bold={true} property={summaryItem.taxAuthorityType.toString()}/>
												<FlexedRowInfo field="Tax Type:" bold={true} property={summaryItem.taxType.toString()}/>
												<FlexedRowInfo field="Tax Sub Type:" bold={true} property={summaryItem.taxSubType.toString()}/>
											</Grid>
										))
									}
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				
				<Grid container spacing={2}>
					{
						props.taxBreakdown.lines.map((line, index) => (
							<Grid item key={line.id + index} xs={3}>
								<Card>
									<div style={{color: '#fff', backgroundColor: '#3f51b5', padding: 10}}>
										<h5 style={{margin: 0}}>{line.description}</h5>
									</div>		
									<CardContent>								
										<FlexedRowInfo field="Tax Code:" bold={true} property={line.taxCode.toString()}/>
										<FlexedRowInfo field="Taxable Amount:" bold={true} property={FormatNumberAsMoney(line.taxableAmount).toString()}/>
										<FlexedRowInfo field="Tax:" bold={true} property={FormatNumberAsMoney(line.tax).toString()}/>
										<FlexedRowInfo field="Tax Calculated:" bold={true} property={FormatNumberAsMoney(line.taxCalculated).toString()}/>
										
										<div style={{marginTop: 20}}> 
											{
												line.details.map((detail, index) => (
													<div key={detail.taxName + index} style={{marginTop: 15, fontSize: '9pt'}}>
														<p style={{borderBottom: '1px solid black', margin: 0}}>{detail.taxName}</p>
														<FlexedRowInfo field="Jurisdiction Type:" bold={true} property={detail.jurisType.toString()}/>
														<FlexedRowInfo field="Jurisdiction Name:" bold={true} property={detail.jurisName.toString()}/>
														<FlexedRowInfo field="Jurisdiction Code:" bold={true} property={detail.jurisCode.toString()}/>
														<FlexedRowInfo field="Region:" bold={true} property={detail.region.toString()}/>
														<FlexedRowInfo field="Rate Type:" bold={true} property={detail.rateType.toString()}/>
														<FlexedRowInfo field="Rate:" bold={true} property={detail.rate.toString()}/>
														<FlexedRowInfo field="Tax:" bold={true} property={FormatNumberAsMoney(detail.tax).toString()}/>
														<FlexedRowInfo field="Tax Calculated:" bold={true} property={FormatNumberAsMoney(detail.taxCalculated).toString()}/>
														<FlexedRowInfo field="Tax Type:" bold={true} property={detail.taxType.toString()}/>
													</div>
												))
											}
										</div>
									</CardContent>		
								</Card>
							</Grid>
						))
					}
				</Grid>
			</div>
		)
}

export default connect(mapStateToProps, {})(TaxBreakdown);