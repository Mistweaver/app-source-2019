
interface Props {
	field: string;
	property: string;
	bold: boolean;
}

export const FlexedRowInfo = (props: Props) => {
	return(
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<span style={{fontWeight: props.bold ? 550 : 400}}>{props.field}</span>
			<span>{props.property}</span>
		</div>
	) 
}

