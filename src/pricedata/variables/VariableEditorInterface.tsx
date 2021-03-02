import React from 'react';

interface VariableEditorInterfaceProps {}

interface VariableEditorInterfaceState {
	variableName: string;
	variableKey: string;
	value: number;
	notes: string;
}

class VariableEditorInterface extends React.Component<VariableEditorInterfaceProps, VariableEditorInterfaceState> {
	constructor(props: VariableEditorInterfaceProps) {
		super(props);
		this.state = {
			variableKey: "",
			variableName: "",
			value: 0,
			notes: ""
		}

		this.updateVariableKey = this.updateVariableKey.bind(this);
		this.updateVariableName = this.updateVariableName.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
		this.updateValue = this.updateValue.bind(this);
	}

	private updateVariableName(event: { target: { value: string }}) {
		this.setState({ variableName: event.target.value });
	}

	private updateNotes(event: { target: { value: string }}) {
		this.setState({ notes: event.target.value });
	}

	private updateValue(event: { target: { value: string }}) {

	}

	private updateVariableKey(event: { target: { value: string }}) {
		let key = event.target.value;
		// allowed characters regex string
		var regex = /[^0-9a-zA-Z]/g;
		// remove all white space and non alpha-numeric characters
		key.replaceAll(regex, '');
		this.setState({ variableKey: key });
	}

	public render() {
		const { variableKey, variableName, value, notes } = this.state;
		return(
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<div>Variable Name</div>
				<input value={variableName} onChange={this.updateVariableName} />
				<div>Variable key (alpha-numeric characters only)</div>
				<input value={variableKey} onChange={this.updateVariableKey} />

				<div>Value</div>
				<input value={value} onChange={this.updateValue} />
				<div style={{marginTop: 10}}>Notes</div>
				<textarea value={notes} onChange={this.updateNotes} />
			</div>
		)
	}
}

export default VariableEditorInterface;