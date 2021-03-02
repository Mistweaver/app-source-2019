import { Chip } from '@material-ui/core';
import React from 'react';
import { ApplianceSheetItem } from '../../../../objects/purchaseagreement/appliancesheet/ApplianceSheetItem';
import { Appliance } from './Appliance';

interface ApplianceProps {
	appliance: Appliance;
	updateAppliance: (appliances: ApplianceSheetItem[], appliance: ApplianceSheetItem) => void;
	removeAppliance: (newApplianceList: ApplianceSheetItem[]) => void;
	applianceList: ApplianceSheetItem[];
	modelType: string;
}


interface ApplianceState {
	currentSheetValue: string;
	// renderChildren: boolean;
}

class ApplianceDisplay extends React.Component<ApplianceProps, ApplianceState> {
	constructor(props: ApplianceProps) {
		super(props);
		this.state = {
			currentSheetValue: "",
			// renderChildren: false
		}

		this.select = this.select.bind(this);
		this.inputChange = this.inputChange.bind(this);
	}

	componentDidMount() {
		this.readApplianceList();
	}

	componentDidUpdate(prevProps: ApplianceProps) {
		if(prevProps.applianceList !== this.props.applianceList) {
			this.readApplianceList();
		}
	}

	private readApplianceList() {
		/**
		 * This if statement checks if the applianceList exists.  When the purchase agreement is created on the server,
		 * it initializes the applianceSelection as an empty JSON object
		 *
		 */
		let foundApplianceIndex = this.props.applianceList.findIndex(appliance => appliance.itemName === this.props.appliance.name);
		if(foundApplianceIndex !== -1) {
			let appliance = this.props.applianceList[foundApplianceIndex];
			this.setState({ currentSheetValue: appliance.itemValue});
		} else {
			this.setState({ currentSheetValue: "" });
		}
	}

	private select(value: string) {
		// if the value matches the existing value, deselect the option
		// console.log("SELECT");
		// console.log(value);
		// console.log(this.state.currentSheetValue);
		if(this.state.currentSheetValue === value || value === "") {
			let newApplianceArray = this.props.applianceList;
			let foundApplianceIndex = this.props.applianceList.findIndex(appliance => appliance.itemName === this.props.appliance.name);
			if(foundApplianceIndex !== -1) {
				newApplianceArray = this.props.applianceList.slice();
				newApplianceArray.splice(foundApplianceIndex, 1);
			}
			
			this.props.appliance.children.forEach(child => {
				let foundChildApplianceIndex = this.props.applianceList.findIndex(appliance => appliance.itemName === child.name);
				if(foundChildApplianceIndex !== -1) {
					newApplianceArray = newApplianceArray.slice();
					newApplianceArray.splice(foundChildApplianceIndex, 1);
				}
			});

			this.props.removeAppliance(newApplianceArray);

		} else {
			let appliance = new ApplianceSheetItem(this.props.appliance.name, value);
			this.props.updateAppliance(this.props.applianceList, appliance);
		}
		
	}

	private inputChange(event: { target: { name: string, value: string }}) {
		const { name, value } = event.target;
		let appliance = new ApplianceSheetItem(name, value);
		this.props.updateAppliance(this.props.applianceList, appliance);
	}


	private renderOptions() {
		const { appliance } = this.props;
		if(appliance.type === "input") {
			return(
				<div style={{padding: 5}}>
					<input style={{padding: 5}} placeholder="enter value here" name={appliance.name} value={this.state.currentSheetValue} onChange={this.inputChange} />
				</div>
			)
		} else if(appliance.type === "selection") {
			return(
				<div style={{display: 'inline-block', padding: 5}}>
					{
						appliance.options.map(option => (
							<Chip
								key={option}
								clickable
								style={{margin: '3px 5px'}}
								onClick={() => this.select(option)}
								color={this.state.currentSheetValue === option ? "primary" : "default"}
								label={option}
							/>
						))
					}
				</div>
			)
		} else {
			return(<div style={{padding: 5}}>Appliance input type is empty</div>)
		}
	}

	private renderChildren() {
		const { appliance } = this.props;
		const { currentSheetValue } = this.state;

		let  children: any[] = [];
		if(currentSheetValue === "Yes") {
			appliance.children.forEach((data, index) => {
				children.push(
					<ApplianceDisplay 
						key={"appliance" + index + data.key}
						appliance={data}
						applianceList={this.props.applianceList}
						modelType={this.props.modelType}
						updateAppliance={this.props.updateAppliance}
						removeAppliance={this.props.removeAppliance}
					/>
				)
			});
		}
		return children;
	}

	public render() {
		const { appliance } = this.props;
		return(
			<>
				<div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(231, 231, 231)', borderRadius: 10}}>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>{appliance.name}</div>
					{this.renderOptions()}
				</div>
				{this.renderChildren()}
			</>
				
		)
	}
}

export default ApplianceDisplay;