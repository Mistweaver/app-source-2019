import React from 'react';
import { MasterLeadObject } from './MasterLeadObject';
import { getMasterObjects } from '../../services/LeadServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { Card, CardContent, Button, CircularProgress, AppBar, IconButton } from '@material-ui/core';
import { Lead } from '../../objects/lead/Lead';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { getAllSalesOffices } from '../../services/SalesOfficeServices';
import { ChangeOrder } from '../../objects/changeorders/ChangeOrder';
import { PurchaseAgreement } from '../../objects/purchaseagreement/PurchaseAgreement';
import './MasterLeadDisplay.css';
import { TransitionProps } from '@material-ui/core/transitions/transition';

interface MasterLeadDisplayProps {

}

interface MasterLeadDisplayState {
	isAgreementEditorDisplayed: boolean;
	isChangeOrderEditorDisplayed: boolean;

	masterLeadObjects: MasterLeadObject[];
	salesOffices: SalesOffice[];

	// query parameters
	locationId: string;
	userId: string;
	size: number;
	page: number;
	sort: string;

	// loading
	loading: boolean;

	// dialog display
	isDialogOpen: boolean;
}

class MasterLeadDisplay extends React.Component<MasterLeadDisplayProps, MasterLeadDisplayState> {
	constructor(props: MasterLeadDisplayProps) {
		super(props);
		this.state = {
			isAgreementEditorDisplayed: false,
			isChangeOrderEditorDisplayed: false,

			masterLeadObjects: [],

			locationId: "",
			userId: "",
			size: 20,
			page: 0,
			sort: "",
			salesOffices: [],
			loading: false,
			isDialogOpen: false,
		}

		this.changeAgreementEditorVisibility = this.changeAgreementEditorVisibility.bind(this);
		this.changeChangeOrderEditorVisibility = this.changeChangeOrderEditorVisibility.bind(this);

		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.viewChangeOrderDetails = this.viewChangeOrderDetails.bind(this);
		this.viewAgreementDetails = this.viewAgreementDetails.bind(this);
	}

