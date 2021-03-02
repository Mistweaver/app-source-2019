import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { PATH } from '../../ApplicationConfiguration';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { retrieveFile } from './FileServices';


interface ViewerProps {
	src: string;
	fileName: string;
}

interface ViewerState {
	srcExists: boolean;
	fileExists: boolean;
	fileData: any;
	loadingFile: boolean;
}

class FileViewer extends React.Component<ViewerProps, ViewerState> {
	constructor(props: ViewerProps) {
		super(props);
		this.state = {
			srcExists: false,
			fileExists: false,
			fileData: "",
			loadingFile: false
		}
	}

    componentDidMount() {
		if(this.props.src !== "") {
			this.retrieveFile();
		} else {
			this.setState({ srcExists: false });
		}
    }

    componentDidUpdate(prevProps: ViewerProps) {
		if(prevProps.src !== this.props.src) {
			this.retrieveFile();
		}
	}

	private isFileImage(_fileName: string) {
		if(_fileName.indexOf(".jpg") !== -1 || _fileName.indexOf(".jpeg") !== -1 ||_fileName.indexOf(".png") !== -1) {
			return true;
		} else {
			return false;
		}
	}

	private isFilePDF(_fileName: string) {
		if(_fileName.indexOf(".pdf")) {
			return true;
		} else {
			return false;
		}
	}

    private retrieveFile() {
		this.setState({ srcExists: true, loadingFile: true });
		retrieveFile(this.props.src).then(res => {
			this.setState({ loadingFile: false });
			if(validateHTMLResponse(res)) {
				var blob;
				if(this.isFileImage(this.props.fileName)) {
					blob = new Blob([res.data], {type:"image/jpeg"});
				}
				if(this.isFilePDF(this.props.fileName)) {
					blob = new Blob([res.data], {type:"application/pdf"});
				}
				const image = new Image();
				image.src = URL.createObjectURL(blob);
				this.setState({ fileExists: true, fileData: image.src});
			}
		});
    }

    public render() {
		const { srcExists, fileExists, fileData, loadingFile } = this.state;

		if(loadingFile) {
			return(<LinearProgress />)
		}

		if(srcExists && fileExists) {
			if(this.isFileImage(this.props.fileName)) {
				return(<img src={fileData} alt="document" style={{width: '100%', overflow: 'auto'}} />)

			}
			if(this.isFilePDF(this.props.fileName)) {
				return(<iframe src={fileData} title="pdfDoc" style={{width: '100%', height: 750, overflow: 'auto'}} frameBorder="0"></iframe>)
			}
		} else if(srcExists && !fileExists) {
			return(<div style={{padding: 10, backgroundColor: 'white'}}>File was not found on given path {PATH + '/downloadFile/' + this.props.src}</div>)
		} else {
			return(<div>No resource path for image has been set</div>)
		}
	}
}

export default FileViewer;