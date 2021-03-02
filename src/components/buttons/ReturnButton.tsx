import { Tooltip } from "@material-ui/core"
import { KeyboardReturn } from "@material-ui/icons"
import React from "react"

interface Props {
	return: () => void;
}

export const ReturnButton = (props: Props) => {
	return(
		<Tooltip title="Return">
			<KeyboardReturn className="iconAction" style={{marginTop: 'auto', marginBottom: 'auto'}} onClick={props.return} />
		</Tooltip>
	)
}