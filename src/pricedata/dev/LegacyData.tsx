import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
// import axiosInterceptor from '../../utilities/AxiosInterceptor';
// import { PATH } from '../../ApplicationConfiguration';
// import { ConvertMonthIntegerToString } from '../../utilities/ConvertMonthIntegerToString';

interface LegacyDataState {
	loading: boolean;
	processingData: boolean;
	deletingData: boolean;
}

class LegacyData extends React.Component<{}, LegacyDataState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			loading: false,
			processingData: false,
			deletingData: false,
		}

		// this.expireAllActiveData = this.expireAllActiveData.bind(this);
		// this.auditVarsAndEqns = this.auditVarsAndEqns.bind(this);
		// this.importData = this.importData.bind(this);
		// this.getDuplicateModels = this.getDuplicateModels.bind(this);
		// this.deleteEmptyModels = this.deleteEmptyModels.bind(this);
	}

	componentDidMount() {
		// this.processPriceSheets();
	}

	/*private expireAllActiveData() {
		this.setState({ deletingData: true });
		return axiosInterceptor.post(`${PATH}/legacydata/expireallactivedata`).then(response => {
			return Promise.resolve(response);
		}).then(res => {
			this.setState({ deletingData: false });
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}*/


	/*private deleteNewDataTest() {
		this.setState({ deletingData: true });
		return axiosInterceptor.post(`${PATH}/legacydata/deletealldata`).then(response => {
			return Promise.resolve(response);
		}).then(res => {
			this.setState({ deletingData: false });
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}

	private processLegacyData() {
		this.setState({ processingData: true });
		return axiosInterceptor.get(`${PATH}/legacydata/convertdataformonth`, {
			params: {
				month: 10,
				year: 2020
			}
		}).then(response => {
			return Promise.resolve(response);
		}).then(res => {
			this.setState({ processingData: false });
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}*/

	/*private auditVarsAndEqns() {
		this.setState({ processingData: true });
		return axiosInterceptor.post(`${PATH}/legacydata/auditdata`).then(response => {
			this.setState({ processingData: false });
			console.log(response);
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}

	private importData() {
		this.setState({ processingData: true });
		return axiosInterceptor.get(`${PATH}/legacydata/importdata`, {
			params: {
				month: 11,
				year: 2020
			}
		}).then(response => {
			this.setState({ processingData: false });
			console.log(response);
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}*/

	/*private getDuplicateModels() {
		return axiosInterceptor.get(`${PATH}/models/duplicates`).then(response => {
			this.setState({ processingData: false });
			console.log(response);
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}*/

	/*private deleteEmptyModels() {
		this.setState({ deletingData: true });
		return axiosInterceptor.post(`${PATH}/legacydata/deleteemptymodels`).then(response => {
			return Promise.resolve(response);
		}).then(res => {
			this.setState({ deletingData: false });
		}).catch((error) => {
			console.log(error);
			return Promise.resolve(error.response);
		});
	}*/

	public render() {
		const { processingData } = this.state;
		return(
			<div style={{padding: 15}}>
				<Grid container spacing={1}>
					<Grid item xs={2}>
						{/*<Button onClick={this.auditVarsAndEqns} variant="contained">Audit Var/Eqn Data</Button>
						<Button onClick={this.importData} variant="contained">Import {ConvertMonthIntegerToString(11)} Data</Button>
						<Button variant="contained" color="primary" onClick={this.getDuplicateModels}>Get Duplicate Models</Button>
						<Button variant="contained" color="primary" onClick={this.expireAllActiveData}>Expire Active Data</Button>
						<Button variant="contained" color="primary" onClick={this.deleteEmptyModels}>Delete Empty Models</Button>*/}
					</Grid>
					<Grid item xs={10}>
						{
							processingData &&
							<div style={{padding: 10, display: 'flex', verticalAlign: 'middle', backgroundColor: 'rgba(231, 231, 231, 0.3)'}}>
								<div style={{margin: 'auto', textAlign: 'center'}}>
									<p>Processing. Please wait...</p>
									<CircularProgress />
								</div>
							</div>	
						}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default LegacyData;


