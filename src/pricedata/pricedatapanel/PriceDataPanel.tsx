import { Grid, LinearProgress } from '@material-ui/core';
import { Error, Warning } from '@material-ui/icons';
import React from 'react';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { FormatNumberAsMoney } from '../../utilities/FormatNumberAsMoney';
import { EquationData } from '../equations/objects/EquationData';
import ModelDisplayComponent from '../models/ModelDisplayComponent';
import { getPriceDataById } from '../data/PriceDataServices';
import { VariableData } from '../variables/objects/VariableData';
import EditDraftDataComponent from '../toolbar/data/EditDraftData';
import EquationDataEditor from '../toolbar/equations/EquationDataEditor';
import VariableDataEditor from '../toolbar/variables/VariableDataEditor';
import TemplateSelectComponent from '../toolbar/data/TemplateSelectComponent';
import { DRAFT, ACTIVE } from '../../data/staticdata';
import { SetActiveDate } from '../toolbar/data/SetActiveDate';
import { SetExpirationDate } from '../toolbar/data/SetExpirationDate';
import { EditBasePrice } from '../toolbar/data/EditBasePrice';
import { EvaluateEquation } from './EvaluationEquation';
import { calculateSubTotal, PriceData } from '../objects/PriceData';
import { ClipboardComponent } from '../../components/clipboard/ClipboardComponent';

interface Props {
	id: string;
	selectVariableData: (variable: VariableData) => void;
	selectEquationData: (equation: EquationData) => void;
	reload: () => void;
}

interface State {
	loadingData: boolean;
	data: PriceData;
}

