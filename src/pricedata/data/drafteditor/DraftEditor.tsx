import { Grid, LinearProgress } from '@material-ui/core';
import React from 'react';
import { SalesOffice } from '../../../objects/salesoffice/SalesOffice';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { EquationData } from '../../equations/objects/EquationData';
import { LocationPriceData } from '../../objects/LocationPriceData';
import { PriceData } from '../../objects/PriceData';
import { getDraftsForLocation } from '../PriceDataServices';
import { VariableData } from '../../variables/objects/VariableData';

interface DraftEditorProps {}

interface DraftEditorState {
	loadingDrafts: boolean;
	locationDrafts: LocationPriceData;
	selectedDraftLocation: SalesOffice;

	renderEditorPanel: boolean;
	selectedDraftId: string;

	selectedData: PriceData[];

	selectedVariable: VariableData;
	selectedEquation: EquationData;

	error: boolean;
	errorMessage: string;
}



class DraftEditor extends React.Component<DraftEditorProps, DraftEditorState> {
	constructor(props: DraftEditorProps) {
		super(props);
		this.state = {
			loadingDrafts: false,
			locationDrafts: new LocationPriceData(),
			selectedDraftLocation: new SalesOffice(),

			renderEditorPanel: false,
			selectedDraftId: "",

			selectedData: [],

			selectedVariable: new VariableData(),
			selectedEquation: new EquationData(),

			error: false,
			errorMessage: ""
		}

		this.loadDrafts = this.loadDrafts.bind(this);
		this.selectDraft = this.selectDraft.bind(this);
		this.addGroupToList = this.addGroupToList.bind(this);
		this.removeGroupFromList = this.removeGroupFromList.bind(this);
		this.selectVariable = this.selectVariable.bind(this);
		this.selectEquation = this.selectEquation.bind(this);
		this.clearEquationSelection = this.clearEquationSelection.bind(this);
		this.clearVariableSelection = this.clearVariableSelection.bind(this);
		this.reload = this.reload.bind(this);
	}

	private loadDrafts(office: SalesOffice) {
		this.setState({ loadingDrafts: true, locationDrafts: new LocationPriceData(), selectedDraftLocation: new SalesOffice() });
		getDraftsForLocation(office.id).then(res => {
			this.setState({ loadingDrafts: false });
			if(validateHTMLResponse(res)) {
				this.setState({ locationDrafts: res.data });
			} else {
				this.setState({ error: true, errorMessage: res.data });
			}
		}).catch(err => {
			this.setState({ loadingDrafts: false, error: true, errorMessage: err });
		});
	}

	private reload() {
		this.loadDrafts(this.state.selectedDraftLocation);
	}

	

	private selectDraft(data: PriceData, selected: boolean) {
		if(selected) {
			this.removeData(data);
		} else {
			this.addData(data);
		}
	}


	private addData(data: PriceData) {
		let newArray = this.state.selectedData.slice();
		newArray.splice(0, 0, data);
		this.setState({ selectedData: newArray });
	}

	private removeData(data: PriceData) {
		const { selectedData } = this.state;
		var i = 0, len = selectedData.length;
		while(i < len) {
			if(selectedData[i].id === data.id) {
				// index = i;
				let newArray = this.state.selectedData.slice();
				newArray.splice(i, 1);
				this.setState({ selectedData: newArray });
				i = len;
			}
			i++;
		}
	}

	private addGroupToList(group: PriceData[]) {
		let newArray = this.state.selectedData.slice();
		group.forEach(data => {
			newArray.splice(0, 0, data);
		});
		this.setState({ selectedData: newArray });
	}

	private removeGroupFromList(group: PriceData[]) {
		const { selectedData } = this.state;
		let newArray = selectedData.slice();
		group.forEach(data => {
			var i = 0;
			while(i < newArray.length) {
				if(newArray[i].id === data.id) {
					newArray.splice(i, 1);
					i = 0;
				}
				i++;
			}
		});
		this.setState({ selectedData: newArray });
	}



	private closeEditorPanel() {
		this.setState({ selectedDraftId: "", renderEditorPanel: false });
	}

	private selectVariable(variable: VariableData) {
		this.setState({ selectedVariable: variable });
	}

	private clearVariableSelection() {
		this.setState({ selectedVariable: new VariableData() });

	}

	private selectEquation(equation: EquationData) {
		this.setState({ selectedEquation: equation });
	}

	private clearEquationSelection() {
		this.setState({ selectedEquation: new EquationData() });

	}

	public render() {
		const { loadingDrafts, selectedDraftLocation, locationDrafts, renderEditorPanel, selectedDraftId, selectedData, selectedVariable, selectedEquation } = this.state;
		return(
			<Grid container spacing={1}>
				<Grid item xs={9}>
					
					{ loadingDrafts && <div style={{padding: 5}}><LinearProgress /></div> }
					
				</Grid>
				
			</Grid>
		)
	}
}

export default DraftEditor;