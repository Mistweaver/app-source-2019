import React from 'react';
import { Badge } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { connect } from 'react-redux';
import { StoreState } from '../../Store';
import { decodeIdToken, decodeAccessToken } from '../../../auth/AuthServices';

interface IdTokenExpirationClockProps {
	idToken: string;
}

function mapStateToProps(state: StoreState) {
	return {
		idToken: state.application.msalIdToken
	}
}
interface IdTokenExpirationClockState {
	currentTime: number;
	time_remaining: number;
}


class IdTokenExpirationClock extends React.Component<IdTokenExpirationClockProps, IdTokenExpirationClockState> {
	constructor(props: IdTokenExpirationClockProps) {
		super(props);
		this.state = {
			currentTime: new Date().getTime() / 1000,
			time_remaining: 0,
		}
	}

	componentDidMount() {
		this.startInterval();
	}

	componentDidUpdate(prevProps: IdTokenExpirationClockProps) {
		if(prevProps !== this.props) {
			this.startInterval();
		}
	}

	private startInterval() {
		let idTokenDecoded = decodeIdToken(this.props.idToken);
		if(idTokenDecoded.exp !== undefined) {
			setInterval(() => {
				this.setState({
					time_remaining: (decodeAccessToken(this.props.idToken).exp)  - (new Date().getTime() / 1000),
				});
			}, 1000);
		}
	}
	
	public render() {
		
		const { time_remaining } = this.state;
		
		let minutes_remaining = Math.floor(time_remaining / 60);
		let seconds_remaining = Math.round((time_remaining % 60));
		if(minutes_remaining < 0) {
			minutes_remaining = 0;
		}
		if(seconds_remaining < 0) {
			seconds_remaining = 0;
		}

		let secondsText = seconds_remaining < 10 ? `0${seconds_remaining}` : seconds_remaining;
		return(
			<Badge badgeContent={minutes_remaining + ":" + secondsText} color="secondary" style={{margin: 10}}>
				<AccessTimeIcon />
			</Badge>
		)
	}
}

export default connect(mapStateToProps, { /*saveNewIdToken*/ })(IdTokenExpirationClock);