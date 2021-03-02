import React from 'react';
import { ChangeOrderItem } from '../../../objects/changeorders/ChangeOrderItem';
import { StoreState } from '../../Store';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { editChangeOrderItem, removeChangeOrderItem, moveChangeOrderItemDown, moveChangeOrderItemUp } from '../../actions/ChangeOrderActions';
import { Typography } from '@material-ui/core';
import { FormatNumberAsMoney } from '../../../utilities/FormatNumberAsMoney';
import { IN_PROGRESS } from '../../../data/staticdata';
import Fab from '@material-ui/core/Fab/Fab';

interface ChangeOrderLineItemProps {
	item: ChangeOrderItem;
	items: ChangeOrderItem[];
	index: number;
	status: string;
	editChangeOrderItem: (items: ChangeOrderItem[], itemIndex: number, updatedItem: ChangeOrderItem) => void;
	moveChangeOrderItemUp: (items: ChangeOrderItem[], itemIndex: number) => void;
	moveChangeOrderItemDown: (items: ChangeOrderItem[], itemIndex: number) => void;
	removeChangeOrderItem: (items: ChangeOrderItem[], index: number) => void;
}

function mapStateToProps(state: StoreState) {
	return {
		items: state.changeordereditor.items
	}
}

interface ChangeOrderLineItemState {
	editing: boolean;
	editItemName: string;
	editItemCost: string;
	
}

class ChangeOrderLineItem extends React.Component<ChangeOrderLineItemProps, ChangeOrderLineItemState> {
	constructor(props: ChangeOrderLineItemProps) {
		super(props);
		this.state = {
			editing: false,
			editItemName: "",
			editItemCost: ""
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
		this.props.removeChangeOrderItem(this.props.items, index);
	}

	private edit() {
		this.setState({ 
			editing: true,
			editItemName: this.props.item.changeName,
			editItemCost: this.props.item.cost.toString(),
		});
	}

	private cancel() {
		this.setState({ 
			editing: false,
			editItemName: "",
			editItemCost: "",
		});
	}

	private saveEdits() {

		const { editItemName, editItemCost } = this.state;

		
		if(editItemName !== "" && editItemCost !== "") {
			if(editItemCost === "PKG" || editItemCost === "STD" || editItemCost === "NC" || editItemCost === "pkg" || editItemCost === "std" || editItemCost === "nc") {
				this.props.editChangeOrderItem(this.props.items, this.props.index, new ChangeOrderItem(editItemName, 0, this.props.item.changeType));


			} else {
				if(!isNaN(parseFloat(editItemCost))) {
					this.props.editChangeOrderItem(this.props.items, this.props.index, new ChangeOrderItem(editItemName, parseFloat(editItemCost), this.props.item.changeType));

				}
			}
		}
		this.setState({ 
			editing: false,
			editItemName: "",
			editItemCost: "",
		});
	}

	private itemCostChange(event: { target: { value: any}; }) {		
		this.setState({ editItemCost: event.target.value });
	}

	private itemNameChange(event: { target: { value: string}; }) {
		this.setState({
			editItemName: event.target.value,
		});
	}

	private moveItemDown() {
		this.props.moveChangeOrderItemDown(this.props.items, this.props.index);
	}

	private moveItemUp() {
		this.props.moveChangeOrderItemUp(this.props.items, this.props.index);
	}

	public render() {
		const { item, index, status } = this.props;
		const { editing, editItemName, editItemCost } = this.state;
		let numberOfItems = this.props.items.length;
		let changeType = "";

		switch(item.changeType) {
			case "otherChange":
			case "": changeType = "Notes";  break;
			case "addendumAChange": changeType = "Addendum A Change"; break;
			default: changeType = "Page 1 Change";
		}

		var canEdit = (status === IN_PROGRESS);

		return(
			<div style={{display: 'flex' , borderBottom: '1px solid black'}}>
				<div style={{width: '15%', padding: 5, overflowWrap: 'break-word', margin: 'auto'}}>
					<Typography variant="body1">{changeType}</Typography>
				</div>
				<div style={{width: '55%', padding: 5, overflowWrap: 'break-word', margin: 'auto'}}>
					{
						canEdit && editing ?
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
						<Typography variant="body1">{item.changeName}</Typography>
					}
				</div>
				<div style={{width: '15%', padding: 5, margin: 'auto' }}>
					{
						changeType !== "Notes" &&
						<>
							{
								canEdit && editing ?
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
									<span style={{width: 125}}>{FormatNumberAsMoney(item.cost)}</span>
								</Typography>
							}
						</>
					}
					
					
				</div>
				<div style={{width: '15%', padding: 5, display: 'flex'}}>
					{
						canEdit &&
						<>
							{
								editing ?
								<>
									<Fab color="default" size="small" aria-label="save" style={{marginRight: 5, boxShadow: 'none'}}>
										<SaveIcon  style={{color: 'green'}} onClick={this.saveEdits} />
									</Fab>
									<Fab color="default" size="small" aria-label="cancel" style={{marginRight: 5, boxShadow: 'none'}}>
										<CancelIcon  style={{color: 'red'}} onClick={this.cancel} />
									</Fab>
									
								</>
								:
								<>
									<Fab color="default" size="small" aria-label="edit" style={{marginRight: 5, boxShadow: 'none'}}>
										<EditIcon onClick={this.edit} />
									</Fab>
									{ index !== 0 && 
										<Fab color="default" size="small" aria-label="move" style={{marginRight: 5, boxShadow: 'none'}}>
											<ArrowUp onClick={this.moveItemUp} /> 
										</Fab>
									}
									
									{ index !== numberOfItems - 1 && 
										<Fab color="default" size="small" aria-label="move" style={{marginRight: 5, boxShadow: 'none'}}>
											<ArrowDown onClick={this.moveItemDown} /> 
										</Fab>
									}
									
									<Fab color="default" size="small" aria-label="delete" style={{marginRight: 5, boxShadow: 'none'}}>
										<DeleteIcon style={{color: 'red'}} onClick={() => this.deleteItem(index)}/>
									</Fab>
								</>		
							}
						</>
					}
					
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, { removeChangeOrderItem, editChangeOrderItem, moveChangeOrderItemDown, moveChangeOrderItemUp})(ChangeOrderLineItem);