import { EventAvailable } from '@material-ui/icons';
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
	newActiveDate: string;
}

class ActiveDateEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			success: false,
			error: false,
			errorMessage: "",
			newActiveDate: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.setActiveDate = this.setActiveDate.bind(this);
	}


	private setActiveDate() {
		this.setState({ loading: true, error: false, success: false, });
		let newActiveDateRequest = new EditActiveDateRequest(this.props.selectedPriceData, this.state.newActiveDate);
		setNewActiveDate(newActiveDateRequest).then(res => {
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
		this.setState({ newActiveDate: event.target.value });
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
					<div>Enter new active date</div>
					<div style={{marginBottom: 25}}>Selected: {this.props.selectedPriceData.length}</div>
					<div style={{marginBottom: 25}}>
						<input onChange={this.handleChange} placeholder="MM/DD/YYYY" value={this.state.newActiveDate} />
					</div>
					<StandardButton onClick={this.setActiveDate}>Set Date</StandardButton>
				</>
			)
		}
		
	}
}

function setNewActiveDate(expirationUpdatePackage: EditActiveDateRequest) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/setactivedate`, expirationUpdatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

class EditActiveDateRequest {
	priceDataIds: string[];
	newActiveDate: string;

	constructor(_data: PriceData[], _newActiveDate: string) {

		let dataIdList: string[] = [];
		_data.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
		this.newActiveDate = _newActiveDate;
	}
}

interface ActiveDateProps {
	selectedPriceData: PriceData[];
	reload: () => void;
}

export const SetActiveDate = (props: ActiveDateProps) => {
	return(
		<ModalButton 
				actionOnOpen={() => void 0}
				actionOnClose={() => void 0}
				title="Change Active Date"
				tooltipText="Set Active Date"
				buttonColor="teal"
				width="md"
				button={<EventAvailable />}
			>
				<ActiveDateEditor selectedPriceData={props.selectedPriceData} reload={props.reload} />
		</ModalButton>
	)
}