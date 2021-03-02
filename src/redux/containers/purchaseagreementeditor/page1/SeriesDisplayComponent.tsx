import React from 'react';
import { checkIfDev } from '../../../../auth/AccessControlFunctions';
import { PriceData } from '../../../../pricedata/objects/PriceData';
import PriceDataRowComponent from './PriceDataRowComponent';

interface Props {
	series: PriceData[];
	seriesName: string;
	promotions: string[];
	promoMonthHalf: number;
	selectData: (data: PriceData, promotion: boolean) => void;
}


const SeriesDisplayComponent = (props: Props) => {
	return(
		<>
			<tr style={{backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>
				<td></td>
				<td colSpan={checkIfDev() ? 11 : 9}>{props.seriesName}</td>
			</tr>
			{
				props.series.map(priceData => (
					<PriceDataRowComponent 
						key={priceData.id}
						data={priceData}
						promotions={props.promotions}
						promoMonthHalf={props.promoMonthHalf}
						selectData={props.selectData}
					/>
				))
			}
		</>
	)
}

export default SeriesDisplayComponent;