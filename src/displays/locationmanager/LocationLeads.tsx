import React from 'react';
import { getLeadsByLocationId, getLocationLeadsByCCId, getLocationLeadsByFirstName, getLocationLeadsByLastName } from '../../services/LeadServices';
import { Button, LinearProgress, InputBase, Slide, Dialog } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { Lead } from '../../objects/lead/Lead';
import { LEADSDISPLAY } from '../../data/tablesettings';
import SearchIcon from '@material-ui/icons/Search';
import { updatePathWithObject } from '../../redux/actions/ApplicationActions';
import { connect } from 'react-redux';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import LeadPage from '../leadmanager/LeadPage';
import { returnReadableLeadState } from '../../data/staticdata';

interface LocationLeadsProps {
	salesOffice: SalesOffice;
	salesOffices: SalesOffice[];
	// updatePathWithObject: (newPath: string, objectId: string) => void;

}

interface LocationLeadsState {
	leads: Lead[];

	page: number;
	size: number;
	sort: string;
	currentSortDirection: string;
	totalPages: number;
	totalObjects: number;
	loading: boolean;
	searchState: string;
	searchKey: string;

	isLeadDrawerOpen: boolean;

	selectedLeadId: string;
}

// state constants
const NO_SEARCH = "NO_SEARCH";
const LEAD_ID_SEARCH = "LEAD_ID_SEARCH";
const FIRST_NAME_SEARCH = "FIRST_NAME_SEARCH";
const LAST_NAME_SEARCH = "LAST_NAME_SEARCH";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
	//@ts-ignore
	return <Slide direction="up" ref={ref} {...props} />;
});

class LocationLeads extends React.Component<LocationLeadsProps, LocationLeadsState> {
	constructor(props: LocationLeadsProps) {
		super(props);
		this.state = {
			leads: [],
			page: 0,
			size: 20,
			sort: "creationTime,desc",
			currentSortDirection: "",
			totalPages: 0,
			totalObjects: 0,
			loading: false,
			searchState: NO_SEARCH,
			searchKey: "",
			// salesOffices: [],

			isLeadDrawerOpen: false,

			selectedLeadId: ""
		}

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleNextPage = this.handleNextPage.bind(this);
		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
		this.setSort = this.setSort.bind(this);
		this.search = this.search.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSelect = this.handleSearchSelect.bind(this);
		this.clear = this.clear.bind(this);
		
		this.openLeadDrawer = this.openLeadDrawer.bind(this);
		this.closeLeadDrawer = this.closeLeadDrawer.bind(this);

	}

	componentDidMount() {
		const { page, size, sort, searchState } = this.state;
		this.getLocationLeads(page, size, sort, searchState)
	}

	componentDidUpdate(prevProps: LocationLeadsProps) {
		if(prevProps.salesOffice.id !== this.props.salesOffice.id && this.props.salesOffice.id !== "") { 
			const { page, size, sort, searchState } = this.state;
			this.getLocationLeads(page, size, sort, searchState)
		} 
	}

	private getLocationLeads(page: number, size: number, sort: string, searchState: string) {
		const { searchKey } = this.state;
		this.setState({ leads: [], loading: true });
		switch(searchState) {
			case NO_SEARCH: {
				getLeadsByLocationId(this.props.salesOffice.clientConsultantId.toString(), page, size, sort).then(res => {
					if(validateHTMLResponse(res)) {
						this.setState({ 
							leads: res.data._embedded.leads,
							totalObjects: res.data.page.totalElements,
							totalPages: res.data.page.totalPages,
							loading: false
						});
					}
				});
				break;
			}
			case LEAD_ID_SEARCH: {
				getLocationLeadsByCCId(searchKey, this.props.salesOffice.clientConsultantId.toString()).then(res => {
					if(validateHTMLResponse(res)) {
						this.setState({
							leads: [res.data],
							totalObjects: 1,
							totalPages: 1,
							loading: false
						});
					}
				});
				break;
			}
			case FIRST_NAME_SEARCH: {
				getLocationLeadsByFirstName(searchKey, this.props.salesOffice.clientConsultantId.toString()).then(res => {
					if(validateHTMLResponse(res)) {
						this.setState({
							leads: res.data._embedded.leads,
							totalObjects: res.data._embedded.leads.length,
							totalPages: 1,
							loading: false
						});
					}
				});
				break;
			}
			case LAST_NAME_SEARCH: {
				getLocationLeadsByLastName(searchKey, this.props.salesOffice.clientConsultantId.toString()).then(res => {
					if(validateHTMLResponse(res)) {
						this.setState({
							leads: res.data._embedded.leads,
							totalObjects: res.data._embedded.leads.length,
							totalPages: 1,
							loading: false
						});
					}
				});
				break;
			}
			default: {
				getLeadsByLocationId(this.props.salesOffice.clientConsultantId.toString(), page, size, sort).then(res => {
					if(validateHTMLResponse(res)) {
						this.setState({ 
							leads: res.data._embedded.leads,
							totalObjects: res.data.page.totalElements,
							totalPages: res.data.page.totalPages,
							loading: false
						});
					}
				});
				break;
			}
		}
	}

