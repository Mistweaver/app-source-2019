import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle } from '@material-ui/core';
import Upload from '../upload/Upload';

interface AddFilesModalProps {
	open: boolean;
	onClose: () => void;
	documentId: string;
	apiEndPoint?: string;
	setFileUri?: (fileUri: string) => void;
	allowedFileTypes: string[];
}

const AddFilesModal = (props: AddFilesModalProps) => {

	const defaultProps = {
		apiEndPoint: "/uploadFile",
		setFileUri: () => void(0)
	};

	return(
		<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby="form-dialog-title"
				maxWidth="md"            
				fullWidth={true}
			>
				<DialogTitle id="simple-dialog-title">Add Files</DialogTitle>
				<DialogContent>
					<Upload 
						agreementId={props.documentId}
						apiEndPoint={props.apiEndPoint || defaultProps.apiEndPoint}
						setFileUri={props.setFileUri || defaultProps.setFileUri}
						done={props.onClose}
						allowedFileTypes={props.allowedFileTypes}
					/>
				</DialogContent>
				<DialogActions style={{justifyContent: 'space-between'}}>
					<Button onClick={props.onClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
	)
}

export default AddFilesModal;