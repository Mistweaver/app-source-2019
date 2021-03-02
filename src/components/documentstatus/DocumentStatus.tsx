import { IN_PROGRESS, SUBMITTED, EXECUTED, CLOSED } from "../../data/staticdata"

interface DocumentStatusProps {
	status: string;
}

const DocumentStatus = (props: DocumentStatusProps) => {
	if(props.status === IN_PROGRESS) {
		return(
			<>
				<h5 style={{margin: 0}}><b>Submit Document</b></h5>
				<p style={{fontSize: 12, margin: 0, marginBottom: 10}}>Submit the document for review.  No changes can be made after submission unless unsubmitted by a manager.</p>
			</>
		)
	} else if(props.status === SUBMITTED) {
		return(
			<>
				<h5 style={{margin: 0}}><b>Document Submitted</b></h5>
				<p style={{fontSize: 12, margin: 0, marginBottom: 10}}>Document has been submitted and is awaiting review.  To execute the contract, upload the signed documents by clicking the button below.</p>
			</>
		)
	} else if(props.status === EXECUTED) {
		return(
			<>
				<h5 style={{margin: 0}}><b>Document Executed</b></h5>
				<p style={{fontSize: 12, margin: 0, marginBottom: 10}}>Signed copies have been uploaded for this document.</p>
			</>
		)
	} else if(props.status === CLOSED) {
		return(
			<>
				<h5 style={{margin: 0}}>Invoice Filed</h5>
				<p style={{fontSize: 12, margin: 0, marginBottom: 10}}>An invoice for this agreement has been sent to Avalara.</p>
			</>
		)
	} /*else if(props.status === REVISED) {
		return(
			<>
				<h5 style={{margin: 0}}>Document Revised</h5>
				<p style={{fontSize: 12, margin: 0, marginBottom: 10}}>This document has been revised by another document.</p>
			</>
		)
	}*/ else {
		return(
			<>
				<h5>Unknown State - contact admin</h5>
				<p>Status: {props.status}</p>
			</>
		)
	}
}

export default DocumentStatus;