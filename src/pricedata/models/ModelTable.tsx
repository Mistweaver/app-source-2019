import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { Model } from '../../objects/models/Model';
import { getModels } from './ModelServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '@material-ui/icons';

interface Props {
	selectedModel: Model;
	viewModel: (model: Model) => void;
}

interface State {
	loading: boolean;
	models: Model[];
	page: number;
	size: number;
	sort: string;
	currentSortDirection: string;
	totalPages: number;
	totalObjects: number;
}


class ModelTable extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			page: 0,
			size: 20,
			sort: "creationTime,desc",
			currentSortDirection: "",
			totalPages: 0,
			totalObjects: 0,
			models: [],
			loading: false,
		}

		this.sort = this.sort.bind(this);
		this.loadModels = this.loadModels.bind(this);

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleNextPage = this.handleNextPage.bind(this);
		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
		this.loadPage = this.loadPage.bind(this);
	}

	componentDidMount() {
		this.loadPage();
	}

	componentDidUpdate(prevProps: Props) {
		if(prevProps.selectedModel !== this.props.selectedModel && this.props.selectedModel.id === "") {
			this.loadPage();
		}
	}

	public handleSelectChange(event: { target: { value: string; }; }) {
		const { page, sort } = this.state;
		this.loadModels(page, parseInt(event.target.value, 10), sort);
		this.setState({ size: parseInt(event.target.value, 10) })
	}

	public handleNextPage(totalPages: number) {
		const { page, size, sort } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.loadModels(currentPage, size, sort);
		}
	}

	public handleLastPage(totalPages: number) {
		const { page, size, sort } = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.loadModels(currentPage, size, sort);
	}

	public handleFirstPage() {
		const { size, sort } = this.state;
		this.setState({ page: 0 });
		this.loadModels(0, size, sort);
	}

	public handlePreviousPage() {
		const { page, size, sort } = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.loadModels(currentPage, size, sort);
		}
	}

	/*************sorting ************ */
	public sort(sort: string) {
		// console.log(sort);
		const { size, currentSortDirection } = this.state;
		
		switch(currentSortDirection) {
			case "": {
				sort = sort + ",asc";
				this.setState({
					currentSortDirection: "asc",
					sort: sort
				});
				break;
			}
			case "asc": {
				sort = sort + ",desc";
				this.setState({
					currentSortDirection: "desc",
					sort: sort
				});
				break;
			}
			case "desc": {
				sort = "";
				this.setState({
					currentSortDirection: "",
					sort: sort
				});
				break;
			}
		}
		this.loadModels(0, size, sort);
	}



	private loadModels(page: number, size: number, sort: string) {
		this.setState({ loading: true });
	
		getModels(page, size, sort).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					models: res.data._embedded.models,
					totalObjects: res.data.page.totalElements,
					totalPages: res.data.page.totalPages,
					loading: false
				});
			} else {
				this.setState({ loading: false });
			}
		});
	}



	private loadPage() {
		const { page, size, sort } = this.state;
		this.loadModels(page, size, sort);
	}

	
	

	public render() {
		const { models, loading, totalObjects, totalPages, page, size } = this.state;

		return(
			
			<div style={{width: '100%'}}>
				<div style={{backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', borderRadius: 5, padding: 10 }}>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<div>Page {page + 1} of {totalPages} ({totalObjects} models)</div>
						<div style={{display: 'flex'}}>
							<span style={{marginRight: 7}}>Show</span>
							<select 
								style={{
									display: 'flex',
									padding: '2px',
									alignItems: 'center',
									border: '1px solid grey',
									backgroundColor: 'rgb(231, 231, 231)',
									marginRight: 10,
									borderRadius: 15
								}}
								value={size}
								name="show"
								onChange={this.handleSelectChange}
							>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
							</select>
						</div>
					</div>
				</div>						
				{
					loading ?
					<LinearProgress />
					:
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
									models.map(model => (
										<tr key={model.id} className={model.id === this.props.selectedModel.id ? "rowSelected" : "leadRow"} onClick={() => this.props.viewModel(model)} style={{cursor: 'pointer'}}>
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
				}
				{
					totalPages > 1 &&
					<div style={{backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5, textAlign: 'center' }}>
						<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={this.handleFirstPage}><FirstPage /></Button>
						<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={this.handlePreviousPage}><ChevronLeft /></Button>
						<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={() => this.handleNextPage(totalPages)}><ChevronRight /></Button>
						<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={() => this.handleLastPage(totalPages)}><LastPage /></Button>
					</div>		
				}
			</div>	
				
		)
	}
}

export default ModelTable;

