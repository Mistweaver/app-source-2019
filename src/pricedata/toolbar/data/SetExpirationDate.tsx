import { EventBusy } from '@material-ui/icons';
import React from 'react';
import { PATH } from '../../../ApplicationConfiguration';
import StandardButton from '../../../components/buttons/StandardButton';
import { ModalButton } from '../../../components/modal/ModalButton';
import { SaveBox } from '../../../components/responseboxes/SaveBox';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import axiosInterceptor from '../../../utilities/AxiosInterceptor';
import { PriceData } from '../../objects/PriceData';

interface Props {
	selectedPriceData: PriceData[];
	reload: () => void;
}

interface State {
	loading: boolean;
	success: boolean;
	error: boolean;
	errorMessage: string;
	newExpirationDate: string;
}

class ExpirationDateEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			success: false,
			error: false,
			errorMessage: "",
			newExpirationDate: "",
		}

		this.handleChange = this.handleChange.bind(this);
		this.setExpiration = this.setExpiration.bind(this);
	}


	private setExpiration() {
		this.setState({ loading: true, error: false, success: false, });
		let newExpirationRequest = new ExpirationUpdateRequest(this.props.selectedPriceData, this.state.newExpirationDate);
		setNewExpirationDate(newExpirationRequest).then(res => {
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.setState({ success: true, error: false });
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		});
	}

	private handleChange(event: { target: { value: string }; }) {
		this.setState({ newExpirationDate: event.target.value });
	}

	public render() {
		const { loading,  error, success} = this.state;
		if(loading) {
			return <SaveBox />
		} else if(success) {
			return <div style={{padding: 10}}>Request Successful</div>
		} else if(error) {
			return <div style={{padding: 10}}>There was an error with your request</div>
		} else {
			return(
				<>
					<div>Enter new expiration date</div>
					<div style={{marginBottom: 25}}>Selected: {this.props.selectedPriceData.length}</div>
					<div style={{marginBottom: 25}}>
						<input onChange={this.handleChange} placeholder="MM/DD/YYYY" value={this.state.newExpirationDate} />
					</div>
				
					<StandardButton onClick={this.setExpiration}>Set Date</StandardButton>
				</>
			)
		}
	}
}

function setNewExpirationDate(expirationUpdatePackage: ExpirationUpdateRequest) {
	return axiosInterceptor.post(`${PATH}/pricedata/setexpiration`, expirationUpdatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

class ExpirationUpdateRequest {
	priceDataIds: string[];
	newExpirationDate: string;

	constructor(_data: PriceData[], expirationDate: string) {

		let dataIdList: string[] = [];
		_data.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
		this.newExpirationDate = expirationDate;
	}
}

interface ExpirationDateProps {
	selectedPriceData: PriceData[];
	reload: () => void;
}

export const SetExpirationDate = (props: ExpirationDateProps) => {
	return(
		<ModalButton 
				actionOnOpen={() => void 0}
				actionOnClose={() => void 0}
				title="Expiration Date Editor"
				tooltipText="Set Expiration Date"
				buttonColor="orange"
				width="md"
				button={<EventBusy />}
			>
				<ExpirationDateEditor selectedPriceData={props.selectedPriceData} reload={props.reload} />
		</ModalButton>
	)
}