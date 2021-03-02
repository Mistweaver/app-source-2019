import React from 'react';
import { Grid, LinearProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PDFIcon from '@material-ui/icons/PictureAsPdf';
import ImageIcon from '@material-ui/icons/Image';
import StandardButton from '../buttons/StandardButton';
import { IN_PROGRESS, EXECUTED } from '../../data/staticdata';
import { FileStoreDocument } from '../../objects/filestoredocument/FileStoreDocument';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import AddFilesModal from './AddFilesModal';
import { getFilesByDocumentId } from './FileServices';
import FileViewer from './FileViewer';

export const PURCHASE_AGREEMENT = "PA";
export const CHANGE_ORDER = "CO";

type DOCTYPES = "PA" | "CO";

interface DocumentFileProps {
	documentId: string;
	documentType: DOCTYPES;	// CO or PA
	status: string;
	isDocumentRevised: boolean;
}


interface DocumentFileState {
	displayAddDocumentModal: boolean;
	documents: FileStoreDocument[];
	selectedDocument: FileStoreDocument;
	documentSelected: boolean;
	loadingFiles: boolean;
}

class DocumentFiles extends React.Component<DocumentFileProps, DocumentFileState> {
	constructor(props: DocumentFileProps) {
		super(props);
		this.state = {
			displayAddDocumentModal: false,
			documents: [],
			selectedDocument: new FileStoreDocument(),
			documentSelected: false,
			loadingFiles: false,
		}

		this.openNewDocuments = this.openNewDocuments.bind(this);
		this.closeNewDocuments = this.closeNewDocuments.bind(this);
		this.openDocument = this.openDocument.bind(this);
	}

	componentDidMount() {
		this.loadFiles();
	}

	componentDidUpdate(prevProps: DocumentFileProps) {
		if(prevProps !== this.props) {
			this.loadFiles();
		}
	}

	public loadFiles() {
		this.setState({ loadingFiles: true });
		getFilesByDocumentId(this.props.documentId).then(res => {
			this.setState({ loadingFiles: false });
			if(validateHTMLResponse(res)) {
				this.setState({
					documents: res.data._embedded.storedfiles
				});
			}
		});
	}

	public openNewDocuments() {
		this.setState({ displayAddDocumentModal: true })
	}

	public closeNewDocuments() {
		this.loadFiles();
		this.setState({ displayAddDocumentModal: false})
	}

	

	public openDocument(document: FileStoreDocument) {

		if(this.state.documentSelected === false) {
			this.setState({
				documentSelected: true
			});
		}
	
		// console.log(document.fileUri);
		this.setState({selectedDocument: document});
	}
	
	private formatFileSize(fileSize: number) {
		if(fileSize < 1024) {
			return fileSize + " B"
		} else if (fileSize >=1024 && fileSize < 1048576) {
			return (fileSize / 1024).toFixed(2) + " MB"
		} else if (fileSize >= 1048576) {
			return (fileSize / 1048576).toFixed(2) + " GB"
		} else {
			return (fileSize / 1073741824).toFixed(2) + " TB"

		}
	}

	private renderDocuments() {
		const { documents } = this.state;
		let documentList: any[] = [];
		documents.forEach(document => {
			if(document.deleted === false) {
				documentList.push(
					<ListItem key={document.id} button onClick={() => this.openDocument(document)}>
						<ListItemIcon>
							
							{
								document.fileName.indexOf(".pdf") !== -1 &&
								<PDFIcon style={{color: 'red', marginTop: 'auto', marginBottom: 'auto'}} />
							}

							{
								(document.fileName.indexOf(".jpg") !== -1 ||
								document.fileName.indexOf(".jpeg") !== -1 ||
								document.fileName.indexOf(".png") !== -1) &&
								<ImageIcon style={{marginRight: 10, color: 'blue', marginTop: 'auto', marginBottom: 'auto'}}/>
							}
						</ListItemIcon>
						<ListItemText primary={document.fileName} secondary={this.formatFileSize(document.fileSize) + " - " + new Date(document.creationTime).toLocaleString()}/>
					</ListItem>
				)
			}
		});
		console.log(documentList);
		return documentList;
	}

	public render() {
		const { status, isDocumentRevised, documentType } = this.props;
		const { displayAddDocumentModal, documentSelected } = this.state;
		return(
			<>
				<Grid item md={3} xs={12}>
					<div style={{padding: 15}}>
						{
							status === IN_PROGRESS && isDocumentRevised === false &&
							<div>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>
									Add Files
								</div>
								<div style={{backgroundColor: "rgb(231, 231, 231)", padding: 10}}>
									<div style={{fontSize: '15pt', fontWeight: 500, margin: 2}}>Note: DO NOT UPLOAD SIGNED DOCUMENTS HERE.</div>
									<div>This document is in-progress.  You need to <b>SUBMIT</b> the document first, and then the sidebar on the left will give you the option to upload the signed document.  If you do not follow this procedure, the document will not be executed.</div>
									<StandardButton onClick={this.openNewDocuments}>Add Files</StandardButton>
								</div>
							</div>
						}
						{
							status === EXECUTED && isDocumentRevised === false &&
							<div>
								<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>
									Add Supplemental Files
								</div>
								<div style={{backgroundColor: "rgb(231, 231, 231)", padding: 10}}>
									{
										documentType === PURCHASE_AGREEMENT &&
										<div style={{fontSize: '15pt', fontWeight: 500, margin: 2}}>Note: DO NOT UPLOAD CHANGE ORDER DOCUMENTS HERE.</div>
									}
									<div>This document is executed.  This upload is for supplemental files only.</div>
									<StandardButton onClick={this.openNewDocuments}>Add Files</StandardButton>
								</div>
							</div>
						}
						<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
							<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>
								Existing Files
							</div>
							{
								this.state.loadingFiles && <LinearProgress />
							}
							{this.renderDocuments()}
						</div>
					</div>
					
				</Grid>
				<Grid item md={7} xs={12} style={{minHeight: '90vh'}}>
					<div style={{padding: 15}}>
						{
							documentSelected &&
							<FileViewer 
								src={this.state.selectedDocument.fileUri}
								fileName={this.state.selectedDocument.fileName}
							/>
						}
					</div>
				</Grid>
				<AddFilesModal 
					onClose={this.closeNewDocuments} 
					open={displayAddDocumentModal}
					documentId={this.props.documentId}
					allowedFileTypes={['image/png', 'image/jpg', 'application/pdf']}
				/>
				
			</>
		)
	}
}

export default DocumentFiles;