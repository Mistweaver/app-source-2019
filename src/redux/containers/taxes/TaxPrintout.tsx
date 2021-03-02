import React from 'react';
import { FlexedRowInfo } from '../../../components/flexedrowdisplay/FlexedRowInfo';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';

interface TaxPrintoutProps {
	taxBreakdown: AvalaraTaxResponse;
	documentType: string;
	documentId: string;
	clientConsultantId: string;
	buyer1: string;

	subTotal2: number;
	standardFreightChargeAmount: number;
	factoryTrimOutAmount: number;
	purchaseOfACAmount: number;
	setupChargesAmount: number;
	documentOrHomePrepFeeAmount: number;
	extendedServiceContractAmount: number;
	lotExpenseAmount: number;
	deliveryState: string;
	modelType: string;
	numberOfUnits: number;
}

const TaxPrintout = (props: TaxPrintoutProps) => {

	return(
		<body style={{padding: 20}}>
			<div className="page">
				{/* class="subpage" */}
				<div style={{borderBottom: '1px solid black', padding: 10}}>
					<span style={{fontSize: '14pt'}}>Tax Summary for {props.documentType + " #" + props.documentId}</span>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
					<span><b>Buyer: </b> {props.buyer1}</span>
					<span><b>CCID:</b> {props.clientConsultantId}</span>
					<span><b>Date:</b> {props.taxBreakdown.paymentDate}</span>
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
					
					<span style={{borderBottom: '1px solid black', fontWeight: 550, margin: '10px 0px'}}>Line Items</span>
					
					<div style={{paddingBottom: 5, marginBottom: 5, borderBottom: '1px solid grey'}}>
						{
							props.subTotal2 !== 0 &&
							<FlexedRowInfo field={props.modelType} bold={false} property={ FormatNumberAsMoney(props.subTotal2).toString()}/>
						}
						{
							props.standardFreightChargeAmount !== 0 &&
							<FlexedRowInfo field="Freight" bold={false} property={ FormatNumberAsMoney(props.standardFreightChargeAmount).toString()}/>
						}
						{
							props.factoryTrimOutAmount !== 0 &&
							<FlexedRowInfo field="Factory Trim-Out" bold={false} property={ FormatNumberAsMoney(props.factoryTrimOutAmount).toString()}/>
						}
						
						{
							props.purchaseOfACAmount !== 0 &&
							<FlexedRowInfo field="AC" bold={false} property={ FormatNumberAsMoney(props.purchaseOfACAmount).toString()}/>
						}
						{
							props.setupChargesAmount !== 0 &&
							<FlexedRowInfo field="Set-Up" bold={false} property={ FormatNumberAsMoney(props.setupChargesAmount).toString()}/>
						}
						{
							props.extendedServiceContractAmount !== 0 &&
							<FlexedRowInfo field="Warranty" bold={false} property={ FormatNumberAsMoney(props.extendedServiceContractAmount).toString()}/>
						}
						{
							props.lotExpenseAmount !== 0 &&
							<FlexedRowInfo field="Lot Expense" bold={false} property={ FormatNumberAsMoney(props.lotExpenseAmount).toString()}/>
						}
						{
							props.documentOrHomePrepFeeAmount !== 0 &&
							<FlexedRowInfo field="Doc Fees" bold={false} property={ FormatNumberAsMoney(props.documentOrHomePrepFeeAmount).toString()}/>
						}
					</div>
					{
						props.numberOfUnits > 1 &&
						<div style={{paddingBottom: 5, marginBottom: 5, borderBottom: '1px solid grey'}}>
							<FlexedRowInfo field="Number of Units" bold={false} property={' x ' + props.numberOfUnits} />

						</div>
					}
					<div style={{paddingBottom: 5, marginBottom: 10}}>
						<FlexedRowInfo field="Line Item Total" bold={false} property={ FormatNumberAsMoney(props.taxBreakdown.totalAmount).toString()}/>
					</div>
					<div style={{paddingBottom: 5, marginBottom: 10, display: 'flex', flexDirection: 'column'}}>
						<span style={{borderBottom: '1px solid black', fontWeight: 550, marginBottom: 5}}>Summary of Taxable Line Items</span>
						<span style={{fontSize: '10pt' }}>*see details under line items tax detail</span>
					</div>
					<FlexedRowInfo field="Amount Taxable" bold={false} property={FormatNumberAsMoney(props.taxBreakdown.totalTaxable).toString()}/>
					<FlexedRowInfo field="Calculated Tax Amount Total" bold={false} property={FormatNumberAsMoney(props.taxBreakdown.totalTaxCalculated).toString()}/>
					<FlexedRowInfo field="Discount Amount" bold={false} property={FormatNumberAsMoney(props.taxBreakdown.totalDiscount).toString()}/>
					<FlexedRowInfo field="Amount Exempt from Tax" bold={false} property={FormatNumberAsMoney(props.taxBreakdown.totalExempt).toString()}/>
				
					<span style={{borderBottom: '1px solid black', fontWeight: 550, margin: '10px 0px'}}>Jurisdiction Totals</span>
					<div style={{width: '100%', display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box'}}>
						{
							props.taxBreakdown.summary.map((summaryItem, index) => (
								<div key={summaryItem.taxName + index} style={{padding: 10, fontSize: '10pt', flexGrow: 0, maxWidth: '33.333333%', flexBasis: '33.333333%'}} >
									<div style={{display: 'flex', flexDirection: 'column'}}>
										<span style={{fontWeight: 550}}>{summaryItem.taxName}</span>
										<span>{summaryItem.region.toString() + ", " +
												summaryItem.jurisName.toString() + ", " +
												summaryItem.jurisType.toString() + ", " +
												summaryItem.jurisCode.toString()
											}
										</span>
										<span>{"Rate: " + summaryItem.rate.toString()}</span>
										<span>{"Taxable Amount: " + FormatNumberAsMoney(summaryItem.taxable).toString()}</span>
										<span>{"Tax: " + FormatNumberAsMoney(summaryItem.taxCalculated).toString()}</span>
									</div>
								</div>
							))
						}
					</div>
					<span style={{borderBottom: '1px solid black', fontWeight: 550, margin: '10px 0px'}}>Line Items Tax Details</span>
					<div style={{width: '100%', display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box'}}>
						{
							props.taxBreakdown.lines.map((line, index) => (
								<div key={line.id + index} style={{borderBottom: '1px solid grey', padding: 10, fontSize: '10pt', flexGrow: 0, maxWidth: '33.333333%', flexBasis: '33.333333%'}} >
									<div style={{fontWeight: 550}}>{"Tax Code: " + line.description}</div>
									<div style={{display: 'flex', flexDirection: 'column'}}>
										{
											line.taxableAmount !== 0 ?
											<span><b>{"Taxable Amount: " + FormatNumberAsMoney(line.taxableAmount).toString()}</b></span>
											:
											<span>{"Taxable Amount: " + FormatNumberAsMoney(line.taxableAmount).toString()}</span>
										}
										<span>{"Tax Calculated: " + FormatNumberAsMoney(line.taxCalculated).toString()}</span>
										{
											line.details.map((detail, index) => (
												<div key={detail.taxName + index} style={{marginTop: 15, display: 'flex', flexDirection: 'column'}}>
													<span>{detail.region.toString() + ", " +
															detail.jurisName.toString() + ", " +
															detail.jurisType.toString() + ", " +
															detail.jurisCode.toString()
														}
													</span>
													<span>{"Rate: " + detail.rate.toString()}</span>
													<span>{"Taxable Amount: " + FormatNumberAsMoney(detail.taxableAmount).toString()}</span>
													<span>{"Tax: " + FormatNumberAsMoney(detail.taxCalculated).toString()}</span>
												</div>
											))
										}
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</body>
	)
}

export default TaxPrintout;