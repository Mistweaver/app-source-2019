import { Help } from '@material-ui/icons';
import React from 'react';
import { ModalButton } from '../modal/ModalButton';

interface Props {
	helpTopicTitle: string;
	helpTopicDetails: string;
}

export const HelpBox = (props: Props) => {
	return(
		<ModalButton 
				actionOnOpen={() => void 0}
				actionOnClose={() => void 0}
				title={props.helpTopicTitle}
				tooltipText="Help"
				buttonColor="teal"
				width="md"
				button={<Help />}
			>
			{props.helpTopicDetails}
		</ModalButton>
	)
}

