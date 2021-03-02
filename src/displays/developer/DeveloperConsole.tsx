import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import UserControl from './devcomponents/UserControl';
import LocationControl from './devcomponents/LocationControl';
import AllLeads from '../all_leads/AllLeads';
import AllAgreements from '../allagreements/AllAgreements';
import { SalesOffice } from '../../objects/salesoffice/SalesOffice';
import { getAllSalesOffices } from '../../services/SalesOfficeServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import IPManager from './ipmanager/IPManager';
import { auditDocuments } from '../../services/DeveloperServices';
import { Factory } from '../../objects/factory/Factory';
import { getAllFactories } from '../../services/FactoryServices';
import FactoryManager from './devcomponents/FactoryManager';

interface DeveloperConsoleState {
	value: number;
	salesOffices: SalesOffice[];
	factories: Factory[];
}
class DeveloperConsole extends React.Component<{}, DeveloperConsoleState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			value: 0,
			salesOffices: [],
			factories: []
		}

		this.changeTab = this.changeTab.bind(this);
		this.loadSalesOffices = this.loadSalesOffices.bind(this);
		this.audit = this.audit.bind(this);
		this.loadFactories = this.loadFactories.bind(this);

	}

	componentDidMount() {
		this.loadSalesOffices();
		this.loadFactories();
	}

	private loadSalesOffices() {
		getAllSalesOffices().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					salesOffices: res.data
				});
			}
		});
	}

	private loadFactories() {
		getAllFactories().then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					factories: res.data
				});
			}
		});
	}

	private changeTab(event: any, newValue: any) {
		this.setState({
			value: newValue
		});
	}

	private audit() {
		auditDocuments().then(res => {
			if(validateHTMLResponse(res)) {
				console.log("Audit done");
			}
		})
	}

	public render() {
		const { value, salesOffices, factories } = this.state;
		return(
			<>
				<AppBar position="static">
					<Tabs value={value} onChange={this.changeTab}>
						<Tab label="Users" />
						<Tab label="Sales Offices" />
						<Tab label="Factories" />
						<Tab label="IP Manager" />
						<Tab label="All Leads" />
						<Tab label="All Agreements" />
						<Tab label="Document Audit" />
					</Tabs>
				</AppBar>
				<div style={{padding: 15}}>
					{value === 0 && <UserControl salesOffices={salesOffices} />}
					{value === 1 && <LocationControl salesOffices={salesOffices} reloadOffices={this.loadSalesOffices} />}
					{value === 2 && <FactoryManager factories={factories} reloadFactories={this.loadFactories}/>}
					{value === 3 && <IPManager salesOffices={salesOffices} />}
					{value === 4 && <AllLeads />}
					{value === 5 && <AllAgreements />}
					{value === 6 &&
						<div>
							<p style={{color: '#D46938'}}>Developer Tools (DO NOT USE UNLESS YOU KNOW WHAT THEY DO)</p>
							<button className="buttonMinimal" onClick={this.audit}>Audit Documents</button>
						
						
						</div>
					}

					
					
				</div>

			</>
			
		)
	}
}

export default DeveloperConsole;