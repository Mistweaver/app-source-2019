import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../Store';

interface DocumentStateProps {
	status: string;
}

function mapStateToProps(state: StoreState) {
	
}

const DocumentState = (props: DocumentStateProps) => {


	return(
		<div>

		</div>
	)
}

export default connect(mapStateToProps, {})(DocumentState);