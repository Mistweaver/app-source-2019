import React from 'react';
import { getPurchaseAgreementsByLocationId } from '../../services/PurchaseAgreementService';
import {TextField, MenuItem, Button, LinearProgress, Card, CardContent, InputBase } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { PurchaseAgreement } from '../../objects/purchaseagreement/PurchaseAgreement';
import { PURCHASE_AGREEMENT_DISPLAY } from '../../data/tablesettings';
import SearchIcon from '@material-ui/icons/Search';
import { updatePathWithObject } from '../../redux/actions/ApplicationActions';
import { connect } from 'react-redux';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { STATES, returnReadableState } from '../../data/staticdata';

interface LocationPurchaseAgreementsProps {
	salesOffice: SalesOffice;
	updatePathWithObject: (newPath: string, objectId: string) => void;

}

interface LocationPAState {
	purchaseAgreements: PurchaseAgreement[];

	page: number;
	size: number;
	sort: string;
	currentSortDirection: string;
	totalPages: number;
	totalObjects: number;
	loading: boolean;
	searchState: string;
	searchKey: string;
}

// state constants
const NO_SEARCH = "NO_SEARCH";
const ID_SEARCH = "ID_SEARCH";
const LEAD_ID_SEARCH = "LEAD_ID_SEARCH";
const BUYER_NAME_SEARCH = "BUYER_NAME_SEARCH";
const EMAIL_SEARCH = "EMAIL_SEARCH";
const DELIVERY_STATE_SEARCH = "DELIVERY_STATE_SEARCH";


class LocationPurchaseAgreements extends React.Component<LocationPurchaseAgreementsProps, LocationPAState> {
	constructor(props: LocationPurchaseAgreementsProps) {
		super(props);
		this.state = {
			purchaseAgreements: [],
			page: 0,
			size: 20,
			sort: "",
			currentSortDirection: "creationTime,desc",
			totalPages: 0,
			totalObjects: 0,
			loading: false,
			searchState: NO_SEARCH,
			searchKey: ""
		}

		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
		this.handleNextPage = this.handleNextPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.setSort = this.setSort.bind(this);
		this.search = this.search.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSelect = this.handleSearchSelect.bind(this);
		this.clear = this.clear.bind(this);

		this.selectAgreement = this.selectAgreement.bind(this);

	}

	componentDidMount() {
		const { page, size, sort, searchState } = this.state;
		this.getLocationPAs(page, size, sort, searchState);
	}

	componentDidUpdate(prevProps: LocationPurchaseAgreementsProps) {
		if(prevProps.salesOffice.id !== this.props.salesOffice.id && this.props.salesOffice.id !== "") { 
			const { page, size, sort, searchState } = this.state;
			this.getLocationPAs(page, size, sort, searchState);
		} 
	}

	private getLocationPAs(page: number, size: number, sort: string, searchState: string) {
		this.setState({ purchaseAgreements: [], loading: true });
		getPurchaseAgreementsByLocationId(this.props.salesOffice.id, page, size, sort).then(res => {
			if(validateHTMLResponse(res)) {
				// console.log("Purchase agreement response");
				// console.log(res);
				this.setState({ 
					purchaseAgreements: res.data._embedded.purchaseagreements,
					totalObjects: res.data.page.totalElements,
					totalPages: res.data.page.totalPages,
					loading: false
				});
			}
		});
	}

	private handleSelectChange(event: { target: { value: string; }; }) {
		const { page, sort, searchState } = this.state;
		this.getLocationPAs(page, parseInt(event.target.value, 10), sort, searchState);
		this.setState({ size: parseInt(event.target.value, 10) })
	}


