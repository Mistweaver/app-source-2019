import React from 'react';
import { Grid } from '@material-ui/core';
import { Variable } from './objects/Variable';
import { getAllVariables, getVariablePackage } from './VariableServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { SortVariablesAlphabetically } from '../data/functions/SortVariablesAlphabetically';
import VariableList from './VariableList';
import VariableManagerHeader from './VariableManagerHeader';
import VariableManagerTable from './VariableManagerTable';
import { VariableDataPackage } from './objects/VariableDataPackage';

interface VariableManagerProps {}

interface VariableManagerState {
	loadingVariableList: boolean;
	variableList: Variable[];
	selectedVariable: Variable;

	loadingVariableOccurrences: boolean;
	variableData: VariableDataPackage[];

}

class VariableManager extends React.Component<VariableManagerProps, VariableManagerState> {
	constructor(props: VariableManagerProps) {
		super(props);
		this.state = {
			loadingVariableList: false,
			variableList: [],
			selectedVariable: new Variable(),
			loadingVariableOccurrences: false,
			variableData: []
		}

		this.loadVariables = this.loadVariables.bind(this);
		this.loadDataForVariable = this.loadDataForVariable.bind(this);
		this.selectVariable = this.selectVariable.bind(this);
		this.reload = this.reload.bind(this);
	}

	componentDidMount() {
		this.loadVariables();
	}

	private loadVariables() {
		this.setState({ loadingVariableList: true });
		getAllVariables().then(res => {
			this.setState({ loadingVariableList: false });
			if(validateHTMLResponse(res)) {
				this.setState({ variableList: res.data });
				if(this.state.selectedVariable.id !== "") {
					// this.loadVariablePackage();
				}
			}
		});
	}

	private loadDataForVariable(variable: Variable) {
		this.setState({ loadingVariableOccurrences: true });
		getVariablePackage(variable.id).then(res => {
			console.log(res);
			this.setState({ loadingVariableOccurrences: false });
			if(validateHTMLResponse(res)) {
				this.setState({
					variableData: res.data
				});
			}
		});
	}


	private selectVariable(variable: Variable) {
		this.setState({ selectedVariable: variable });
		this.loadDataForVariable(variable);
	}
	
	private reload() {
		this.loadDataForVariable(this.state.selectedVariable);
	}

	public render() {
		const { loadingVariableList, loadingVariableOccurrences, variableList, variableData, selectedVariable } = this.state;
		variableList.sort(SortVariablesAlphabetically);
		return(
			<Grid container spacing={2}>
				<Grid item xs={2}>
					<VariableList variableList={variableList} loading={loadingVariableList} selectVariable={this.selectVariable} />
				</Grid>
				<Grid item xs={10}>
					<VariableManagerHeader variable={selectedVariable} reload={this.reload} />
					<VariableManagerTable
						data={variableData}
						loading={loadingVariableOccurrences}
					/>
				</Grid>
			</Grid>
		)
	}
}

export default VariableManager;