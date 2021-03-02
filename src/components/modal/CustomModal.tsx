import { Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { ReturnButton } from "../buttons/ReturnButton";
import { ModalWidths } from "./ModalWidths";


interface Props {
	close: () => void;
	render: boolean;
	title: string;
	children: React.ReactNode;
	width?: ModalWidths;
	fullWidth?: boolean;
}

const CustomModal = (props: Props) => {
	return props.render ? ReactDOM.createPortal(
		<Dialog
			open={props.render}
			onClose={props.close}
			maxWidth={props.width}
			fullWidth={props.fullWidth}
		>
			<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
				<div style={{display: 'flex'}}>
					<ReturnButton return={props.close} />
					<div style={{marginLeft: 15}}>{props.title}</div>
				</div>
			</DialogTitle>
			<div style={{backgroundColor: "rgb(231, 231, 231)", padding: '0px 24px', overflow: 'auto'}}>
				{props.children}
			</div>
		</Dialog>
	, document.body) : null
}

export default CustomModal;