	private handleNextPage(totalPages: number) {
		const { page, size, sort, searchState } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.getLocationPAs(currentPage, size, sort, searchState);
		}
	}

	private handleLastPage(totalPages: number) {
		const { page, size, sort, searchState } = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.getLocationPAs(currentPage, size, sort, searchState);
	}

	private handleFirstPage() {
		const { size, sort, searchState } = this.state;
		this.setState({ page: 0 });
		this.getLocationPAs(0, size, sort, searchState);
	}

	private handlePreviousPage() {
		const { page, size, sort, searchState } = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.getLocationPAs(currentPage, size, sort, searchState);
		}
	}

	public handleSearchChange(event: any) {
		this.setState({ searchKey: event.target.value });
	}

	public handleSearchSelect(event : { target: { value: string }}) {
		this.setState({ searchState: event.target.value, searchKey: "" });
	}

	private search() {
		const { page, size, sort, searchState } = this.state;
		this.getLocationPAs( page, size, sort, searchState);
	}

	private clear() {
		const { page, size, sort } = this.state;
		this.setState({ searchState: NO_SEARCH, searchKey: "" });
		this.getLocationPAs( page, size, sort, NO_SEARCH);
	}

	/*************sorting ************ */
	private setSort(sort: string) {
		// console.log(sort);
		const { size, currentSortDirection, searchState } = this.state;
		
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
		this.getLocationPAs(0, size, sort, searchState);
	}

	private renderRowCells(agreement: PurchaseAgreement) {
		let cells: any[] = [];
		PURCHASE_AGREEMENT_DISPLAY.forEach(header=> {
			if(header.columnDef === 'modificationTime') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{new Date(agreement[header.columnDef]).toLocaleString()}</td>
				)
			} else if(header.columnDef === 'creationTime') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{new Date(agreement[header.columnDef]).toLocaleDateString()}</td>
				)
			} else if(header.columnDef === 'status') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{returnReadableState(agreement.status)}</td>
				);
			} else if(header.columnDef === 'salesPersonId') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{agreement[header.columnDef]}</td>
				)
			} else {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef} style={{padding: 5}}>{agreement[header.columnDef]}</td>
				)
			}
		})
		return cells;
	}

	private selectAgreement(agreementId: string) {
		this.props.updatePathWithObject("/purchaseagreement", agreementId);
	}
	
	
	public render() {
		const { purchaseAgreements, page, size, totalObjects, totalPages, searchState } = this.state;
		let searchStringPlaceholder = "";
		switch(searchState) {
			case ID_SEARCH: { searchStringPlaceholder = "enter id"; break;}
			case LEAD_ID_SEARCH: { searchStringPlaceholder = "enter lead id"; break;}
			case BUYER_NAME_SEARCH: { searchStringPlaceholder = "enter buyer name"; break;}
			case DELIVERY_STATE_SEARCH: { searchStringPlaceholder = "enter delivery state"; break;}
			case EMAIL_SEARCH: { searchStringPlaceholder = "enter email"; break;}
			default: { searchStringPlaceholder = ""; break;}
		}
		return(
			<div style={{padding: 15}}>
				<Card>
					<CardContent>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>	
							<TextField
								select
								label="Show"
								type="number"
								value={size}
								onChange={this.handleSelectChange}
								margin="none"
								name="show"
								style={{minWidth: '100px', marginRight: 15}}
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={50}>50</MenuItem>
								<MenuItem value={100}>100</MenuItem>
							</TextField>							
							<div style={{display: 'flex'}}>
								<select 
									style={{
										display: 'flex',
										padding: '5px',
										alignItems: 'center',
										border: '1px solid grey',
										backgroundColor: 'white'
									}}
									value={searchState}
									onChange={this.handleSearchSelect}
								>
									<option value={NO_SEARCH}>Select Search Option</option>
									<option value={ID_SEARCH}>Find Agreement by ID</option>
									<option value={LEAD_ID_SEARCH}>Find Agreement by Lead ID</option>
									<option value={DELIVERY_STATE_SEARCH}>Find Agreement by Delivery State</option>
									<option value={BUYER_NAME_SEARCH}>Find Agreement By Buyer Name</option>
									<option value={EMAIL_SEARCH}>Find Agreement By Email</option>
								</select>
								{
									searchState !== NO_SEARCH &&
									<div style={{display: 'flex', padding: '5px', alignItems: 'center', border: '1px solid grey', backgroundColor: 'white'}}>
										{
											searchState === DELIVERY_STATE_SEARCH ?
											<>
												<input 
													list="states"
													name="stateSelection"
													placeholder="select state"
													onChange={this.handleSearchChange}
													style={{
														padding: 10,
													}}
												/>
												<datalist id="states">
													{
														STATES.map(state => (
															<option key={state.id} value={state.abbreviation}>{state.name}</option>
														))
													}
												</datalist>
											</>
											:
											<InputBase style={{marginLeft: 8, flex: 1 }} placeholder={searchStringPlaceholder} onChange={this.handleSearchChange}/>
										}
										<Button variant="outlined" color="primary" onClick={this.search}>
											<SearchIcon />
										</Button>
										<Button onClick={this.clear}>Clear</Button>
									</div>
								}
								
							</div>
						</div>
								
							{
								this.state.loading ?
								<LinearProgress />
								:
								<div>
									{
										purchaseAgreements.length === 0 ?
										<div>
											No agreements found.  If you believe this to be an error, contact an IT admin
										</div>
										:
										<table style={{width: '100%', fontSize: 14}}>
											<thead>
												<tr >
													{
														PURCHASE_AGREEMENT_DISPLAY.map(header => (
															<th key={header.columnDef} style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} onClick={() => this.setSort(header.columnDef)}>{header.header}</th>
														))
													}
													<th style={{ borderBottom: '1px solid black'}}></th>
												</tr>
											</thead>
											<tbody>
												{
													purchaseAgreements.map(agreement => (
														<tr key={agreement.id} style={{borderBottom: '1px solid lightgray'}}>
															{this.renderRowCells(agreement)}
															<td style={{padding: 2}}>
																<Button 
																	variant="outlined"
																	color="primary"
																	style={{padding: '2px 5px'}}
																	onClick={() => this.selectAgreement(agreement.id)}
																>
																	View Agreement
																</Button>
															</td>
														</tr>
													))
												}
											</tbody>
										</table>

									}
								</div>
							}
						<div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid grey', marginTop: 10}}>	
							<span style={{marginTop: 'auto', marginBottom: 'auto'}}>Page {page + 1} of {totalPages} ({totalObjects} total objects)</span>
							<div style={{textAlign: 'center', padding: '10px'}}>
								<Button variant="outlined" style={{margin: 2}} onClick={this.handleFirstPage}><FirstPageIcon />First Page</Button>
								<Button variant="outlined" style={{margin: 2}} onClick={this.handlePreviousPage}><ChevronLeftIcon />Previous Page</Button>
								<Button variant="outlined" style={{margin: 2}} onClick={() => this.handleNextPage(totalPages)}>Next Page<ChevronRightIcon /></Button>
								<Button variant="outlined" style={{margin: 2}} onClick={() => this.handleLastPage(totalPages)}>Last Page<LastPageIcon /></Button>
							</div>
						</div>
					</CardContent>
				</Card>
				
			</div>
		)
	}
}

export default connect(null, { updatePathWithObject})(LocationPurchaseAgreements);