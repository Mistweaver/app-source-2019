import { Button, Grid, LinearProgress } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React from 'react';
import { Model } from '../../objects/models/Model';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import ModelPriceDataComponent from './ModelPriceDataComponent';
import { findModelNumber } from './ModelServices';
import ModelTable from './ModelTable';
import NewModelComponent from './NewModelComponent';

interface Props {}

interface State {
	dataView: string;
	selectedModel: Model;
	searchResults: Model[];
	modelNumberSearchString: string;
	searching: boolean;
	searchExecuted: boolean;
}

const SEARCH = "SEARCH";
const LIST = "LIST";
const NEW = "NEW";

class ModelManager extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			dataView: LIST,
			selectedModel: new Model(),
			searchResults: [],

			modelNumberSearchString: "",
			searching: false,
			searchExecuted: false,
		}

		this.setSearchResults = this.setSearchResults.bind(this);
		this.viewModel = this.viewModel.bind(this);
		this.showList = this.showList.bind(this);
		this.showSearch = this.showSearch.bind(this);
		this.showNew = this.showNew.bind(this);
		this.sort = this.sort.bind(this);
		this.createNewModel = this.createNewModel.bind(this);
		this.cancel = this.cancel.bind(this);
		this.updateSearchString = this.updateSearchString.bind(this);
		this.findModelNumber = this.findModelNumber.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.handleKeyStroke = this.handleKeyStroke.bind(this);
		this.returnNewModel = this.returnNewModel.bind(this);
	}

	private setSearchResults(models: Model[]) {
		this.setState({ searchResults: models, dataView: SEARCH });
	}

	private viewModel(model: Model) {
		this.setState({ selectedModel: model });
	}

	private returnNewModel(model: Model) {
		console.log(model);
		this.setState({ modelNumberSearchString: "", searchExecuted: false, dataView: LIST, selectedModel: model });
	}

	private sort(key: string) {}

	private showSearch() { this.setState({ dataView: SEARCH }); }
	private showList() { this.setState({ dataView: LIST }); }
	private showNew() { this.setState({ dataView: NEW }); }

	private createNewModel(modelNumber: string) {
		let newModel = new Model();
		newModel.modelNumber = modelNumber;
		this.setState({ selectedModel: newModel, dataView: NEW });
	}

	private cancel() {
		this.setState({ selectedModel: new Model(), dataView: SEARCH });
	}

	private handleKeyStroke(event: any) {
		if(event.key === 'Enter') {
			this.findModelNumber();
		}
	}

	private clearSearch() {
		this.setState({ modelNumberSearchString: "", searchExecuted: false, dataView: LIST, selectedModel: new Model() });
	}

	private updateSearchString(event: { target: { value: string }}) {
		this.setState({ modelNumberSearchString: event.target.value.trim(), searchExecuted: false });
	}

	private findModelNumber() {
		if(this.state.modelNumberSearchString.length >= 3) {
			this.setState({ searching: true });
			findModelNumber(this.state.modelNumberSearchString).then(res => {
				this.setState({ searching: false, searchExecuted: true });
				if(validateHTMLResponse(res)) {
					this.setState({ searchResults: res.data._embedded.models, dataView: SEARCH});
				}
			});
		}
	}

	public render() {
		const { searchResults, dataView, selectedModel } = this.state;
		const { modelNumberSearchString, searching, searchExecuted } = this.state;

		return(
			<Grid container spacing={1}>
				<Grid item xs={4}>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Search</div>
					<div style={{padding: 10, backgroundColor: 'rgb(231, 231, 231)'}}>
						<div onKeyDown={this.handleKeyStroke}>
							<input placeholder="find model #" value={modelNumberSearchString} onChange={this.updateSearchString} style={{padding: 8, marginRight: 10}}/>
							{
								modelNumberSearchString.length > 0 &&
								<Button variant="outlined" color="secondary" onClick={this.clearSearch} style={{marginRight: 10}}><Clear /></Button>
							}
							{ searchExecuted &&
								<Button color="primary" variant="contained" onClick={() => this.createNewModel(modelNumberSearchString)}>
									Create Model {modelNumberSearchString}
								</Button>
							}
						</div>
						{ modelNumberSearchString.length < 3 && <div style={{fontSize: '9pt'}}>3 character minimum to search</div> }
						{ searching && <div style={{padding: 3}}><LinearProgress /></div>}
						{ searchExecuted && searchResults.length === 0 && <div style={{color: 'red'}}>No Models Found for {modelNumberSearchString}</div>}
					</div>

					{
						dataView === SEARCH &&
						<div>
							{
								searchResults.length > 0 &&
								<>
									<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Search Results:</div>
									<div style={{ maxHeight: '50vh', overflow: 'auto', backgroundColor: 'rgb(231, 231, 231)' }}>
										<table style={{width: '100%', fontSize: '10pt'}}>
											<thead>
												<tr>
													<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: 'rgb(231, 231, 231)'}} onClick={() => this.sort("modelNumber")}>Model No.</th>
													<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: 'rgb(231, 231, 231)'}} onClick={() => this.sort("factoryId")}>Factory ID</th>
													<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: 'rgb(231, 231, 231)'}} onClick={() => this.sort("type")}>Type</th>
													<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: 'rgb(231, 231, 231)'}} onClick={() => this.sort("")}>Bed/Bath</th>
													<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: 'rgb(231, 231, 231)'}} onClick={() => this.sort("")}>W x L</th>
													<th style={{whiteSpace: 'nowrap', padding: 5, fontSize: '9pt', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: 'rgb(231, 231, 231)'}} onClick={() => this.sort("estimatedSquareFeet")}>Sq. Ft.</th>
												</tr>
											</thead>
											<tbody>
												{
													searchResults.map(model => (
														<tr key={model.id} className={model.id === selectedModel.id ? "rowSelected" : "leadRow"} onClick={() => this.viewModel(model)} style={{cursor: 'pointer'}}>
															<td>{model.modelNumber}</td>
															<td>{model.factoryId}</td>
															<td>{model.type}</td>
															<td>{model.numberOfBedrooms + "/" + model.numberOfBathrooms}</td>
															<td>{model.width + " x " + model.length1}</td>
															<td>{model.estimatedSquareFeet}</td>
														</tr>
													))
												}
											</tbody>
										</table>
									</div>
								</>
							}
						</div>
					}

					{
						dataView === LIST &&
						<ModelTable
							selectedModel={selectedModel}
							viewModel={this.viewModel}
						/>
					}
					<NewModelComponent 
						modelId={selectedModel.id}
						modelNumber={selectedModel.modelNumber}
						returnNewModel={this.returnNewModel}
						cancelModelCreation={this.cancel}
					/>
					
				</Grid>
				<Grid item xs={8}>
					<ModelPriceDataComponent model={selectedModel} viewModel={this.viewModel} />
				</Grid>
			</Grid>
		)
	}
}

export default ModelManager;