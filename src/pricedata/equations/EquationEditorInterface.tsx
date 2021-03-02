import React from 'react';

interface EquationEditorInterfaceProps {
	// list of available variables
	// list of available equations
}

interface EquationEditorInterfaceState {
	equationName: string;
	equationKey: string;
	equationString: string;
	validEquation: boolean;

	notes: string;
}

// constants
const OPERAND = "OPERAND";
const VARIABLE = "VARIABLE";
const PARENTHESIS = "PARENTHESIS";
const DECIMAL = "DECIMAL";
const NUMBER = "NUMBER";

class EquationEditorInterface extends React.Component<EquationEditorInterfaceProps, EquationEditorInterfaceState> {
	constructor(props: EquationEditorInterfaceProps) {
		super(props);
		this.state = {
			validEquation: false,
			equationName: "",
			equationString: "",
			equationKey: "",

			notes: ""
		}

		this.updateEquationKey = this.updateEquationKey.bind(this);
		this.updateEquationName = this.updateEquationName.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
	}
	
	
	private validate() {
		// check that all parenthesis are closed
		// verify that there are no hanging operands
		// check that equationKey is acceptable
	}

	private updateEquationName(event: { target: { value: string }}) {
		this.setState({ equationName: event.target.value });
	}

	private updateNotes(event: { target: { value: string }}) {
		this.setState({ notes: event.target.value });
	}

	private updateEquationKey(event: { target: { value: string }}) {
		let key = event.target.value;
		// allowed characters regex string
		var regex = /[^0-9a-zA-Z]/g;
		// remove all white space and non alpha-numeric characters
		key.replaceAll(regex, '');
		this.setState({ equationKey: key });
	}

	private closedParenthesisCheck() {
		const { equationString } = this.state;
		let parenthesisCount = 0;
		for(let i = 0; i < equationString.length; i++) {
			let character = equationString[i];
			if(character === "(") {
				parenthesisCount++;
			} else if(character === ")") {
				parenthesisCount--;
			}
		}

		if(parenthesisCount === 0) {
			return true;
		} else {
			return false;
		}
	}	

	private renderControls() {
		// if equation is blank, a parenthesis or variable may be selected

		// if last entry was a variable, a closing parenthesis or operand may be selected
			// state can only be valid if all parenthesis are closed

		// if last entry was an operand, a variable must be selected
			// state remains invalid (no hanging operands)

		// if last entry was an opening parenthesis, then a variable must be selected
			// state remains invalid
		
		// if last entry was a closing parenthesis, then an operand may be selected
			// state is valid

		return(
			<div>
				<button></button>
			</div>
		) 

	}
	
	public render() {
		const { equationKey, equationString, equationName, notes } = this.state;
		return(
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<div>Equation Name</div>
				<input value={equationName} onChange={this.updateEquationName} />
				<div>Equation key (alpha-numeric characters only)</div>
				<input value={equationKey} onChange={this.updateEquationKey} />

				<div>Equation</div>
				<div><b>{equationKey} = </b>{equationString}</div>

				{this.renderControls()}

				<div style={{marginTop: 10}}>Notes</div>
				<textarea value={notes} onChange={this.updateNotes} />
			</div>
		)
	}
}

export default EquationEditorInterface;