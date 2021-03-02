import React from 'react';
import { Grid, CardContent, Card, Button, List, ListItem, ListItemIcon, ListItemText, ListSubheader,LinearProgress } from '@material-ui/core';
// import FileIcon from '@material-ui/icons/FileCopy';
import PDFIcon from '@material-ui/icons/PictureAsPdf';
import { StateForm } from '../../objects/stateform/StateForm';
import { getStateFormsByState, addNewForm, deleteForm, updateForm } from '../../services/StateFormServices';
import { ConvertStateAbbrToName } from '../../utilities/ConvertStateAbbrToName';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import { STATES } from '../../data/staticdata';
import { Add } from '@material-ui/icons';

interface StateFormManagerState {
	forms: StateForm[];
	stateSelection: string;

	id: string;
	creationTime: string;
	createdBy: string;
	url: string;
	modelType: string;
	linkDescription: string;

	loadingForms: boolean;
	displayForm: boolean;

	formEdited: boolean;
}

class StateFormManager extends React.Component<{}, StateFormManagerState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			forms: [],
			stateSelection: "",

			id: "",
			creationTime: "",
			createdBy: "",
			url: "",
			modelType: "",
			linkDescription: "",

			loadingForms: false,
			displayForm: false,

			formEdited: false
		}

		this.handleStateSelection = this.handleStateSelection.bind(this);
		this.addForm = this.addForm.bind(this);
		this.handleNewFormChange = this.handleNewFormChange.bind(this);
		this.saveForm = this.saveForm.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.showAddForm = this.showAddForm.bind(this);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
		this.deleteSelectedForm = this.deleteSelectedForm.bind(this);
	}

	private handleStateSelection(event: { target: { value: string }; } ) {
		const { value } = event.target;
		this.setState({ stateSelection: value, loadingForms: true });
		getStateFormsByState(value).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ forms: res.data._embedded.stateforms, loadingForms: false });
			}
		});
	}

	private getStateForms() {
		this.setState({ loadingForms: true });
		getStateFormsByState(this.state.stateSelection).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ forms: res.data._embedded.stateforms, loadingForms: false});
			}
		});
	}

	private handleNewFormChange(event: { target: { name: string, value: string }; } ) {
		const { name, value } = event.target;
		// console.log(name + ", " + value);
		//@ts-ignore
		this.setState({ [name]: value });
	}

	private addForm() {
		const { stateSelection, linkDescription, url, modelType } = this.state;
		
		let newStateForm = new StateForm();
		newStateForm.state = stateSelection;
		newStateForm.linkDescription = linkDescription;
		newStateForm.url = url;
		newStateForm.modelType = modelType;

		addNewForm(newStateForm).then(res => {
			if(validateHTMLResponse(res)) {
				this.getStateForms();
				this.setState({
					linkDescription: "",
					url: "",
					modelType: ""
				});
			}
		});
	}

	private handleFormChange(event: { target: { name: string, value: string }}) {
		console.log("Changing form value");
		const { name, value } = event.target;
		//@ts-ignore
        this.setState({
            [name]: value,
			formEdited: true
        });
	}

	private saveForm() {
		const { stateSelection, linkDescription, url, modelType, id, createdBy, creationTime } = this.state;
		
		let updatedStateForm = new StateForm();
		updatedStateForm.id = id;
		updatedStateForm.createdBy = createdBy;
		updatedStateForm.creationTime = creationTime;
		updatedStateForm.deleted = false;
		updatedStateForm.state = stateSelection;
		updatedStateForm.linkDescription = linkDescription;
		updatedStateForm.url = url;
		updatedStateForm.modelType = modelType;

		updateForm(updatedStateForm).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ 
					displayForm: false,
					formEdited: false,
					id: "",
					creationTime: "",
					createdBy: "",
					url: "",
					modelType: "",
					linkDescription: "",
				});
				this.getStateForms();

			}
		});
	}

	private showForm(form: StateForm) {
		console.log(form);
		this.setState({
			displayForm: true,
			id: form.id,
			creationTime: form.creationTime,
			createdBy: form.createdBy,
			url: form.url,
			modelType: form.modelType === null ? "" : form.modelType,
			linkDescription: form.linkDescription,
			formEdited: false
		});
	}

	private deleteSelectedForm() {
		deleteForm(this.state.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({ 
					displayForm: false,
					formEdited: false,
					id: "",
					creationTime: "",
					createdBy: "",
					url: "",
					modelType: "",
					linkDescription: "",
				});
				this.getStateForms();
			}
		});

	}

	private hideForm() {
		this.setState({ displayForm: false, formEdited: false });
	}

	private showAddForm() {
		this.setState(prevState => ({ 
			displayForm: true,
			formEdited: false,
			id: "",
			creationTime: "",
			createdBy: "",
			url: "",
			modelType: "",
			linkDescription: "",
		}));
	}

	public render() {
		const { forms, stateSelection, linkDescription, url, id, modelType, displayForm, loadingForms, formEdited } = this.state;
		return(
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<div style={{backgroundColor: 'rgb(231, 231, 231)', borderRadius: 15, marginBottom: 10}}>
						<div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '5px solid #73B2C9', padding: 10}}>
							<div style={{fontSize: '14pt', fontWeight: 600, marginTop: 'auto', marginBottom: 'auto'}}>Select State to View Forms</div>
						</div>
						<div style={{width: '100%', padding: 10}}>
							<input 
								list="states"
								name="stateSelection"
								placeholder="select state"
								onChange={this.handleStateSelection}
								value={stateSelection}
								style={{ padding: 10 }}
							/>
							<datalist id="states">
								{
									STATES.map(state => (
										<option key={state.id} value={state.abbreviation}>{state.name}</option>
									))
								}
							</datalist>
						</div>
					</div>
					<div style={{backgroundColor: 'rgb(231, 231, 231)', borderRadius: 15}}>
						{
							stateSelection !== "" &&
							<div style={{padding: 10, display: 'flex', justifyContent: 'space-between'}}>
								<div style={{marginTop: 'auto', marginBottom: 'auto'}}>{ConvertStateAbbrToName(stateSelection)} Forms</div>
								<Button variant="outlined" color="primary" onClick={this.showAddForm}><Add style={{color: 'green'}} /></Button>
							</div>
						}
						{
							loadingForms ?
							<LinearProgress />
							:
							<>
								{	
									forms.length === 0 ?
									<>
										{
											stateSelection !== "" &&
											<span>There are no forms for {ConvertStateAbbrToName(stateSelection)}</span>

										}
									</>
									:
									<List aria-label="state forms" >
										{
											forms.map(form =>(
												<ListItem button key={form.id} onClick={() => this.showForm(form)}>
													<ListItemIcon>
														<PDFIcon style={{color: 'red'}} />
													</ListItemIcon>
													<ListItemText primary={form.linkDescription} />
												</ListItem>
											))
										}
									</List>
								}
							</>
						}
					</div>
				</Grid>
				<Grid item xs={4}>
					{
						stateSelection !== "" && displayForm &&
						<div style={{backgroundColor: 'rgb(231, 231, 231)', borderRadius: 15}}>
							<div style={{backgroundColor: "#3f51b5", color: 'white', padding: 10, display: 'flex', flexDirection: 'column'}}>{ id === "" ? "New Form" : linkDescription}</div>
							<div style={{padding: 10}}>
								<label>Url</label>
								<input name="url" style={{width: '100%', padding: 5}} placeholder="URL to form" onChange={this.handleFormChange} value={url} />
								<label>Description</label>
								<textarea name="linkDescription" style={{width: '100%', padding: 5, marginTop: 10}} placeholder="Form description" onChange={this.handleFormChange} value={linkDescription}/>
								<label>Model Type</label>
								<div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
									<select value={modelType} name="modelType" onChange={this.handleFormChange} style={{padding: 5, height: 35}}>
										<option value="">select form model type</option>
										<option value="HUD">HUD</option>
										<option value="PM">PM</option>
										<option value="ALL">All</option>
									</select>
								</div>
								<div style={{marginTop: 10, justifyContent: 'space-between', display: 'flex'}}>
									<div>
										{
											id !== "" &&
											<a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
												<Button color="primary" variant="outlined">View Form</Button>
											</a>
										}
										
										{
											formEdited &&
											<>
												{
													id === "" ?
													<Button color="primary" variant="contained" onClick={this.addForm}>Add</Button>
													:
													<Button color="primary" variant="contained" onClick={this.saveForm}>Save Edits</Button>
												}
											</>
										}
										<Button variant="outlined" color="secondary" onClick={this.hideForm}>Close</Button>
									</div>
									<div>
										<Button color="secondary" variant="contained" onClick={this.deleteSelectedForm}>Delete</Button>
									</div>
								</div>
							</div>
						</div>
					}
					
				</Grid>
			</Grid>
		)
	}
}

export default StateFormManager;