import React from 'react';
import { Badge } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { connect } from 'react-redux';
import { StoreState } from '../../Store';
import { decodeIdToken, decodeAccessToken } from '../../../auth/AuthServices';

interface AccessTokenExpirationClockProps {
	accessToken: string;
}

function mapStateToProps(state: StoreState) {
	return {
		accessToken: state.application.accessToken
	}
}
interface AccessTokenExpirationClockState {
	currentTime: number;
	time_remaining: number;
}


class AccessTokenExpirationClock extends React.Component<AccessTokenExpirationClockProps, AccessTokenExpirationClockState> {
	constructor(props: AccessTokenExpirationClockProps) {
		super(props);
		this.state = {
			currentTime: new Date().getTime() / 1000,
			time_remaining: 0,
		}
	}

	componentDidMount() {
		this.startInterval();
	}

	componentDidUpdate(prevProps: AccessTokenExpirationClockProps) {
		if(prevProps !== this.props) {
			this.startInterval();
		}
	}

	private startInterval() {
		let accessTokenDecoded = decodeIdToken(this.props.accessToken);
		console.log(accessTokenDecoded);
		if(accessTokenDecoded.exp !== undefined) {
			setInterval(() => {

				this.setState({
					time_remaining: (decodeAccessToken(this.props.accessToken).exp)  - (new Date().getTime() / 1000),
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

export default connect(mapStateToProps, { /*saveNewIdToken*/ })(AccessTokenExpirationClock);