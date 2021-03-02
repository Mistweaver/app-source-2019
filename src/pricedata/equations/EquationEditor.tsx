import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { EquationPackage } from '../objects/EquationPackage';
import { getEquationPackage } from './EquationServices';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';

interface EquationEditorProps {
	equationPackage: EquationPackage;
	loadEquations: () => void;
}

interface EquationEditorState {
	loading: boolean;

	loadingSimilarPackage: boolean;
	similarEquationPackage: EquationPackage;
	showSimilarPackageDetails: boolean;

	edited: boolean;

	deletingEquation: boolean;
	updatingEquation: boolean;
}

class EquationEditor extends React.Component<EquationEditorProps, EquationEditorState> {
	constructor(props: EquationEditorProps) {
		super(props);
		this.state = {
			loading: false,
			edited: false,

			loadingSimilarPackage: false,
			similarEquationPackage: new EquationPackage(),
			showSimilarPackageDetails: false,

			deletingEquation: false,
			updatingEquation: false
		}

		
		this.handleEquationChange = this.handleEquationChange.bind(this);
		this.deleteEquation = this.deleteEquation.bind(this);
		this.updateEquation = this.updateEquation.bind(this);
		this.loadEquationPackage = this.loadEquationPackage.bind(this);
		this.closeSimilarPackageWindow = this.closeSimilarPackageWindow.bind(this);
	}



	private updateEquation() {
		this.setState({ updatingEquation: true });
		/*updateEquationProperties(this.props.equationPackage.equationKey, this.state.selectedEquationKey, this.state.selectedEquationName).then(res => {
			this.setState({ updatingEquation: false });
			if(validateHTMLResponse(res)) {
				console.log("Valid HTML RESPONSE");
				this.props.loadEquations();
			}
		})*/
	}

	private deleteEquation() {
		this.setState({ deletingEquation: true });
		/*deleteEquations(this.props.equationPackage.equationKey).then(res => {
			this.setState({ deletingEquation: false });
			if(validateHTMLResponse(res)) {
				console.log("Valid HTML RESPONSE");
				console.log(res);
				this.props.loadEquations();
			}
		})*/
	}

	

	private handleEquationChange(event: { target: { value: string, name: string }}) {
		//@ts-ignore
		this.setState({ [event.target.name]: event.target.value });
	}

	private loadEquationPackage(equationKey: string) {
		this.setState({ loadingSimilarPackage: true });
		getEquationPackage(equationKey).then(res => {
			this.setState({ loadingSimilarPackage: false });
			if(validateHTMLResponse(res)) {
				this.setState({
					similarEquationPackage: res.data,
					showSimilarPackageDetails: true,
				});
			}
		});
	}

	private closeSimilarPackageWindow() {
		this.setState({ showSimilarPackageDetails: false });
	}



	
	public render() {
		const { equationPackage } = this.props;
		const { showSimilarPackageDetails, similarEquationPackage, loadingSimilarPackage, updatingEquation, deletingEquation } = this.state;
		let equationKey: string = "";
		if(this.props.equationPackage.occurrences.length !== 0) {
			equationKey = this.props.equationPackage.occurrences[0].equation.key;
		}
		return(
			<>
				<Grid item xs={10}>
					<div style={{ display: 'flex', flexDirection: 'column'}}>
						<div style={{backgroundColor: '#3C4953', color: "#BAD2D7", padding: 5, display: 'flex'}}>
							<span style={{fontSize: '11pt'}}>{equationKey}</span>
						</div>
						<div style={{padding: 5, display: 'flex', backgroundColor: "rgb(231, 231, 231)",}}>
							<div>
							{
								updatingEquation === false &&
								deletingEquation === false &&
								equationKey !== "_factoryTotalCost_" &&
								equationKey !== "_factoryDirectPrice_" &&
								equationKey !== "_firstHalfDiscountPrice_" &&
								equationKey !== "_secondHalfDiscountPrice_" &&
								equationKey !== "_MSRP_" &&
								<>
									<button className="buttonMinimal" onClick={this.updateEquation}>Update Equation</button>
									<button className="buttonMinimal" onClick={this.deleteEquation}>Delete Equation</button>
								</>
							}
							{
								updatingEquation &&
								<>
									<span style={{marginBottom: 5}}>Updating Equation</span>
									<LinearProgress />
								</>
							}

							{
								deletingEquation &&
								<>
									<span style={{marginBottom: 5}}>Deleting Equation</span>
									<LinearProgress />
								</>
							}
							</div>
						</div>
						<div style={{display: 'flex', marginTop: 10}}>
							<div style={{backgroundColor: "rgb(231, 231, 231)", maxHeight: '60vh', overflowY: 'scroll', overflowX: 'hidden', marginRight: 5, width: '100%'}}>
								<div style={{display: 'flex', flexDirection: 'column', padding: 10, fontSize: '9pt'}}>
									<div style={{display: 'flex', fontSize: '8pt'}}>
										<span style={{fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '25%'}}>Model Name</span>
										<span style={{fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '15%'}}>Location ID</span>
										<span style={{fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '60%'}}>Equation</span>

									</div>
									{
										equationPackage.occurrences.map(data => (
											<div key={data.priceData.id} className="leadRow" style={{cursor: 'pointer', display: 'flex'}}>
												<span style={{width: '25%', overflowWrap: 'break-word'}}>{data.priceData.name}</span>
												<span style={{width: '15%', overflowWrap: 'break-word'}}>{data.salesOffice.locationCode}</span>
												<span style={{width: '60%', overflowWrap: 'break-word'}}>{data.equation.equation}</span>
											</div>
										))
									}
								</div>
							</div>
							{
								loadingSimilarPackage ?
								<div style={{backgroundColor: "rgb(231, 231, 231)", maxHeight: '60vh', overflowY: 'scroll', overflowX: 'hidden', width: '50%'}}>
									<LinearProgress />
								</div>
								:
								<>
									{
										showSimilarPackageDetails &&
										<div style={{backgroundColor: "rgb(231, 231, 231)", maxHeight: '60vh', overflowY: 'scroll', overflowX: 'hidden', width: '50%'}}>
											<div style={{padding: 5, display: 'flex', flexDirection: 'column'}}>
												<span>Key: {similarEquationPackage.occurrences[0].equation.key.replace(/_/g, '')}</span>
												<span>Equation Name: {similarEquationPackage.occurrences[0].equation.name}</span>
												<button className="buttonMinimal" onClick={this.closeSimilarPackageWindow}>Close</button>
											</div>
											<div style={{display: 'flex', flexDirection: 'column', padding: 10, fontSize: '9pt'}}>
												<div style={{display: 'flex', fontSize: '8pt'}}>
													<span style={{fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '25%'}}>Model Name</span>
													<span style={{fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '15%'}}>Location ID</span>
													<span style={{fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '50%'}}>Notes</span>
												</div>
												{
													similarEquationPackage.occurrences.map(data => (
														<div key={data.priceData.id} className="leadRow" style={{cursor: 'pointer', display: 'flex'}}>
															<span style={{width: '25%', overflowWrap: 'break-word'}}>{data.priceData.name}</span>
															<span style={{width: '15%', overflowWrap: 'break-word'}}>{data.salesOffice.locationCode}</span>
															<span style={{width: '50%', overflowWrap: 'break-word'}}>{data.equation.notes}</span>
														</div>
													))
												}
											</div>
										</div>
									}
								</>
							}
						</div>
					</div>
				</Grid>
			</>
		)
	}
}

export default EquationEditor;