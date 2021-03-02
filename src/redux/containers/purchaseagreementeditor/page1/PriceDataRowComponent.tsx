import { checkIfDev } from '../../../../auth/AccessControlFunctions';
import { PriceData } from '../../../../pricedata/objects/PriceData';
import { FormatNumberAsMoney } from '../../../../utilities/FormatNumberAsMoney';

interface Props {
	data: PriceData;
	promotions: string[];
	promoMonthHalf: number;
	selectData: (data: PriceData, promotion: boolean) => void;
}


const PriceDataRowComponent = (props: Props) => {
	const { data, promotions, promoMonthHalf } = props;
	 //console.log("PRICE DATA ROW COMPONENT");
	 //console.log(data);
	 //console.log(promotions);
	let promotion = false;
	var i = 0, len = props.promotions.length;
	while(i < len) {
		// console.log(promotions[i]);
		// console.log(props.data.modelId)
		if(promotions[i] === props.data.modelId) {
			promotion = true;
			i = len;
		}
		i++;
	}

	return(
		<tr key={data.id} className={promotion ? "rowSelected" : "leadRow"} onClick={() => props.selectData(data, promotion)}>
			<td>{promotion && <span style={{color: 'red', fontWeight: 550}}>PROMO</span>}</td>
			<td>{data.name}</td>
			<td>{data.model ? data.model.modelNumber : "#ERR"}</td>
			<td>{data.model  ? data.model.type : "#ERR"}</td>
			<td>{data.model.width + " x " + data.model.length1}</td>
			<td>{data.model.numberOfBedrooms + "/" + data.model.numberOfBathrooms}</td>
			<td>{data.model.estimatedSquareFeet}</td>
			<td>{FormatNumberAsMoney(data.msrp)}</td>
			<td>{promotion ? FormatNumberAsMoney((promoMonthHalf === 1 ? data.firstHalfAdvertisingPrice : data.secondHalfAdvertisingPrice) - data.msrp) : FormatNumberAsMoney(data.factoryDirectPrice  - data.msrp)}</td>
			<td>{promotion ? FormatNumberAsMoney((promoMonthHalf === 1 ? data.firstHalfAdvertisingPrice : data.secondHalfAdvertisingPrice)) : FormatNumberAsMoney(data.factoryDirectPrice)}</td>
			{
				checkIfDev() &&
				<>
					<td>{data.activeDate}</td>
					<td>{data.expirationDate}</td>
				</>
			}
		</tr>
	)
	
	
}

export default PriceDataRowComponent;
