import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EquationEditor from './EquationEditor';
import { EquationPackage } from '../objects/EquationPackage';
import { Equation } from './objects/Equation';
import { getAllEquations, getEquationPackage } from './EquationServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { SortEquationsAlphabetically } from '../data/functions/SortEquationsAlphabetically';

interface EquationManagerProps {}

interface EquationManagerState {
	equationList: Equation[];
	equationPackage: EquationPackage;

	selectedEquationId: string;
	selectedEquationKey: string;

	loading: boolean;
	loadingPackage: boolean;

	selectedLocationId: string;
	selectedModelId: string;

	equationValue: number;

	equation: Equation;

	showEquationOptions: boolean;
}

class EquationManager extends React.Component<EquationManagerProps, EquationManagerState> {
	constructor(props: EquationManagerProps) {
		super(props);
		this.state = {
			equationList: [],
			equationPackage: new EquationPackage(),
			loading: false,
			loadingPackage: false,
			selectedLocationId: "",
			selectedModelId: "",

			selectedEquationId: "",
			selectedEquationKey: "",
			equationValue: 0,

			equation: new Equation(),

			showEquationOptions: false,
		}

		this.loadEquations = this.loadEquations.bind(this);
		this.loadEquationPackage = this.loadEquationPackage.bind(this);

	}

	componentDidMount() {
		this.loadEquations();
	}

	private loadEquations() {
		this.setState({ loading: true, showEquationOptions: false });
		getAllEquations().then(res => {
			this.setState({ loading: false });
			if(validateHTMLResponse(res)) {
				this.setState({ equationList: res.data });
				if(this.state.selectedEquationId !== "") {
					this.loadEquationPackage(this.state.selectedEquationId, this.state.selectedEquationKey);
				}
			}
		});
	}

	private loadEquationPackage(equationId: string, equationKey: string) {
		this.setState({ loadingPackage: true, showEquationOptions: false, selectedEquationId: equationId, selectedEquationKey: equationKey });
		getEquationPackage(equationId).then(res => {
			this.setState({ loadingPackage: false });
			if(validateHTMLResponse(res)) {
				var _equationPackage: EquationPackage = new EquationPackage();
				_equationPackage.occurrences = res.data;
				this.setState({
					equationPackage: _equationPackage,
					showEquationOptions: true,
				});
			}
		});
	}
	
	public render() {
		const { loading, loadingPackage, equationList, showEquationOptions, equationPackage } = this.state;
		equationList.sort(SortEquationsAlphabetically);
		return(
			<Grid container spacing={2}>
				<Grid item xs={2}>
				{
					loading ?
					<LinearProgress />
					:
					<div style={{backgroundColor: '#3C4953', width: '100%'}}>
						<div style={{maxHeight: '70vh', color: 'rgb(186, 210, 215)', overflowY: 'scroll', overflowX: 'hidden', fontSize: '9pt', padding: 5}}>
							<div style={{borderBottom: '2px solid rgb(231, 231, 231)', paddingBottom: 5}}>All Equations ({equationList.length} total)</div>
							<div style={{display: 'flex', flexDirection: 'column'}}>
							{
								equationList.map(equation => (
									<div key={equation.id} onClick={() => this.loadEquationPackage(equation.id, equation.key)} className="buttonMinimal" style={{display: 'flex', justifyContent: 'space-between'}}>
										<span style={{color: 'rgb(186, 210, 215)', wordBreak: 'break-word'}}>{equation.key.replace(/_/g, '')}</span>
										<ArrowRightIcon style={{color: '#D46938'}} />
									</div>
								))
							}
							</div>
						</div>
					</div>
				}
				</Grid>
				{
					loadingPackage &&
					<div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', padding: 10}}>
						<span style={{color: '#D46938', marginBottom: 5}}>Loading Equation Package</span>
						<LinearProgress />
					</div>
				}
				{
					showEquationOptions &&
					<EquationEditor 
						equationPackage={equationPackage}
						loadEquations={this.loadEquations}
					/>
				}
			</Grid>
		)
	}
}

export default EquationManager;