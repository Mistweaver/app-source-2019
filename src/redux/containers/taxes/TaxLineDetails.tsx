import React from 'react';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import { StoreState } from '../../Store';
import { connect } from 'react-redux';
import { FlexedRowInfo } from '../../../components/flexedrowdisplay/FlexedRowInfo';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';


interface TaxLineDetailsProps {
	taxBreakdown: AvalaraTaxResponse;
}

function mapStateToProps(state: StoreState) {
	return {
		taxBreakdown: state.agreementeditor.taxBreakdown
	}
}

const TaxLineDetails = (props: TaxLineDetailsProps) => {
	return(
		<>
			<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", marginBottom: 10}}>Line Item Details</div>
			{
				props.taxBreakdown.lines.map((line, index) => (
					<div key={line.id + index} style={{marginBottom: 10}} >
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>{"Tax Code: " + line.description}</div>
						<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)", padding: 10}}>
							<FlexedRowInfo field="Taxable Amount:" bold={true} property={FormatNumberAsMoney(line.taxableAmount).toString()}/>
							<FlexedRowInfo field="Tax Calculated:" bold={true} property={FormatNumberAsMoney(line.taxCalculated).toString()}/>
							{
								line.details.map((detail, index) => (
									<div key={detail.taxName + index} style={{borderTop: '1px solid black', marginTop: 15, fontSize: '11pt', display: 'flex', flexDirection: 'column'}}>
										<span style={{fontWeight: 500}}>{detail.taxName}</span>
										<span><span style={{fontWeight: 500}}>Jurisdiction:  </span>
											{
												detail.region.toString() + ", " +
												detail.jurisName.toString() + ", " +
												detail.jurisType.toString() + ", " +
												detail.jurisCode.toString()
											}
										</span>
										<span><span style={{fontWeight: 500}}>Rate:  </span>{detail.rate.toString()}</span>
										<span><span style={{fontWeight: 500}}>Taxable Amount:  </span>{FormatNumberAsMoney(detail.taxableAmount).toString()}</span>
										<span><span style={{fontWeight: 500}}>Tax:  </span>{FormatNumberAsMoney(detail.taxCalculated).toString()}</span>
									</div>
								))
							}
						</div>
					</div>
				))
			}
		</>
	)
			/*
	return(
		<>
			<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", marginBottom: 10}}>Line Item Details</div>
			{
				props.taxBreakdown.lines.map((line, index) => (
					<div key={line.id + index} style={{marginBottom: 10}} >
						<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>{line.description}</div>
						<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)", padding: 10}}>
							<FlexedRowInfo field="Tax Code:" property={line.taxCode.toString()}/>
							<FlexedRowInfo field="Taxable Amount:" property={FormatNumberAsMoney(line.taxableAmount).toString()}/>
							<FlexedRowInfo field="Tax:" property={FormatNumberAsMoney(line.tax).toString()}/>
							<FlexedRowInfo field="Tax Calculated:" property={FormatNumberAsMoney(line.taxCalculated).toString()}/>
							<div style={{marginTop: 20}}> 
								{
									line.details.map((detail, index) => (
										<div key={detail.taxName + index} style={{marginTop: 15, fontSize: '9pt'}}>
											<p style={{borderBottom: '1px solid black', margin: 0}}>{detail.taxName}</p>
											<FlexedRowInfo field="Jurisdiction Type:" property={detail.jurisType.toString()}/>
											<FlexedRowInfo field="Jurisdiction Name:" property={detail.jurisName.toString()}/>
											<FlexedRowInfo field="Jurisdiction Code:" property={detail.jurisCode.toString()}/>
											<FlexedRowInfo field="Region:" property={detail.region.toString()}/>
											<FlexedRowInfo field="Rate Type:" property={detail.rateType.toString()}/>
											<FlexedRowInfo field="Rate:" property={detail.rate.toString()}/>
											<FlexedRowInfo field="Tax:" property={FormatNumberAsMoney(detail.tax).toString()}/>
											<FlexedRowInfo field="Tax Calculated:" property={FormatNumberAsMoney(detail.taxCalculated).toString()}/>
											<FlexedRowInfo field="Tax Type:" property={detail.taxType.toString()}/>
										</div>
									))
								}
							</div>
						</div>
					</div>
				))
			}
		</>
		)*/
}

export default connect(mapStateToProps, {})(TaxLineDetails);