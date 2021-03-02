import React from 'react';
import { PriceData } from '../../objects/PriceData';

interface Props {
	data: PriceData;
	viewPriceData: (data: PriceData) => void;
}

class RowWrapper extends React.Component<Props, {}> {
	public render() {
		const { data } = this.props;
		return(
			<tr key={data.id} className="leadRow" onClick={() => this.props.viewPriceData(data)} style={{backgroundColor: "#ff5e5e"}}>
				{this.props.children}
			</tr>
		)
	}
}

export default RowWrapper;