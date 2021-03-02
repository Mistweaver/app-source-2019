import React from 'react';
import { PriceData } from '../objects/PriceData';

/********
 * This component is used to show what updates were successful and what updates failed when modifying price data
 * 
 */
interface Props {
	responseData: PriceData[];
}

const ResponseDataDisplay = (props : Props) => {

	return(
		<table style={{backgroundColor: 'rgb(231, 231, 231)', width: '100%', fontSize: '10pt', borderSpacing: 0}}>
			<thead>
				<tr>
					<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left'}}>Model No.</th>
					<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left'}}>Name</th>
					<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left'}}>Type</th>
					<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left'}}>Status</th>
					<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left'}}>Active</th>
					<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left'}}>Exp</th>
				</tr>
			</thead>
			<tbody>
				{
					props.responseData.map(data => (
						<tr key={data.id} className="leadRow">
							<td>{data.model.modelNumber}</td>
							<td>{data.name}</td>
							<td>{data.model.type}</td>
							<td>{data.status}</td>
							<td>{data.activeDate}</td>
							<td>{data.expirationDate}</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}

export default ResponseDataDisplay;