import React from 'react';

interface Props {
	innerText: string;
	color?: string;
}

export const DayOfTheWeek = (props: Props) => {
	const { color, innerText } = props;
	return(
		<div style={{
			padding: 5,
			textAlign: 'center',
			width: '14.2857142857%',
			maxWidth: '14.2857142857%',
			backgroundColor: 'rgba(255,255,255,0.95)',
			boxSizing: 'border-box',
			flexGrow: 0,
			flexBasis: '14.2857142857%',
			border:color === "" ? "" : `2px solid ${color}`
			
		}}>
			
			{innerText}
				
		</div>
				
	)
	
}

export default DayOfTheWeek;