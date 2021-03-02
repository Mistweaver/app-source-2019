import React from 'react';
import Navigation from './Navigation';
import { CircularProgress, Button, Toolbar, Typography, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { loadPathFromStorage, loadUser } from '../../actions/ApplicationActions';
import ApplicationRouter from './ApplicationRouter';
import { getMicrosoftProfile } from '../../../auth/AuthServices';
import { MicrosoftToken } from '../../../objects/tokens/MicrosoftToken';
import { getUserByEmail } from '../../../services/UserServices';
import NewUserDisplay from '../../../displays/newuser/NewUserDisplay';
import { validateHTMLResponse } from '../../../services/HttpResponseChecker';
import { logout } from '../../actions/ApplicationActions';
import './Dashboard.css';
import ViewIcon from '@material-ui/icons/ViewQuilt';
import { PATH } from '../../../ApplicationConfiguration';
import { User } from '../../../objects/user/User';
import BlankProfileImage from '../../../resources/blankprofile.png';
import { demoHTTPRequest } from '../../../utilities/DemoHTTPRequest';

interface HomeProps {
	loadPathFromStorage: () => void;
	loadUser: (user: User) => void;
	logout: () => void;
}

interface HomeState {
	profileExists: boolean;
	loadingProfile: boolean;
	error: string;
	user: User;
}

class Home extends React.Component<HomeProps, HomeState> {

	constructor(props: HomeProps) {
		super(props);
		this.state = {
			profileExists: false,
			loadingProfile: true,
			error: "",
			user: new User()
		}
		
		this.logout = this.logout.bind(this);
		this.findUserByEmail = this.findUserByEmail.bind(this);
	}

	componentDidMount() {
		this.props.loadPathFromStorage();
		this.findUserByEmail();
	}

	findUserByEmail() {
		// let microsoftProfile: MicrosoftToken = getMicrosoftProfile();
		/*getUserByEmail(microsoftProfile.preferred_username).then(res => {
			this.setState({ loadingProfile: false });
			if(validateHTMLResponse(res)) {
				this.setState({ profileExists: true, user: res.data, error: "200" });
				this.props.loadUser(res.data);
			} else if(res.status === 404 || res.data === "") {
				this.setState({ profileExists: false, error: "404" });
			} else {
				this.setState({ profileExists: false, error: res.status });
			}
		}).catch(error => {
			// console.log(error);
			// this.props.onSignIn(false);
			this.setState({ profileExists: false, error: "555" });
		});*/

		const testUser = {
			id: "5dc1d1051950b6370ef5d619",
			username: "Test User",
			name: "Bryce Egley",
			locationId: "5d8cee760aba7d39803674e9",
			location: "Arkansas City",
			licenseNumber:"",
			profilePictureUrl:"https://img.cinemablend.com/filter:scale/quill/0/b/2/8/e/4/0b28e4aa54e1e313ce1dfa25357786f1d2add1a5.png?mw=600",
			email:"begley@factoryexpohomes.com",
			createdBy:"admin",
			creationTime:"2019-11-05T19:44:05.196+00:00",
			deleted:false,
			modifiedBy:"admin",
			modificationTime:"2019-11-05T19:44:05.196+00:00",

		}

		demoHTTPRequest().then(res => {
			this.setState({ profileExists: true, user: testUser, error: "200", loadingProfile: false });
			this.props.loadUser(testUser);
		});
	}


	public logout() {
		this.props.logout();
	}

	public render() {
		const { profileExists, loadingProfile, error, user } = this.state;
		return(
			<>
				{
					loadingProfile ?
					<div style={{display: 'flex', height: '100vh'}}>
						<div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20}}>
							<CircularProgress />
							<span style={{marginTop: 25, marginLeft: 6, color: 'lightblue'}}>Loading...</span>
						</div>
					</div>
					:
					<>
						{
							profileExists ?
							<>
								<div id="taskBar" style={{position: 'relative'}} >
									<Toolbar>
										<ViewIcon className="primary20" style={{marginRight: 10}}/>
										<Typography variant="subtitle1" style={{flex: 1}}>Demo App
										</Typography>
										<div style={{display: 'flex', alignItems: 'center'}}>
											<Avatar style={{
														marginRight: 15,
														width: 40,
														height: 40,
														backgroundColor: 'white'
													}}
													aria-label="User" src={user.profilePictureUrl || BlankProfileImage}
												>
												</Avatar>
											<span>{user.name}</span>

										</div>
										
									</Toolbar>
								</div>
								<div style={{display: 'flex', height: '92%'}}>
									<Navigation />
									<ApplicationRouter />
								</div>
							</>
							:
							<div style={{display: 'flex', height: '100vh'}}>
								<div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
									{ error === '404' && <NewUserDisplay findUser={this.findUserByEmail}/> }
									{ error === '500' && <p style={{color: 'red'}}>{ error }! You are accessing this system from an unauthorized IP address.  Access denied</p> }
									{ error !== '404' && error !== '500' && 
										<>
											<p style={{color: 'red'}}>Error { error } occurred.  Try logging in again.  If that fails, contact IT support.</p>
											<Button variant="outlined" color="secondary" onClick={this.logout}>Return to login</Button>
										</>
									}
								</div>
							</div>
						}
					</>
				}
			</>
		)
	}
}

export default connect(null, { loadPathFromStorage, logout, loadUser })(Home);