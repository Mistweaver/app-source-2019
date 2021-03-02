import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { StoreState } from '../../../Store';
import { connect } from 'react-redux';
import AddFilesModal from '../../../../components/files/AddFilesModal';
import { updateGenericInformation } from '../../../actions/AgreementEditorActions';
import FileViewer from '../../../../components/files/FileViewer';

interface ShippingDirectionsProps {
	deliveryStreet: string;
	deliveryCity: string;
	deliveryState: string;
	deliveryZip: string;
	shippingContactName: string;
	shippingContactDayPhone: string;
	shippingContactEveningPhone: string;
	shippingContactMobilePhone: string;
    shippingDirections: string;
	shippingDirectionsMapFileUri: string;
	
	id: string;
	updateGenericInformation: (targetedField: string, newValue: string) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		deliveryStreet: state.agreementeditor.deliveryStreet,
		deliveryCity: state.agreementeditor.deliveryCity,
		deliveryState: state.agreementeditor.deliveryState,
		deliveryZip: state.agreementeditor.deliveryZip,
		shippingContactName: state.agreementeditor.shippingContactName,
		shippingContactDayPhone: state.agreementeditor.shippingContactDayPhone,
		shippingContactEveningPhone: state.agreementeditor.shippingContactEveningPhone,
		shippingContactMobilePhone: state.agreementeditor.shippingContactMobilePhone,
		shippingDirections: state.agreementeditor.shippingDirections,
		shippingDirectionsMapFileUri: state.agreementeditor.shippingDirectionsMapFileUri,

		id: state.agreementeditor.id
	}
}

export interface ShippingDirectionsState {
    displayAddDocumentModal: boolean;
}

class ShippingDirections extends React.Component<ShippingDirectionsProps, ShippingDirectionsState> {
	constructor(props: ShippingDirectionsProps) {
		super(props);
		this.state = {
            displayAddDocumentModal: false
		}

		this.handleSelection = this.handleSelection.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.openNewDocuments = this.openNewDocuments.bind(this);
        this.closeNewDocuments = this.closeNewDocuments.bind(this);
        this.setFileUri = this.setFileUri.bind(this);
        
    }
    
    setFileUri(fileUri: string) {
        // console.log("in ShippingDirections.setFileUri()...");
		// console.log("file URI: " + fileUri);
		this.props.updateGenericInformation("shippingDirectionsMapFileUri", fileUri);
    }


	private handleInputChange(event: { target: { name: string, value: string }; }) {
		const { name, value } = event.target;

        this.props.updateGenericInformation(name, value);
	}

	private handleSelection(name: string, value: string) {
		this.props.updateGenericInformation(name, value);
	}

    public openNewDocuments() {
		this.setState({ displayAddDocumentModal: true })
	}
	public closeNewDocuments() {
		//this.loadDocuments();
		this.setState({ displayAddDocumentModal: false})
    }
    
    public loadMap(shippingDirectionsMapFileUri: string) {

    }

	public render() {
		const { shippingDirectionsMapFileUri } = this.props;
        const { displayAddDocumentModal } = this.state;
		console.log(shippingDirectionsMapFileUri);
		
		return(
			<>
				<Grid item sm={4} xs={12}>
					<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<div style={{float: "left"}}><h5><b>Shipping Address</b></h5>
								<TextField label="Street" name="deliveryStreet" value={this.props.deliveryStreet}  variant="outlined" style={{marginRight: 10, marginTop: 10}} disabled={true}/>
								<TextField label="City" name="deliveryCity" value={this.props.deliveryCity}  variant="outlined" style={{marginRight: 10, marginTop: 10}} disabled={true}/>
								<TextField label="State" name="deliveryState" value={this.props.deliveryState}  variant="outlined" style={{marginRight: 10, marginTop: 10}} disabled={true}/>
								<TextField label="Zip" name="deliveryZip" value={this.props.deliveryZip}  variant="outlined" style={{marginRight: 10, marginTop: 10}} disabled={true}/>
							</div>
							<div style={{float: "left"}}><h5><b>Contact Information</b></h5>
								<TextField label="Name" name="shippingContactName" value={this.props.shippingContactName} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10, marginTop: 10}} />
								<TextField label="Daytime Phone" name="shippingContactDayPhone" value={this.props.shippingContactDayPhone} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10, marginTop: 10}} />
								<TextField label="Evening Phone" name="shippingContactEveningPhone" value={this.props.shippingContactEveningPhone} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10, marginTop: 10}} />
								<TextField label="Mobile Phone" name="shippingContactMobilePhone" value={this.props.shippingContactMobilePhone} onChange={this.handleInputChange} variant="outlined" style={{marginRight: 10, marginTop: 10}} />
							</div>
						</div>
						<div style={{marginTop: 10, paddingBottom: 10, }}>
							<h5><b>Directions</b></h5>
							<div style={{}}>
								<TextField
									id="outlined-name"
									label="Directions"
									name="shippingDirections"
									value={this.props.shippingDirections}
									onChange={this.handleInputChange}
									multiline
									fullWidth
									rows={4}
									variant="outlined"
									style={{marginRight: 10}}
								/>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item sm={6} xs={12}>
					<div style={{padding: 15, display: 'flex', flexDirection: 'column', backgroundColor: "rgb(231, 231, 231)"}}>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<Button color="primary" variant="contained" onClick={this.openNewDocuments} style={{width: '200px', marginTop: 10, marginBottom: 10, marginRight: 10}}>Add Map Image File</Button>
							<Grid container spacing={1}>
								<Grid item xs={12} style={{textAlign: 'center'}}>N</Grid>
								<Grid item xs={1}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>W
								</Grid>
								<Grid item xs={10}>
									<FileViewer
										src={this.props.shippingDirectionsMapFileUri}
										fileName=".jpeg"
									/>
								</Grid>
								<Grid item xs={1}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>E</Grid>
								<Grid item xs={12} style={{textAlign: 'center'}}>S</Grid>
							</Grid>
						</div>
					</div>
				</Grid>
				
                <AddFilesModal 
					onClose={this.closeNewDocuments} 
					open={displayAddDocumentModal}
                    documentId={this.props.id}
                    apiEndPoint={"/uploadMapFile"}
					setFileUri={this.setFileUri}
					allowedFileTypes={['image/png', 'image/jpg']}
				/>
			</>
		)
	}
}

export default connect(mapStateToProps, { updateGenericInformation })(ShippingDirections);