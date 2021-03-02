import { Grid } from '@material-ui/core';
import React from 'react';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { generateRetrieveSummaryDocument } from './GenerateRetrieveSummaryDocument';

interface TaxSummaryPDFProps {
	objectId: string;
	documentType: string;
}

interface TaxSummaryPDFState {
	fileData: any;

}

class TaxSummaryPDF extends React.Component<TaxSummaryPDFProps, TaxSummaryPDFState> {
	constructor(props: TaxSummaryPDFProps) {
		super(props);
		this.state = {
			fileData: "",
		}
    }

	componentDidMount() {
		
		generateRetrieveSummaryDocument(this.props.documentType, this.props.objectId).then(res => {
				
			if(validateHTMLResponse(res)) {
				var blob = new Blob([res.data], {type:"application/pdf"});
				
				const image = new Image();
				image.src = URL.createObjectURL(blob);
				this.setState({ fileData: image.src});
				
			} else {
				console.log(res.status);
				var html = `
				<style>
					body { 
						background: gray; 
						color: light-gray;
						text-align: center;
					}
				</style>
				<h1> ERROR: ` + res.status + ` 
				<h2>Agreement: ` + this.props.objectId +`,  Cannot be displayed!</h>`;
	
				blob = new Blob([html], {type: 'text/html'});

				const image = new Image();
				image.src = URL.createObjectURL(blob);
				this.setState({ fileData: image.src});
			}

		});
	}
	
    public render() {
		const { fileData } = this.state;

        return(
            <>
                <iframe src={fileData} title="pdfDoc" style={{width: '100%', height: 750, overflow: 'auto'}} frameBorder="0"></iframe>
            </>
        )
		
    }

}

export default TaxSummaryPDF;