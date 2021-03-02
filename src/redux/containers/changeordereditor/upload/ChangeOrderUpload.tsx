import React from 'react';
import "./Upload.css";
import Dropzone from '../../../../components/dropzone/Dropzone';
import { uploadSignedChangeOrder } from '../../../../services/FileServices';
import { validateHTMLResponse } from '../../../../services/HttpResponseChecker';
import { LinearProgress } from '@material-ui/core';


interface UploadProps {
	changeOrderId: string;
	done: () => void;
}

interface UploadState {
	files: any[];
	uploading: boolean;
	successfullUpload: boolean;
	currentUpload: string;
	uploadProgress: string[];
	error: boolean;
	errorMessage: string;
}

const allowedFileTypes = ['image/png', 'image/jpg', 'application/pdf'];

class ChangeOrderUpload extends React.Component<UploadProps, UploadState> {

	constructor(props: UploadProps) {
		super(props);
		this.state = {
			files: [],
			uploading: false,
			successfullUpload: false,
			error: false,
			errorMessage: "",
			uploadProgress: [],
			currentUpload: ""
		};

		this.onFilesAdded = this.onFilesAdded.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
	}

	private onFilesAdded(files: any) {
		if(this.filesAllowed(files)) {
			this.setState({ files: this.state.files.concat(files) });
		} else {
			alert("File type not allowed...");
		}
	}

	private filesAllowed(files: any) {
		var allowed: boolean = true;
		var typeMatch: boolean = false;

		files.forEach((element: any) => {
			typeMatch = this.fileTypeMatch(element);
			if(allowed === true && typeMatch === false) {
				allowed = false;
			}
		});
		return allowed;
	}

	private fileTypeMatch(fileElement: any) {
		var match: boolean = false;
		allowedFileTypes.forEach(fileType => {
			if(fileElement.type === fileType) {
				match = true;
			}
		});
		return match;
	}

	uploadFiles() {
		this.setState({ uploading: true, error: false, errorMessage: "" });

		this.state.files.forEach((file, index, array) => {
			this.setState({ currentUpload: file.name})

			const formData = new FormData();
			formData.append("file", file, file.name);
			formData.append("lastModified", file.lastModified);
			formData.append("changeOrderId", this.props.changeOrderId);

			uploadSignedChangeOrder(formData).then(res => {
				if(validateHTMLResponse(res)) {
					let uploadProgress = this.state.uploadProgress.splice(0, 0, file.name + " successful");
					this.setState({ uploadProgress: uploadProgress });
				} else {
					let uploadProgress = this.state.uploadProgress.splice(0, 0, file.name + " failed " + res.status);
					this.setState({
						error: true,
						errorMessage: "Upload error: " + res.status + " - " + res.data,
						uploadProgress: uploadProgress
					});
				}

				// at end of uploads
				if(index === array.length - 1) {
					this.setState({ uploading: false });
					if(!this.state.error) {
						this.setState({ successfullUpload: true });
						this.props.done();
					} else {
						this.setState({ successfullUpload: false });
					}
				}

			}).catch(error => {
				let uploadProgress = this.state.uploadProgress.concat(file.name + " failed " + error.status);
				this.setState({
					error: true,
					errorMessage: error.status + ": " + error.message,
					uploadProgress: uploadProgress
				});
			});;

			
		});

		
	}

	render() {
		const { error, errorMessage, uploading, currentUpload, uploadProgress, successfullUpload } = this.state;

		return (
			<div>
				{
					uploading ?
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<p>Uploading...</p>
						{
							uploadProgress.forEach(uploadResult => (
								<p>{uploadResult}</p>
							))
						}
						<p>{"...uploading " + currentUpload}</p>
						<LinearProgress />
					</div>
					:
					<>
						{
							successfullUpload ?
							<p>Upload Successful!</p>
							:
							<>
								<div style={{display: 'flex'}}>
									<Dropzone onFilesAdded={this.onFilesAdded} disabled={this.state.uploading || this.state.successfullUpload} />
									<div style={{display: 'flex', flexDirection: 'column', paddingLeft: 10}}>
										<span>Files to upload:</span>
										{
											this.state.files.map(file => {
												return (
													<span key={file.name}>{file.name}</span>
												);
											})
										}
									</div>
								</div>
								
								<div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
									{ error && <span style={{color: 'red'}}>{errorMessage}</span> }
									{ this.state.files.length > 0 && !uploading && <button className="buttonMinimal" onClick={this.uploadFiles}>{error ? "Retry" : "Upload"}</button> }
								</div>
							</>
						}
						
					</>
				}
				
			</div>
		);
	}
}

export default ChangeOrderUpload;