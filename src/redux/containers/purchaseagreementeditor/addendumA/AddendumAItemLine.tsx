import React from 'react';
import { StoreState } from '../../../Store';
import { Typography } from '@material-ui/core';
import { FormatNumberAsMoney } from '../../../../utilities/FormatNumberAsMoney';
import { AddendumAItem } from '../../../../objects/purchaseagreement/addendumA/AddendumAItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import { connect } from 'react-redux';
import { editAddendumAItem, moveAddendumAItemUp, moveAddendumAItemDown, removeAddendumAItem } from '../../../actions/AgreementEditorActions';

interface AddendumAItemLineProps {
	item: AddendumAItem;
	addendumAItems: AddendumAItem[];
	index: number;
	editAddendumAItem: (items: AddendumAItem[], itemIndex: number, updatedItem: AddendumAItem) => void;
	moveAddendumAItemUp: (items: AddendumAItem[], itemIndex: number) => void;
	moveAddendumAItemDown: (items: AddendumAItem[], itemIndex: number) => void;
	removeAddendumAItem: (items: AddendumAItem[], index: number) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		addendumAItems: state.agreementeditor.addendumAItems
	}
}

interface AddendumAItemLineState {
	editing: boolean;
	editItemName: string;
	editItemCost: string;
	editItemLabel: string;
}

class AddendumAItemLine extends React.Component<AddendumAItemLineProps, AddendumAItemLineState> {
	private maxInputCharacterLength = 1024;

	constructor(props: AddendumAItemLineProps) {
		super(props);
		this.state = {
			editing: false,
			editItemName: "",
			editItemCost: "",
			editItemLabel: "",
		}

		this.deleteItem = this.deleteItem.bind(this);
		this.edit = this.edit.bind(this);
		this.cancel = this.cancel.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.moveItemDown = this.moveItemDown.bind(this);
		this.moveItemUp = this.moveItemUp.bind(this);
		this.itemCostChange = this.itemCostChange.bind(this);
		this.itemNameChange = this.itemNameChange.bind(this);

	}

	private deleteItem(index: number) {
		this.props.removeAddendumAItem(this.props.addendumAItems, index);
	}

	private edit() {
		this.setState({ 
			editing: true,
			editItemName: this.props.item.itemName,
			editItemCost: this.props.item.cost.toString(),
			editItemLabel: this.props.item.itemLabel
		});
	}

	private cancel() {
		this.setState({ 
			editing: false,
			editItemName: "",
			editItemCost: "",
			editItemLabel: ""
		});
	}

	private saveEdits() {

		const { editItemName, editItemCost, editItemLabel } = this.state;

		
		if(editItemName !== "" && editItemCost !== "") {
			if(editItemCost === "PKG" || editItemCost === "STD" || editItemCost === "NC" || editItemCost === "pkg" || editItemCost === "std" || editItemCost === "nc") {
				this.props.editAddendumAItem(this.props.addendumAItems, this.props.index, new AddendumAItem(editItemName, 0, editItemCost));


			} else {
				if(!isNaN(parseFloat(editItemCost))) {
					this.props.editAddendumAItem(this.props.addendumAItems, this.props.index, new AddendumAItem(editItemName, parseFloat(editItemCost), editItemLabel));

				}
			}
		}
		this.setState({ 
			editing: false,
			editItemName: "",
			editItemCost: "",
			editItemLabel: ""
		});
	}

	private itemCostChange(event: { target: { value: any}; }) {		
		this.setState({ editItemCost: event.target.value });
	}

	private itemNameChange(event: { target: { value: string}; }) {
		if(event.target.value.length < this.maxInputCharacterLength) {
			this.setState({
				editItemName: event.target.value,
			});
		}
		
	}

	private moveItemDown() {
		this.props.moveAddendumAItemDown(this.props.addendumAItems, this.props.index);
	}

	private moveItemUp() {
		this.props.moveAddendumAItemUp(this.props.addendumAItems, this.props.index);
	}

	public render() {
		const { item, index } = this.props;
		const { editing, editItemName, editItemCost } = this.state;
		let numberOfItems = this.props.addendumAItems.length;

		return(
			<div style={{display: 'flex', borderBottom: '1px solid black'}}>
				<div style={{width: '60%', borderRight: '1px solid black', padding: 5, overflowWrap: 'break-word'}}>
					{
						editing ?
						<input
							style={{
								width: '100%',
								margin: 0,
								border: 0,
								outline: '1px solid black',
								paddingTop: '5px',
								paddingBottom: '5px'
							}}
							value={editItemName}
							onChange={this.itemNameChange}
						/>
						:
						<Typography variant="body1">{item.itemName}</Typography>

					}
				</div>
				<div style={{width: '20%', padding: 5, borderRight: '1px solid black'}}>
					{
						editing ?
						<input
							style={{
								width: '100%',
								margin: 0,
								border: 0,
								outline: '1px solid black',
								paddingTop: '5px',
								paddingBottom: '5px'
							}}
							value={editItemCost}
							onChange={this.itemCostChange}
						
						/>
						:
						<Typography variant="body1">
							{
								item.cost === 0 ?
									<span>{item.itemLabel}</span>
								:
									<span style={{width: 125}}>{FormatNumberAsMoney(item.cost)}</span>
							}
						</Typography>
					}
					
				</div>
				<div style={{width: '20%', padding: 5, display: 'flex'}}>
					{
						editing ?
						<>
							<div style={{ padding: 3, border: '1px solid grey', cursor: 'pointer'}}>
								<SaveIcon  style={{color: 'green'}} onClick={this.saveEdits} />
							</div>
							<div style={{ padding: 3, border: '1px solid grey', cursor: 'pointer'}}>
								<CancelIcon  style={{color: 'red'}} onClick={this.cancel} />
							</div>
						</>
						:
						<>
							<div style={{ padding: 3, border: '1px solid grey', cursor: 'pointer'}}>
								<EditIcon onClick={this.edit} />
							</div>
							{
								index !== 0 &&
								<div style={{ padding: 3, border: '1px solid grey', cursor: 'pointer'}} onClick={this.moveItemUp}>
									<ArrowUp />
								</div>
							}
							{
								index !== numberOfItems - 1 &&
								<div style={{ padding: 3, border: '1px solid grey', cursor: 'pointer'}} onClick={this.moveItemDown}>
									<ArrowDown />
								</div>
							}
							<div style={{ padding: 3, border: '1px solid grey', cursor: 'pointer'}}>
								<DeleteIcon style={{color: 'red'}} onClick={() => this.deleteItem(index)}/>
							</div>
						</>		
					}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, { removeAddendumAItem, editAddendumAItem, moveAddendumAItemUp, moveAddendumAItemDown })(AddendumAItemLine);