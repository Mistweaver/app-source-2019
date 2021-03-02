import React from 'react';
import { DeletedObject } from '../../objects/deletedobjects/DeletedObject';
import { getDeletedObjects } from '../../services/DeletedObjectServices';
import { Card, CardContent, TextField, MenuItem, Button, LinearProgress, Grid } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Lead } from '../../objects/lead/Lead';
import { ChangeOrder } from '../../objects/changeorders/ChangeOrder';
import { PurchaseAgreement } from '../../objects/purchaseagreement/PurchaseAgreement';

interface DeletedObjectManagerState {
	deletedObjects: DeletedObject[];

	objectId: string;
	objectType: string;
	object: string;

	page: number;
	size: number;
	sort: string;
	currentSortDirection: string;
	totalPages: number;
	totalObjects: number;
	loading: boolean;
}

class DeletedObjectManager extends React.Component<{}, DeletedObjectManagerState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			deletedObjects: [],

			objectId: "",
			objectType: "",
			object: "",

			page: 0,
			size: 20,
			sort: "creationTime,desc",
			currentSortDirection: "",
			totalPages: 0,
			totalObjects: 0,
			loading: false
		}

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleNextPage = this.handleNextPage.bind(this);
		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
		this.setSort = this.setSort.bind(this);
		this.restore = this.restore.bind(this);
	}

	componentDidMount() {
		this.loadDeletedObjects(this.state.page, this.state.size, this.state.sort);
	}

	private loadDeletedObjects(page: number, size: number, sort: string) {
		getDeletedObjects(page, size, sort).then(res => {
			this.setState({
				deletedObjects: res.data._embedded.deletedobjects,
				totalObjects: res.data.page.totalElements,
				totalPages: res.data.page.totalPages,
				loading: false
			});
		})
	}

	public handleSelectChange(event: { target: { value: string; }; }) {
		const { page, sort } = this.state;
		this.loadDeletedObjects(page, parseInt(event.target.value, 10), sort);
		this.setState({ size: parseInt(event.target.value, 10) })
	}

	public handleNextPage(totalPages: number) {
		const { page, size, sort } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.loadDeletedObjects(currentPage, size, sort);
		}
	}

	public handleLastPage(totalPages: number) {
		const { page, size, sort} = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.loadDeletedObjects(currentPage, size, sort);
	}

	public handleFirstPage() {
		const { size, sort } = this.state;
		this.setState({ page: 0 });
		this.loadDeletedObjects(0, size, sort);
	}

	public handlePreviousPage() {
		const { page, size, sort} = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.loadDeletedObjects(currentPage, size, sort);
		}
	}

	/*************sorting ************ */
	public setSort(sort: string) {
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
		this.loadDeletedObjects(0, size, sort);
	}

	private selectObject(deletedObject: DeletedObject) {
		this.setState({
			objectId: deletedObject.id,
			objectType: deletedObject.objectType,
			object: deletedObject.object
		});
	}

	private restore() {

	}

	private renderObject() {
		const { objectType, objectId, object } = this.state;
		switch(objectType) {
			case "lead":
				var lead: Lead = JSON.parse(object);
				return (
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<p>Lead #{objectId}</p>
						<span>Name: {lead.firstName + " " + lead.lastName}</span>
						<span>Email: {lead.emailAddress}</span>
						<span>Phone: {lead.phone}</span>
						<span>Address: {lead.deliveryStreet + ", " + lead.deliveryCity + ", " + lead.deliveryState + ", " + lead.deliveryZip}</span>
						<span>Data:</span>
						<code>
							<pre>
								{JSON.stringify(JSON.parse(object), null, 4)}
							</pre>
						</code>
					</div>
				)
			case "purchaseAgreement":
				var purchaseAgreement: PurchaseAgreement = JSON.parse(object);

				return (
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<p>Purchase Agreement #{objectId}</p>
						<span>Buyer 1: {purchaseAgreement.buyer1}</span>
						<span>Delivery State: {purchaseAgreement.deliveryState}</span>
						<span>Make and Model: {purchaseAgreement.make + " " + purchaseAgreement.model}</span>
						<span>Total: {purchaseAgreement.total}</span>
						<span>Data:</span>
						<code>
							<pre>
								{JSON.stringify(JSON.parse(object), null, 4)}
							</pre>
						</code>
					</div>
				)
			case "changeOrder":
				var changeOrder: ChangeOrder = JSON.parse(object);

				return (
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<p>Change Order #{objectId}</p>
						<span>Change Order #: {changeOrder.changeOrderNumber}</span>
						<span>Purchase Agreement #: {changeOrder.purchaseAgreementId}</span>
						<span>Total: { changeOrder.total} </span>
						<span>Data:</span>
						<code>
							<pre>
								{JSON.stringify(JSON.parse(object), null, 4)}
							</pre>
						</code>
					</div>
				)
			default:
				return <div></div>
		}

	}

	public render() {
		const { page, size, totalObjects, totalPages, deletedObjects, objectId } = this.state;
		return(
			<div style={{padding: 15}}>
				<Grid container spacing={2}>
					<Grid item xs={5}>
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
									<span style={{marginTop: 'auto', marginBottom: 'auto'}}>Page {page + 1} of {totalPages} ({totalObjects} total objects)</span>
								</div>
										
								{
									this.state.loading &&
									<LinearProgress />
								}
								<div>
									{
										deletedObjects.length === 0 && this.state.loading === false ?
										<div>
											No deleted objects found.  If you believe this to be an error, contact an IT admin
										</div>
										:
										<table style={{width: '100%', fontSize: 14}}>
											<thead>
												<tr >
													<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} onClick={() => this.setSort("objectType")}>Type</th>
													<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} onClick={() => this.setSort("objectId")}>Id</th>
													<th style={{cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid black'}} onClick={() => this.setSort("creationTime")}>Deleted On</th>

												</tr>
											</thead>
											<tbody>
												{
													deletedObjects.map(object => (
														<tr key={object.id} className="leadRow" onClick={() => this.selectObject(object)} style={{cursor: 'pointer'}}>
															<td style={{padding: 2}}>{object.objectType}</td>
															<td style={{padding: 2}}>{object.objectId}</td>
															<td style={{padding: 2}}>{new Date(object.creationTime).toLocaleDateString()}</td>
														</tr>
													))
												}
											</tbody>
										</table>
									}
								</div>
									
								<div style={{display: 'flex', borderTop: '1px solid grey'}}>	
										<Button variant="outlined" style={{margin: 2}} onClick={this.handleFirstPage}><FirstPageIcon />First Page</Button>
										<Button variant="outlined" style={{margin: 2}} onClick={this.handlePreviousPage}><ChevronLeftIcon />Previous Page</Button>
										<Button variant="outlined" style={{margin: 2}} onClick={() => this.handleNextPage(totalPages)}>Next Page<ChevronRightIcon /></Button>
										<Button variant="outlined" style={{margin: 2}} onClick={() => this.handleLastPage(totalPages)}>Last Page<LastPageIcon /></Button>
								</div>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={7}>
						{
							objectId !== "" &&
							<div style={{padding: 15, backgroundColor: 'white', color: 'black'}}>
								<div style={{margin: 10}}>
									<Button variant="outlined" color="secondary" onClick={this.restore}>Restore Object</Button>
								</div>
								{this.renderObject()}
								
							</div>
						}
					</Grid>
				</Grid>
				
			</div>
		)
	}
}

export default DeletedObjectManager;