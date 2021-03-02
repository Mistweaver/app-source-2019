import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import React from 'react';
import CriticalButton from '../../../components/buttons/CriticalButton';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import ModelDisplayComponent from '../../models/ModelDisplayComponent';
import { PriceData } from '../../objects/PriceData';

interface Props {
	priceData: PriceData;
	selectTemplate: (data: PriceData) => void;
}

interface State {
	renderModal: boolean;
}

class TemplateSelectComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			renderModal: false,
		}

		this.selectDataAsTemplate = this.selectDataAsTemplate.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	private closeModal() {
		this.setState({ renderModal: false });
	}

	private selectDataAsTemplate() {
		this.props.selectTemplate(this.props.priceData);
		this.setState({ renderModal: true });
	}
	
	public render() {
		const { priceData } = this.props;
		const { renderModal } = this.state;
		return(
			<div style={{margin: 'auto'}}>
				<Tooltip title="Select Data As Template">
					<div className="buttonMinimal" onClick={this.selectDataAsTemplate} >
						<FileCopy style={{color: 'orange'}} />
					</div>						
				</Tooltip>
				<Dialog
					open={renderModal}
					onClose={this.closeModal}
					maxWidth="sm"            
					fullWidth={true}
				>
					<DialogTitle style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)'}}>
						Data Selected As Template!
					</DialogTitle>
					<DialogContent>
						<div>The following data has been selected as a template:</div>
						<div style={{fontSize: '18pt', marginBottom: 5}}>{priceData.name + " - " + priceData.seriesName }</div>
						<div style={{display: 'flex', marginBottom: 5}}>{priceData.activeDate}{priceData.expirationDate !== "" && <span>{" - " + priceData.expirationDate}</span>}</div>
						<ModelDisplayComponent model={priceData.model} />
						<div style={{ backgroundColor: 'rgb(60, 73, 83)', color: 'rgb(186, 210, 215)', padding: 5}}>Pricing</div>
						<div style={{ backgroundColor: 'rgb(231, 231, 231)', padding: 5}}>
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<span>Base Price</span>
								<span>{FormatNumberAsMoney(priceData.basePrice)}</span>
							</div>
							<div className="flexedRow">
								<span>Factory Total Cost</span>
								<span>{FormatNumberAsMoney(priceData.factoryTotalCost)}</span>
							</div>
							{/*<div className="flexedRow">
								<span>Subtotal</span>
								<span>{FormatNumberAsMoney(data.subTotal)}</span>
							</div>*/}
							<div className="flexedRow">
								<span>MSRP</span>
								<span>{FormatNumberAsMoney(priceData.msrp)}</span>
							</div>
							<div className="flexedRow">
								<span>Factory Direct Price</span>
								<span>{FormatNumberAsMoney(priceData.factoryDirectPrice)}</span>
							</div>
							<div className="flexedRow">
								<span>First Half Promo Price</span>
								<span>{FormatNumberAsMoney(priceData.firstHalfAdvertisingPrice)}</span>
							</div>
							<div className="flexedRow">
								<span>Second Half Promo Price</span>
								<span>{FormatNumberAsMoney(priceData.secondHalfAdvertisingPrice)}</span>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<CriticalButton onClick={this.closeModal}>Close</CriticalButton>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default TemplateSelectComponent;