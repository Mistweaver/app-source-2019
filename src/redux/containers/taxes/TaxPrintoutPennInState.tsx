import React from 'react';
import { FlexedRowInfo } from '../../../components/flexedrowdisplay/FlexedRowInfo';
import { AvalaraTaxResponse } from '../../../objects/avalaraobjects/AvalaraTaxResponse';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';

interface TaxPrintoutPennInStateProps {
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

	factoryInvoice: number;
	factoryFreight: number;
}

const TaxPrintoutPennInState = (props: TaxPrintoutPennInStateProps) => {

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
					<span style={{borderBottom: '1px solid black', fontWeight: 550, margin: '10px 0px'}}> </span>
					<div style={{paddingBottom: 5, marginBottom: 10, display: 'flex', flexDirection: 'column'}}>
						<span style={{borderBottom: '1px solid black', fontWeight: 550, marginBottom: 5}}>Pennsylvania In-State Summary</span>
					</div>
						<FlexedRowInfo field="Factory Invoice: " bold={false} property={FormatNumberAsMoney(props.factoryInvoice)}/>
						<FlexedRowInfo field="Factory Freight: " bold={false} property={FormatNumberAsMoney(props.factoryFreight)}/>
						<FlexedRowInfo field="Taxable Amount (Invoice - Freight): " bold={false} property={FormatNumberAsMoney(props.factoryInvoice - props.factoryFreight)}/>
						<FlexedRowInfo field="Adjusted Taxable Amount (Taxable Amount * 60%): " bold={false} property={FormatNumberAsMoney((props.factoryInvoice - props.factoryFreight)*0.6)}/>
						<FlexedRowInfo field="Calculated Tax (Adjusted Taxable Amount * 6%): " bold={false} property={FormatNumberAsMoney(((props.factoryInvoice - props.factoryFreight)*0.6)*0.06)}/>
				</div>
			</div>
		</body>
	)
}

export default TaxPrintoutPennInState;