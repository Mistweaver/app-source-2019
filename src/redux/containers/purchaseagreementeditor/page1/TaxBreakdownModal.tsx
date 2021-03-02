import React from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import TaxSummary from '../../taxes/TaxSummary';
import TaxSummaryPDF from '../../taxes/TaxSummaryPDF';

interface TaxBreakdownProps {
	open: boolean;
	onClose: () => void;
	documentType: string;
	objectId: string;
}

const TaxBreakdownModal = (props: TaxBreakdownProps) => {
	
	return(
		<Dialog
			open={props.open}
			onClose={props.onClose}
			aria-labelledby="form-dialog-title"
			maxWidth="lg"            
			fullWidth={true}
		>
			<DialogContent>
				<TaxSummaryPDF documentType={props.documentType} objectId={props.objectId}/>
			</DialogContent>
			<DialogActions>
				<button className="buttonMinimal" onClick={props.onClose}>Close</button>
			</DialogActions>
		</Dialog>
	)
}

export default TaxBreakdownModal;