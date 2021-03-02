import { Tooltip } from "@material-ui/core";
import React from "react";

interface Props {
	color: string;
	tooltipText: string;
	onClick: () => void;
	icon: JSX.Element;
}

const ToolbarButton = (props: Props) => {
	return(
		<Tooltip title={props.tooltipText}>
			<div className="buttonMinimal" style={{color: props.color}} onClick={props.onClick} >
				{props.icon}
			</div>						
		</Tooltip>
	)
}

export default ToolbarButton;