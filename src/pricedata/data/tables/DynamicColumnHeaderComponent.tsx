import React from 'react';
import { EquationData } from '../../equations/objects/EquationData';
import { VariableData } from '../../variables/objects/VariableData';

interface Props {

	// list of variables
	variableData: VariableData[];
	// list of equations
	equationData: EquationData[];

	updateColumnType: (index: number, type: string) => void;
	updateColumnKey: (index: number, key: string) => void;

	selectVariable: (data: VariableData) => void;
	selectEquation: (data: EquationData) => void;
}

interface State {
	columnType: string;
	key: string;
}

// column types
const VAR = "VAR";
const EQN = "EQN";

class DynamicColumnHeaderComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			columnType: "",
			key: "",
		}

		this.selectColumnType = this.selectColumnType.bind(this);
		this.selectKey = this.selectKey.bind(this);
	}

	private selectColumnType(event: { target: { value: string }; }) {
		this.setState({ columnType: event.target.value });
	}

	private selectKey(event: { target: { value: string }; }) {
		this.setState({ key: event.target.value });
	}

	private renderColumns() {
		const { columnType, key } = this.state;
		let rows: any[] = [];

		if(columnType === VAR && key !== "") {
			
		}
		else if(columnType === EQN  && key !== "") {

		} else {
			return null;
		}
		
	}



	public render() {
		const { columnType, key } = this.state;
		return(
			<div>
				<div style={{display: 'flex'}}>
					<select value={this.state.columnType} onChange={this.selectColumnType}>
						<option value="">...type</option>
						<option value={VAR}>{VAR}</option>
						<option value={EQN}>{EQN}</option>
					</select>
					<select value={this.state.key} onChange={this.selectKey}>
						{ columnType === VAR && 
							this.props.variableData.map(variable => (
								<option value={variable.key}>{variable.name}</option>
							))
						}
						{ columnType === EQN && 
							this.props.equationData.map(equation => (
								<option value={equation.key}>{equation.name}</option>
							))
						}
					</select>
				</div>
				{this.renderColumns}
			</div>
		)
	}
}

export default DynamicColumnHeaderComponent;