import React from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import UserPane from './UserPane';
import { getUsers, getUsersByLocation } from '../../../services/UserServices';
import { User } from '../../../objects/user/User';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { USERSDISPLAY } from '../../../data/tablesettings';
import { sortSalesOffices } from '../../../utilities/UtilityServices';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';

interface UserControlProps {
	salesOffices: SalesOffice[];
}

interface UserControlState {
	users: User[];
	showUserPane: boolean;
	selectedUser: User;

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

class UserControl extends React.Component<UserControlProps, UserControlState> {
	constructor(props: UserControlProps) {
		super(props);
		this.state = {
			users: [],
			showUserPane: false,
			selectedUser: new User(),

			page: 0,
			size: 20,
			sort: "creationTime,desc",
			currentSortDirection: "",
			totalPages: 0,
			totalObjects: 0,
			loading: false,
			searchState: NO_SEARCH,
			searchKey: "",
		}

		this.loadUsers = this.loadUsers.bind(this);
		this.getUsersByLocation = this.getUsersByLocation.bind(this);

		this.handleNextPage = this.handleNextPage.bind(this);
		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
	}

	componentDidMount() {
		const { page, size, sort, searchState } = this.state;
		this.loadUsers(page, size, sort, searchState);
	}

	componentWillUnmount() {}

	public handleNextPage(totalPages: number) {
		const { page, size, sort, searchState } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.loadUsers(currentPage, size, sort, searchState);
		}
	}

	public handleLastPage(totalPages: number) {
		const { page, size, sort, searchState } = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.loadUsers(currentPage, size, sort, searchState);
	}

	public handleFirstPage() {
		const { size, sort, searchState } = this.state;
		this.setState({ page: 0 });
		this.loadUsers(0, size, sort, searchState);
	}

	public handlePreviousPage() {
		const { page, size, sort, searchState } = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.loadUsers(currentPage, size, sort, searchState);
		}
	}

	public loadUsers(page: number, size: number, sort: string, searchState: string) {
		// const { searchKey } = this.state;
		this.setState({ loading: true });
		getUsers(page, size, sort).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					users: res.data._embedded.users,
					showUserPane: false,
					totalObjects: res.data.page.totalElements,
					totalPages: res.data.page.totalPages,
					loading: false
				});
			}
		});
	}

	public openUser(user: User) {
		this.setState({ 
			showUserPane: true,
			selectedUser: user
		});
	}


	public getUsersByLocation(event: any) {
		const { page, size, sort, searchState } = this.state;

		if(event.target.value === "all") {
			this.loadUsers(page, size, sort, searchState);
		} else {
			getUsersByLocation(event.target.value).then(res => {
				if(validateHTMLResponse(res)) {
					this.setState({
						users: res.data._embedded.users
					});
				}
			});
		}
	}

	public renderRowCells(object: any) {
		let cells: any[] = [];
		USERSDISPLAY.forEach(header=> {
			if(header.columnDef === 'modificationTime') {
				cells.push(
					<td key={header.columnDef}>{new Date(object[header.columnDef]).toLocaleString()}</td>
				)
			} else if(header.columnDef === 'creationTime') {
				cells.push(
					<td key={header.columnDef}>{new Date(object[header.columnDef]).toLocaleDateString()}</td>
				)
			} else {
				cells.push(
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			}
		})
		return cells;
	}

	public render() {
		const { salesOffices } = this.props;
		const { users, showUserPane, selectedUser, page, totalObjects, totalPages } = this.state;
		salesOffices.sort(sortSalesOffices);
		return(
			<div>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10}}>Show Users By Location</div>
						<select onChange={this.getUsersByLocation} style={{padding: 10, width: '100%', borderColor: "#3f51b5", marginTop: 0}}>
							<option value="all">All</option>
							<option value="">Unassigned</option>
							{
								salesOffices.map(location => (
									<option key={location.id} value={location.id}>{location.officeName}</option>
								))
							}
						</select>
						<Card>
							<CardContent>
								<table style={{width: '100%', fontSize: 13}}>
									<thead>
										<tr>
											{
												USERSDISPLAY.map(header => (
													<th key={header.columnDef} style={{textAlign: 'left'}}>{header.header}</th>
												))
											}
										</tr>
										
									</thead>
									<tbody>
										{
											users.map(user => (
												<tr key={user.id} style={{cursor: 'pointer'}} onClick={() => this.openUser(user)}>
													{this.renderRowCells(user)}
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
						{ showUserPane === true &&
							<UserPane user={selectedUser} locations={salesOffices} loadUsers={this.loadUsers}/>
						}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default UserControl;