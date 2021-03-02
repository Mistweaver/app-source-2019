import { LinearProgress } from '@material-ui/core';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { Equation } from '../../equations/objects/Equation';
// import { deleteEquation } from '../EquationServices';

interface DeleteEquationComponentProps {
	variable: Equation;
	reloadEquations: () => void;
}

interface DeleteEquationComponentState {
	deleting: boolean;
	deleteMode: boolean;

	buttonClicked: boolean;
	idMatchString: string;
	showStringMatchWarning: boolean;

	error: boolean;
	errorMessage: string;
}

class DeleteEquationComponent extends React.Component<DeleteEquationComponentProps, DeleteEquationComponentState> {
	constructor(props: DeleteEquationComponentProps) {
		super(props);
		this.state = {
			deleting: false,
			deleteMode: false,
			buttonClicked: false,
			idMatchString: "",
			showStringMatchWarning: false,

			error: false,
			errorMessage: ""
		}

		
		this.enterDeleteMode = this.enterDeleteMode.bind(this);
		this.exitDeleteMode = this.exitDeleteMode.bind(this);
		this.delete = this.delete.bind(this);

		// this.deletionButtonClicked = this.deletionButtonClicked.bind(this);
		this.changeObjectMatchString = this.changeObjectMatchString.bind(this);
	}

	private enterDeleteMode() { this.setState({ deleteMode: true }); };
	private exitDeleteMode() { 
		this.setState({ 
			deleteMode: false,
			idMatchString: "", showStringMatchWarning: false 
		});
	};
	private delete() {
		this.setState({ deleting: true });
		if(this.state.idMatchString === this.props.variable.id) {
			/*deleteEquation(this.props.variable.id).then(res => {
				this.setState({ deleting: true });
				if(validateHTMLResponse(res)) {
					this.props.reloadEquations();
					this.setState({ deleteMode: false });
				} else {
					this.setState({
						error: true,
						errorMessage: "Error: " + res.status
					});
				}
			});*/
		} else {
			this.setState({ showStringMatchWarning: true });
		}
	}

	private changeObjectMatchString(event: { target: { value: string }; }) {
		this.setState({ idMatchString: event.target.value, showStringMatchWarning: false });
	}

	public render() {
		const { deleteMode, deleting, idMatchString, showStringMatchWarning } = this.state;
		if(deleteMode) {
			return(
				<div style={{backgroundColor: "rgb(231, 231, 231)", display: 'flex', flexDirection: 'column'}}>
					<div style={{backgroundColor: '#3C4953', color: "#BAD2D7", padding: 5, fontSize: '11pt'}}>{"Delete " + this.props.variable.name}</div>
					<div style={{padding: 5, display: 'flex', flexDirection: 'column'}}>
					{
						deleting ?
						<>
							<span style={{marginBottom: 5}}>Deleting Equation</span>
							<LinearProgress />
						</>
						:
						<>
							<div><span style={{color: 'red'}}>WARNING!:</span> this action will not only delete this variable, but remove it from all existing price data. THIS CANNOT BE UNDONE!</div>
							<p style={{fontWeight: 500}}>{this.props.variable.id}</p>
							<input value={idMatchString} onChange={this.changeObjectMatchString} />
							{
								showStringMatchWarning &&
								<p style={{color: 'red'}}>ID's do not match!</p>
							}
							<div style={{padding: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
								<button className="buttonMinimal" onClick={this.exitDeleteMode}>Cancel</button>
								<button className="buttonCritical" onClick={this.delete}>Delete Forever</button>
							</div>
						</>
					}
					</div>
				</div>	
			)
		} else {
			return <CriticalButton onClick={this.enterDeleteMode}>Delete Equation</CriticalButton>
		}
		
	}
}

export default DeleteEquationComponent;