	componentDidMount() {
		this.loadMasterLeadObjects();
		getAllSalesOffices().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					salesOffices: res.data
				});
			}
			// this.loadLeads(page, size, sort, searchState);

		});
	}

	private loadMasterLeadObjects() {
		const { locationId, userId, size, page, sort } = this.state;
		this.setState({ loading: true });
		getMasterObjects(locationId, userId, size, page, sort).then(res => {
			console.log(res);
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.setState({ masterLeadObjects: res.data.objects });
			}
		});
	}

	private changeAgreementEditorVisibility() {
		this.setState(prevState => ({ isAgreementEditorDisplayed: !prevState.isAgreementEditorDisplayed }));
	}

	private changeChangeOrderEditorVisibility() {
		this.setState(prevState => ({ isChangeOrderEditorDisplayed: !prevState.isChangeOrderEditorDisplayed }));
	}

	private openDialog() { this.setState({ isDialogOpen: true }); }
	private closeDialog() { this.setState({ isDialogOpen: false }); }

	private nextPage() {}
	private lastPage() {}
	private previousPage() {}
	private firstPage() {}

	private renderRowCells(lead: Lead) {
		let cells: any[] = [];
		cells.push(
			<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
				<span style={{fontWeight: 650, fontSize: '10pt'}}>Email</span>
				<span>{lead.emailAddress}</span>
			</div>
		)

		cells.push(
			<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
				<span style={{fontWeight: 650, fontSize: '10pt'}}>Phone</span>
				<span>{lead.phone}</span>
			</div>
		)

		let officeName;
		let leadSalesOffice: SalesOffice = this.state.salesOffices.find(office => office.clientConsultantId === parseInt(lead.locationId)) || new SalesOffice();
		if(lead.locationId === "1") {
			officeName = "default";
		} else {
			officeName = leadSalesOffice.officeName;
		}

		cells.push(
			<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
				<span style={{fontWeight: 650, fontSize: '10pt'}}>Location</span>
				<span>{officeName}</span>
			</div>
		)

		cells.push(
			<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
				<span style={{fontWeight: 650, fontSize: '10pt'}}>Created On</span>
				<span>{new Date(lead.creationTime).toLocaleString()}</span>
			</div>
		)

		cells.push(
			<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
				<span style={{fontWeight: 650, fontSize: '10pt'}}>Sales Agent</span>
				<span>{lead.userId}</span>
			</div>
		)
		return cells;
	}

	private viewAgreementDetails(purchaseAgreement: PurchaseAgreement) {
		this.openDialog();
	}
	private viewChangeOrderDetails(changeOrder: ChangeOrder) {
		this.openDialog();
	}

	// sort the agreements and change orders from newest to oldest
	private sortAgreements(a: PurchaseAgreement, b: PurchaseAgreement) {
		if((new Date(a.creationTime)) < (new Date(b.creationTime)))
			return 1;
		if((new Date(a.creationTime)) > (new Date(b.creationTime)))
			return -1;
		return 0;
	}
	private sortChangeOrders(a: ChangeOrder, b: ChangeOrder) {
		if((new Date(a.creationTime)) < (new Date(b.creationTime)))
			return 1;
		if((new Date(a.creationTime)) > (new Date(b.creationTime)))
			return -1;
		return 0;
	}

	private renderLeadActivity(object: MasterLeadObject) {
		object.agreements.sort(this.sortAgreements);
		object.changeorders.sort(this.sortChangeOrders);

		let purchaseAgreementArrayIndex = 0;
		let changeOrderArrayIndex = 0;

		let rows: any[] = [];

		while(purchaseAgreementArrayIndex < object.agreements.length) {
			if(changeOrderArrayIndex < object.changeorders.length) {
				if(
					(new Date(object.agreements[purchaseAgreementArrayIndex].creationTime))
					>
					(new Date(object.changeorders[changeOrderArrayIndex].creationTime))
				) {
					let agreement = object.agreements[purchaseAgreementArrayIndex];
					rows.push(
						<div key={agreement.id} className="contractRow" onClick={() => this.viewAgreementDetails(agreement)} style={{cursor: 'pointer', display: 'flex', borderBottom: '1px solid lightgrey', padding: 2}} >
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>Purchase Agreement</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{new Date(agreement.creationTime).toLocaleDateString()}</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{new Date(agreement.modificationTime).toLocaleDateString()}</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{agreement.deliveryState}</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{agreement.status}</span>
							</div>
						</div>
					);
					purchaseAgreementArrayIndex++;
				} else if((new Date(object.agreements[purchaseAgreementArrayIndex].creationTime)) < (new Date(object.changeorders[changeOrderArrayIndex].creationTime))) {
					let changeOrder = object.changeorders[changeOrderArrayIndex];
					rows.push(
						<div key={changeOrder.id} className="contractRow" onClick={() => this.viewChangeOrderDetails(changeOrder)} style={{cursor: 'pointer', display: 'flex', borderBottom: '1px solid lightgrey', padding: 2}} >
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>Change Order {changeOrder.changeOrderNumber}</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{new Date(changeOrder.creationTime).toLocaleDateString()}</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{new Date(changeOrder.modificationTime).toLocaleDateString()}</span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span></span>
							</div>
							<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{changeOrder.status}</span>
							</div>
						</div>

					);
					changeOrderArrayIndex++;
				}
			} else {
				let agreement = object.agreements[purchaseAgreementArrayIndex];
				rows.push(
					<div key={agreement.id} className="contractRow" onClick={() => this.viewAgreementDetails(agreement)} style={{cursor: 'pointer', display: 'flex', borderBottom: '1px solid lightgrey', padding: 2}} >
						<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
							<span>Purchase Agreement</span>
						</div>
						<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
							<span>{new Date(agreement.creationTime).toLocaleDateString()}</span>
						</div>
						<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
							<span>{new Date(agreement.modificationTime).toLocaleDateString()}</span>
						</div>
						<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
							<span>{agreement.deliveryState}</span>
						</div>
						<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
							<span>{agreement.status}</span>
						</div>
					</div>
				);
				purchaseAgreementArrayIndex++;
			}
		}

		rows.push()

		return rows;
	}

	public render() {
		const { masterLeadObjects, loading, isDialogOpen } = this.state;
		console.log(masterLeadObjects);
		return(
			<div style={{padding: 15}}>
				{
					loading ?
						<div style={{padding: 10, left: '50%', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'absolute', top: '50%'}}>
							<CircularProgress />	
						</div>
					:
					<>
						{
							masterLeadObjects.map(object => (
								<Card key={object.lead.id} style={{marginBottom: 10}}>
									<CardContent>
										
										{	object.agreements.length > 0 && 
											<div >
												<p style={{fontWeight: 600, borderBottom: '1px solid lightgrey'}}>Recent Contracts</p>
												<div style={{display: 'flex', fontSize: '10pt'}}>
													<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
														<span style={{fontWeight: 650}}>Contract Type</span>
													</div>
													<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
														<span style={{fontWeight: 650}}>Date</span>
													</div>
													<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
														<span style={{fontWeight: 650}}>Last Modified</span>
													</div>
													<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
														<span style={{fontWeight: 650}}>Delivery State</span>
													</div>
													<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
														<span style={{fontWeight: 650}}>Status</span>
													</div>
												</div>
												<div style={{fontSize: '10pt'}}>
													{this.renderLeadActivity(object)}
												</div>
											</div>
										}
										</CardContent>
								</Card>
							))
						}
					</>
				}
			</div>
		)
	}
}

export default MasterLeadDisplay;