	private handleSelectChange(event: { target: { value: string; }; }) {
		const { page, sort, searchState  } = this.state;
		this.getLocationLeads(page, parseInt(event.target.value, 10), sort, searchState );
		this.setState({ size: parseInt(event.target.value, 10) })
	}

	private handleNextPage(totalPages: number) {
		const { page, size, sort, searchState  } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.getLocationLeads(currentPage, size, sort, searchState );
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
		this.getLocationLeads( page, size, sort, searchState);
	}

	private clear() {
		const { page, size, sort } = this.state;
		this.setState({ searchState: NO_SEARCH });
		this.getLocationLeads( page, size, sort, NO_SEARCH);
	}

	private handleLastPage(totalPages: number) {
		const { page, size, sort, searchState  } = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.getLocationLeads(currentPage, size, sort, searchState );
	}

	private handleFirstPage() {
		const { size, sort, searchState  } = this.state;
		this.setState({ page: 0 });
		this.getLocationLeads(0, size, sort, searchState );
	}

	private handlePreviousPage() {
		const { page, size, sort, searchState  } = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.getLocationLeads(currentPage, size, sort, searchState );
		}
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
		this.getLocationLeads(0, size, sort, searchState);
	}

	private renderRowCells(lead: Lead) {
		let cells: any[] = [];
		LEADSDISPLAY.forEach(header=> {
			if(header.columnDef === 'modificationTime') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{new Date(lead[header.columnDef]).toLocaleString()}</td>
				)
			} else if(header.columnDef === 'creationTime') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{new Date(lead[header.columnDef]).toLocaleDateString()}</td>
				)
			} else if(header.columnDef === 'userId') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{lead[header.columnDef]}</td>
				)
			} else if(header.columnDef === 'status') {
				cells.push(
					<td key={header.columnDef} style={{padding: 5}}>{returnReadableLeadState(lead.status)}</td>
				);
			} else if(header.columnDef === 'locationId') {
				let leadSalesOffice: SalesOffice = this.props.salesOffices.find(office => office.clientConsultantId === parseInt(lead.locationId)) || new SalesOffice();
				if(lead.locationId === "1") {
					cells.push(
						<td key={header.columnDef} style={{padding: 5}}>default</td>
					);
				} else {
					cells.push(
						<td key={header.columnDef} style={{padding: 5}}>{leadSalesOffice.officeName}</td>
					);
				}
				
			} else {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef} style={{padding: 5}}>{lead[header.columnDef]}</td>
				)
			}
		})
		return cells;
	}

	private openLeadDrawer(leadId: string) {
		// update the selected lead ID and load it into the drawer
		// this.props.updatePathWithObject("/lead", leadId);
		this.setState({ isLeadDrawerOpen: true, selectedLeadId: leadId });
	}

	private closeLeadDrawer() {
		this.setState({ isLeadDrawerOpen: false });
		this.getLocationLeads( this.state.page, this.state.size, this.state.sort, this.state.searchState);
	}
	

	public render() {
		const { leads, page, size, totalObjects, totalPages, searchState } = this.state;
		// placeholder for search string
		let searchStringPlaceholder = "";
		switch(searchState) {
			case LEAD_ID_SEARCH: { searchStringPlaceholder = "enter lead id"; break;}
			case FIRST_NAME_SEARCH: { searchStringPlaceholder = "enter first name"; break;}
			case LAST_NAME_SEARCH: { searchStringPlaceholder = "enter last name"; break;}
			default: { searchStringPlaceholder = ""; break;}
		}
		return(
			<div>
				<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10, backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', borderRadius: 5, padding: 10 }}>
					<div style={{ display: 'flex', alignItems: 'center'}}>
						{
							totalPages > 1 &&
							<div style={{textAlign: 'center', marginTop: 'auto', marginRight: 15}}>
								<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={this.handleFirstPage}><FirstPageIcon /></Button>
								<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={this.handlePreviousPage}><ChevronLeftIcon /></Button>
								<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={() => this.handleNextPage(totalPages)}><ChevronRightIcon /></Button>
								<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={() => this.handleLastPage(totalPages)}><LastPageIcon /></Button>
							</div>
						}
						<span>Page {page + 1} of {totalPages} ({totalObjects} total objects)</span>
					</div>
					
									
					<div style={{display: 'flex'}}>
						<div style={{display: 'flex', flexDirection: 'column',}}>
							<span style={{marginBottom: 2}}>Show</span>
							<select 
								style={{
									display: 'flex',
									padding: '2px',
									alignItems: 'center',
									border: '1px solid grey',
									backgroundColor: 'rgb(231, 231, 231)',
									minWidth: '100px',
									marginRight: 15,
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
						<select 
							style={{
								display: 'flex',
								padding: '2px',
								alignItems: 'center',
								border: '1px solid grey',
								backgroundColor: 'rgb(231, 231, 231)',
							}}
							onChange={this.handleSearchSelect}
						>
							<option value={NO_SEARCH}>Select Search Option</option>
							<option value={LEAD_ID_SEARCH}>Find Lead by CCID</option>
							<option value={FIRST_NAME_SEARCH}>Find Lead by First Name </option>
							<option value={LAST_NAME_SEARCH}>Find Lead by Last Name</option>
						</select>
						{
							searchState !== NO_SEARCH &&
							<div style={{display: 'flex', padding: '5px', alignItems: 'center', border: '1px solid grey', backgroundColor: 'rgb(231, 231, 231)'}}>
								<InputBase style={{marginLeft: 8, flex: 1 }} placeholder={searchStringPlaceholder} onChange={this.handleSearchChange}/>
								<Button variant="outlined" color="primary" onClick={this.search}>
									<SearchIcon />
								</Button>
								<Button onClick={this.clear}>Clear</Button>
							</div>
						}
						
					</div>
				</div>	
								
				{
					this.state.loading &&
					<LinearProgress />
				}
				<div>
					{
						leads.length === 0 && this.state.loading === false ?
						<div>
							No leads found.  If you believe this to be an error, contact an IT admin
						</div>
						:
						<table 
							style={{
								width: '100%',
								fontSize: 14,
								backgroundColor: 'rgb(231, 231, 231)',
								borderRadius: 5,
								borderSpacing: 'unset'
							}}
							>
							<thead style={{backgroundColor: '#3C4953', color: "#BAD2D7"}}>
								<tr>
									{
										LEADSDISPLAY.map(header => (
											<th key={header.columnDef} style={{cursor: 'pointer', fontWeight: 450, textAlign: 'left', padding: '5px 10px'}} onClick={() => this.setSort(header.columnDef)}>{header.header}</th>
										))
									}
								</tr>
							</thead>
							<tbody>
								{
									leads.map(lead => (
										<tr key={lead.id} className="leadRow" onClick={() => this.openLeadDrawer(lead.id)} style={{cursor: 'pointer'}}>
											{this.renderRowCells(lead)}
											
										</tr>
									))
								}
							</tbody>
						</table>
					}
				</div>
					
				{
					size > 20 &&
					<div style={{display: 'flex', marginTop: 10, backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', borderRadius: 5, padding: 10 }}>
						<div style={{ display: 'flex', alignItems: 'center'}}>
							{
								totalPages > 1 &&
								<div style={{textAlign: 'center', marginTop: 'auto', marginRight: 15}}>
									<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={this.handleFirstPage}><FirstPageIcon /></Button>
									<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={this.handlePreviousPage}><ChevronLeftIcon /></Button>
									<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={() => this.handleNextPage(totalPages)}><ChevronRightIcon /></Button>
									<Button variant="outlined" style={{margin: 2, color: 'rgb(186, 210, 215)', borderColor: 'rgb(186, 210, 215)'}} onClick={() => this.handleLastPage(totalPages)}><LastPageIcon /></Button>
								</div>
							}
							<span>Page {page + 1} of {totalPages} ({totalObjects} total objects)</span>
						</div>
					</div>		
				}
				<Dialog
					open={this.state.isLeadDrawerOpen}
					onClose={this.closeLeadDrawer}
					aria-labelledby="form-dialog-title"
					fullScreen
					TransitionComponent={Transition}
					PaperProps={{
						style: {
							backgroundColor: '#282c34',
							boxShadow: 'none'
						}
					}}
				>
					<LeadPage objectId={this.state.selectedLeadId} closeWindow={this.closeLeadDrawer} />
				</Dialog>
			</div>
		)
	}
}

export default connect(null, { updatePathWithObject})(LocationLeads);