class PriceDataPanel extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loadingData: false,
			data: new PriceData(),
		}

		this.reload = this.reload.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps: Props) {
		if(prevProps.id !== this.props.id) {
			this.loadData();
		}
	}



	private loadData() {
		if(this.props.id !== "") {
			this.setState({ loadingData: true });
			// get price data by id
			getPriceDataById(this.props.id).then(res => {
				this.setState({ loadingData: false });
				if(validateHTMLResponse(res)) {
					this.setState({ data: res.data });
				} else {
	
				}
			});
		}
	}

	private reload() {
		this.props.reload();
		this.loadData();
	}

	

	public render() {
		const { data, loadingData } = this.state;
		if(this.props.id === "") {
			return(null)
		} else {
			return(
				<Grid item xs={3}>
					<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', paddingLeft: 5, paddingTop: 5}}>
						<div style={{fontSize: '18pt', marginBottom: 5}}>{data.name + " - " + data.seriesName }</div>
						<div style={{display: 'flex', marginBottom: 5}}>{data.activeDate}{data.expirationDate !== "" && <span>{" - " + data.expirationDate}</span>}</div>
						<div style={{display: 'inline-flex'}}>
							{
								data.status === DRAFT &&
								<>
									<EditDraftDataComponent data={data} reload={this.reload} />
									<EditBasePrice data={data} reload={this.reload} />
									<SetActiveDate selectedPriceData={[data]} reload={this.props.reload} />
									<SetExpirationDate selectedPriceData={[data]} reload={this.props.reload} />
								</>
							}
							{
								data.status === ACTIVE &&
								<SetExpirationDate selectedPriceData={[data]} reload={this.props.reload} />
							}
							<ClipboardComponent value={this.props.id} />
							<TemplateSelectComponent priceData={data} selectTemplate={() => void(0)} />
						</div>
						
						{ loadingData ? 
							<div style={{padding: 3}}>
								<LinearProgress /> 
							</div>
							:
							<div style={{padding: 5}}></div>
						}
					</div>
					<div style={{maxHeight: '51vh', overflowY: 'auto'}}>
						<div style={{ backgroundColor: 'rgb(231, 231, 231)', display: 'flex', flexDirection: 'column'}}>
							{
								data.error &&
								<div style={{border: '1px solid red', backgroundColor: "#ff5e5e", padding: 10, margin: 5}}>
									<Error />{" Error: " + data.errorDetails}
								</div>
							}
							{
								data.dataUpdated &&
								<div style={{backgroundColor: "#ffd359", border: '1px solid yellow', padding: 10, margin: 5}}>
									<Warning />Notice: Data has been updated and requires recalculation
								</div>
							}
						</div>
						<ModelDisplayComponent model={data.model} />	
						<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>Pricing</div>
						<div style={{ backgroundColor: 'rgb(231, 231, 231)', padding: 5}}>
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<span>Base Price</span>
								<span>{FormatNumberAsMoney(data.basePrice)}</span>
							</div>
							<div className="flexedRow">
								<span>Factory Total Cost</span>
								<span>{FormatNumberAsMoney(data.factoryTotalCost)}</span>
							</div>
							<div className="flexedRow">
								<span>Subtotal</span>
								{calculateSubTotal(data)}
							</div>
							<div className="flexedRow">
								<span>MSRP</span>
								<span>{FormatNumberAsMoney(data.msrp)}</span>
							</div>
							<div className="flexedRow">
								<span>Factory Direct Price</span>
								<span>{FormatNumberAsMoney(data.factoryDirectPrice)}</span>
							</div>
							<div className="flexedRow">
								<span>First Half Promo Price</span>
								<span>{FormatNumberAsMoney(data.firstHalfAdvertisingPrice)}</span>
							</div>
							<div className="flexedRow">
								<span>Second Half Promo Price</span>
								<span>{FormatNumberAsMoney(data.secondHalfAdvertisingPrice)}</span>
							</div>
						</div>
					
						<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>Variables</div>
						{
							data.status === DRAFT ?
							<>
							{
								data.variables.map(variable => (
									<VariableDataEditor
										key={variable.key}
										variable={variable}
										priceData={data}
										select={this.props.selectVariableData}
										reload={this.reload}
									>
										<div style={{ backgroundColor: 'rgb(231, 231, 231)'}}>
											
											<div className="flexedRow leadRow" style={{padding: 5}}>
												<span style={{fontWeight: 600}}>{variable.name}</span>
												<span>{variable.value}</span>
											</div>
											
										</div>
									</VariableDataEditor>
								))
							}
							</>
							:
							<>
							{
								data.variables.map(variable => (
									<div style={{ backgroundColor: 'rgb(231, 231, 231)'}}>
										<div className="flexedRow leadRow" style={{padding: 5}}>
											<span style={{fontWeight: 600}}>{variable.name}</span>
											<span>{variable.value}</span>
										</div>
									</div>
								))
							}
							</>
						}
						<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>Equations</div>	
						{
							data.status === DRAFT ?
							<>
								{
									data.equations.map(equation => (
										<EquationDataEditor
											key={equation.key}
											equation={equation}
											priceData={data}
											select={this.props.selectEquationData}
											reload={this.reload}
										>
											<div style={{ backgroundColor: 'rgb(231, 231, 231)', display: 'flex', justifyContent: 'space-between'}}>
												<div className="leadRow" style={{padding: 5, marginBottom: 2}}>
													<div style={{fontWeight: 600}}>{equation.name}</div>
													<div style={{fontSize: '9pt'}}>{equation.equation}</div>
												</div>
												<EvaluateEquation equation={equation} priceData={data} />
											</div>
										</EquationDataEditor>
									))
								}
							</>
							:
							<>
								{
									data.equations.map(equation => (
										<div style={{ backgroundColor: 'rgb(231, 231, 231)', display: 'flex', justifyContent: 'space-between'}}>
											<div className="leadRow" style={{padding: 5, marginBottom: 2}}>
												<div style={{fontWeight: 600}}>{equation.name}</div>
												<div style={{fontSize: '9pt'}}>{equation.equation}</div>
											</div>
											<EvaluateEquation equation={equation} priceData={data} />
										</div>
									))
								}
							</>
						}
					</div>
				</Grid>
			)
		}
	}
}

export default PriceDataPanel;