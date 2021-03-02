import React from 'react';
import "./MenuIcon.css";

interface Props {
	renderValue: number;
	optionName: string;
	select: (renderValue: number) => void;
	children?: React.ReactNode;
}

export const MenuIcon = (props: Props) => {
	return(
		<div className="menuIcon" onClick={() => props.select(props.renderValue)}>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
				{props.children}
				<span>{props.optionName}</span>
			</div>
		</div>
	)
}