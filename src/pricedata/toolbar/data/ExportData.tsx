import { CloudDownload } from "@material-ui/icons";
import React from "react";
import { PATH } from "../../../ApplicationConfiguration";
import StandardButton from "../../../components/buttons/StandardButton";
import { ModalButton } from "../../../components/modal/ModalButton";
import { SaveBox } from "../../../components/responseboxes/SaveBox";
import { validateHTMLResponse } from "../../../services/HttpResponseChecker";
import axiosInterceptor from "../../../utilities/AxiosInterceptor";
import { PriceData } from "../../objects/PriceData";

interface Props {
	selectedPriceData: PriceData[];
}

interface State {
	exporting: boolean;
	success: boolean;
	error: boolean;
	errorMessage: string;
}

class DataExporter extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			exporting: false,
			success: false,
			error: false,
			errorMessage: "",
		}

		this.export = this.export.bind(this);
		
	}

	private export() {
		this.setState({ exporting: true, error: false, success: false, });
		let dataExportRequest = new DataExportRequest(this.props.selectedPriceData);
		requestDataExport(dataExportRequest).then(res => {
			this.setState({ exporting: false });
			if(validateHTMLResponse(res)) {
				console.log(res);
				this.setState({ success: true, error: false });
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		});
	}

	public render() {
		const { exporting } = this.state;
		if(exporting) {
			return <SaveBox />
		/*} else if(success) {
			return <div style={{padding: 10}}>Request Successful</div>
		} else if(error) {
			return <div style={{padding: 10}}>There was an error with your request</div>
		*/} else {
			return(
				<>
					<div style={{marginBottom: 25}}>{this.props.selectedPriceData.length} Data Points to be Exported to CSV</div>
					
					<StandardButton onClick={this.export}>Export Data</StandardButton>
				</>
			)
		}
		
	}

}

function requestDataExport(dataExportRequest: DataExportRequest) {
	return axiosInterceptor.post(`${PATH}/pricedata/export`, dataExportRequest).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

class DataExportRequest {
	priceDataIds: string[];

	constructor(_data: PriceData[]) {

		let dataIdList: string[] = [];
		_data.forEach(data => {
			dataIdList.push(data.id);
		});

		this.priceDataIds = dataIdList;
	}
}

interface ExportDataProps {
	selectedPriceData: PriceData[];
}

export const ExportData = (props: ExportDataProps) => {
	return(
		<ModalButton 
				actionOnOpen={() => void 0}
				actionOnClose={() => void 0}
				title="Export Data"
				tooltipText="Export Data to CSV"
				buttonColor="teal"
				width="md"
				button={<CloudDownload />}
			>
				<DataExporter selectedPriceData={props.selectedPriceData} />
		</ModalButton>
	)
}