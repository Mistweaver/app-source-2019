import React from 'react';

interface Props {
	// accepts a list of price data series
}

interface State {
	// build a variable pool
	// build an equation pool

	// number of columns for vars/eqns
	// selected variable
	// selected equation
}

class PriceDataTable extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {}
	}

	public render() {
		return(
			<div>

			</div>
		)
	}
}


export default PriceDataTable;