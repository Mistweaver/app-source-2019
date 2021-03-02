import { Money } from '@material-ui/icons';
import React from 'react';
import StandardButton from '../../../components/buttons/StandardButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { PriceData } from '../../objects/PriceData';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { ModalButton } from '../../../components/modal/ModalButton';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { PATH } from '../../../ApplicationConfiguration';
import axiosInterceptor from '../../../utilities/AxiosInterceptor';

interface Props {
	priceDataId: string;
	currentBasePrice: number;
	reload: () => void;
}

interface State {
	// editable fields
	loading: boolean;
	success: boolean;
	error: boolean;
	errorMessage: string;
	newBasePrice: string;

}

const initialState = {
	loading: false,
	success: false,
	error: false,
	errorMessage: "",
	newBasePrice: "",

}

class BasePriceEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
		this.saveEdits = this.saveEdits.bind(this);
		this.changeBasePrice = this.changeBasePrice.bind(this);
	}


	private saveEdits() {
		this.setState({ loading: true, error: false, success: false, });
		let updatePackage = new BasePriceUpdatePackage(this.props.priceDataId, this.state.newBasePrice);

		updateBasePrice(updatePackage).then(res => {
			this.setState({ loading: false });
			// this.setStateFromData(res.data);
			if(validateHTMLResponse(res)) {
				this.setState({ success: true, error: false });
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		});
	}

	private changeBasePrice(event: { target: { name: string, value: string }}) {
		this.setState({ newBasePrice: event.target.value, error: false, success: false });
	}


	public render() {
		const { newBasePrice, loading,  error, success} = this.state;
		if(loading) {
			return <SaveBox />
		} else if(success) {
			return <div style={{padding: 10}}>Request Successful</div>
		} else if(error) {
			return <div style={{padding: 10}}>There was an error with your request</div>
		} else {
			return(
				<>
					<div>
						<div>Current Base Price</div>
						<div style={{marginBottom: 10}}>{FormatNumberAsMoney(this.props.currentBasePrice)}</div>
						<div>New Base Price</div>
						<div style={{marginBottom: 25}}>
							$<input type="number" value={newBasePrice} onChange={this.changeBasePrice} />	
						</div>
						<StandardButton onClick={this.saveEdits}>Save</StandardButton>
					</div>
				</>
			)
		}
	}
}


class BasePriceUpdatePackage {
	id: string;
	basePrice: string

	constructor(_id: string, _basePrice: string) {
		this.id = _id;
		this.basePrice = _basePrice;
	}
}

function updateBasePrice(basePriceUpdatePackage: BasePriceUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/updatebaseprice`, basePriceUpdatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

interface EditBasePriceProps {
	data: PriceData;
	reload: () => void;
}

export const EditBasePrice = (props: EditBasePriceProps) => {
	let basePrice = 0;

	function loadBasePriceFromData() {
		basePrice = props.data.basePrice;
	}

	return(
		<ModalButton 
				actionOnOpen={loadBasePriceFromData}
				actionOnClose={() => void 0}
				title="Base Price Editor"
				tooltipText="Edit Base Price"
				buttonColor="green"
				width="md"
				button={<Money />}
			>
				<BasePriceEditor 
					priceDataId={props.data.id}
					currentBasePrice={basePrice}
					reload={props.reload} 
				/>
		</ModalButton>
	)
}