import React from 'react';
import { WhitelistObject } from './WhitelistObject';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import LocationDropdown from '../../../redux/containers/locationdropdown/LocationDropdown';
import { getWhiteListEntries, getWhiteListEntriesByLocationId, addNewEntry, updateEntry, deleteEntry } from './WhitelistServices';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { Grid, Button, Card, CardContent } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface IPManagerProps {
	salesOffices: SalesOffice[];
}

interface IPManagerState {
	addresses: WhitelistObject[];
	selectedLocation: SalesOffice;

	page: number;
	totalPages: number;
	totalObjects: number;

	ipAddress: string;
	ipv6Address: string;
	description: string;
	locationId: string;
	id: string;
	creationTime: string;
	createdBy: string;

	showEntryEditor: boolean;
	edited: boolean;

}

class IPManager extends React.Component<IPManagerProps, IPManagerState> {
	constructor(props: IPManagerProps) {
		super(props);
		this.state = {
			addresses: [],
			selectedLocation: new SalesOffice(),

			page: 0,
			totalPages: 0,
			totalObjects: 0,

			ipAddress: "",
			ipv6Address: "",
			description: "",
			locationId: "",
			id: "",
			creationTime: "",
			createdBy: "",

			edited: false,

			showEntryEditor: false

		}
		this.selectSalesOffice = this.selectSalesOffice.bind(this);
		this.changeWhitelistObjectProperty = this.changeWhitelistObjectProperty.bind(this);
		this.selectWhitelistObjectLocation = this.selectWhitelistObjectLocation.bind(this);

		this.handleNextPage = this.handleNextPage.bind(this);
		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
		

		this.selectWhitelistEntry = this.selectWhitelistEntry.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.saveNewEntry = this.saveNewEntry.bind(this);
		this.createNewEntry = this.createNewEntry.bind(this);
		this.delete = this.delete.bind(this);
	}

	private selectSalesOffice(office: SalesOffice) {
		if(office.officeName === "New Office") {
			this.searchIPWhitelist(0);
		} else {
			this.setState({ selectedLocation: office });
			this.getLocationWhitelist(office.id);
		}
	}

