import React from 'react';
import CriticalButton from '../buttons/CriticalButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StandardButton from '../buttons/StandardButton';

interface DeletionComponentProps {
	deleteFunction: () => void;
	objectId: string;
	buttonString: string;
}

interface DeletionComponentState {
	buttonClicked: boolean;
	idMatchString: string;
	showStringMatchWarning: boolean;
}

class DeletionComponent extends React.Component<DeletionComponentProps, DeletionComponentState> {
	constructor(props: DeletionComponentProps) {
		super(props);
		this.state = {
			buttonClicked: false,
			idMatchString: "",
			showStringMatchWarning: false
		}
		this.deletionButtonClicked = this.deletionButtonClicked.bind(this);
		this.delete = this.delete.bind(this);
		this.cancelDeletion = this.cancelDeletion.bind(this);
		this.changeObjectMatchString = this.changeObjectMatchString.bind(this);
	}

	private deletionButtonClicked() {
		this.setState({ buttonClicked: true });
	}

	private cancelDeletion() {
		this.setState({ buttonClicked: false, idMatchString: "", showStringMatchWarning: false });
	}

	private delete() {
		if(this.state.idMatchString === this.props.objectId) {
			this.props.deleteFunction();
		} else {
			this.setState({ showStringMatchWarning: true });
		}
	}

	private changeObjectMatchString(event: { target: { value: string }; }) {
		this.setState({ idMatchString: event.target.value, showStringMatchWarning: false });
	}

	public render() {
		const { objectId, buttonString } = this.props;
		const { buttonClicked, idMatchString, showStringMatchWarning } = this.state;
		return(
			<>
				{
					buttonClicked ?
					<>
						<div style={{backgroundColor: 'rgb(231, 231, 231)', border: '1px solid #86210a', margin: 5, padding: 5, display: 'flex', flexDirection: 'column'}}>
							<span>If you wish to continue deleting this object, type in the object's ID below.  This action cannot be undone!</span>
							<p style={{fontWeight: 500}}>{objectId}</p>
							<input value={idMatchString} onChange={this.changeObjectMatchString} />
							{
								showStringMatchWarning &&
								<p style={{color: 'red'}}>ID's do not match!</p>
							}
						</div>
						<StandardButton onClick={this.cancelDeletion}>Cancel</StandardButton>
						<CriticalButton onClick={this.delete}><DeleteIcon style={{marginRight: 10}} />Delete Forever</CriticalButton>
					</>
					:
					<StandardButton onClick={this.deletionButtonClicked}>{buttonString}</StandardButton>
				}
			</>
		)
	}
}

export default DeletionComponent;