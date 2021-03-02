import React from "react";
import "./Dropzone.css";
import CloudUpload from '@material-ui/icons/CloudUploadTwoTone';
import { parse } from 'papaparse';

interface DropzoneProps {
	disabled: boolean;
	onFilesAdded: any;
}

interface DropzoneState {
	highlight: boolean;
}

class Dropzone extends React.Component<DropzoneProps, DropzoneState> {
	fileInputRef: any;
	constructor(props: DropzoneProps) {
		super(props);
		this.state = {
			 highlight: false
		};
		this.fileInputRef = React.createRef();
		this.openFileDialog = this.openFileDialog.bind(this);
		this.onFilesAdded = this.onFilesAdded.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	openFileDialog() {
		if (this.props.disabled) return;
		this.fileInputRef.current.click();
	}

	onFilesAdded(evt: any) {
		// if (this.props.disabled) return;
		const files = evt.target.files;
		if (this.props.onFilesAdded) {
			const array = this.fileListToArray(files);
			this.props.onFilesAdded(array);
		}
	}

	fileListToArray(list: any) {
		const array = [];
		for (var i = 0; i < list.length; i++) {
			//@ts-ignore
			array.push(list.item(i));
		}
		return array;
	}

	onDragOver(evt: any) {
		evt.preventDefault();
		if(!this.props.disabled) { this.setState({ highlight: true }); }
	}

	onDragLeave() { this.setState({ highlight :false }) }

	onDrop(event: any) {
		event.preventDefault();

		if (this.props.disabled) return;

		const files = event.dataTransfer.files;
		parse(files.item(0), {
			complete: (results) => {
				// console.log(results);
			}
		});
		// let reader = new FileReader();
		// reader.readAsText(csv);
		if (this.props.onFilesAdded) {
			const array = this.fileListToArray(files);
			this.props.onFilesAdded(array);
		}
		this.setState({
			highlight: false
		})
	}

	render() {
		return (
			<div
				className={`Dropzone ${this.state.highlight ? "Highlight" : ""}`}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
				onClick={this.openFileDialog}
				style={{ cursor: this.props.disabled ? "default" : "pointer" }}
			>
				<CloudUpload />
				<input
					ref={this.fileInputRef}
					className="FileInput"
					type="file"
					multiple
					accept=".csv, text/csv"
					onChange={this.onFilesAdded}
				/>
				<span>Upload Files</span>
			</div>
		);
	}
}

export default Dropzone;