	private getLocationWhitelist(locationId: string) {
		getWhiteListEntriesByLocationId(locationId).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					addresses: res.data._embedded.whitelist,
					totalObjects: res.data._embedded.whitelist.length,
					totalPages: 1,
				})
			}
		})
	}

	private searchIPWhitelist(page: number) {
		console.log("SEARCHING ALL IPS");
		getWhiteListEntries(page).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					addresses: res.data._embedded.whitelist,
					totalObjects: res.data.page.totalElements,
					totalPages: res.data.page.totalPages,
				})
			}
		});
	}

	private selectWhitelistEntry(entry: WhitelistObject) {
		this.setState({
			id: entry.id,
			createdBy: entry.createdBy,
			creationTime: entry.creationTime,
			locationId: entry.locationId,
			description: entry.description,
			ipAddress: entry.ipAddress,
			ipv6Address: entry.ipv6Address,

			showEntryEditor: true
		});
	}

	private createNewEntry() {
		this.setState({
			id: "",
			createdBy: "",
			creationTime: "",
			locationId: "",
			description: "",
			ipAddress: "",
			ipv6Address: "",

			showEntryEditor: true
		});
	}

	private saveNewEntry() {
		let newEntry = new WhitelistObject();
		newEntry.locationId = this.state.locationId;
		newEntry.description = this.state.description;
		newEntry.ipAddress = this.state.ipAddress;
		newEntry.ipv6Address = this.state.ipv6Address;

		addNewEntry(newEntry).then(res => {
			if(validateHTMLResponse(res)) {
				this.searchIPWhitelist(0);
				this.setState({
					id: "",
					createdBy: "",
					creationTime: "",
					locationId: "",
					description: "",
					ipAddress: "",
					ipv6Address: "",
					edited: false,
					showEntryEditor: false
				});
			}
		});
		
	}

	private saveEdits() {
		let editedEntry = new WhitelistObject();
		editedEntry.id = this.state.id;
		editedEntry.createdBy = this.state.createdBy;
		editedEntry.creationTime = this.state.creationTime;
		editedEntry.locationId = this.state.locationId;
		editedEntry.description = this.state.description;
		editedEntry.ipAddress = this.state.ipAddress;
		editedEntry.ipv6Address = this.state.ipv6Address;

		updateEntry(editedEntry).then(res => {
			if(validateHTMLResponse(res)) {
				this.searchIPWhitelist(0);
				this.setState({
					id: "",
					createdBy: "",
					creationTime: "",
					locationId: "",
					description: "",
					ipAddress: "",
					ipv6Address: "",
					edited: false,
					showEntryEditor: false
				});
			}
		});
	}

	private delete() {
		deleteEntry(this.state.id).then(res => {
			console.log(res);
			if(validateHTMLResponse(res)) {
				this.searchIPWhitelist(0);
				this.setState({
					id: "",
					createdBy: "",
					creationTime: "",
					locationId: "",
					description: "",
					ipAddress: "",
					ipv6Address: "",
					edited: false,
					showEntryEditor: false
				});
			}
		})
	}

	public handleNextPage(totalPages: number) {
		const { page } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.searchIPWhitelist(currentPage);
		}
	}

	public handleLastPage(totalPages: number) {
		const { page } = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.searchIPWhitelist(currentPage);
	}

	public handleFirstPage() {
		this.setState({ page: 0 });
		this.searchIPWhitelist(0);
	}

	public handlePreviousPage() {
		const { page } = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.searchIPWhitelist(currentPage);
		}
	}

	private changeWhitelistObjectProperty(event: { target: { name: string, value: string }; }) {
		console.log(event);
		//@ts-ignore
		this.setState({
			[event.target.name]: event.target.value,
			edited: true
		});
	}
	
	private selectWhitelistObjectLocation(office: SalesOffice) {
		this.setState({ locationId: office.id });
	}
	
	public renderRowCells(address: WhitelistObject) {
		let cells: any[] = [];

		if(address.locationId === "") {
			cells.push(
				<td key={"addressLocation" + address.id} style={{padding: 5}}>unassigned</td>
			);
		} else {
			let leadSalesOffice: SalesOffice = this.props.salesOffices.find(office => office.id === address.locationId) || new SalesOffice();
			if(leadSalesOffice.officeName === "New Office") {
				cells.push(
					<td key={"addressLocation" + address.id} style={{padding: 5}}>unassigned</td>
				);
			} else {
				cells.push(
					<td key={"addressLocation" + address.id} style={{padding: 5}}>{leadSalesOffice.officeName}</td>
				);
			}
		}
		
		cells.push(<td key={"addressDescription" + address.id} style={{padding: 5}}>{address.description}</td>);
		cells.push(<td key={"addressIPV4" + address.id} style={{padding: 5}}>{address.ipAddress}</td>);
		cells.push(<td key={"addressIPV6" + address.id} style={{padding: 5}}>{address.ipv6Address}</td>);
		return cells;
	}

	
	public render() {
		const { page, totalPages, totalObjects, addresses, showEntryEditor, edited, id } = this.state;
		return(
			<div>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Card>
							<CardContent>
								<div style={{display: 'flex'}}>
									<LocationDropdown 
										currentSelection={this.state.selectedLocation.id}
										allLocationsOption={true}
										selectLocation={this.selectSalesOffice}
									/>
									<Button variant="outlined" color="primary" onClick={this.createNewEntry}>Add New Entry</Button>
								</div>
								
								<table style={{width: '100%', fontSize: 14}}>
									<thead>
										<tr >
											<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} >Location</th>
											<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} >Description</th>
											<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} >IPv4</th>
											<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} >IPv6</th>
										</tr>
									</thead>
									<tbody>
										{
											addresses.map(address => (
												<tr key={address.id} className="leadRow" onClick={() => this.selectWhitelistEntry(address)} style={{cursor: 'pointer'}}>
													{this.renderRowCells(address)}
												</tr>
											))
										}
									</tbody>
								</table>
								<div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid grey', marginTop: 10}}>	
									<span style={{marginTop: 'auto', marginBottom: 'auto'}}>Page {page + 1} of {totalPages} ({totalObjects} total objects)</span>
									<div style={{textAlign: 'center', padding: '10px'}}>
										<Button variant="outlined" style={{margin: 2}} onClick={this.handleFirstPage}><FirstPageIcon /></Button>
										<Button variant="outlined" style={{margin: 2}} onClick={this.handlePreviousPage}><ChevronLeftIcon /></Button>
										<Button variant="outlined" style={{margin: 2}} onClick={() => this.handleNextPage(totalPages)}><ChevronRightIcon /></Button>
										<Button variant="outlined" style={{margin: 2}} onClick={() => this.handleLastPage(totalPages)}><LastPageIcon /></Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={5}>
						{ showEntryEditor === true &&
							<Card>
								<CardContent>
									<h3 style={{fontWeight: 500}}>{this.state.id === "" ? "New Entry" : "Edit Entry"}</h3>
									<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
										<label>IPv4 Address</label>
										<input name="ipAddress" value={this.state.ipAddress} onChange={this.changeWhitelistObjectProperty} style={{padding: 5}} />
										<label>IPv6 Address</label>
										<input name="ipv6Address" value={this.state.ipv6Address} onChange={this.changeWhitelistObjectProperty} style={{padding: 5}} />
										<label>Description</label>
										<input name="description" value={this.state.description} onChange={this.changeWhitelistObjectProperty} style={{padding: 5}} />
										<label>Location ID</label>
										<LocationDropdown 
											allLocationsOption={false}
											currentSelection={this.state.locationId}
											selectLocation={this.selectWhitelistObjectLocation}
										/>
										
									</div>
									{
										edited && id === "" &&
										<Button variant="contained" color="primary" onClick={this.saveNewEntry}>
											Create
										</Button>
									}

									{
										edited && id !== "" &&
										<Button variant="contained" color="primary" onClick={this.saveEdits}>
											Save Edits
										</Button>
									}
									<Button variant="outlined" color="secondary" onClick={this.delete}>Delete</Button>
								</CardContent>
							</Card>
						}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default IPManager;