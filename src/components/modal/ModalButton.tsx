import React, { useState } from "react";
import ToolbarButton from "../buttons/ToolbarButton";
import CustomModal from "./CustomModal";
import { ModalWidths } from "./ModalWidths";

interface Props {
	// Any actions you wish to occur on opening the modal go here
	actionOnOpen: () => void;
	// Any actions you wish to occur when closing the modal go here
	actionOnClose: () => void;
	// The title at the top of the modal dialog box
	title: string;
	// What text you wish to display when hovering over the button
	tooltipText: string;
	// Color of the button
	buttonColor: string;
	// What you want the button to look like
	button: JSX.Element;
	// What component(s) you wish to have inside the modal
	children: React.ReactNode;
	// width of modal
	width?: ModalWidths;
	// full width?
	fullWidth?: boolean;
	
}

/**
 * UI component that renders a button linked to a modal.  Clicking the button renders the modal
 * 
 * @param props 
 */
export const ModalButton = (props: Props) => {
	// React hook
	const [render, setRender] = useState(false)

	function open() {
		props.actionOnOpen();
		setRender(true);
	}

	function close() {
		props.actionOnClose();
		setRender(false);
	}

	return(
		<>
			<ToolbarButton 
				color={props.buttonColor}
				tooltipText={props.tooltipText}
				onClick={open}
				icon={props.button}
			/>
			<CustomModal 
				close={close}
				render={render}
				title={props.title}
				width={props.width}
				fullWidth={props.fullWidth}
			>
				{props.children}
			</CustomModal>
		</>
	)
}