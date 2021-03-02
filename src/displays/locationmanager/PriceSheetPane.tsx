import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';
import { PriceSheet } from '../../objects/pricesheet/PriceSheet';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { Series } from '../../objects/pricesheet/Series';

interface PriceSheetPaneProps {
	priceSheet: PriceSheet;
	salesOffice: SalesOffice;
	loadPriceSheet: () => void;
}

interface PriceSheetPaneState {
	expanded: string;
	loading: boolean;
}

class PriceSheetPane extends React.Component<PriceSheetPaneProps, PriceSheetPaneState> {
	constructor(props: PriceSheetPaneProps) {
		super(props);
		this.state = {
			loading: true,
			expanded: ""
		}

		this.expandPanel = this.expandPanel.bind(this);
	}

	componentDidMount() {

	}


	private expandPanel(panel: string) {
		if(this.state.expanded === panel) {
			this.setState({ expanded: ""});
		} else {
			this.setState({ expanded: panel});
		}
	}

	private renderTableRows(series: Series) {
		let rows: any[] = []
		for(var i = 1; i < series.tableData.rows.length; i++) {
			if(series.tableData.rows[i].cells[0].displayValue !== "") {
				rows.push(
					<tr className="seriesRow" key={"seriesRow" + i}>
						<td style={{whiteSpace: 'nowrap'}}>{series.tableData.rows[i].cells[series.modelNameIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap'}}>{series.tableData.rows[i].cells[series.modelNoIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap'}}>{series.tableData.rows[i].cells[series.sizeIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap'}}>{series.tableData.rows[i].cells[series.bedAndBathIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap'}}>{series.tableData.rows[i].cells[series.sqftIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap'}}>{series.tableData.rows[i].cells[series.msrpIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap', color: 'red'}}>{series.tableData.rows[i].cells[series.factoryDirectDiscountIndex].displayValue}</td>
						<td style={{whiteSpace: 'nowrap', color: 'green'}}>{series.tableData.rows[i].cells[series.factoryDirectSaleIndex].displayValue}</td>
					</tr>
				)
			} else {
				rows.push(
					<tr key={"emptyRow" + i} style={{height: 0}}></tr>
				)
			}
		}
		return rows;
	}

	public render() {
		const { priceSheet } = this.props;
		const { expanded } = this.state; 
		return(
			<>
				
						
				{
				priceSheet.seriesList.map((series, index) => (
						<Accordion square expanded={expanded === ('panel' + index)} onChange={() => this.expandPanel('panel' + index)}>
							<AccordionSummary aria-controls="paneld-content" id="panel1d-header">
								<Typography>{series.seriesName + ' - ' + series.manufacturer}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<table style={{width: '100%', marginTop: 10, fontSize: '10pt'}}>
									<thead>
										<tr>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Model Name</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Model No.</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Size</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Bed/Bath</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Sq. Ft.</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>MSRP</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Discount</th>
											<th style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>Sale Price</th>
										</tr>
									</thead>
									<tbody>
										{this.renderTableRows(series)}
									</tbody>
								</table>
							</AccordionDetails>
						</Accordion>
					))
				}
			</>
		)
	}
}

export default PriceSheetPane;