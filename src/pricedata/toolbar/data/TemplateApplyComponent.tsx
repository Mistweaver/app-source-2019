import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox } from '@material-ui/core';
import { SaveAlt } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import StandardButton from '../../../components/buttons/StandardButton';
import { PriceData } from '../../objects/PriceData';

interface Props {
	reload: () => void;
	selectedTemplate: PriceData;
	dataToApplyTemplateTo: PriceData[];
}

interface State {
	saving: boolean;
	error: boolean;
	errorMessage: string;
	renderModal: boolean;

	copyVars: boolean;
	copyEqns: boolean;
}

class TemplateApplyComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			saving: false,
			error: false,
			errorMessage: "",
			renderModal: false,

			copyVars: false,
			copyEqns: false,
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.checkEqns = this.checkEqns.bind(this);
		this.checkVars = this.checkVars.bind(this);
		this.action = this.action.bind(this);
	}

	private showModal() {
		this.setState({ renderModal: true });
	}

	private closeModal() {
		this.setState({ renderModal: false });
	}

	private checkVars() {
		this.setState(prevState => ({ copyVars: !prevState.copyVars }));
	}

	private checkEqns() {
		this.setState(prevState => ({ copyEqns: !prevState.copyEqns }));
	}

	private action() {
		// const { selectedTemplate, dataToApplyTemplateTo } = this.props;
		this.setState({ saving: true });


		// let templateUpdatePackage = new TemplateUpdatePackage(selectedTemplate.id, dataToApplyTemplateTo, this.state.copyVars, this.state.copyEqns);
		


		/*updateDataFromTemplate(templateUpdatePackage).then(response => {
			this.setState({ saving: false });
			if(validateHTMLResponse(response)) {
				this.props.reload();
			} else {
				this.setState({ error: true, errorMessage: "" });
			}
		}).catch((error) => {
			this.setState({ error: true, errorMessage: error });
		});*/
	}
	
	public render() {
		const { renderModal, copyVars, copyEqns } = this.state;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Copy Template to Data">
					<div className="buttonMinimal" onClick={this.showModal} >
						<SaveAlt style={{color: 'violet'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="md"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Apply Template to {this.props.dataToApplyTemplateTo.length} drafts?
					</DialogTitle>
					<DialogContent>
						<div style={{display: 'flex', marginBottom: 10 }}>
							<Checkbox
								checked={copyVars}
								onChange={this.checkVars}
								color="primary"
							/>
							<span>Copy Variables</span>
						</div>
						<div style={{display: 'flex', marginBottom: 10 }}>
							<Checkbox
								checked={copyEqns}
								onChange={this.checkEqns}
								color="primary"
							/>
							<span>Copy Equations</span>
						</div>
						
						
					</DialogContent>
					<DialogActions>
						<StandardButton onClick={this.action}>Apply Template</StandardButton>
						<CriticalButton onClick={this.closeModal}>Cancel</CriticalButton>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default TemplateApplyComponent;