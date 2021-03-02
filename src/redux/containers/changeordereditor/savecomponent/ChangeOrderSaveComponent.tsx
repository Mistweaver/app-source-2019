import React from 'react';
import { connect } from 'react-redux';
import { loadChangeOrder } from '../../../actions/ChangeOrderActions';
import { getChangeOrderById, updateChangeOrder } from '../../../../services/ChangeOrderServices';
import { validateHTMLResponse } from '../../../../services/HttpResponseChecker';
import StandardButton from '../../../../components/buttons/StandardButton';
import CriticalButton from '../../../../components/buttons/CriticalButton';
import { buildChangeOrderFromState } from './BuildChangeOrderFromState';
import { ChangeOrder } from '../../../../objects/changeorders/ChangeOrder';
import { StoreState } from '../../../Store';
import { IN_PROGRESS } from '../../../../data/staticdata';

/*Save Component
 * 
 * Takes in the agreement editor state.  When an edit is made, it presents the opportunity to save the agreement.
 * If lead is changed 
 * 
 */
interface SaveComponentProps {
	loadChangeOrder: (changeOrder: ChangeOrder) => void;
	id: string;
	status: string;
	edited: boolean;
}

function mapStateToChangeOrderSaveComponentProps(state: StoreState) {
	return {
		id: state.changeordereditor.id,
		status: state.changeordereditor.status,
		edited: state.changeordereditor.edited,
	}
}

interface SaveComponentState {
	// submitted: boolean;
	error: boolean;
}

class ChangeOrderSaveComponent extends React.Component<SaveComponentProps, SaveComponentState> {
	constructor(props: SaveComponentProps) {
		super(props);
		this.state = {
			// submitted: false,
			error: false
		}

		this.save = this.save.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	private save() {
		// rebuild Change Order Object from agreementeditor Redux state
		let updatedChangeOrder = buildChangeOrderFromState();
		// console.log("Saved Change Order updates");
		updateChangeOrder(updatedChangeOrder).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadChangeOrder(res.data.object);
			} else {

			}
		});
	}

	private cancel() {
		getChangeOrderById(this.props.id).then(res => {
			if(validateHTMLResponse(res)) {
				this.props.loadChangeOrder(res.data.changeorder);
			}
		});
	}


	public render() {
		const { edited, status } = this.props;
		return(
			<>
				{
					edited && status === IN_PROGRESS &&
					<>
						<StandardButton onClick={this.save}>Save</StandardButton>
						<CriticalButton onClick={this.cancel}>Cancel Changes</CriticalButton>
					</>
				}
			</>
		)
	}
}

export default connect(mapStateToChangeOrderSaveComponentProps, { loadChangeOrder })(ChangeOrderSaveComponent);