import React from 'react';
import { Chip } from '@material-ui/core';

interface ColorOptionProps {
	selectOption: (name: string, value: string) => void;
	option: string;
	optionName: string;
	currentSelectionState: string;
}

const ColorOption = (props: ColorOptionProps) => {
	return(
		<Chip
			clickable
			style={{margin: '3px 5px'}}
			onClick={() => props.selectOption(props.optionName, props.option)}
			color={props.currentSelectionState === props.option ? "primary" : "default"}
			label={props.option}
		/>
	)
	
}

export default ColorOption;