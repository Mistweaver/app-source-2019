import React from 'react';
import "./Upload.css";
import Dropzone from "../dropzone/Dropzone";
import CloudUploadDone from '@material-ui/icons/CloudDoneTwoTone';
import { PATH } from "../../ApplicationConfiguration";
import { getMsalIDToken } from "../../auth/AuthServices";
import Progress from '../responseboxes/Progress';


interface UploadProps {
	agreementId: string;
	apiEndPoint: string;
	setFileUri: (fileUri: string) => void;
	done: () => void;
	allowedFileTypes: string[];
}

interface UploadState {
	files: any[];
	uploading: boolean;
	uploadProgress: any[];
	successfullUpload: boolean;
}


class Upload extends React.Component<UploadProps, UploadState> {

	apiEndPoint: string;

	constructor(props: UploadProps) {
		super(props);
		this.state = {
			files: [],
			uploading: false,
			uploadProgress: [],
			successfullUpload: false
		};

		this.apiEndPoint = this.props.apiEndPoint;
		if(this.apiEndPoint === "" || this.apiEndPoint === undefined || this.apiEndPoint === null) {
			this.apiEndPoint = "/uploadFile";
		}

		this.onFilesAdded = this.onFilesAdded.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		this.renderActions = this.renderActions.bind(this);
		this.onClear = this.onClear.bind(this);
		this.setFileUri = this.setFileUri.bind(this);

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
		this.props.allowedFileTypes.forEach(fileType => {
			if(fileElement.type === fileType) {
				match = true;
			}
		});

		return match;
	}

	private onClear() {
		this.setState({
			files: [],
			uploading: false,
			successfullUpload: false,
			uploadProgress: []
		});
	}

	renderProgress(file: any) {
		const uploadProgress = this.state.uploadProgress[file.name];
		if (this.state.uploading || this.state.successfullUpload) {
			return (
				<div className="ProgressWrapper">
					<Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
					<CloudUploadDone style={{ opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0, marginLeft: 10 }} />
				</div>
			);
		}
		return;
	}

	renderActions() {
		if (this.state.successfullUpload) {
			return (
				<button onClick={this.onClear}>Done</button>
			);
		} else {
			return (
				<button disabled={this.state.files.length < 0 || this.state.uploading} onClick={this.uploadFiles}>Upload</button>
			);
		}
	}

	async uploadFiles() {
		this.setState({ uploadProgress: [], uploading: true });
		const promises: any = [];
		this.state.files.forEach(file => {
			promises.push(this.sendRequest(file));
		});
		try {
			await Promise.all(promises);
			this.setState({ uploading: false, successfullUpload: true });
			this.setState(this.state);
		} catch (e) {
			// Not Production ready! Do some error handling here instead...
			this.setState({ uploading: false, successfullUpload: true });
			this.setState(this.state);
		}
	}

	setFileUri(event: any) {
		//console.log("in setFileUri()...");
		//console.log(request);
		//console.log(event.target.responseText);
		try {
			var responseObj = JSON.parse(event.target.responseText);
			//console.log("fileUri: " + responseObj.fileUri);
			this.props.setFileUri(responseObj.fileUri);
		} catch(err) {
			this.setState({ uploading: false, successfullUpload: false });
			this.setState(this.state);
			alert(event.target.responseText);
		}
	}

	sendRequest(file: any) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();

			req.withCredentials = true;

			req.upload.addEventListener("progress", event => {
				//console.log("in Progress");
				if (event.lengthComputable) {
					const copy = { ...this.state.uploadProgress };
					copy[file.name] = {
						state: "pending",
						percentage: (event.loaded / event.total) * 100
					};
					this.setState({ uploadProgress: copy });
				}
			});

			req.upload.addEventListener("load", event => {
				const copy = { ...this.state.uploadProgress };
				copy[file.name] = { state: "done", percentage: 100 };
				this.setState({ uploadProgress: copy });
				resolve(req.response);
			});

			req.upload.addEventListener("error", event => {
				const copy = { ...this.state.uploadProgress };
				copy[file.name] = { state: "error", percentage: 0 };
				this.setState({ uploadProgress: copy });
				reject(req.response);
			});

			req.onload = this.setFileUri;

			const formData = new FormData();
			formData.append("file", file, file.name);
			formData.append("lastModified", file.lastModified);
			formData.append("agreementId", this.props.agreementId);

			req.open("POST", PATH + this.apiEndPoint);
			req.setRequestHeader("Authorization", getMsalIDToken());
			req.send(formData);
		});
	}

	render() {
		return (
			<div className="Upload">
				<div className="Content">
					<div>
						<Dropzone onFilesAdded={this.onFilesAdded} disabled={this.state.uploading || this.state.successfullUpload} />
					</div>
					<div className="Files">
						{
							this.state.files.map(file => {
								return (
									<div key={file.name} className="Row">
										<span className="Filename">{file.name}</span>
										{this.renderProgress(file)}
									</div>
								);
							})
						}
					</div>
				</div>
				<div className="Actions">{this.renderActions()}</div>
			</div>
		);
	}
}

export default Upload;