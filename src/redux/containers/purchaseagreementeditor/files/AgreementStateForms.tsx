import { StoreState } from "../../../Store";
import React from "react";
import { StateForm } from "../../../../objects/stateform/StateForm";
import { connect } from "react-redux";
import { getStateFormsByState, getStateFormsByStateAndModelType } from "../../../../services/StateFormServices";
import { LinearProgress, ListItem, ListItemIcon, ListItemText, Grid } from "@material-ui/core";
import PDFIcon from '@material-ui/icons/PictureAsPdf';
import { ConvertStateAbbrToName } from "../../../../utilities/ConvertStateAbbrToName";
import { validateHTMLResponse } from "../../../../services/HttpResponseChecker";

interface AgreementStateFormProps {
	deliveryState: string;
	extendedServiceContractAmount: number;
	modelType: string;
}

function mapStateToProps(state: StoreState) {
	return {
		deliveryState: state.agreementeditor.deliveryState,
		extendedServiceContractAmount: state.agreementeditor.extendedServiceContractAmount,
		modelType: state.agreementeditor.modelType
	}
}

interface AgreementStateFormsState {
	forms: StateForm[];
	loading: boolean;
}

class AgreementStateForms extends React.Component<AgreementStateFormProps, AgreementStateFormsState> {
	constructor(props: AgreementStateFormProps) {
		super(props);
		this.state = {
			forms: [],
			loading: true
		}
	}

	componentDidMount() {
		this.getStateForms(this.props.deliveryState, 
				this.props.extendedServiceContractAmount,
				this.props.modelType
			);
	}

	componentDidUpdate(prevProps: AgreementStateFormProps) {
		if(prevProps !== this.props) {
			this.getStateForms(this.props.deliveryState, 
					this.props.extendedServiceContractAmount,
					this.props.modelType
				);
		}
	}

	private getStateForms(deliveryState: string, extendedServiceContractAmount: number, modelType: string) {
		var formsList: StateForm[] = [];
		var _modelType = modelType.includes("HUD") ? "HUD" : modelType;
		getStateFormsByStateAndModelType(deliveryState, _modelType).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ loading: false });
				this.setState({ forms: res.data._embedded.stateforms});
				var i;
				for (i = 0; i < res.data._embedded.stateforms.length; i++) {
					formsList.push(res.data._embedded.stateforms[i]);
				}

				if(deliveryState !== 'FL' && extendedServiceContractAmount > 0) {
					getStateFormsByState('EW').then(res => {
						if(validateHTMLResponse(res)) {
							for (i = 0; i < res.data._embedded.stateforms.length; i++) {
								formsList.push(res.data._embedded.stateforms[i]);
							}
							this.setState({ forms: formsList, loading: false});
		
						}
					});	
				} else {
					// console.log(formsList);
	
					this.setState({ forms: formsList, loading: false});
				}
			}
		});

		
		
	}

	public render() {
		const { forms, loading } = this.state;
		const { deliveryState } = this.props;
		return(
			<>
				<Grid item xs={6}>
					<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7"}}>Current {ConvertStateAbbrToName(deliveryState)} Forms</div>
					<div style={{display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						{
							loading === true ?
							<LinearProgress />
							:
							<div>
								{
									forms.length === 0 ?
										<span>No forms found for {ConvertStateAbbrToName(deliveryState)}</span>
									:
									<div style={{display: 'flex', flexDirection: 'column'}}>
										{
											forms.map(form =>(
												<a key={form.id} href={form.url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
													<ListItem button>
														<ListItemIcon>
															<PDFIcon style={{color: 'red'}} />
														</ListItemIcon>
														<ListItemText primary={form.linkDescription} secondary={new Date(form.modificationTime).toLocaleString()}/>
													</ListItem>
												</a>
											))
										}
									</div>
								}
							</div>
						}
					</div>
				</Grid>
			</>
		)
	}

}

export default connect(mapStateToProps, {})(AgreementStateForms);