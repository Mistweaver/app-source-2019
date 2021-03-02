import { Tooltip } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React from 'react';

interface Props {
	value: string;
}

export const ClipboardComponent = (props: Props) => {

	function copyIdToClipboard(event: any) {
		navigator.clipboard.writeText(props.value)
	}

	return(
		<Tooltip title={props.value}>
			<div className="buttonMinimal" onClick={copyIdToClipboard} >
				<Settings style={{color: 'grey'}}  />
				<textarea id="clipboardTarget" value={props.value} readOnly style={{display: 'none'}}></textarea>
			</div>					
		</Tooltip>
	)
}

